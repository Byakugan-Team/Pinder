const { resolve } = require('node:path');
const connection = require('../Database')


module.exports = {
    AddMessage : (senderId, receiverId, message)=>{
        return new Promise((resolve, reject)=>{
                var roomId = Math.max(receiverId, senderId).toString() + Math.min(receiverId, senderId).toString()
                connection.query('INSERT INTO chat_messages (room_id,sender_id,receiver_id,message)  Values(?,?,?,?) ORDER BY date DESC  ',
                                [roomId,senderId , receiverId, message], (err, result)=>{
                                    err ? reject(err) :  resolve(result);
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
            console.log(userID)
            connection.query('select message,sender_id,receiver_id,date , room_id from chat_messages where date IN (SELECT max(date) FROM chat_messages where sender_id=? or receiver_id=? group by room_id) order by date DESC',
                             [userID, userID], (err, result)=> {
                                 console.log(result)
                                 err ? reject(err) :  resolve(result);
                             });
                        })
    },
};