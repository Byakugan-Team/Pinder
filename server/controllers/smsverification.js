const connection = require('../Database')

module.exports = {
    addToverif:(phone,code)=>{
        return new Promise((resolve,reject)=>{
                connection.query('INSERT INTO verification_sms (number,code) VALUES (?,?)',
                [phone,code],(err,result)=>{
                    console.log(result)
                    if(err){
                        return reject(err)
                    }
                    return resolve(result)
                })
            })
    },
    verifyCode:(phone,code)=>{
        return new Promise((resolve,reject)=>{
            console.log(phone,'  code:',code)
            connection.query('select * from verification_sms where number=? and code=?',
            [phone,code],
            (err,result)=>{
                console.log(result)
                if(err || result.length == 0) return reject()
                return resolve()
            })
        })
    }
}