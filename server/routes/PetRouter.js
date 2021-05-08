const express = require('express')
const router = express.Router();
const PetHandlers = require('../Handlers/PetHandler');


router.patch('/pets/:id', PetHandlers.updatePet)
const PetHandlers = require('../Handlers/PetHandlers');



router.patch('/:id', PetHandlers.updatePet)
router.get('/GetAll/:id',PetHandlers.GetAllByUserID)
router.get('/GetAllMatching/:id',PetHandlers.GetAllPets)
router.post('/:UserId',PetHandlers.addpet)
router.delete('/:id',PetHandlers.deletePet)
router.get('/like/:id',PetHandlers.Likepet)

module.exports = router;