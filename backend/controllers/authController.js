const Student = require("../models/Students");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = (student) => {
    return jwt.sign(
        { id: student._id, role: student.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};


const registerStudent = async (req, res) => {
    try {
        
        const { name, emailId, password, gender , role } = req.body;

        if (!name || !emailId || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingStudent = await Student.findOne({ emailId });

        if (existingStudent) {
            return res.status(400).json({ message: "student already exists" });
        }

        const newStudent = new Student({
            name,
            emailId,
            password,
            gender,
            role: role || "student",
        })

        await newStudent.save();

        const token = generateToken(newStudent);
    
        res.status(201).json({
            message: "Student registered succesfully",
            token,
            user: {
                id: newStudent._id,
                name: newStudent.name,
                emailId: newStudent.emailId,
                password: newStudent.password,
                gender: newStudent.gender,
                role: newStudent.role,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            message : "Server error during registration" 
        })
        console.log(err.message);
        
    }
}

const loginStudent = async (req, res) => {
    try {

        const { emailId, password } = req.body;
    
        if (!emailId || !password) {
            return res.status(400).json({ message: "email and password are required" })
        }

        const student = await Student.findOne({ emailId });
        if (!student) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await student.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Inavlid credentials"
            });
        }

        const token = generateToken(student);

        res.status(200).json({
            message: "Login Successfull",
            token,
            user: {
                id: student._id,
                name: student.name,
                emailId: student.emailId,
                role: student.role,
            }
        })
    }
    catch (err) {
        console.log("login error :", err.message );
        res.status(500).json({message : "Server error during login"})
    }
}

module.exports = { registerStudent, loginStudent };