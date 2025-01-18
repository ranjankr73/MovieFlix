const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);
const connection = mongoose.connection;

connection.on("connected", ()=>{
    console.log("MongoDB connected successfully");
})

connection.on('error', (err)=>{
    console.log("MongoDB connection failed");
})


const connectDB = () => {
    try {
        const connected = mongoose.connect(process.env.MONGO_URI);
        if(connected){
            console.log("Connected to DB");
        }
    } catch (error) {
        console.log("Issue in connecting to DB");
    }
}

module.exports = { connectDB };