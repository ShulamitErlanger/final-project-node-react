const Survey = require("../models/Survey");
const addQuestion=async(req,res)=>{
    const {_id,body,answers} = req.body
    if(!body){
        return res.status(409).json({message:`Required field is missing`})
    }
        
    const survey=await Survey.findById(_id).exec()
    if (!survey) 
    {
        return res.status(400).json({message:`There No survey with id: ${_id}`})
    }
        
    const arr=[...survey.questions,{body:body,answers:answers}]
    survey.questions=arr
    const MyUpdateSurvey=await survey.save()
       return res.status(200).json({success:true,
            message:`question was added successfuly`,
            data:survey
            })
    }



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
   
    const survey=await Survey.findById(_id).exec()
    if(!survey){
        return res.status(401).json({message:`There No survey with id: ${_id}`})
    }
    const question=survey.questions.find(q=>q._id==questionId)
    if(!question){
        return res.status(401).json({message:`There No question with id: ${questionId}`})
    }
    if(kind)
    {
        const kindArr=["תרשים מקלות מורכב","תרשים עוגה","גרף","היסטוגרמה"]
        const k=kindArr.find(s=>s==kind)
        if(!k)
        {
            return res.status(401).json({message:"kind are not valid"})
        }
        
         question.segmentation.kind=kind
    }
    if(choose)
        {
        
            const chooseArr=["גיל","מגדר","מגזר"]
            const c=chooseArr.find(s=>s==choose)
            if(!c)
            {
                return res.status(401).json({message:"choose are not valid"})
            }
            
            question.segmentation.choose=choose
        }  
    if(note)
    {
        question.segmentation.note=note
    }
    const MyUpdateSurvey=await survey.save()
    return res.status(200).json({success:true,message:`${survey.title} updated`})
    
}

module.exports={addQuestion,deleteQuestion,updateQuestion,chooseSeg}

