const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    teachername: {
      type: String,
      required: true
    },
    teacheremail: {
      type: String,
      required: true
    },
    teacherpassword: {
      type: String,
      required: true
    },
    teacherphone: {
      type: Number,
    },
    teacherclasses: {
        type: Array,
    },
    teacherSubject:{
      type: String
    },
    teacherProfilePic: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", TeacherSchema);
