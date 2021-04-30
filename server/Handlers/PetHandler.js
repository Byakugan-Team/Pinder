const controller = require('../controllers/index')




module.exports = {
    GetallPets : (req,res)=>{
            res.status(200).send('lilaaaa')

    },
    updatePet:(req,res) => {
        console.log(req.body, 'okiiii')
        controller.pets.updatePet(req.body, req.params.id)
        .then((result)=> {
            res.status(201).send('updated')
            console.log(req.body)
        })
        .catch((err)=> {
            res.status(500).send(err)
        })
    }
}