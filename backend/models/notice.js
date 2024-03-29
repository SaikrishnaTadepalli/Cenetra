const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noticeSchema = new Schema(
  {
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
    ],
    details: {
      type: String,
      required: true,
    },
    noticeType: {
      type: String,
      required: true,
    },
    read: [
      {
        type: Boolean,
        required: true,
      },
    ],
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

module.exports = mongoose.model("Notice", noticeSchema);
