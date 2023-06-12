const Student = require("../../models/student");
const Teacher = require("../../models/teacher");
const Media = require("../../models/media");

const { transformMedia } = require("./merge");
const { generateUploadURL, getViewURL } = require("../../utils/s3");

module.exports = {
  // Queries
  getS3UploadUrl: async (args) => {
    try {
      const fetchedStudent = await Student.findOne({ _id: args.studentId });

      if (!fetchedStudent) {
        throw new Error("Student does not exist.");
      }

      const fetchedTeacher = await Teacher.findOne({ _id: args.teacherId });

      if (!fetchedTeacher) {
        throw new error("Teacher does not exist.");
      }

      const info = await generateUploadURL();
      return JSON.stringify(info);
    } catch (err) {
      throw err;
    }
  },

  getS3ViewUrl: async (args) => {
    try {
      return getViewURL(args.fileName);
    } catch (err) {
      throw err;
    }
  },

  viewMedia: async (args) => {
    try {
      const student = await Student.findById(args.studentId);

      if (!student) {
        throw error("Student does not exist.");
      }

      const fetchedMedia = await Media.find({ student: args.studentId });

      return fetchedMedia.map((media) => transformMedia(media));
    } catch (err) {
      throw err;
    }
  },

  getS3ViewURLs: async (args) => {
    try {
      const student = await Student.findById(args.studentId);

      if (!student) {
        throw error("Student does not exist.");
      }

      const fetchedMedia = await Media.find({ student: args.studentId }).sort({
        createdAt: -1,
      });

      return fetchedMedia.map((media) => getViewURL(media.fileName));
    } catch (err) {
      throw err;
    }
  },

  viewMediaByDate: async (args) => {
    try {
      const student = await Student.findById(args.studentId);

      if (!student) {
        throw error("Student does not exist.");
      }

      const targetDate = new Date(args.date);
      targetDate.setHours(0, 0, 0, 0);

      const nextDay = new Date(targetDate);
      nextDay.setDate(targetDate.getDate() + 1);

      const fetchedMedia = await Media.find({
        student: args.studentId,
        createdAt: {
          $gte: targetDate,
          $lt: nextDay,
        },
      });

      return fetchedMedia.map((media) => transformMedia(media));
    } catch (err) {
      throw err;
    }
  },

  getS3ViewURLByDate: async (args) => {
    try {
      const student = await Student.findById(args.studentId);

      if (!student) {
        throw error("Student does not exist.");
      }

      const targetDate = new Date(args.date);
      targetDate.setHours(0, 0, 0, 0);

      const nextDay = new Date(targetDate);
      nextDay.setDate(targetDate.getDate() + 1);

      const fetchedMedia = await Media.find({
        student: args.studentId,
        createdAt: {
          $gte: targetDate,
          $lt: nextDay,
        },
      });

      return fetchedMedia.map((media) => getViewURL(media.fileName));
    } catch (err) {
      throw err;
    }
  },

  // Mutations
  registerMedia: async (args) => {
    try {
      const fetchedStudent = await Student.findOne({ _id: args.studentId });

      if (!fetchedStudent) {
        throw new Error("Student does not exist.");
      }

      const fetchedTeacher = await Teacher.findOne({ _id: args.teacherId });

      if (!fetchedTeacher) {
        throw new error("Teacher does not exist.");
      }

      const media = new Media({
        teacher: args.teacherId,
        student: args.studentId,
        fileName: args.fileName,
      });

      const result = await media.save();

      return transformMedia(result);
    } catch (err) {
      throw err;
    }
  },
};
