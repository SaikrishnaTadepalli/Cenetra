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

/*
query {
    getProfileInfo(studentId: "6462cf2be55c98895096ea49") {
        _id
        student {
            _id
            firstName
        }
        details
    }
}



mutation {
    addProfileInfo(studentId: "6462cf2be55c98895096ea49" details: "ProfileInfo Data 1 for Student 1") {
        _id
        student {
            _id
            firstName
        }
        details
    }
}

*/
