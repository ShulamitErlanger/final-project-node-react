const express=require("express")
const {addUser,getAllUsers,updateUser,getUserById,deleteUser,addSurvey}=require("../controllers/userController")
const verifyJWT=require('../middleware/verifyJWT')
const verifyAdmin=require('../middleware/verifyAdmin')
const router =express.Router()
router.post("/add",verifyJWT,addUser)
router.get("/",[verifyJWT,verifyAdmin],getAllUsers)
router.get("/id",verifyJWT,getUserById)
router.put("/update",verifyJWT,updateUser)
router.delete("/delete",verifyJWT,deleteUser)
router.put('/survey',verifyJWT,addSurvey)
//router.delete("/delete/:id",userController.deleteUser)
module.exports=router