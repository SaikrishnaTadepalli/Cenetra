const Teacher = require("../../models/teacher");

module.exports = {
  // Queries
  teachers: async () => {
    try {
      const teachers = await Teacher.find();

      return teachers.map((teacher) => ({ ...teacher._doc, _id: teacher.id }));
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

      const newTeacher = new Teacher({
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

/*


query {
  teachers {
      _id
      firstName
      lastName
      email
      phoneNumber
  }
}



mutation {
  createTeacher(teacherInput: {
      firstName: "t-f1"
      lastName: "t-l1"
      email: "t-e1"
      phoneNumber: "t-p1"
  }) {
      _id
      firstName
      lastName
      email
      phoneNumber
  }
}


*/
