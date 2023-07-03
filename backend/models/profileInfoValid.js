const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileInfoValidSchema = new Schema(
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
    approverName: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
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

module.exports = mongoose.model("ProfileInfoValid", profileInfoValidSchema);
