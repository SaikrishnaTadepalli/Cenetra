const Student = require("../../models/student");
const Admin = require("../../models/admin");
const ProfileInfoPending = require("../../models/profileInfoPending");
const ProfileInfoValid = require("../../models/profileInfoValid");

const { transformProfile } = require("./merge");

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
  getProfileInfo: async (args) => {
    try {
      const student = await Student.findById(args.studentId);

      if (!student) {
        throw error("Student does not exist.");
      }

      const fetchedProfileInfos = await ProfileInfoValid.find({
        student: args.studentId,
      });

      const formattedProfileInfos = fetchedProfileInfos.map((profileInfo) =>
        transformProfile(profileInfo)
      );

      const sortedProfileInfos = formattedProfileInfos.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return sortedProfileInfos;
    } catch (err) {
      throw err;
    }
  },

  getLatestProfileInfo: async (args) => {
    try {
      const student = await Student.findById(args.studentId);

      if (!student) {
        throw error("Student does not exist.");
      }

      const fetchedProfileInfos = await ProfileInfoValid.find({
        student: args.studentId,
      });

      if (fetchedProfileInfos.length === 0) {
        throw Error("No Profiles For Student");
      }

      const formattedProfileInfos = fetchedProfileInfos.map((profileInfo) =>
        transformProfile(profileInfo)
      );

      const sortedProfileInfos = formattedProfileInfos.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return sortedProfileInfos[0];
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

      let result = null;
      if (fetchedProfileInfo) {
        result = transformProfile(fetchedProfileInfo);
      }

      return result;
    } catch (err) {
      throw err;
    }
  },

  getAllMatchedPendingProfileInfos: async (args) => {
    try {
      const fetchedPendingProfiles = await ProfileInfoPending.find();

      const fetchedValidProfiles = await Promise.all(
        fetchedPendingProfiles.map(async (pendingProfile) => {
          const fetchedValids = await ProfileInfoValid.find({
            student: pendingProfile._doc.student,
          }).sort({ createdAt: -1 });

          return fetchedValids.length > 0 ? fetchedValids[0] : null;
        })
      );

      const result = fetchedPendingProfiles.map(async (pendingProfile, i) => {
        const transformedPending = pendingProfile
          ? transformProfile(pendingProfile)
          : null;
        const transformedValid = fetchedValidProfiles[i]
          ? transformProfile(fetchedValidProfiles[i])
          : null;

        return [transformedPending, transformedValid];
      });

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
      });

      const result = await profileInfo.save();

      return transformProfile(result);
    } catch (err) {
      throw err;
    }
  },

  editProfileInfo: async (args) => {
    try {
      const fetchedStudent = await Student.findById(args.studentId);

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

      const fetchedProfileInfo = await ProfileInfoPending.findByIdAndRemove(
        args.profileId
      );

      if (!fetchedProfileInfo) {
        throw error("Pending Profile Info does not exist.");
      }

      const newProfileInfo = new ProfileInfoValid({
        student: fetchedProfileInfo.student,
        details: fetchedProfileInfo.details,
        approverName: fetchedAdmin.firstName + " " + fetchedAdmin.lastName,
      });

      const result = await newProfileInfo.save();

      return transformProfile(result);
    } catch (err) {
      throw err;
    }
  },
};
