const express = require('express')
const router = express.Router()
const { postTools,getTools,deleteTool } = require('../Controllers/devToolsController')

router.post('/',postTools)
router.get('/',getTools)
router.delete('/:id',deleteTool)



module.exports = router