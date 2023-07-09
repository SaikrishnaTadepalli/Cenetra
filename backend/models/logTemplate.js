const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logTemplateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    template: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LogTemplate", logTemplateSchema);
