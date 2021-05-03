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
    GetAll: (id_user)=>{
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * from pets INNER JOIN pets_pictures where pets.user_id=? and pets_pictures.pet_id=pets.id',
            [id_user],
            (err,result)=>{
                console.log(result)
                if(err) return reject(err)
                return resolve(result)
            })
        })
    },
    createPet: (user_id,pet)=>{
        return new Promise((resolve,reject)=>{
            connection.query('INSERT INTO `pets`(`user_id`, `nickname`, `gendre`, `birth`, `category`) VALUES (?,?,?,?,?)',
            [user_id,pet.name,pet.gender,pet.birth,pet.category],
            (err,result)=>{
                if(err) return reject(err)
                console.log(result)
                connection.query('INSERT INTO `pets_pictures`(`pet_id`, `picture_link`) VALUES (?,?)',
                [1, pet.photo],
                (err,result)=>{
                    if(err) return reject(err)
                    
                    return resolve(result)
                })
            })
        })
    }    
    
}