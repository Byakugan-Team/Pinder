const client = require('twilio')(
    'AC9596a43f62f74f39b3528854942d3b85',
    '7894400437b2cf01af40c003b6493228'
  );

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
        console.log("req.body", req.body)
        const code = RondomCode();
        const number = req.body.number;
        console.log("number",number)
        client.messages
          .create({
            from: '+14704104751',
            to: number,
            body: code
          })
          .then(() => {
            res.send(JSON.stringify({ success: true }));
          })
          .catch(err => {
            console.log("err",err);
            res.send(JSON.stringify({ success: false }));
          });
    }

}