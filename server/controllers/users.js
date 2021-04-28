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
    CreateUser : (user) => {
        return new Promise ((resolve,reject) => {
            connection.query(`INSERT INTO users (phone_num,e_mail,first,last,biography,photo) VALUES (?,?,?,?,?,?) `, 
                [user.number,  user.email, user.firstname, user.lastname, '',user.photo ], (err, result)=> {
                    err ? reject(err) : resolve(result)
                    return
                })
        })
    },
    UserExist:(email='',phone='',id='')=>{
        return new Promise((resolve,reject)=>{
            connection.query('select * from users where e_mail=? or phone_num=? or id=?',
            [email,phone,id],
            (err,result)=>{
                if(err || result.length == 0) return reject(err)
                return resolve(result)
            })
        })
    }
}