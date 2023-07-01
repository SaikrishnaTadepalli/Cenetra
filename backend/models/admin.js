const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  adminNumber: {
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
  phoneNumber: {
    type: String,
    required: true,
  },
  permissionLevel: {
    type: Number,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
