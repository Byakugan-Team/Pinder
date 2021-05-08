const controllers = require('../controllers/index')


module.exports = {
        GetMyfriends : (req,res)=>{
                controllers.Friends.GetUserFriends(req.params.id)
                .then((result)=>{
                    res.status(200).send(result)

                })
                .catch((err)=>{
                    console.log(err)
                    res.status(500).send({err:true})
                })
        },
        SendInvitation:(req,res)=>{
            controllers.Friends.AddInvitation(req.body.sender,req.body.receiver)
            .then((result)=>{
                res.status(200).send(result)

            })
            .catch((err)=>{
                console.log(err)
                res.status(500).send({err:true})
            })
        },
        acceptInvitation:(req,res)=>{
            controllers.Friends.AcceptInvitation(req.body.sender,req.body.receiver)
            .then((result)=>{
                res.status(200).send(result)

            })
            .catch((err)=>{
                console.log(err)
                res.status(500).send({err:true})
            })
        }

}
