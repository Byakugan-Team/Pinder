const express = require('express')
const router = express.Router();
const UserHandlers = require('../Handlers/UserHandler')
const Authenication = require('../lib/authentication')

router.post('/users',UserHandlers.CreateUser)
router.post('/users/registred',Authenication.IsRegistred)
router.post('/users/logIn',Authenication.LogIn)
router.get('/api/user',UserHandlers.GetallUsere)
router.patch('/api/user/:id', UserHandlers.updateUser)


module.exports = router;