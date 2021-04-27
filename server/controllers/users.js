const connection = require('../Database')

module.exports={
    updateUser : (user, id)=> {

            connection.query(`UPDATE users SET e_mail=?, first=? , last=?, biography=?, photo=? WHERE id=?`, 
                [user.e_mail,  user.first, user.last, user.biography, user.photo, id ], (err, result)=> {
                    if(err) return (err) 
                    return(result)
                })

    },
    
}