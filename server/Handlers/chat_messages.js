const controllers = require('../controllers/index')


module.exports = {
    getallmessages : (req,res)=>{
        controllers.chat_messages.GetAllMessages(req.body.myid, req.body.friendid)
        .then((result)=>{
            res.status(200).send(result)
        }).catch((err)=>{
            console.log(err)
            res.status(500).send(err)
        })
    },

    getMessageList: (req,res)=>{
        controllers.chat_messages.GetMessageList(req.body.myID)
        .then((result)=>{
            res.status(200).send(result)
        }) .catch((err)=>{
            console.log(err)
            res.status(500).send(err)
        })
    },   
}