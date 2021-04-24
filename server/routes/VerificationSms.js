const express = require('express')
const router = express.Router();
const Verification = require('../Handlers/VerificationSms')



router.post('/send',Verification.SendSms)



module.exports = router;