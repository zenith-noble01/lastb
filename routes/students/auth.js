const Student = require("../../models/student/Student")
const router = require("express").Router();
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newStudent = new Student(req.body);
    //save user and respond
    const student = await newStudent.save();
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json(err)
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.body.email });
    !student && res.status(404).json("student not found");

    const validPassword = await bcrypt.compare(req.body.password, student.password)
    !validPassword && res.status(400).json("wrong password")

    res.status(200).json(student)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;

module.exports = router