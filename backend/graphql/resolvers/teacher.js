const Teacher = require("../../models/teacher");

const getNewNum = (numDigits) => {
  const min = 10 ** (numDigits - 1);
  const max = 10 ** numDigits - 1;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
};

const CreateTeacherNumber = async () => {
  let number = getNewNum(8);

  while (true) {
    const fetchedTeacher = await Teacher.findOne({
      teacherNumber: number,
    });

    if (!fetchedTeacher) {
      break;
    }

    number = getNewNum(8);
  }

  return number;
};

module.exports = {
  // Queries
  teachers: async () => {
    try {
      const teachers = await Teacher.find().sort({ firstName: 1 });

      return teachers.map((teacher) => ({ ...teacher._doc, _id: teacher.id }));
    } catch (err) {
      throw err;
    }
  },

  teacherById: async (args) => {
    try {
      const teacher = await Teacher.findById(args.teacherId);

      if (!teacher) {
        throw error("Teacher does not exist.");
      }

      return {
        ...teacher._doc,
        _id: teacher.id,
      };
    } catch (err) {
      throw err;
    }
  },

  teacherByTeacherNumber: async (args) => {
    try {
      const teacher = await Teacher.findOne({
        teacherNumber: args.teacherNumber,
      });

      if (!teacher) {
        throw error("Teacher does not exist.");
      }

      return {
        ...teacher._doc,
        _id: teacher.id,
      };
    } catch (err) {
      throw err;
    }
  },

  // Mutations
  createTeacher: async (args) => {
    try {
      const existingTeacher = await Teacher.findOne({
        email: args.teacherInput.email,
      });

      if (existingTeacher) {
        throw new Error("Teacher exists already.");
      }

      const newTeacherNumber = await CreateTeacherNumber();

      const newTeacher = new Teacher({
        teacherNumber: newTeacherNumber,
        firstName: args.teacherInput.firstName,
        lastName: args.teacherInput.lastName,
        email: args.teacherInput.email,
        phoneNumber: args.teacherInput.phoneNumber,
      });

      const teacherSaveRes = await newTeacher.save();

      return {
        ...teacherSaveRes._doc,
        _id: teacherSaveRes.id,
      };
    } catch (err) {
      throw err;
    }
  },
};
