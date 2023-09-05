const express = require('express')
const { getData,postData,deleteData,updateData } = require('../Controllers/backendRoadmapController')
const router = express.Router()

//posting data
router.post('/',postData)
//getting data
router.delete('/:id',deleteData)
//getti  all data
router.get('/',getData)
//update
router.patch('/:id',updateData)

module.exports = router