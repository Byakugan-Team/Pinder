const controllers = require('../controllers')

const crypto = require('crypto')

var RandomString = (length)=>{
    return crypto.randomBytes(length).toString('hex');
  }

module.exports = {
    IsRegistred : (req,res,next)=>{
        controllers.users.UserExist(req.body.email,req.body.phone)
        .then((result)=>{
            var token = RandomString(32)
           controllers.sessions.CreateSession(result[0].id,token)
           .then((result)=>{
            res.status(200).send({registred:true,token})
           })
           .catch((err)=>{
               console.log(err)
               res.status(500).send({registred:false})
           })
            
        })
        .catch(()=>{
            res.status(200).send({registred:false})
        })
    },
    LogIn : (req,res)=>{
        controllers.sessions.VerifySession(req.body.token)
        .then((result)=>{
            controllers.users.UserExist('','',result[0].id_user)
            .then((result_user)=>{
                res.status(200).send({success:true,user:result_user[0]})
            })
            .catch((err)=>{
                res.status(200).send({success:false})
            })
            
        })
        .catch((err)=>{
            console.log(err)
            res.status(200).send({success:false})
        })
    }
    
}