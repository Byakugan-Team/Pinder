const express = require('express')
const router = express.Router();
const PetHandlers = require('../Handlers/PetHandler');


router.patch('/pets/:id', PetHandlers.updatePet)


module.exports = router;