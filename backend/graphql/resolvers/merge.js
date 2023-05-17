const Student = require("../../models/student");
const Teacher = require("../../models/teacher");

const { dateToString } = require("../../utils/date");

const transformClass = (oneClass) => {
  return {
    ...oneClass._doc,
    _id: oneClass.id,
    teacher: teacher.bind(this, oneClass._doc.teacher),
    students: students.bind(this, oneClass._doc.students),
  };
};

const transformLog = (log) => {
  return {
    ...log._doc,
    _id: log.id,
    teacher: teacher.bind(this, log._doc.teacher),
    student: student.bind(this, log._doc.student),
    createdAt: dateToString(log._doc.createdAt),
    updatedAt: dateToString(log._doc.updatedAt),
  };
};

const transformNotice = (notice) => {
  return {
    ...notice._doc,
    _id: notice.id,
    teacher: teacher.bind(this, notice._doc.teacher),
    students: students.bind(this, notice._doc.students),
    createdAt: dateToString(notice._doc.createdAt),
    updatedAt: dateToString(notice._doc.updatedAt),
  };
};

const transformMedia = (media) => {
  return {
    ...media._doc,
    _id: media.id,
    teacher: teacher.bind(this, media._doc.teacher),
    student: student.bind(this, media._doc.student),
    createdAt: dateToString(media._doc.createdAt),
  };
};

const teacher = async (teacherId) => {
  try {
    const fetchedTeacher = await Teacher.findById(teacherId);

    return {
      ...fetchedTeacher._doc,
      _id: fetchedTeacher.id,
    };
  } catch (err) {
    throw err;
  }
};

const student = async (stuId) => {
  try {
    const fetchedStudent = await Student.findById(stuId);

    return {
      ...fetchedStudent._doc,
      _id: fetchedStudent.id,
    };
  } catch (err) {
    throw err;
  }
};

const students = async (stuIds) => {
  try {
    return stuIds.map((stuId) => student(stuId));
  } catch (err) {
    throw err;
  }
};

exports.transformClass = transformClass;
exports.transformLog = transformLog;
exports.transformNotice = transformNotice;
exports.transformMedia = transformMedia;
