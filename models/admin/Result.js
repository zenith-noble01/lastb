const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema(
  {
    classname: {
      type: String,
    },
    img: {
      type: String,
      default: "",
      required: true
    },
    classId: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", ResultSchema);
