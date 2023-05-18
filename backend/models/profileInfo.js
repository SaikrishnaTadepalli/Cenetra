const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileInfoSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProfileInfo", profileInfoSchema);
