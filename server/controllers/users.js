const connection = require('../Database')

module.exports={
    updateUser : (user, id)=> {
        return new Promise ((resolve,reject) => {
            connection.query(`UPDATE users SET e_mail=?, first=? , last=?, biography=?, photo=? WHERE id=? `, 
                [user.e_mail,  user.first, user.last, user.biography, user.photo, id ], (err, result)=> {
                    err ? reject(err) : resolve(result)
                })
        })
    },
    
    
}