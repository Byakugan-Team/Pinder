const controller = require('../controllers/index')




module.exports = {
    updatePet:(req,res) => {
        console.log(req.body, 'okiiii')
        controller.pets.updatePet(req.body, req.params.id)
        .then((result)=> {
            res.status(201).send('updated')
         })
        .catch((err)=> {
            res.status(500).send(err)
        })
    },


    GetAllPets:(req,res)=>{
        controller.pets.GetAllMatching(req.params.id)
        .then((result)=>{
            var respond = []
            for(var i=0 ; i<result.length;i++){
                var found = false
                for(j=0;j<respond.length;j++){
                    if(respond[j].pet_id == result[i].pet_id){
                        found = true
                        if(result[i].picture_name != null && result[i].picture_name[0] == 'h'){
                            respond[j].Pictures.push(result[i].picture_name)
                        }
                    }
                }
                if(!found){
                    respond.push(result[i])
                    respond[respond.length-1].Pictures= [result[i].picture_name]
                }
            }
            res.status(200).send(respond)
            
        })
        .catch((err)=> res.status(500).send(err))
    },


    GetAllByUserID:(req,res)=>{
            controller.pets.GetAll(req.params.id)
            .then((result)=>{
                var respond = []
                for(var i=0 ; i<result.length;i++){
                    var found = false
                    for(j=0;j<respond.length;j++){
                        if(respond[j].pet_id == result[i].pet_id){
                            found = true

                            if(result[i].picture_name != null && result[i].picture_name[0] == 'h'){
                                respond[j].Pictures.push(result[i].picture_name)
                            }
                            
                        }
                    }
                    if(!found){
                        respond.push(result[i])
                        respond[respond.length-1].Pictures= [result[i].picture_name]
                    }
                }
                res.status(200).send(respond)
                
            })
            .catch((err)=> res.status(500).send(err))
    },


    addpet:(req,res)=>{
            console.log(req.body)
            controller.pets.createPet(req.params.UserId,req.body)
            .then((result)=>{
                res.status(200).send({success:true})
            })
            .catch((err)=> {
                console.log(err)
                res.status(500).send(err)})
    },


    deletePet:(req,res)=>{
        console.log('delete')
        controller.pets.delete(req.params.id)
        .then((result)=>{
            console.log(result)
            res.status(200).send({success:true})
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).send({success:false})
        })
    },
    Likepet : (req,res)=>{
            controller.pets.increaseLike(req.params.id)
            .then((result)=>{
                res.status(200).send({success:true})
            })
            .catch((err)=>{
                res.status(200).send({success:false})
            })
    }
}