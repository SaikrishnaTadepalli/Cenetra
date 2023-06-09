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

const transformNotice = (notice, id) => {
  try {
    let readState = null;

    if (JSON.stringify(id) !== JSON.stringify(notice.teacher)) {
      const index = notice.students.indexOf(id);

      if (index == -1 || index >= notice.read.length) {
        throw new Error(
          "Something Wrong with Read Field of Notice: " + notice.id
        );
      }

      readState = notice.read[index];
    }

    return {
      ...notice._doc,
      _id: notice.id,
      teacher: teacher.bind(this, notice._doc.teacher),
      students: students.bind(this, notice._doc.students),
      createdAt: dateToString(notice._doc.createdAt),
      updatedAt: dateToString(notice._doc.updatedAt),
      read: readState,
    };
  } catch (err) {
    throw err;
  }
};

const transformMedia = (media) => {
  return {
    ...media._doc,
    _id: media.id,
    teacher: teacher.bind(this, media._doc.teacher),
    student: student.bind(this, media._doc.student),
    createdAt: dateToString(media._doc.createdAt),
    updatedAt: dateToString(media._doc.updatedAt),
  };
};

const transformProfile = (profileInfo) => {
  return {
    ...profileInfo._doc,
    _id: profileInfo.id,
    student: student.bind(this, profileInfo._doc.student),
    createdAt: dateToString(profileInfo._doc.createdAt),
    updatedAt: dateToString(profileInfo._doc.updatedAt),
  };
};

const transformVerificationCode = (verificationCode) => {
  let rtn = {
    ...verificationCode._doc,
    _id: verificationCode.id,
    user: null,
    createdAt: dateToString(verificationCode._doc.createdAt),
    updatedAt: dateToString(verificationCode._doc.updatedAt),
  };

  if (verificationCode.userType === "Student") {
    rtn.user = student.bind(this, verificationCode._doc.user);
  } else {
    rtn.user = teacher.bind(this, verificationCode._doc.user);
  }

  return rtn;
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
exports.transformProfile = transformProfile;
exports.transformVerificationCode = transformVerificationCode;
