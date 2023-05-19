const Student = require("../../models/student");

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

      const newStudent = new Student({
        studentNumber: args.studentInput.studentNumber,
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

/*


query {
  students {
      _id
      firstName
      lastName
      studentNumber
      primaryContactNumber
  }
}


mutation {
  createStudent(studentInput: {
      firstName: "s-f1"
      lastName: "s-l1"
      studentNumber: "s-s1"
      primaryContactNumber: "s-p1"
  }) {
      _id
      firstName
      lastName
      studentNumber
      primaryContactNumber
  }
}


*/
