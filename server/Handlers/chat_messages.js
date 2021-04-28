const controllers = require('../controllers/index')


module.exports = {
    getallmessages : (req,res)=>{
        console.log(req.body)
        controllers.chat_messages.GetAllMessages(req.body.myid,req.body.friendid)
        .then((result)=>{
            console.log(result)
            res.status(200).send(result)
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).send(err)
        })
    }
}