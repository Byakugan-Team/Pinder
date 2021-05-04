const controller = require('../controllers/index')




module.exports = {
    updatePet:(req,res) => {
        console.log(req.body, 'okiiii')
        controller.pets.updatePet(req.body, req.params.id)
        .then((result)=> {
            res.status(201).send('updated')
        })
        .catch((err)=> {
            res.status(500).send(err)
        })
    }
}