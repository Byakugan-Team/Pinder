const express = require('express')
const router = express.Router();
const PetHandlers = require('../Handlers/PetHandlers');



router.patch('/:id', PetHandlers.updatePet)


module.exports = router;