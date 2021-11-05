const router = require("express").Router();
const Contact = require("../../models/admin/Contact");


//create a messages
router.post("/", async (req, res) => {
  const newContact = new Contact(req.body);
  try {
    const SaveContact = await newContact.save();
    res.status(200).json(SaveContact);
  } catch (error) {
    res.status(500).json(error)
  }
})


//get all messages
router.get('/', async (req, res) =>{
    try {
        let contact;
        contact = await Contact.find()
        res.status(200).json(contact)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;