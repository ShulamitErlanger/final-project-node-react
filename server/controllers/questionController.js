const Survey = require("../models/Survey");
const addQuestion=async(req,res)=>{
    console.log('arrive q');
    const {_id,body} = req.body
    console.log(_id,' ',body);
    if(!body)
        return res.status(409).json({message:`Required field is missing`})
    const survey=await Survey.findById(_id).exec()
    if (!survey) 
        return res.status(400).json({message:`There No survey with id: ${_id}`})
    const arr=[...survey.questions,{body}]
    survey.questions=arr
    const MyUpdateSurvey=await survey.save()
       return res.status(200).json({success:true,
            message:`question was added successfuly`,
            })
    }


// const getAllSurveys=async(req,res)=>{
//     const surveys=await Survey.find().lean()
//     if(!surveys)
//     {
//        return res.status(401).json({message:"there no surveys, please insert"})
//     }
//     return res.json(surveys)
// }

// const getSurveyById=async(req,res)=>{
//     const {_id}=req.body
//     const survey=await Survey.findById(_id).lean()
//     if(!survey)
//     {
//         return res.status(401).json({message:`There No survey with id: ${_id}`})
//     }
//     return res.json(survey)
// }

const updateQuestion=async(req,res)=>{
    const {_id,questionId,body}=req.body
    if(!body)
    return res.status(409).json({message:`Required field is missing`})
    const survey=await Survey.findById(_id).exec()
    if(!survey)
        return res.status(401).json({message:`There No survey with id: ${_id}`})
    const question=survey.questions.find(q=>q._id==questionId)
    if(!question)
        return res.status(401).json({message:`There No question with id: ${questionId}`})
    question.body=body
    const MyUpdateSurvey=await survey.save()
    return res.status(200).json({success:true,message:`${survey.title} updated`})
}

const deleteQuestion=async(req,res)=>{
    const {_id,questionId}=req.body
    const survey=await Survey.findById(_id).exec()
    if(!survey){
        return res.status(401).json({message:`There No survey with id: ${_id}`})
    }
    const question=survey.questions.find(q=>q._id==questionId)
    if(!question){
        return res.status(401).json({message:`There No question with id: ${questionId}`})
    }
    survey.questions.splice(survey.questions.indexOf(question),1)
    const MyUpdateSurvey=await survey.save()
    return res.status(200).json({success:true,message:`${survey.title} updated`})
}

const chooseSeg=async(req,res)=>{
    const{_id,questionId,kind,note}=req.body
    console.log(kind+' '+note);
    if(!kind in ["תרשים עוגה","היסטוגרמה","גרף"]){
        console.log('not valid kind');
        return res.status(401).json({message:"kind is not valid"})
    }
    const survey=await Survey.findById(_id).exec()
    if(!survey){
        console.log('!survey');
        return res.status(401).json({message:`There No survey with id: ${_id}`})
    }
    const question=survey.questions.find(q=>q._id==questionId)
    if(!question){
        console.log('!question');
        return res.status(401).json({message:`There No question with id: ${questionId}`})
    }
    if(kind)
    {
        console.log('kind');
         question.segmentation.kind=kind
    }
       
    if(note)
    {
        console.log('note');
        question.segmentation.note=note
    }
    const MyUpdateSurvey=await survey.save()
    return res.status(200).json({success:true,message:`${survey.title} updated`})
    
}
module.exports={addQuestion,deleteQuestion,updateQuestion,chooseSeg}


/*const Survey=require('../models/Survey')
const addQuestion=async(req,res)=>{
    const{_id,body}=req.body
    console.log(body);
    if(!body){
        return res.status(409).json({message:"require"})
    }
    const survey=await Survey.findById(_id).exec()
    if(!survey)
    {
        return res.status(400).json({message:"Survey not foundd"})    }
    const arr=[...survey.questions,{body}]
    survey.questions=arr
        console.log(survey.questions);
    const updatesurvey= await survey.save()
    return res.status(200).json({success:true,
        message:`question successfuly`})
}


const updateQuestion=async(req,res)=>{
    const{_id,questionId,body}=req.body
    if(!body){
        return res.status(409).json({message:"require"})
    }
    const survey=await Survey.findById(_id).exec()
    if(!survey)
    {
        return res.status(400).json({message:"Survey not found"})
    }
    const question=survey.questions.find(q=>q.question==questionId)
    if(!question)
    {
        return res.status(400).json({message:"Question not found"})
    }
        question.body=body
    const updatesurvey= await survey.save()
    return res.status(200).json({success:true,
        message:`Question updated successfuly`
        })
}
const deleteQuestion=async(req,res)=>{
    const{_id,questionId}=req.body
    const survey=await Survey.findById(_id).exec()
    
    if(!survey){
        return res.status(400).json({message:"Survey not found"})
    }
    const question=survey.questions.find(q=>q.question==questionId)
    if(!question)
    {
        return res.status(400).json({message:"Question not found"})
    }
    survey.questions.splice(survey.questions.indexOf(question),1)
    const updatesurvey= await survey.save()   
    return res.status(200).json({success:true,
            message:`Question deleted successfuly`
            })
    

}
const chooseSeg=async(req,res)=>{
    const{_id,questionId,kind,note}=req.body
    const survey=await Survey.findById(_id).exec()
    if(!survey){
        return res.status(400).json({message:"Survey not found"})
    }
    const question=survey.questions.find(q=>q.question==questionId)
    if(!question)
    {
        return res.status(400).json({message:"Survey not found"})
    }
if(kind)
{
    if(!(kind in ["תרשים עוגה","גרף","היסטוגרמה"]) )
    {
        return res.status(401).json({message:"kind are not valid"})
    }
    
    question.segmentation.kind=kind
}

if(note)
    question.segmentation.note=note
const updatesurvey= await survey.save()   
return res.status(201).json({success:true,
            message:`Question updated successfuly`
            })
}
module.exports={addQuestion,updateQuestion,deleteQuestion,chooseSeg}*/