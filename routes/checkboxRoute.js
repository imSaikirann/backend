const express = require('express');
const router = express.Router();
const { updateUser } = require('../Controllers/userCheckboxData');

router.patch('/:userId', updateUser);

module.exports = router;
