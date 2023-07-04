const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  studentNumber: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  primaryContactNumber: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
  expoPushToken: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Student", studentSchema);
