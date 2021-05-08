const controllers = require('../controllers/index')


module.exports = {
    GetNotifications : (req,res)=>{
            controllers.Notifications.GetNotifications(req.params.id)
            .then((result)=>{
                res.status(200).send(result)

            })
            .catch((err)=>{
                console.log(err)
                res.status(500).send({err:true})
            })
    }


}