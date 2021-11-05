const router = require("express").Router();
const Teacher = require("../../models/teacher/Teacher")
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.teacherpassword, salt);
    //create new user
    const newTeacher = new Teacher({
      teachername: req.body.teachername,
      teacheremail: req.body.teacheremail,
      teacherpassword: hashedPassword,
    });

    //save teacher and respond
    const teacher = await newTeacher.save();
    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json(err)
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    //verifying the user email
    const teacher = await Teacher.findOne({ teacheremail: req.body.teacheremail });
    !teacher && res.status(404).json("teaher not found");
    //verifying the user password
    const validPassword = await bcrypt.compare(req.body.teacherpassword, teacher.teacherpassword)
    !validPassword && res.status(400).json("wrong password")

    res.status(200).json(teacher)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
