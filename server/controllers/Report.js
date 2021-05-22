const connection = require('../Database')

module.exports={
    ReportUser: (reporter,reported)=>{
        return new Promise((resolve,reject)=>{
            connection.query('INSERT INTO `reports` (`id_reporter`, `id_reported`) VALUES (?,? )',
            [reporter,reported],
            (err,result)=>{
                console.log(result)
                if(err) return reject(err)
                return resolve(result)
            })
        })
    },

}