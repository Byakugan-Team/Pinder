const express = require("express")
const BodyParser = require('body-parser')
const CookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
  }
});


const Routers = require('./routes/index')


app.use(cors())
app.use(BodyParser.urlencoded({ extended: true }))
app.use(BodyParser.json())

app.use(CookieParser())

app.use('/users/:id',Routers.userRouter)

app.use('/pets/' ,Routers.petRouter)

app.use('/verifSms', Routers.verificationSms)

app.use('/', (req, res) => {
    res.send('helli')
})


process.on('uncaughtException', (err) =>console.log('hey',err)
)
app.on('error',(err)=>{
    console.log(err)
})

io.on('connection', (socket) => {
    console.log('user conected')
    socket.on('chat_message.send', ({msg,id}) => {
        console.log('message: ' + msg);
        io.emit('chat_new_message',{msg,id})
      });
  });

server.listen(3000, '0.0.0.0',()=>{
    console.log('started on 3000')
})

