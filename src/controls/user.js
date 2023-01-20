const User = require("../model/user")
const {StatusCodes} = require("http-status-codes")


const signUp = async (req, res) => {
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

const signIn = async (req, res) => {
    const { username, password } = req.body

    // check that user enters username and password
    if(!username || !password){
        res.status(StatusCodes.BAD_REQUEST).json({msg: "please provide user details"})
        return;
    }

    const user = await User.findOne({username}).select("+password")

    if(!user){
        res.status(StatusCodes.BAD_REQUEST).json({msg: "invalid user credentials"})
    }

    // check for matching password
    const isMatchPassword = await user.comparePassword(password)

    if(!isMatchPassword){
        res.status(StatusCodes.BAD_REQUEST).json({msg: "inavalid user credentials"})
        return;
    }

    user.password = undefined
    res.status(StatusCodes.OK).json({user})
}

module.exports = {signUp, signIn}