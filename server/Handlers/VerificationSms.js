const client = require('twilio')(
    process.env.twilio_sid,
    process.env.twilio_Token
  );
const controllers = require('../controllers')


module.exports = {

    SendSms: (req, res)=> {
        res.header('Content-Type', 'application/json');
        const RondomCode = () =>{
            var code = '';
            while(code.length < 6){
               var digit = Math.floor(Math.random() * 10);
               code = code + digit
            } 
            return code    
        }
        
        const code = RondomCode();
        const number = req.body.number;
        console.log(number)
        client.messages
          .create({
            from: '+14704104751',
            to: number,
            body: code
          })
          .then((result) => {
            
            controllers.smsverification.addToverif(number,code)
            .then((result)=>{

              res.send(JSON.stringify({ success: true }));
            })
            .catch((err)=>{

              res.send(JSON.stringify({ success: false }));
            })
            
          })
          .catch(err => {
            controllers.smsverification.addToverif(number,code)
            .then((result)=>{
              console.log(result)
              res.send(JSON.stringify({ success: true }));
            })
            .catch((err)=>{
              console.log(err)
              res.send(JSON.stringify({ success: false }));
            })
          });
    },

    
    verifySms:(req,res)=>{
      console.log(req.body)
          controllers.smsverification.verifyCode(req.body.number,req.body.code)
          .then((result)=>{
            res.status(200).send({ success: true })
          })
          .catch((err)=>{
            res.status(200).send({ success: false })
          })
    }

}