const User = require("../models/User");
const addUser=async(req,res)=>{
    const {username, password, name, birthDate, sex, sector, email} = req.body
    let roles
    if (!name || !username || !password) {
        return res.status(400).json({message:'required field is missing'})
        }
    if(!sex in['זכר','נקבה']|| !sector in["חרדי","חילוני","דתי לאומי","מסורתי","לא משתייך"])
        return res.status(401).json({message:"not valid fields"})
    if(password===process.env.ADMIN)
        roles="admin"
    const duplicate=await User.findOne({username:username}).lean()
    if(duplicate)
       return res.status(409).json({message:"duplicate username"})
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject= {username,password:hashedPwd,name,birthDate,sex,sector,email,roles}
    const user = await User.create(userObject)
    if(user){
       return res.status(201).json({success:true,
            message:`user ${user.name} created successfuly`,
            })
    }
    else
        return res.status(400).json({message:"failed"})
    }

const getAllUsers=async(req,res)=>{
    const users=await User.find({},{password:0,username:0}).lean()
    if(!users)
    {
       return res.status(401).json({message:"there no users, please insert"})
    }
    return res.json(users)
}

const getUserById=async(req,res)=>{
    let {id}=req.query
    id=req.user._id;

    // let myId=req.user._id;
    // if(id==='')
    // {
    //     id=req.user._id
    // } 
    
     console.log(id);
        
    const user=await User.findById({_id:id},{password:0}).lean()
    console.log(user);
    if(!user)
    {
            return  res.status(401).json({message:"not found"})
    }
    if(user._id==req.user._id){
        return res.json(user)
    }
    console.log(user._id);
    console.log(req.user._id);
    return res.status(405).json({message:"unaouthorisedid"})
}
const updateUser=async(req,res)=>{
    const {_id,username, password, name, birthDate, sex, sector, email}=req.body
   const prevPass=req.user.password
    const user=await User.findById(_id).exec()

    if(!user)
        return res.status(401).json({message:`There No user with id: ${_id}`})
    if(user._id==req.user._id){
        if(username)
            user.username=username
        if(password)
            user.password=password
        if(name)
            user.name=name;
        if(birthDate)
            user.birthDate=birthDate;
        if(sex)
        {
            if(sex in['זכר','נקבה'])
                user.sex=sex;
        }
        if(sector)
        {
            if(sector in["חרדי","חילוני","דתי לאומי","מסורתי","לא משתייך"])
                user.sector=sector;
        }
        if(email)
            user.email=email;
        const MyUpdateUser=await user.save()
        return res.status(200).json({message:`${user.name} updated`})
    }
    return res.status(405).json({message:`unauthorized`})
}
const deleteUser=async(req,res)=>{
    const {_id}=req.body
    const user=await User.findById(_id).exec()
if(!user){
        return res.status(401).json({message:`There No user with id: ${_id}`})
    }
    if(user._id==req.user._id){
        await task.deleteOne()
       return res.json(`${task.title} is deleted`)
    }
    return res.status(405).json({message:`unauthorized`})
}

/*
const deleteUser=async(req,res)=>{
    const {_id}=req.params
    const user=await User.findById(_id).exec()
if(!user){
        return res.status(401).json({message:`There No user with id: ${_id}`})
    }
     if(user._id==req.user._id){
        await task.deleteOne()
        res.json(`${task.title} is deleted`)
    }
    return res.status(405).json({message:`unauthorized`})
} */

const addSurvey=async(req,res)=>{
    const {survey}=req.body
        const user=await User.findById(req.user._id).exec()
        if(!user)
            return res.status(401).json({message:`There No user with id: ${req.user._id}`})
        if(survey){
            user.surveys=[...user.surveys,survey]
        }
    const MyUpdateUser=await user.save()
    return res.status(200).json({message:`${user.name} updated`})
    
    
    
}
module.exports={addUser,getAllUsers,updateUser,getUserById,deleteUser,addSurvey}