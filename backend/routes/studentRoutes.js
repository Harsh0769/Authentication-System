const express = require("express");
const router = express.Router();
const Students = require("../models/Students");
const protect = require("../middleware/authMiddleware");

const {
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
} = require("../controllers/studentController")

router.use(protect);


router.get("/", getAllStudents)

// router.post("/", async (req, res) => {
//     try {
//         const s = new Students(req.body);
//         const data = await s.save();
//         res.status(200).send(data)
//     } catch (err) {
//         console.log("The err is: " + err);
//         res.status(400).json({ error: err.message });
//     }
// });

router.get("/:id", getStudentById)

router.put("/:id",updateStudent)

router.delete("/:id", deleteStudent)

module.exports = router;