const connection = require('../Database')
const axios = require('axios')
const userscontroller = require('./users')

module.exports = {
    AddMessage : (senderId, receiverId, message)=>{
        return new Promise((resolve, reject)=>{
                var roomId = Math.max(receiverId, senderId).toString() + Math.min(receiverId, senderId).toString()
                connection.query('INSERT INTO chat_messages (room_id,sender_id,receiver_id,message)  Values(?,?,?,?) ORDER BY date DESC  ',
                                [roomId,senderId , receiverId, message], (err, result)=>{
                                    err ? reject(err) :  resolve(result);
                                    userscontroller.UserExist('','',receiverId)
                                    .then((receiver)=>{
                                        userscontroller.UserExist('','',senderId)
                                        .then((sender)=>{

                                            var message = {
                                                to: receiver[0].notifications_Token,
                                                sound: 'default',
                                                title: 'Pinder',
                                                body: sender[0].first + ' ' + sender[0].last +' Sent you a Message',
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
                                });
        })
    },

    GetAllMessages:(Myid, friendId)=>{
        return new Promise((resolve, reject)=>{
            var roomId = Math.max(Myid, friendId).toString() + Math.min(Myid, friendId).toString()
            connection.query('select * from chat_messages where room_id=?',
                            [roomId],
                            (err, result)=>{
                                err ? reject(err) :  resolve(result);
                            });
                        })
    },

    GetMessageList: (userID)=> {
        return new Promise((resolve, reject)=> {
            connection.query('select message, sender_id, receiver_id, date , room_id from chat_messages where date IN (SELECT max(date) FROM chat_messages where sender_id=? or receiver_id=? group by room_id) order by date DESC',
                             [userID, userID], (err, result)=> {
                                 console.log(result)
                                 err ? reject(err) :  resolve(result);
                             });
                        })
    },
};