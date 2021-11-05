const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
    {
    subjectname: {
        type: String,
        require: true
    },
    subjectTeachers: {
        type: Array
    },
    classesTaught: {
        type: Array
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectSchema);
