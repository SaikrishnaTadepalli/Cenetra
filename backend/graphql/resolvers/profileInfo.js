const Student = require("../../models/student");
const ProfileInfo = require("../../models/profileInfo");

const { transformProfile } = require("./merge");

module.exports = {
  // Queries
  getProfileInfo: async (args) => {
    try {
      const student = await Student.findById(args.studentId);

      if (!student) {
        throw error("Student does not exist.");
      }

      const fetchedProfileInfos = await ProfileInfo.find({
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

  // Mutations
  addProfileInfo: async (args) => {
    try {
      const fetchedStudent = await Student.findOne({ _id: args.studentId });

      if (!fetchedStudent) {
        throw new Error("Student does not exist.");
      }

      const profileInfo = new ProfileInfo({
        student: args.studentId,
        details: args.details,
      });

      const result = await profileInfo.save();

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
