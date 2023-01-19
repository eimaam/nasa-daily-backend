const User = require("../model/user")
const {StatusCodes} = require("http-status-codes")


const signUp = async (req, res)=>{
    const {username, email, password} = req.body
   
    if(!username || !email || !password){
        res.status(StatusCodes.BAD_REQUEST).json({msg: "please provide user details"})
    }

    const usernameExist = await User.findOne({username})
    if(usernameExist){
        res.status(StatusCodes.BAD_REQUEST).json({msg: "user with username already exist"})
    }
    const emailExist = await User.findOne({email})
    if(emailExist){
        res.status(StatusCodes.BAD_REQUEST).json({msg: "user with username already exist"})
    }

    const user = await User.create({username, email, password})
    
    res.status(StatusCodes.CREATED).json({user:{username: user.username, email:user.email}})
 
}

const signIn = async (req, res) =>{
    const {username, password} = req.body

    if(!username || !password){
        res.status(StatusCodes.BAD_REQUEST).json({msg: "please provide user details"})
    }

    const user = User.findOne({username}).select("+password")

    if(!user){
        res.status(StatusCodes.BAD_REQUEST).json({msg: "invalid user credentails"})
    }

    const isMatchPassword = user.comparePassword(password)
    if(!isMatchPassword){
        res.status(StatusCodes.BAD_REQUEST).json({msg: "inavalid user credentails"})
    }

    res.status(StatusCodes.OK).json({user})
}

module.exports = {signUp, signIn}