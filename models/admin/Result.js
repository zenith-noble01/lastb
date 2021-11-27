const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema(
  {
    classname: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: "",
      required: true
    },
    classId: {
        type: String,
        default: "",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", ResultSchema);
