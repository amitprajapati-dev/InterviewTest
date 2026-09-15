const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const route = require("./routes/route.js");
const User = require("./models/userModel.js");

const app = express()


app.use(express.json());

app.use("/users", route)


mongoose.connect(process.env.MONGO_URL).then(() => console.log("Database is connect successfully")).catch((error) => console.log(error));


app.get("/", (req,res) => {
    res.send("Home page 1");
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is listing to the port");
});