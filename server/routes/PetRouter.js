const express = require('express')
const router = express.Router();
const PetHandlers = require('../Handlers/PetHandlers');



router.patch('/:id', PetHandlers.updatePet)
router.get('/GetAll/:id',PetHandlers.GetAllByUserID)
router.post('/:UserId',PetHandlers.addpet)
module.exports = router;