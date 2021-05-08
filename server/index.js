const express = require("express")
const BodyParser = require('body-parser')
const CookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const controllers = require('./controllers/index')


const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        transport : ['websocket']
  }
});


const Routers = require('./routes/index')


app.use(cors())
app.use(BodyParser.urlencoded({ extended: true }))
app.use(BodyParser.json())

app.use(CookieParser())

app.use('/',Routers.userRouter)

app.use('/' ,Routers.petRouter)
app.use('/messages', Routers.chat_messages)

app.use('/users',Routers.userRouter)

app.use('/pets' ,Routers.petRouter)

app.use('/Friends' ,Routers.Friends)

app.use('/Notification' ,Routers.Notification)

app.use('/verifSms', Routers.verificationSms)


process.on('uncaughtException', (err) =>console.log('err',err)
)
app.on('error',(err)=>{
    console.log(err)
})

io.on('connection', (socket) => {
    console.log('user conected', socket.handshake.query.roomId)
    socket.join(socket.handshake.query.roomId);
    socket.on('chat_message.send', ({msg,senderid,receiverID}) => {
        
        
        controllers.chat_messages.AddMessage(senderid,receiverID,msg)
        console.log('message: ' + msg);
        var id = senderid
        io.to(socket.handshake.query.roomId).emit('chat_new_message',{msg,id})
      });
  });


server.listen(3000, '0.0.0.0',()=>{
    console.log('started on 3000')
})

