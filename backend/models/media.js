const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mediaSchema = new Schema(
  {
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Media", mediaSchema);
