const Student = require("../../models/student");
const Teacher = require("../../models/teacher");
const Log = require("../../models/log");

const { sendSMS } = require("../../utils/sms");
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
      const formattedLogs = fetchedLogs.map((log) => transformLog(log));

      const sortedLogs = formattedLogs.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return sortedLogs;
    } catch (err) {
      throw err;
    }
  },

  // Assumes that the "args.date" is a dateString such as "2023-05-19"
  logByDate: async (args) => {
    try {
      const student = await Student.findById(args.studentId);

      if (!student) {
        throw error("Student does not exist.");
      }

      const targetDate = new Date(args.date);
      targetDate.setHours(0, 0, 0, 0);

      const nextDay = new Date(targetDate);
      nextDay.setDate(targetDate.getDate() + 1);

      const fetchedLog = await Log.findOne({
        student: args.studentId,
        createdAt: {
          $gte: targetDate,
          $lt: nextDay,
        },
      });

      return transformLog(fetchedLog);
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

      if (args.rating < 0 || args.rating > 5) {
        throw new error("Rating Invalid");
      }

      const log = new Log({
        teacher: args.teacherId,
        student: args.studentId,
        details: args.details,
        rating: args.rating,
        edits: [],
      });

      const result = await log.save();

      const message = `A New Log has been Uploded`;
      //await sendSMS(fetchedStudent.primaryContactNumber.toString(), message);

      return transformLog(result);
    } catch (err) {
      throw err;
    }
  },

  editLog: async (args) => {
    try {
      const fetchedLog = await Log.findById(args.logId);

      const currentDate = new Date();

      fetchedLog.edits.push({
        edit: fetchedLog.details,
        editedBy: args.editorName,
        editedOn: currentDate.toISOString(),
      });

      fetchedLog.details = args.details;
      fetchedLog.rating = args.rating;

      const result = await fetchedLog.save();

      return transformLog(result);
    } catch (err) {
      throw err;
    }
  },
};
