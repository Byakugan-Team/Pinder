const express = require('express')
const router = express.Router();
const UserHandlers = require('../Handlers/UserController')



router.get('/getall',UserHandlers.GetallUsere)
router.patch('/', UserHandlers.updateUser)


module.exports = router;