const express = require('express')
const router = express.Router();
const Reporthandler = require('../Handlers/Report');


router.post('/',Reporthandler.Report)

module.exports = router;