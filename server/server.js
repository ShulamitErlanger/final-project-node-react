require("dotenv").config()
const mongoose=require("mongoose")
const conectDB=require("./config/dbConn")
const express=require("express")
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const PORT=process.env.PORT||2023
const app=express()
conectDB()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use('/api/mail',require("./routes/mail"))
app.use('/api/users',require("./routes/users"))
app.use('/api/auth',require("./routes/auths"))
app.use('/api/surveys',require("./routes/surveys"))
app.use('/api/surveys/questions',require("./routes/questions"))
app.use('/api/surveys/questions/answers',require("./routes/answers"))

mongoose.connection.once("open",()=>{
    console.log("conect to mongoDB")
    app.listen(PORT,()=>{
        console.log(`running on port ${PORT}`)
    })
})
mongoose.connection.on("error",(err)=>{
    console.log("error")
    console.log(err)
})

