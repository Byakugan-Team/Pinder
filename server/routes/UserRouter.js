const express = require('express')
const router = express.Router();
const UserHandlers = require('../Handlers/UserHandler')
const Authenication = require('../lib/authentication')


// router.patch('/', UserHandlers.updateUser)
router.post('/',UserHandlers.CreateUser)
router.post('/registred',Authenication.IsRegistred)
router.post('/logIn',Authenication.LogIn)
router.patch('/api/user/:id', UserHandlers.updateUser)

router.patch('/:id', UserHandlers.updateUser)
router.post('/',UserHandlers.CreateUser)
router.post('/registred',Authenication.IsRegistred)
router.post('/logIn',Authenication.LogIn)

// 
router.get('/:id',UserHandlers.GetUser)
router.patch('/api/user/:id', UserHandlers.updateUser)
// 

module.exports = router;