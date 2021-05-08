const express = require('express')
const router = express.Router();
const NotificationsHandler = require('../Handlers/NotificationsHandler');

router.get('/:id', NotificationsHandler.GetNotifications)

module.exports = router;