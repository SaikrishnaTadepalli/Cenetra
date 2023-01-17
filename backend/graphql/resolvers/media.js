const Student = require("../../models/student");
const Teacher = require("../../models/teacher");
const Media = require("../../models/media");

const { transformMedia } = require("./merge");
const { singleFileUpload } = require("../../utils/s3");

module.exports = {
  // Queries
  media: async (args) => {
    try {
      const student = await Student.findById(args.studentId);

      if (!student) {
        throw error("Student does not exist.");
      }

      const fetchedMedia = await Media.find({ student: args.studentId });

      const extractUrl = async (media) => {
        let mediaUrl = await s3.getSignedUrl("getObject", {
          Bucket: "cenetra-media-dev",
          Key: media.mediaKey,
        });

        media.mediaKey = mediaUrl;
      };

      return fetchedMedia.map((media) => extractUrl(transformMedia(media)));
    } catch (err) {
      throw err;
    }
  },

  // Mutations
  uploadMedia: async (args) => {
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
        mediaKey: await singleFileUpload(args.mediaObj),
      });

      const result = await media.save();

      return transformMedia(result);
    } catch (err) {
      throw err;
    }
  },
};
