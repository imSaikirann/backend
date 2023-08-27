const express = require('express')
const router = express.Router()
const { UserLogin,UserSignin} = require('../Controllers/userController')

router.post('/login',UserLogin)

router.post('/signup',UserSignin)

  

  
  
   
  
  
  
  
module.exports = router