const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema({
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
  className: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Class", classSchema);
