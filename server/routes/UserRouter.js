const express = require('express')
const router = express.Router();
const UserHandlers = require('../Handlers/UserController')



router.get('/',UserHandlers.GetallUsere)



module.exports = router;