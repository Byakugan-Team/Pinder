const controller = require('../controllers/index')




module.exports = {
    GetallUsere : (req,res)=>{
            res.status(200).send('hello ii')

    },
    updateUser:(req,res) => {
        console.log(req.body, 'hereee')
        controller.users.updateUser(req.body, req.params.id)
        .then((result)=> {
            res.status(201).send('updated')
            console.log(result)
        })
        .catch((err)=> {
            res.status(500).send(err)
        })
    }
}