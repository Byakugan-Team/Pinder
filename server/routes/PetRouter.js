const express = require('express')
const router = express.Router();
const PetHandlers = require('../Handlers/PetController');


router.get('/getall',UserHandlers.GetallPets)
router.patch('/', PetHandlers.updatePet)


module.exports = router;