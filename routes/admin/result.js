const router = require("express").Router();
const Result = require("../../models/admin/Result")
// const Classes = require("../../models/class/Class")


//post a result 
router.post("/", async (req, res) =>{
    const newResult = new Result({
        classname: req.body.classname,
        img: req.body.img
        // classId: req.body.classId
    });
    try {
        const savedResult = await newResult.save()
        res.status(200).json(savedResult)
    } catch (error) {
        res.status(500).json(error)
    }
})
//get a ressult to a particular class

router.get("/:classId", async (req, res) => {
    try {
        const result = await Result.findOne({classname: req.params.classId})
        res.status(200).json(result);
        } catch (err) {
        res.status(500).json(err);
        }
})

router.get("/", async (req, res) => {
    try {
        const result = await Result.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;