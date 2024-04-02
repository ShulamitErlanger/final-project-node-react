const express=require("express")
const verifyJWT=require('../middleware/verifyJWT')
const verifyAdmin=require('../middleware/verifyAdmin')
//const Survey=require("../models/Survey")
const router =express.Router()
const {addSurvey,getAllSurveys,updateSurvey,getSurveyById,deleteSurvey,changeStatus,incCount}=require("../controllers/surveyController")
router.post('/add',[verifyJWT,verifyAdmin],addSurvey)
router.get('/',verifyJWT,getAllSurveys)
router.get('/id',[verifyJWT,verifyAdmin],getSurveyById)
router.put('/update',[verifyJWT,verifyAdmin],updateSurvey)
router.delete('/delete',[verifyJWT,verifyAdmin],deleteSurvey)
router.put('/status',[verifyJWT,verifyAdmin],changeStatus)
router.put('/count',verifyJWT,incCount)


module.exports=router
