const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "please provide username"],
        unique: true
    },
    email:{
        type: String,
        required: [true, "please provide email"],
        validate: {
            validator: validator.isEmail,
            message: "please provide a valid email"
        },
        unique: true
    },
    password:{
        type: String,
        required: [true, "please provide password"],
        select: false
    }
})


userSchema.pre("save", async function(){
    if(!this.isModified) return 
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function(userpass){
    const match = await bcrypt.compare(userpass, this.password)
    return match
}

module.exports = mongoose.model("User", userSchema)