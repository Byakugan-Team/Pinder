const controller = require('../controllers/index')
const authenication = require('../lib/authentication')



module.exports = {
    GetUser : (req,res)=>{
            controller.users.UserExist('', '' ,req.params.id)
            .then((result)=>{
                res.status(200).send({success:true, user:result[0]})
            })
            .catch((err)=>{
                console.log(err)
                res.status(500).send({success: false})
            })

    },
    updateUser:(req,res) => {
        controller.users.updateUser(req.body, req.params.id)
        .then((result)=> {
            res.status(201).send('updated')
        })
        .catch((err)=> {
            res.status(500).send(err)
        })
    },
    CreateUser:(req,res)=>{
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