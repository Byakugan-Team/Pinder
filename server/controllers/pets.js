const connection = require('../Database')

module.exports={
    updatePet : (pet, id)=> {
        return new Promise ((resolve,reject) => {
            connection.query(`UPDATE pets SET nickname=?, gendre=? , birth=?, category=? WHERE id=? `, 
                [pet.nickname,  pet.gendre, pet.birth, pet.category, id ], (err, result)=> {
                    err ? reject(err) : resolve(result)
                })
        })
    },
    
    
}