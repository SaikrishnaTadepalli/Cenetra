const Student = require("../../models/student");
const Teacher = require("../../models/teacher");
const Notice = require("../../models/notice");

const { transformNotice } = require("./merge");

module.exports = {
  // Queries
  notices: async (args) => {
    try {
      const student = await Student.findById(args.studentId);

      if (!student) {
        throw error("Student does not exist.");
      }

      const fetchedNotices = await Notice.find({ students: args.studentId });

      return fetchedNotices.map((notice) => transformNotice(notice));
    } catch (err) {
      throw err;
    }
  },

  // Mutations
  createNotice: async (args) => {
    try {
      const fetchedTeacher = await Teacher.findById(args.teacherId);

      if (!fetchedTeacher) {
        throw new error("Teacher does not exist.");
      }

      for (let i = 0; i < args.studentIds.length; i++) {
        const fetchedStudent = await Student.findOne({
          _id: args.studentIds[i],
        });

        if (!fetchedStudent) {
          throw new Error(`Student does not exist: ${stuId}.`);
        }
      }

      const notice = new Notice({
        teacher: args.teacherId,
        students: args.studentIds,
        details: args.details,
      });

      const result = await notice.save();

      return transformNotice(result);
    } catch (err) {
      throw err;
    }
  },
};

/*


query {
  notices(studentId: "6462cf2be55c98895096ea49") {
    _id
    teacher {
        _id
        firstName
    }
    students {
        _id
        firstName
    }
    details
    createdAt
    updatedAt
  }
}



mutation {
  createNotice(
    teacherId: "6462cfc2e55c98895096ea67"
    studentIds: ["6462cf2be55c98895096ea49", "6462cf3ce55c98895096ea4c", "6462cf3ce55c98895096ea4c"]
    details: "Notice 1: s1, s2, s3"
    ) {
        _id
        teacher {
            _id
            firstName
        }
        students {
            _id
            firstName
        }
        details
        createdAt
        updatedAt
  }
}

mutation {
  createNotice(
    teacherId: "63c3337da828a028b0482f3b"
    studentIds: ["63c33310a828a028b0482f30", "63c33324a828a028b0482f36"]
    details: "Notice 2: s1, s3"
    ) {
        _id
        teacher {
            _id
            firstName
        }
        students {
            _id
            firstName
        }
        details
        createdAt
        updatedAt
  }
}

mutation {
  createNotice(
    teacherId: "63c3337da828a028b0482f3b"
    studentIds: ["63c33310a828a028b0482f30"]
    details: "Notice 3: s1"
    ) {
        _id
        teacher {
            _id
            firstName
        }
        students {
            _id
            firstName
        }
        details
        createdAt
        updatedAt
  }
}


*/
