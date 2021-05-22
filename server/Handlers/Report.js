const controller = require('../controllers/index')

module.exports = {
    Report : (req,res)=>{
        console.log('hey')
            controller.Report.ReportUser(req.body.reporter,req.body.reported)
            .then((result)=>{
                res.status(200).send({"success":true})
            })
            .catch((err)=>{
                console.log(err)
                res.status(500).send({"success":false})
            })

    },

}