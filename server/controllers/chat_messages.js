const connection = require('../Database')


module.exports = {
    AddMessage : (senderId,receiverId,message)=>{
        return new Promise((resolve,reject)=>{
                var roomId = Math.max(receiverId,senderId).toString() + Math.min(receiverId,senderId).toString()
                connection.query('INSERT INTO chat_messages (room_id,sender_id,receiver_id,message)  Values(?,?,?,?) ORDER BY date DESC  ',
                [roomId,senderId,receiverId,message],
                (err,result)=>{
                    if(err) return reject(err)
                    return resolve(result)
                })
        })
    },
    GetAllMessages:(Myid,friendId)=>{
        return new Promise((resolve,reject)=>{
            console.log(Myid)
            var roomId = Math.max(Myid,friendId).toString() + Math.min(Myid,friendId).toString()
            console.log(roomId)
            connection.query('select * from chat_messages where room_id=?',
            [roomId],
            (err,result)=>{
                if(err) return reject(err)
                    return resolve(result)
            })
        })
    }
}