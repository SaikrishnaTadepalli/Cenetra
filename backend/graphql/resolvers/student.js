const Student = require("../../models/student");

const getNewNum = (numDigits) => {
  const min = 10 ** (numDigits - 1);
  const max = 10 ** numDigits - 1;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
};

const CreateStudentNumber = async () => {
  let number = getNewNum(8);

  while (true) {
    const fetchedStudent = await Student.findOne({
      studentNumber: number,
    });

    if (!fetchedStudent) {
      break;
    }

    number = getNewNum(8);
  }

  return number;
};

module.exports = {
  // Queries
  students: async () => {
    try {
      const students = await Student.find();

      return students.map((student) => ({ ...student._doc, _id: student.id }));
    } catch (err) {
      throw err;
    }
  },

  studentById: async (args) => {
    try {
      const student = await Student.findById(args.studentId);

      if (!student) {
        throw error("Student does not exist.");
      }

      return {
        ...student._doc,
        _id: student.id,
      };
    } catch (err) {
      throw err;
    }
  },

  studentByStudentNumber: async (args) => {
    try {
      const student = await Student.findOne({
        studentNumber: args.studentNumber,
      });

      if (!student) {
        throw error("Student does not exist.");
      }

      return {
        ...student._doc,
        _id: student.id,
      };
    } catch (err) {
      throw err;
    }
  },

  // Mutations
  createStudent: async (args) => {
    try {
      const existingStudent = await Student.findOne({
        studentNumber: args.studentInput.studentNumber,
      });

      if (existingStudent) {
        throw new Error("Student exists already.");
      }

      const newStudentNumber = await CreateStudentNumber();

      const newStudent = new Student({
        studentNumber: newStudentNumber,
        firstName: args.studentInput.firstName,
        lastName: args.studentInput.lastName,
        primaryContactNumber: args.studentInput.primaryContactNumber,
      });

      const studentSaveRes = await newStudent.save();

      return {
        ...studentSaveRes._doc,
        _id: studentSaveRes.id,
      };
    } catch (err) {
      throw err;
    }
  },
};
