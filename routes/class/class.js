const router = require("express").Router();
const Class = require("../../models/class/Class")



// CREATING A NEW CLASS
router.post("/", async (req, res)=>{
    const newClass = new Class({
        classname: req.body.classname
    });
    try {
        const savedClass = await newClass.save()
        res.status(200).json(savedClass)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ONE CLASS
router.get("/:classname", async (req, res) =>{
    try {
        const oneclass = await Class.findById(req.params.classname);
        res.status(200).json(oneclass);
    } catch (err) {
        res.status(500).json(err);
    }
})


// GET ALL CLASSES
router.get("/", async (req, res) =>{
    try {
        let oneclass;
        oneclass = await Class.find()
        res.status(200).json(oneclass)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router