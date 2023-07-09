const Student = require("../../models/student");
const Teacher = require("../../models/teacher");
const Admin = require("../../models/admin");
const VerificationCode = require("../../models/verificationCode");

const { sendSMS } = require("../../utils/sms");
const { transformVerificationCode } = require("./merge");

const generateVerificationCode = (numDigits) => {
  const min = 10 ** (numDigits - 1);
  const max = 10 ** numDigits - 1;
  const code = Math.floor(Math.random() * (max - min + 1)) + min;

  // Return the generated code
  return code.toString();
};

const getUserType = async (userNumber) => {
  const student = await Student.findOne({ studentNumber: userNumber });

  if (student) {
    return {
      userType: "Student",
      userId: student._id,
    };
  }

  const teacher = await Teacher.findOne({ teacherNumber: userNumber });

  if (teacher) {
    return {
      userType: "Teacher",
      userId: teacher._id,
    };
  }

  const admin = await Admin.findOne({ adminNumber: userNumber });

  if (admin) {
    return {
      userType: "Admin",
      userId: admin._id,
    };
  }

  return null;
};

module.exports = {
  // Queries
  verifyCode: async (args) => {
    try {
      const verificationCode = await VerificationCode.findOne({
        code: args.code,
        user: args.userId,
      });

      if (!verificationCode) {
        return false;
      }

      // Delete the verification code
      await VerificationCode.findByIdAndDelete(verificationCode._id);

      return true;
    } catch (err) {
      throw err;
    }
  },

  // Mutations
  sendSMSCode: async (args) => {
    try {
      const myUser = await getUserType(args.userNumber);

      if (!myUser) {
        throw new Error("User not found.");
      }

      await VerificationCode.findOneAndDelete({
        user: myUser.userId,
      });

      // Generate verification code of length 6
      const code = generateVerificationCode(5);

      // Store the verification code
      const verificationCode = new VerificationCode({
        user: myUser.userId,
        userType: myUser.userType,
        code: code,
      });

      const result = await verificationCode.save();

      // Send the SMS verification code to the user's device
      const message = `Your verification code is: ${code}`;
      //await sendSMS(student.primaryContactNumber, message);

      return transformVerificationCode(result);
    } catch (err) {
      throw err;
    }
  },

  sendSMSCodeStudent: async (args) => {
    try {
      const student = await Student.findById(args.studentId);

      if (!student) {
        throw new Error("Student not found.");
      }

      await VerificationCode.findOneAndDelete({
        user: args.studentId,
      });

      // Generate verification code of length 6
      const code = generateVerificationCode(5);

      // Store the verification code
      const verificationCode = new VerificationCode({
        user: args.studentId,
        userType: "Student",
        code: code,
      });

      const result = await verificationCode.save();

      // Send the SMS verification code to the user's device
      const message = `Your verification code is: ${code}`;
      await sendSMS(student.primaryContactNumber, message);

      return transformVerificationCode(result);
    } catch (err) {
      throw err;
    }
  },

  sendSMSCodeTeacher: async (args) => {
    try {
      const teacher = await Teacher.findById(args.teacherId);

      if (!teacher) {
        throw new Error("Teacher not found.");
      }

      await VerificationCode.findOneAndDelete({
        user: args.teacherId,
      });

      // Generate verification code of length 6
      const code = generateVerificationCode(5);

      // Store the verification code
      const verificationCode = new VerificationCode({
        user: args.teacherId,
        userType: "Teacher",
        code: code,
      });

      const result = await verificationCode.save();

      // Send the SMS verification code to the user's device
      const message = `Your verification code is: ${code}`;
      await sendSMS(teacher.phoneNumber, message);

      return transformVerificationCode(result);
    } catch (err) {
      throw err;
    }
  },

  sendSMSCodeAdmin: async (args) => {
    try {
      const admin = await Admin.findById(args.adminId);

      if (!admin) {
        throw new Error("Admin not found.");
      }

      await VerificationCode.findOneAndDelete({
        user: args.adminId,
      });

      // Generate verification code of length 6
      const code = generateVerificationCode(5);

      // Store the verification code
      const verificationCode = new VerificationCode({
        user: args.adminId,
        userType: "Admin",
        code: code,
      });

      const result = await verificationCode.save();

      // Send the SMS verification code to the user's device
      const message = `Your verification code is: ${code}`;
      // await sendSMS(admin.phoneNumber, message);

      return transformVerificationCode(result);
    } catch (err) {
      throw err;
    }
  },
};
