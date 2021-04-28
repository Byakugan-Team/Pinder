const connection = require('../Database')

module.exports = {
    CreateSession : (id,token)=>{
        
        return new Promise ((resolve,reject) => {
-
            connection.query(`INSERT INTO sessions (id_user,token) VALUES (?,?) `, 
                [id,token], (err, result)=> {
                    err ? reject(err) : resolve(result)
                    return
                })
        })
    },
    VerifySession : (token)=>{
        return new Promise ((resolve,reject) => {
-
            connection.query(`Select *  FROM sessions where token=?`, 
                [token], (err, result)=> {
                    (err || result.length == 0 ) ? reject(err || 'wrong token' ) : resolve(result)
                    return
                })
        })
    }
}