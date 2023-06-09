const Student = require("../../models/student");
const Teacher = require("../../models/teacher");
const VerificationCode = require("../../models/verificationCode");

const { sendSMS } = require("../../utils/sms");
const { transformVerificationCode } = require("./merge");

/*

IMPORTANT NOTES

- Make sure number is of form: +14161234567

- We are currently in SMS sandbox. We need to get out 
    of it to be able to send messages to anyone
*/

const generateVerificationCode = (numDigits) => {
  const min = 10 ** numDigits;
  const max = 10 ** (numDigits + 1);
  const code = Math.floor(Math.random() * (max - min + 1)) + min;

  // Return the generated code
  return code.toString();
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
      const code = generateVerificationCode(6);

      // Store the verification code
      const verificationCode = new VerificationCode({
        user: args.studentId,
        userType: "Student",
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
      const code = generateVerificationCode(6);

      // Store the verification code
      const verificationCode = new VerificationCode({
        user: args.teacherId,
        userType: "Teacher",
        code: code,
      });

      const result = await verificationCode.save();

      // Send the SMS verification code to the user's device
      const message = `Your verification code is: ${code}`;
      //await sendSMS(teacher.phoneNumber, message);

      return transformVerificationCode(result);
    } catch (err) {
      throw err;
    }
  },
};

/*

query {
    verifyCode(studentId: "6462cf2be55c98895096ea49" code: "493794") 
}


mutation {
    sendSMSCode(studentId: "6462cf2be55c98895096ea49")  {
        _id
        student {
            _id
            firstName
        }
        code
    }
}

*/
