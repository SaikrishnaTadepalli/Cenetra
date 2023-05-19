const Student = require("../../models/student");
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
        student: args.studentId,
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
      const student = await Student.findById(args.studentId);

      if (!student) {
        throw new Error("Student not found.");
      }

      // Generate verification code of length 6
      const code = generateVerificationCode(4);

      // Store the verification code
      const verificationCode = new VerificationCode({
        student: args.studentId,
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
