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
  details: {
    type: String,
  },
});

module.exports = mongoose.model("Class", classSchema);
