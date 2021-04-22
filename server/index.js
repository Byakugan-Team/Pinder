const express = require("express")
const BodyParser = require('body-parser')
const CookieParser = require('cookie-parser')

const Routers = require('./routes/index')
const app = express()

app.use(BodyParser.urlencoded({ extended: true }))
app.use(BodyParser.json())

app.use(CookieParser())

app.use('/users',Routers.userRouter)


app.listen(3000, '0.0.0.0',()=>{
    console.log('started on 3000')
})