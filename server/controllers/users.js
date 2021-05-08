const connection = require('../Database')
const axios = require('axios')
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
            axios.get('http://api.positionstack.com/v1/reverse?access_key='+process.env.positionstack_API+'&query='+user.location.coords.latitude+','+ user.location.coords.longitude)
            .then((result)=>{
                connection.query(`INSERT INTO users (phone_num,e_mail,first,last,biography,photo,city,latitude,longitude,notifications_Token) VALUES (?,?,?,?,?,?,?,?,?,?) `, 
                [user.number,  user.email, user.firstname, user.lastname, '',user.photo ,result.data.data[0].region ,user.location.coords.latitude , user.location.coords.longitude,user.notifications_Token ], (err, result)=> {
                    err ? reject(err) : resolve(result)
                    return
                })
                
            })
            .catch((err)=>{
                console.log(err)
                connection.query(`INSERT INTO users (phone_num,e_mail,first,last,biography,photo,notifications_Token) VALUES (?,?,?,?,?,?,?) `, 
                [user.number,  user.email, user.firstname, user.lastname, '',user.photo,user.notifications_Token ], (err, result)=> {
                    err ? reject(err) : resolve(result)
                    return
                })
            })
               
        }) 
    },
    UserExist:(email='', phone='', id='')=>{
        return new Promise((resolve,reject)=>{
            if(email == "" && phone == ""){
                console.log(id)
                connection.query('select * from users where id=?',
                [id],
                (err,result)=>{
                    console.log(result)
                    if(err || result.length == 0) return reject(err)
                    
                    return resolve(result)
                })
            } else {
            connection.query('select * from users where e_mail=? or phone_num=? or id=?',
            [email, phone, id],
            (err,result)=>{
                if(err || result.length == 0) return reject(err)
                return resolve(result)
            })}
        })
    }
}