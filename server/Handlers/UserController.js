const controller = require('../controllers/index')




module.exports = {
    GetallUsere : (req,res)=>{
            res.status(200).send('hello ii')

    },
    updateUser:(req,res) => {
        controller.updateUser(req.body, req.params.id)
        .then((result)=> {
            // res.status(201).send('updated')
            console.log(result)
        })
        .catch((err)=> {
            console.log(err)
        })
    }
}