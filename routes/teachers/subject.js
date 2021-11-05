const router = require("express").Router();
const Subject = require("../../models/Subject")


//CREATING A NEW SUBJECT IN THE DB
router.post("/", async (req, res) =>{
    const newSubjeect = new Subject({
        subjectname: req.body.subjectname
    });
    try {
        const savedsubject = await newSubjeect.save();
        res.status(200).json(savedsubject);
    } catch (error) {
        res.status(500).json(error);
    }
})

// GET ONE SUBJECT

router.get("/:subjectname", async (req, res) => {
    try {
      const subject = await Subject.findById(req.params.subjectname);
      res.status(200).json(subject);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

// GET ALL SUBJECTS
router.get('/', async (req, res) =>{
    try {
        let subject;
        subject = await Subject.find()
        res.status(200).json(subject)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;