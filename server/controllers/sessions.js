const connection = require('../Database')

module.exports = {
    CreateSession : (id,token)=>{
        
        return new Promise ((resolve,reject) => {

            connection.query(`INSERT INTO sessions (id_user,token) VALUES (?,?) `, 
                [id,token], (err, result)=> {
                    if(err) {
                        reject(err)
                        return
                    }
                       resolve(result)
                
                })
        })
    },
    VerifySession : (token)=>{
        return new Promise ((resolve,reject) => {

            connection.query(`Select *  FROM sessions where token=?`, 
                [token], (err, result)=> {
                    if(err || result.length == 0) {
                        reject(err || 'wrong token' )
                        return
                    }
                       resolve(result)
                })
        })
    }
}