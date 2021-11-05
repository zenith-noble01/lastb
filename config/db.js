const mongoose = require("mongoose");

const connectDb = async () =>{
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to DB");
}

module.exports = connectDb