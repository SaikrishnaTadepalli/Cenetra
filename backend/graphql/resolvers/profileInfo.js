const Student = require("../../models/student");
const Admin = require("../../models/admin");
const ProfileInfoPending = require("../../models/profileInfoPending");
const ProfileInfoValid = require("../../models/profileInfoValid");

const { transformProfile } = require("./merge");
const { deleteS3Object, DEFAULT_PROFILE_PIC } = require("../../utils/s3");

const mergeJSON = (obj1, obj2) => {
  const mergedDict = { ...obj1 };

  for (let key in obj2) {
    mergedDict[key] = obj2[key];
  }

  const mergedJSON = JSON.stringify(mergedDict);
  return mergedJSON;
};

module.exports = {
  // Queries
  getLatestProfileInfo: async (args) => {
    try {
      const student = await Student.findById(args.studentId);

      if (!student) {
        throw error("Student does not exist.");
      }

      const fetchedProfileInfo = await ProfileInfoValid.findOne({
        student: args.studentId,
      });

      const formattedProfileInfo = transformProfile(fetchedProfileInfo);

      return formattedProfileInfo;
    } catch (err) {
      throw err;
    }
  },

  getPendingProfileInfo: async (args) => {
    try {
      const student = await Student.findById(args.studentId);

      if (!student) {
        throw error("Student does not exist.");
      }

      const fetchedProfileInfo = await ProfileInfoPending.findOne({
        student: args.studentId,
      });

      const formattedProfileInfo = transformProfile(fetchedProfileInfo);

      return formattedProfileInfo;
    } catch (err) {
      throw err;
    }
  },

  getAllMatchedPendingProfileInfos: async (args) => {
    try {
      const fetchedPendingProfiles = await ProfileInfoPending.find();

      const fetchedValidProfiles = await Promise.all(
        fetchedPendingProfiles.map(async (pendingProfile) => {
          const fetchedValid = await ProfileInfoValid.findOne({
            student: pendingProfile._doc.student,
          });

          return fetchedValid;
        })
      );

      const result = fetchedPendingProfiles.map(
        async (pendingProfile, index) => {
          const transformedPending = pendingProfile
            ? transformProfile(pendingProfile)
            : null;

          const transformedValid = fetchedValidProfiles[index]
            ? transformProfile(fetchedValidProfiles[index])
            : null;

          return [transformedPending, transformedValid];
        }
      );

      return result;
    } catch (err) {
      throw err;
    }
  },

  // Mutations
  addProfileInfo: async (args) => {
    try {
      const fetchedStudent = await Student.findOne({ _id: args.studentId });

      if (!fetchedStudent) {
        throw new Error("Student does not exist.");
      }

      const profileInfo = new ProfileInfoValid({
        student: args.studentId,
        details: args.details,
        approverName: "Add-API",
        edits: [],
        profilePic: DEFAULT_PROFILE_PIC,
      });

      const result = await profileInfo.save();

      return transformProfile(result);
    } catch (err) {
      throw err;
    }
  },

  editProfileInfo: async (args) => {
    try {
      const fetchedStudent = await Student.findOne({ _id: args.studentId });

      if (!fetchedStudent) {
        throw new Error("Student does not exist.");
      }

      let newDetails = JSON.parse(args.details);

      const fetchedProfileInfo = await ProfileInfoPending.findOneAndRemove({
        student: args.studentId,
      });

      if (fetchedProfileInfo) {
        const oldDetails = JSON.parse(fetchedProfileInfo.details);

        newDetails = mergeJSON(oldDetails, newDetails);
      }

      const stringifiedDetails = JSON.stringify(newDetails)
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"');

      const newProfileInfo = new ProfileInfoPending({
        student: args.studentId,
        details: stringifiedDetails,
      });

      const result = await newProfileInfo.save();

      return transformProfile(result);
    } catch (err) {
      throw err;
    }
  },

  approveProfileInfo: async (args) => {
    try {
      const fetchedAdmin = await Admin.findById(args.adminId);

      if (!fetchedAdmin) {
        throw error("Admin does not exist.");
      }

      const fetchedPendingProfileInfo =
        await ProfileInfoPending.findByIdAndRemove(args.profileId);

      if (!fetchedPendingProfileInfo) {
        throw error("Pending Profile Info does not exist.");
      }

      const fetchedValidProfileInfo = await ProfileInfoValid.findOne({
        student: fetchedPendingProfileInfo.student,
      });

      if (!fetchedValidProfileInfo) {
        throw error("Valid Profile Info does not exist.");
      }

      const currentDate = new Date();

      fetchedValidProfileInfo.edits.push({
        edit: fetchedValidProfileInfo.details,
        editedBy: fetchedValidProfileInfo.approverName,
        editedOn: currentDate.toISOString(),
      });

      fetchedValidProfileInfo.details = fetchedPendingProfileInfo.details;
      fetchedValidProfileInfo.approverName =
        fetchedAdmin.firstName + " " + fetchedAdmin.lastName;

      const result = await fetchedValidProfileInfo.save();

      return transformProfile(result);
    } catch (err) {
      throw err;
    }
  },

  denyProfileInfoEdit: async (args) => {
    try {
      const fetchedAdmin = await Admin.findById(args.adminId);

      if (!fetchedAdmin) {
        throw error("Admin does not exist.");
      }

      const fetchedPendingProfileInfo =
        await ProfileInfoPending.findByIdAndRemove(args.profileId);

      if (!fetchedPendingProfileInfo) {
        throw error("Pending Profile Info does not exist.");
      }

      return transformProfile(fetchedPendingProfileInfo);
    } catch (err) {
      throw err;
    }
  },

  changeStudentProfilePic: async (args) => {
    try {
      // Make sure to have uploaded the Image to s3 first
      const fetchedStudent = await Student.findById(args.studentId);

      if (!fetchedStudent) {
        throw error("Student does not exist.");
      }

      fetchedStudent.profilePic = args.fileName;

      const result = await fetchedStudent.save();

      return {
        ...result._doc,
        _id: result.id,
      };
    } catch (err) {
      throw err;
    }
  },

  removeStudentProfilePic: async (args) => {
    try {
      const fetchedStudent = await Student.findById(args.studentId);

      if (!fetchedStudent) {
        throw error("Student does not exist.");
      }

      // await deleteS3Object(fetchedStudent.profilePic);

      fetchedStudent.profilePic = DEFAULT_PROFILE_PIC;

      const result = await fetchedStudent.save();

      return {
        ...result._doc,
        _id: result.id,
      };
    } catch (err) {
      throw err;
    }
  },
};
