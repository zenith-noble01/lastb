const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
    {
    classname: {
        type: String,
        require: true
    },
    students: {
        type: Array
    },
    teachers: {
        type: Array
    },
    subjects: {
        type: Array
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Class", ClassSchema);
