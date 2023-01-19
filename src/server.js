const express = require("express")
const app = express()
const connectDb = require("./Database/db")
const userRoute = require("./Route/router")
const dotenv =  require("dotenv").config
const cors = require("cors")



app.use(cors())
app.use(express.json())
app.use(express.static("./"))

app.use("/api/v1/user", userRoute)
app.use("/", (req, res)=>{
    res.json({})
})

const port = process.env.PORT || 5000

const start = async ()=>{

   try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, ()=>{
        console.log(`server is running at port ${port}`)
    })
   } catch (error) {
    console.log(error)
   }
}
start()