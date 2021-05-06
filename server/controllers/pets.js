const connection = require('../Database')

module.exports={
    GetAllMatching: (id_user)=>{
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * from pets INNER JOIN pets_pictures where pets.user_id != ? and pets_pictures.pet_id=pets.id',
            [id_user],
            (err,result)=>{
                console.log(result)
                if(err) return reject(err)
                return resolve(result)
            })
        })
    },
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
            [user_id,pet.name,pet.gender,new Date(pet.birth),pet.category],
            (err,result)=>{
                if(err) return reject(err)
                console.log(result)
                connection.query('INSERT INTO `pets_pictures`(`pet_id`, `picture_name`) VALUES (?,?), (?,?), (?,?)',
                [result.insertId, pet.photo[0],result.insertId,pet.photo[1],result.insertId,pet.photo[2]],
                (err,result)=>{
                    if(err) return reject(err)
                    
                    return resolve(result)
                })
            })
        })
    },
    delete : (id)=>{
        return new Promise((resolve,reject)=>{
            connection.query('DELETE from pets Where id = ?',[id],
            (err,result)=>{
                if(err) return reject(err)
                return resolve(result)
            })
        })
    } 
    
}