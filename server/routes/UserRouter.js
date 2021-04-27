const express = require('express')
const router = express.Router();
const UserHandlers = require('../Handlers/UserController')



router.get('/api/user',UserHandlers.GetallUsere)
router.patch('/api/user/:id', UserHandlers.updateUser)


module.exports = router;