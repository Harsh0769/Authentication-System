const Students  = require("../models/Students");

const getAllStudents = async (req, res) => {
    
    try {
        const students = await Students.find().select("-password");
        res.status(200).json(students);
    } catch (err) {
        console.log("Get students Error :", err);
        res.status(500).json({ message: "server error fetching students" })
    }
};

const getStudentById = async (req, res) => {
     try {
        const student = await Students.findById(req.params.id).select("-password");
        if (!student) return res.status(400).json({ message: "student not found" });
        res.status(200).json(student)
    }
    catch (err) {
        console.log("can't fetch student with id cause :", err);
        res.status(500).json({
            message : "cant't fetch student by id"
        })
    }
}

const updateStudent = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        const student = await Students.findById(req.params.id);
        if (!student) return res.status(404).json({ message: "student not found" });

        student.name = name || student.name;
        student.emailId = email || student.emailId;
        student.role = role || student.role;

        await student.save();

        res.status(200).json({ message: "student updated succesfully ", student });
    }
    catch (err) {
        console.log("Upadte student error :", err);
        res.status(500).json({ message: "Server error updating student" })
    }
}

const deleteStudent = async (req, res) => {
    try {
        const student = await Students.findById(req.params.id);
        if (!student) return res.status(404).json({
            message: "student not found"
        });

        await student.deleteOne();
        res.status(200).json({ message: "Student deleted succesfully" })
    } catch (err) {
        console.log("delete student error" , err);
        res.status(500).json({ message: "server error deleting student" });
    }
}


module.exports = {
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
}