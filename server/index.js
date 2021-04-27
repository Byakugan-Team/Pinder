const express = require("express")
const BodyParser = require('body-parser')
const CookieParser = require('cookie-parser')
const cors = require('cors')


const Routers = require('./routes/index')
const app = express()

app.use(cors())
app.use(BodyParser.urlencoded({ extended: true }))
app.use(BodyParser.json())

app.use(CookieParser())

app.use('/',Routers.userRouter)

app.use('/verifSms', Routers.verificationSms)
app.use('/', (req, res) => {
    res.send('hello')
})


app.listen(3000, '0.0.0.0',()=>{
    console.log('started on 3000')
})