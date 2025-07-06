
const{registerUser,loginUser,currentUser,allUsers,deleteUser,getLoggedUser,updateLoggedUser} = require('../controllers/userController');
const { validateToken }= require( '../Middlewares/validateToken');

const express = require ('express');
const router= express.Router();

router.post("/register",registerUser)

router.post("/login",loginUser)


router.get("/currentusers", validateToken,currentUser)

router.get("/allusers",validateToken, allUsers)
router.delete("/deleteuser/:id", deleteUser)

router.get('/getloggedusers/:id',getLoggedUser)
router.put('/updateloggedusers/:id',updateLoggedUser)





module.exports = router
