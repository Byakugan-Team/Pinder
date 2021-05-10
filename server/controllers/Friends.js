const connection = require('../Database')
const controllers = require('./users')
const controllersNotifications = require('./Notifications')
module.exports={
        GetUserFriends : (id)=>{
            return new Promise ((resolve,reject) => {
                            connection.query(`Select *  FROM Friends  INNER JOIN users where (Friends.userOne=? or Friends.userTwo=?) and ((users.id=Friends.userOne and  Friends.userOne != ?) or (users.id=Friends.userTwo and  Friends.userTwo != ?)) `, 
                                [id,id,id,id], (err, result)=> {
                                    if(err){
                                        reject(err)
                                        return
                                    }
                                    resolve(result)
                                })
                        })
        },
        AddInvitation:(sender,receiver)=>{
            return new Promise ((resolve,reject) => {
                
                            connection.query(`INSERT INTO invitations (sender,receiver) VALUES (?,?) `, 
                                [sender,receiver], (err, result)=> {
                                    if(err) {
                                        reject(err)
                                        return
                                    }
                                    connection.query('INSERT INTO `Notifications`( `user_id`, `Friend_id`, `content`, `photo`) VALUES (?,?,?,?)', 
                                    [receiver,sender,'Sent you an Invitation',''], (err, result)=> {
                                        if(err) {
                                            reject(err)
                                            return
                                        }
                                        controllersNotifications.sendNotification(result.insertId)
                                       resolve(result)
                                })
                        })
                    })
        },
        AcceptInvitation:(sender,receiver)=>{
            return new Promise ((resolve,reject) => {
                
                connection.query(`DELETE FROM invitations where sender=? and receiver=? `, 
                    [sender,receiver], (err, result)=> {
                        if(err) {
                            reject(err)
                            return
                        }
                        connection.query(`INSERT INTO Friends (userOne,userTwo) VALUES (?,?) `, 
                        [sender,receiver], (err, result)=> {
                            if(err) {
                                reject(err)
                                return
                            }
                               resolve(result)
                        })
                    })
            })

        },
        CheckUserState:(Myuserid,Friend_id)=>{
            return new Promise ((resolve,reject) => {
                connection.query(`Select *  FROM Friends  INNER JOIN users where (Friends.userOne=? or Friends.userTwo=?) and ((users.id=Friends.userOne and  Friends.userOne != ?) or (users.id=Friends.userTwo and  Friends.userTwo != ?)) `, 
                    [Myuserid,Myuserid,Myuserid,Myuserid], (err, result)=> {
                        if(err){
                            reject(err)
                            return
                        }
                        var found = false
                        for(var i=0;i<result.length;i++){
                            if(result[i].id == Friend_id){
                                found = true
                            }
                        }
                        if(found){
                            resolve({state:'friends'})
                            return
                        }
                        connection.query(`select * FROM invitations where sender=? or receiver=? `, 
                          [Friend_id,Friend_id], (err, resultinvit)=> {
                                if(err) {
                                    reject(err)
                                   
                                    return
                                }
                                
                                if(resultinvit.length>0 ){
                                    if(resultinvit[0].receiver == Myuserid){
                                        resolve({state:'receiverInvit'})
                                        return
                                    }
                                    if(resultinvit[0].sender == Myuserid){
                                        resolve({state:'senderInvit'})
                                        return
                                    }
                                   return
                                }
                                resolve({state:'nothing'})
                                
                            }   
                        )
                    })
            })
        }
}