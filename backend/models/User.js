const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required : true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase:true,
    },
    password: {
        type: String, 
        required: true,
        minlength: 8,
    },
    role: {
        type: String, 
        enum : ["admin" , "teacher" , "student" , "parent"] , default : "student"
    },
}, {
    timestamps :true,
})

//Hashing the password before saving.

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//comapring the passwords

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", userSchema);