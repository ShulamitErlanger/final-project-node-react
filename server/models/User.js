const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    
    birthDate:{
        type:Date,
        immutable:true ,
        default:null 
    },
    gender:{
        type:String,
        enum:['לא נבחר',"זכר","נקבה"],
        default:'לא נבחר'
    },
    sector:{
        type:String,
        enum:['לא נבחר',"חרדי","חילוני","דתי לאומי","מסורתי","לא משתייך"],
        default:'לא נבחר'
    },
    email:{
        type:String,
        lowercase:true,
        trim:true
    },
    roles:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    surveys:{
        type:[mongoose.Types.ObjectId],
        ref:"Survey"
    }
    },
        {
        timestamps:true
        }
    

 )
module.exports=mongoose.model("User",userSchema)