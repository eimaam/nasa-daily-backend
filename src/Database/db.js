const mongoose = require("mongoose")

const connectDb = (url) =>{
    mongoose.set('strictQuery', true)
    return mongoose.connect(url)
}

module.exports = connectDb;