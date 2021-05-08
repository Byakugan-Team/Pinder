const connection = require('../Database')
const axios = require('axios')
const userscontroller = require('./users')
module.exports={
    GetNotifications : (id)=>{
        return new Promise ((resolve,reject) => {
                        connection.query(`Select *  FROM Notifications  INNER JOIN users Where Notifications.user_id=? and users.id = Notifications.Friend_id`, 
                            [id], (err, result)=> {
                                if(err){
                                    reject(err)
                                    return
                                }
                                resolve(result)
                            })
                    })
    },
    sendNotification : (id)=>{
        
        connection.query(`Select *  FROM Notifications  where id=?`, 
        [id], (err, result)=> {
            if(err){
                console.log(err)
                return
            }
            console.log('result ',result)
            userscontroller.UserExist('','',result[0].user_id)
            .then((receiver)=>{
                userscontroller.UserExist('','',result[0].Friend_id)
                .then((sender)=>{

                    var message = {
                        to: receiver[0].notifications_Token,
                        sound: 'default',
                        title: 'Pinder',
                        body: sender[0].first + ' ' + sender[0].last +' Sent you an invitation',
                        data: { someData: 'goes here' }
                    }
                    console.log('message ',message)
                    axios.post('https://exp.host/--/api/v2/push/send',message)
                    .then((result)=>{
                        console.log(result.data)
                    })
                    .catch((err)=>{
                        console,log(err)
                    })
                })
                .catch((err)=>{
                    console.log(err)
                    return
                })
            })
            .catch((err)=>{
                console.log(err)
                return
            })
        })
    }

}