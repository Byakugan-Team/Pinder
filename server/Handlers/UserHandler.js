const controller = require('../controllers/index')
const authenication = require('../lib/authentication')



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
    },
    CreateUser:(req,res)=>{
        console.log(req.body)
        controller.users.CreateUser(req.body)
        .then((result)=>{
            authenication.IsRegistred({body:{email:'',phone:req.body.number}},res)
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).send({success:false})
        })
    }
}