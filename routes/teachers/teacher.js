const Teacher = require("../../models/teacher/Teacher")
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
  if (req.body.teacherId === req.params.id) {
    if (req.body.teacherpassword) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.teacherpassword = await bcrypt.hash(req.body.teacherpassword, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const teacher = await Teacher.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.teacherId === req.params.id || req.body.Admin) {
    try {
      await Teacher.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.get("/", async (req, res) => {
  const teacherId = req.query.teacherId;
  const teachername = req.query.teachername;
  try {
    const teacher = teacherId
      ? await Teacher.findById(teacherId)
      : await Teacher.findOne({ teachername: teachername });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});



//ADDING TO THER TEACHER CLASSES ARRAY
// router.put("/:id/follow", async (req, res) => {
//   if (req.body.teacherId !== req.params.id) {
//     try {
//       const teacher = await Teacher.findById(req.params.id);
//       const currentUser = await Teacher.findById(req.body.teacherId);
//       if (!teacher.teacherclasses.includes(req.body.teacherId)) {
//         await user.updateOne({ $push: { teacherclasses: req.body.teacherId } });
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
