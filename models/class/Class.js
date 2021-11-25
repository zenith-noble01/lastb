const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
    {
    classname: {
        type: String,
        require: true
    },
    students: {
        type: Array,
        default: []
    },
    teachers: {
        type: Array,
        default: []
    },
    subjects: {
        type: Array,
        default: []
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Class", ClassSchema);
