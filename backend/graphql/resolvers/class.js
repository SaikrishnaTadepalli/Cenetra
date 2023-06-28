const Student = require("../../models/student");
const Teacher = require("../../models/teacher");
const Class = require("../../models/class");

const { transformClass } = require("./merge");

module.exports = {
  // Queries
  classes: async () => {
    try {
      const classes = await Class.find();

      return classes.map((oneClass) => transformClass(oneClass));
    } catch (err) {
      throw err;
    }
  },

  classById: async (args) => {
    try {
      const fetchedClass = await Class.findOne({ _id: args.classId });

      if (!fetchedClass) {
        throw error("Class does not exist.");
      }

      return transformClass(fetchedClass);
    } catch (err) {
      throw err;
    }
  },

  // Assumes that a teacher teaches only 1 class
  classByTeacherId: async (args) => {
    try {
      const fetchedTeacher = await Teacher.findOne({ _id: args.teacherId });

      if (!fetchedTeacher) {
        throw new Error("Teacher does not exist.");
      }

      const fetchedClass = await Class.findOne({ teacher: args.teacherId });

      if (!fetchedClass) {
        throw error("Class does not exist.");
      }

      return transformClass(fetchedClass);
    } catch (err) {
      throw err;
    }
  },

  // Mutations
  createClass: async (args) => {
    try {
      const fetchedTeacher = await Teacher.findOne({ _id: args.teacherId });

      if (!fetchedTeacher) {
        throw new Error("Teacher does not exist.");
      }

      const curClass = new Class({
        teacher: args.teacherId,
        students: [],
        details: args.details,
        className: args.className,
      });

      const classSaveRes = await curClass.save();
      const createdClass = transformClass(classSaveRes);

      return createdClass;
    } catch (err) {
      throw err;
    }
  },

  addStudentToClass: async (args) => {
    try {
      const fetchedClass = await Class.findOne({ _id: args.classId });

      if (!fetchedClass) {
        throw new Error("Class does not exist");
      }

      const fetchedStudent = await Student.findOne({ _id: args.studentId });

      if (!fetchedStudent) {
        throw new Error("Student does not exist");
      }

      fetchedClass.students.push(args.studentId);

      const classUpdateRes = await fetchedClass.save();

      return transformClass(classUpdateRes);
    } catch (err) {
      throw err;
    }
  },

  addStudentsToClass: async (args) => {
    try {
      const fetchedClass = await Class.findOne({ _id: args.classId });

      if (!fetchedClass) {
        throw new Error("Class does not exist");
      }

      for (let i = 0; i < args.studentIds.length; i++) {
        const fetchedStudent = await Student.findById(args.studentIds[i]);

        if (!fetchedStudent) {
          throw new Error(`Student does not exist: ${stuId}.`);
        }
      }

      args.studentIds.map((studentId) => fetchedClass.students.push(studentId));

      const classUpdateRes = await fetchedClass.save();

      return transformClass(classUpdateRes);
    } catch (err) {
      throw err;
    }
  },
};
