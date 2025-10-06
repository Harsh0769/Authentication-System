const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors")
const PORT = process.env.PORT ||5000;

const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes")
const authMiddleware = require("./middleware/authMiddleware");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("DB connected") })
    .catch(err => console.log(err));

    
app.use("/api/students", authMiddleware, studentRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("hiii")
})

app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({message : `Hello ${req.user.name} , you have access to it.`})
})

app.listen(PORT, () => {
    console.log(`Server is listening on PORT : http://localhost:${PORT}`)
})