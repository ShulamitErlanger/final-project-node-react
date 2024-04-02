

const jwt=require('jsonwebtoken')
const verifyAdmin=(req,res,next)=>{

    if(!req.user.roles=='admin')
    {
        return res.status(403).json({message:'forbiddenad'})
    }
      next()
}   
module.exports=verifyAdmin