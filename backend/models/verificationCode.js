const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const verificationCodeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      refPath: "userType",
      required: true,
    },
    userType: {
      type: String,
      enum: ["Student", "Teacher", "Admin"],
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      expires: "5m", // Verification codes expire after 5 minutes
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VerificationCode", verificationCodeSchema);
