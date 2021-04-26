const express = require("express")
const BodyParser = require('body-parser')
const CookieParser = require('cookie-parser')
const cors = require('cors')
const connection = require('./database/index')

const Routers = require('./routes/index')
const app = express()

app.use(cors())
app.use(BodyParser.urlencoded({ extended: true }))
app.use(BodyParser.json())

app.use(CookieParser())

app.use('/users',Routers.userRouter)

app.use('/verifSms', Routers.verificationSms)


app.listen(3000, '0.0.0.0',()=>{
    console.log('started on 3000')
})