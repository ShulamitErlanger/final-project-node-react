const Survey = require("../models/Survey");
const addSurvey=async(req,res)=>{
    const {title,color} = req.body
    if (!title) {
        return res.status(400).json({message:'required field is missing'})
        }
        else{
     const survey = await Survey.create({title,color})
     
     if(survey){
   
       return res.status(201).json({success:true,
            message:`survey ${survey.title} created successfuly`,
            data:survey
            })
   }
       return res.status(200).json({message:'required field is missing'})  

    
}}
    

    const getAllSurveys=async(req,res)=>{
        const {status}=req.query
        let surveys=null

        if(status){
            surveys=await Survey.find({status}).lean()
        }
        else{
            surveys=await Survey.find().lean()
        }
        if(!surveys)
        {
            return res.status(401).json({message:"not found"})
        }
        return res.json(surveys)
    }
    const getSurveyById=async(req,res)=>{
        const {_id}=req.body
        const survey=await Survey.findById(_id).lean()
        if(!survey)
        {
                return  res.status(401).json({message:"not found"})
        }
        
            return res.json(survey)
        
    
    }
const updateSurvey=async(req,res)=>{
    const {_id,title,color}=req.body
    const survey=await Survey.findById(_id).exec()
    if(!survey)
    {
        return res.status(401).json({message:`There No survey with id: ${_id}`})}
        if(title)
            survey.title=title
        if(color)
            survey.color=color
        const MyUpdateSurvey=await survey.save()
        return res.status(200).json({message:`${survey.title} updated`})
}

const deleteSurvey=async(req,res)=>{
    const {_id}=req.body
    const survey=await Survey.findById(_id).exec()
    if(!survey){
        return res.status(401).json({message:`There No survey with id: ${_id}`})
    }
    await survey.deleteOne()
   return res.json(`${survey.title} is deleted`)
}

/*
const deleteSurvey=async(req,res)=>{
    const {_id}=req.params
    const survey=await Survey.findById(_id).exec()
    if(!survey){
        return res.status(401).json({message:`There No survey with id: ${_id}`})
    }
    await survey.deleteOne()
    res.json(`${task.title} is deleted`)
}
} */

const changeStatus=async(req,res)=>{
    const {_id,status}=req.body
    const survey=await Survey.findById(_id).exec()
    if(!survey){
        return res.status(401).json({message:`There No survey with id: ${_id}`})
    }
        
    if(status){
        const arr=["creating","in process","closed","completed"]
        const s=arr.find(s=>s==status)
        if(s)
                survey.status=status
        else{
             return res.status(401).json({message:"status not valid"})
        }
           

    }
    const MyUpdateSurvey=await survey.save()
    return res.status(200).json({message:`${survey.title} updated`})
}

const incCount=async(req,res)=>{
    const {_id}=req.body
    const survey=await Survey.findById(_id).exec()
    if(!survey)
        return res.status(401).json({message:`There No survey with id: ${_id}`})
    survey.count=survey.count+1
    const MyUpdateSurvey=await survey.save()
    return res.status(200).json({message:`${survey.title} updated`})
}
module.exports={addSurvey,getAllSurveys,updateSurvey,getSurveyById,deleteSurvey,changeStatus,incCount}