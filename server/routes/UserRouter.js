const express = require('express')
const router = express.Router();
const UserHandlers = require('../Handlers/UserHandler')
const Authenication = require('../lib/authentication')

router.get('/getall',UserHandlers.GetallUsere)
// router.patch('/', UserHandlers.updateUser)
router.post('/users',UserHandlers.CreateUser)
router.post('/users/registred',Authenication.IsRegistred)
router.post('/users/logIn',Authenication.LogIn)
router.get('/api/user',UserHandlers.GetallUsere)
router.patch('/api/user/:id', UserHandlers.updateUser)

router.patch('/:id', UserHandlers.updateUser)
router.post('/',UserHandlers.CreateUser)
router.post('/registred',Authenication.IsRegistred)
router.post('/logIn',Authenication.LogIn)

// 
router.get('/users/:id',UserHandlers.GetUser)
router.patch('/api/user/:id', UserHandlers.updateUser)
// 

module.exports = router;