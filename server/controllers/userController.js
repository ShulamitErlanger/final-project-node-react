const User = require("../models/User");
const addUser=async(req,res)=>{
    const {username, password, name, birthDate, gender, sector, email} = req.body
    if (!name || !username || !password) {
        return res.status(400).json({message:'required field is missing'})
        }
    if(!gender in['זכר','נקבה']|| !sector in["חרדי","חילוני","דתי לאומי","מסורתי","לא משתייך"])
        return res.status(401).json({message:"not valid fields"})
    let roles;
    const duplicate=await User.findOne({username:username}).lean()
    if(duplicate)
       return res.status(409).json({message:"duplicate username"})
    if(password===process.env.ADMIN)
        roles="admin"
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject= {username,password:hashedPwd,name,birthDate,gender,sector,email,roles}
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

        
    const user=await User.findById({_id:id},{password:0}).lean()

    if(!user)
    {

            return res.status(401).json({message:"not found"})
    }
    if(user._id==req.user._id){
        return res.json(user)
    }

    return res.status(405).json({message:"unaouthorisedid"})
}
const updateUser=async(req,res)=>{
    const {_id,username, password, name, sector, email}=req.body
  
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



const addSurvey=async(req,res)=>{
    const {_id,survey}=req.body
        const user=await User.findById(_id).exec()
        if(!user)
            return res.status(401).json({message:`There No user with id: ${req.user._id}`})
        if(user._id==req.user._id){
            user.surveys=[...user.surveys,survey]
    const MyUpdateUser=await user.save()
    return res.status(200).json({message:`${user.name} updated`})
}
return res.status(405).json({message:"unaouthorised"})}
module.exports={addUser,getAllUsers,updateUser,getUserById,deleteUser,addSurvey}