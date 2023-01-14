const Student = require("../../models/student");
const Teacher = require("../../models/teacher");
const Log = require("../../models/log");

const { transformLog } = require("./merge");

module.exports = {
  // Queries
  logs: async (args) => {
    try {
      const student = await Student.findById(args.studentId);

      if (!student) {
        throw error("Student does not exist.");
      }

      const fetchedLogs = await Log.find({ student: args.studentId });

      return fetchedLogs.map((log) => transformLog(log));
    } catch (err) {
      throw err;
    }
  },

  // Mutations
  createLog: async (args) => {
    try {
      const fetchedStudent = await Student.findOne({ _id: args.studentId });

      if (!fetchedStudent) {
        throw new Error("Student does not exist.");
      }

      const fetchedTeacher = await Teacher.findOne({ _id: args.teacherId });

      if (!fetchedTeacher) {
        throw new error("Teacher does not exist.");
      }

      const log = new Log({
        teacher: args.teacherId,
        student: args.studentId,
        details: args.details,
      });

      const result = await log.save();

      return transformLog(result);
    } catch (err) {
      throw err;
    }
  },
};

/*
query {
    logs(studentId: "63bbc056c7b7e5dbe2029c59") {
        _id
        teacher {
            _id
            firstName
        }
        student {
            _id
            firstName
        }
        details
        createdAt
        updatedAt
    }
}

mutation {
    createLog(teacherId: "63bbc099c7b7e5dbe2029c65" studentId: "63bbc056c7b7e5dbe2029c59" details: "Log 1 Details") {
        _id
        teacher {
            _id
            firstName
        }
        student {
            _id
            firstName
        }
        details
        createdAt
        updatedAt
    }
}


*/
