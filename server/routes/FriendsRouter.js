const express = require('express')
const router = express.Router();
const FriendsHandler = require('../Handlers/FriendsHandler');



router.get('/Myfriends/:id', FriendsHandler.GetMyfriends)
router.post('/sendInvitation',FriendsHandler.SendInvitation)
router.post('/acceptInvitation',FriendsHandler.acceptInvitation)
router.post('/CheckState',FriendsHandler.checkState)
module.exports = router;