const Survey = require("../models/Survey");
const addSurvey=async(req,res)=>{
    let {title,gender,sector,age,questions} = req.body
    console.log("add survey");
    if (!title) {
        console.log('!title');
        return res.status(400).json({message:'required field is missing'})
        }
        if(questions){
            questions.forEach(q => {
                if(!q.body)
                    return res.status(400).json({message:'required field is missing'})
                q.answers?.forEach(a=>{
                    if(!a.body)
                        return res.status(400).json({message:'required field is missing'})
                })
            });
        }
    const survey = await Survey.create({title,gender,sector,age,questions})
    if(survey){
       return res.status(201).json({success:true,
            message:`survey ${survey.title}created successfuly`,
            data:survey
            })
    }
    return res.status(401).json({message:'survey not found'})
   
}
    
const getAllSurveys=async(req,res)=>{

    const {status}=req.query
    let surveys=null
    if(status)
    {
         surveys=await Survey.find({status}).lean()
    }
    else
    {
        surveys=await Survey.find().lean()
    }

    if(!surveys)
    {
       // console.log('nooooooooooooooooooooooooooooooooooooooooooooo');
       // console.log('3');
        return res.status(401).json({message:"not found"})
    }
   // console.log(surveys[0]);
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
    const {_id,title,color,gender,sector,age,questions}=req.body
   const survey=await Survey.findById(_id).exec()
    if(!survey){
    return res.status(401).json({message:"not found"})
    }
        if(title){
            
            survey.title=title
        }
        
        if(color){
            survey.color=color;
        }
        if(gender){
            const arr=['זכר','נקבה','לא מוגבל'];
            const gender2=arr.find(s=>s==gender);
            if(!gender2){
           
            return res.status(401).json({message:"status is not valid"}) }
            survey.gender=gender
        }
        if(sector){
        const arr1=["חרדי","חילוני","דתי לאומי","מסורתי","לא משתייך",'לא מוגבל']
        const sec=arr1.find(sector=>sector==sector)
        if(!sec){console.log('!sec');
            return res.status(401).json({message:"status is not valid"})}
        survey.sector=sector
        }
        if(age)
            survey.age=age
       
        //console.log(survey.questions);

        if(questions){
            console.log('-----------------------');
           // console.log(survey.questions[0].body);
            // {console.log('88888888888888888888888');
            survey.questions=questions
            console.log(survey.questions[1]);
        //console.log(survey.questions);
        // if(questions)
        //     survey.questions=questions
        // if(newQuestions)
        //     survey.questions=[...survey.questions,newQuestions]
        console.log('---------------------------');
        //console.log(survey.questions);
        console.log(survey.questions[0]);}
        const MyUpdatesurvey=await survey.save()
        return res.status(201).json({success:true,
            message:`survey ${survey.title}updated successfuly`,
            })
    }
  

const deleteSurvey=async(req,res)=>{
    const {_id}=req.body
    const survey=await Survey.findById(_id).exec()
if(!survey){
    return res.status(401).json({message:"not found"})

    }
        await survey.deleteOne()
        return res.status(201).json({success:true,
            message:`one survey deleted successfuly`
            })
        }
        /* const {id}=req.params
    const survey=await survey.findById(id).exec()
if(!survey){
    return res.status(401).json({message:"not found"})

    }
     if(survey.id==req.survey._id){
        await survey.deleteOne()
        return res.status(201).json({success:true,
            message:`one survey deleted successfuly`
            })
        }
    return res.status(405).json({message:"unaouthorised"})*/


const changeStatus=async(req,res)=>{
    const {_id,status}=req.body
   //console.log(status);
    const survey=await Survey.findById(_id).exec()

    if(!survey){

       //console.log('!survey');

    return res.status(401).json({message:"not found"})
    }
    
    
        if(status){
            
         //   console.log(status);
            const arr1=["creating","in process","closed","completed" ]
            const s=arr1.find(s=>s==status)
            if(!s)
            {
             //   console.log('!s');

                 return res.status(401).json({message:"status is not valid"})
            }
            survey.status=status
                    
        
       
        const MyUpdatesurvey=await survey.save()
       // console.log('after');
        return res.status(201).json({success:true,
            message:`survey ${survey.title} updated successfuly`,
            })}
            else{
                return res.status(400).json({message:'no status'})
            }
    }
    const incCount=async(req,res)=>{
        const {_id}=req.body
       
        const survey=await Survey.findById(_id).exec()
    
        if(!survey){
        return res.status(401).json({message:"not found"})
        }
      
        survey.count=survey.count+1;
            
        
            const MyUpdatesurvey=await survey.save()
            return res.status(201).json({success:true,
                message:`survey ${survey.title}updated successfuly`
                })
        }
        
       
     module.exports={addSurvey,getAllSurveys,deleteSurvey,updateSurvey,getSurveyById,changeStatus,incCount}