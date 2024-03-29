const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logSchema = new Schema(
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
    details: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    edits: [
      {
        edit: {
          type: String,
          required: true,
        },
        editedBy: {
          type: String,
          required: true,
        },
        editedOn: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", logSchema);
