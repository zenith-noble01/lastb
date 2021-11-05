const router = require("express").Router();
const Student = require("../../models/student/Student");


//update a student
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    await student.updateOne({ $set: req.body });
    res.status(200).json("the student has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a student
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
      await student.deleteOne();
      res.status(200).json("the post has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});


//get a student
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's all students
router.get('/', async (req, res) =>{
    try {
        let student;
        student = await Student.find()
        res.status(200).json(student)
    } catch (error) {
        res.status(500).json(error)
    }
})


// router.put("/:id/offer", async (req, res) => {
//   if (req.body.studentId !== req.params.id) {
//     try {
//       const user = await Student.findById(req.params.id);
//       const currentStudent = await Student.findById(req.body.userId);
//       if (!user.followers.includes(req.body.userId)) {
//         await user.updateOne({ $push: { followers: req.body.userId } });
//         await currentUser.updateOne({ $push: { followings: req.params.id } });
//         res.status(200).json("user has been followed");
//       } else {
//         res.status(403).json("you allready follow this user");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("you cant follow yourself");
//   }
// });

// //unfollow a user

// router.put("/:id/unfollow", async (req, res) => {
//   if (req.body.userId !== req.params.id) {
//     try {
//       const user = await User.findById(req.params.id);
//       const currentUser = await User.findById(req.body.userId);
//       if (user.followers.includes(req.body.userId)) {
//         await user.updateOne({ $pull: { followers: req.body.userId } });
//         await currentUser.updateOne({ $pull: { followings: req.params.id } });
//         res.status(200).json("user has been unfollowed");
//       } else {
//         res.status(403).json("you dont follow this user");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("you cant unfollow yourself");
//   }
// });


module.exports = router;
