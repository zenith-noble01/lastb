const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
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
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
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
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});


// app.post('/api/sendMail', (req, res)=> {
//     console.log(req.body)
//     const transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         auth: {
//             user: process.env.ACCOUNT_URL,
//             pass: process.env.PASSWORD_URL
//         }
//     })
//     const mailOPtion = {
//         from: req.body.email,
//         to: 'zenithnoble354@gmail.com',
//         subject: req.body.username,
//         text: req.body.message,
//         // html: `<p>${req.body.phone}</p>`
        
//     }

//     transporter.sendMail(mailOPtion, (error, info) =>{
//         if(error){
//             console.log(error);
//             res.send(error)
//         }else{
//             console.log('email was send');
//             res.send('success');
//         }
//     })
// })



module.exports = router;
