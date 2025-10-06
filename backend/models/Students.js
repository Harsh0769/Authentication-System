const mongoose = require("mongoose");
const  bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required : true
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
      type : String,  
    },
    gender: {
      type : String,  
    },
    // class: {
    //     type: Number,
    //     required : false
    // },
    // phone: {
    //     type: Number, 
    //     required : true,
    // },
    role: {
        type: String, 
        enum : ["admin" , "teacher" , "student" , "parent"] , default : "student"
    }
    // guardians: [{
    //     name: String,
    //     relation: String,
    //     phone : Number,
    // }],
    // attendancePercent: {
    //     type: Number,
    //     default :0
    // }
}, {
    timestamps : true,
})

studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

studentSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("Student", studentSchema);

