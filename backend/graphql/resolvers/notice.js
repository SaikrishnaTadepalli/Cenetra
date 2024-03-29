const Student = require("../../models/student");
const Teacher = require("../../models/teacher");
const Admin = require("../../models/admin");
const Notice = require("../../models/notice");

const { sendSMS } = require("../../utils/sms");
const { transformNotice } = require("./merge");
const { groupByDate } = require("../../utils/date");

module.exports = {
  // Queries
  noticesForStudent: async (args) => {
    try {
      const student = await Student.findById(args.studentId);

      if (!student) {
        throw error("Student does not exist.");
      }

      const fetchedNotices = await Notice.find({
        students: args.studentId,
      }).sort({ createdAt: -1 });

      const formattedNotices = fetchedNotices.map((notice) =>
        transformNotice(notice, args.studentId)
      );

      return groupByDate(formattedNotices);
    } catch (err) {
      throw err;
    }
  },

  noticesByTeacher: async (args) => {
    try {
      const teacher = await Teacher.findById(args.teacherId);

      if (!teacher) {
        throw new Error("Teacher does not exist.");
      }

      const fetchedNotices = await Notice.find({
        teacher: args.teacherId,
      }).sort({ createdAt: -1 });

      const formattedNotices = fetchedNotices.map((notice) =>
        transformNotice(notice, args.teacherId)
      );

      return groupByDate(formattedNotices);
    } catch (err) {
      throw err;
    }
  },

  // noticesForAdmin: async (args) => {
  //   try {
  //     const admin = await Admin.findById(args.adminId);

  //     if (!admin) {
  //       throw new Error("Admin does not exist.");
  //     }

  //     const teachers = await Teacher.find();

  //     const result = await Promise.all(
  //       teachers.map(async (teacher) => {
  //         const teacherId = teacher.id;

  //         const fetchedNotices = await Notice.find({
  //           teacher: teacherId,
  //         }).sort({ createdAt: -1 });

  //         const formattedNotices = fetchedNotices.map((notice) =>
  //           transformNotice(notice, teacherId)
  //         );

  //         return groupByDate(formattedNotices);
  //       })
  //     );

  //     return result;
  //   } catch (err) {
  //     throw err;
  //   }
  // },

  noticesForAdmin: async (args) => {
    try {
      const admin = await Admin.findById(args.adminId);

      if (!admin) {
        throw new Error("Admin does not exist.");
      }

      const teachers = await Teacher.find();

      const result = [];

      for (const teacher of teachers) {
        const teacherId = teacher.id;

        const fetchedNotices = await Notice.find({ teacher: teacherId }).sort({
          createdAt: -1,
        });

        if (fetchedNotices.length > 0) {
          const formattedNotices = fetchedNotices.map((notice) =>
            transformNotice(notice, teacherId)
          );

          result.push({
            teacher: {
              ...teacher._doc,
              _id: teacher.id,
            },
            data: formattedNotices,
          });
        }
      }

      return result;
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

      const fetchedStudents = args.studentIds.map(async (studentId) => {
        const fetchedStudent = await Student.findOne({
          _id: studentId,
        });

        if (!fetchedStudent) {
          throw new Error(`Student does not exist: ${studentId}.`);
        }

        return fetchedStudent;
      });

      const readArr = args.studentIds.map((x) => false);

      const notice = new Notice({
        teacher: args.teacherId,
        students: args.studentIds,
        details: args.details,
        noticeType: args.noticeType,
        edits: [],
        read: readArr,
      });

      const result = await notice.save();

      // const message = `A New Notice has been Uploded!`;
      // fetchedStudents.map(async (fetchedStudent) => {
      //   await sendSMS(fetchedStudent.primaryContactNumber, message);
      // });

      return transformNotice(result, args.teacherId);
    } catch (err) {
      throw err;
    }
  },

  editNotice: async (args) => {
    try {
      const fetchedNotice = await Notice.findById(args.noticeId);

      if (!fetchedNotice) {
        throw new error("Notice does not exist.");
      }

      for (let i = 0; i < args.studentIds.length; i++) {
        const fetchedStudent = await Student.findOne({
          _id: args.studentIds[i],
        });

        if (!fetchedStudent) {
          throw new Error(`Student does not exist: ${stuId}.`);
        }
      }

      const currentDate = new Date();
      const readArr = args.studentIds.map((x) => false);

      fetchedNotice.students = args.studentIds;
      fetchedNotice.edits.push({
        edit: fetchedNotice.details,
        editedBy: args.editorName,
        editedOn: currentDate.toISOString(),
      });
      fetchedNotice.details = args.details;
      fetchedNotice.noticeType = args.noticeType;
      fetchedNotice.read = readArr;

      const result = await fetchedNotice.save();

      return transformNotice(result, fetchedNotice.teacher);
    } catch (err) {
      throw err;
    }
  },

  deleteNotice: async (args) => {
    try {
      const fetchedTeacher = await Teacher.findById(args.teacherId);

      if (!fetchedTeacher) {
        throw new error("Teacher does not exist.");
      }

      const fetchedNotice = await Notice.findById(args.noticeId);

      if (!fetchedNotice) {
        throw new error("Notice does not exist.");
      }

      if (fetchedNotice.teacher != args.teacherId) {
        throw new error("This teacher cannot delete this notice.");
      }

      const deletedNotice = await Notice.findByIdAndRemove(args.noticeId);

      return transformNotice(deletedNotice, args.teacherId);
    } catch (err) {
      throw err;
    }
  },

  markNoticeAsRead: async (args) => {
    try {
      const student = await Student.findById(args.studentId);

      if (!student) {
        throw error("Student does not exist.");
      }

      const notice = await Notice.findById(args.noticeId);

      if (!notice) {
        throw error("Notice does not exist.");
      }

      const index = notice.students.indexOf(args.studentId);

      if (index === -1 || index >= notice.read.length) {
        throw error(
          "Something Wrong with Read Field of Notice: " + args.noticeId
        );
      }

      let newRead = notice.read;
      newRead[index] = true;

      notice.read = newRead;

      const result = await notice.save();

      return transformNotice(result, args.studentId);
    } catch (err) {
      throw err;
    }
  },
};
