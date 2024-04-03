const mongoose=require("mongoose")
const questionSchema = require("./questionSchema")
const surveySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        enum:["creating","in process","closed","completed"],
        default:"creating"
    },
    birthDate:{
        type:Date,
        immuteable:true
    },
       
    sex:{
        type:String,
        enum:["זכר","נקבה"],


    },
    sector:{
        type:String,
        enum:["חרדי","חילוני","דתי לאומי","מסורתי","לא משתייך"],
        
    },
    color:{
        type:String,
        default:'#0ef0e1'
    },
    questions:[questionSchema]
   
    },{
        timestamps:true}
)
module.exports=mongoose.model('Survey',surveySchema)