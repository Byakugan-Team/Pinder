const express = require('express')
const router = express.Router();
const UserHandlers = require('../Handlers/UserController')



router.get('/getall',UserHandlers.GetallUsere)
router.patch('/:id', UserHandlers.updateUser)


module.exports = router;