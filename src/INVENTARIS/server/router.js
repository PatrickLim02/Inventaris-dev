var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = express.Router()
var cabang = require('./routes/Cabang')
var department = require('./routes/department')
var user = require('./routes/user')
var vendor = require('./routes/vendor')
var login = require('./routes/Login')

var tokenGenerator = require('./routes/TokenGenerator')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*') // Token
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    if (req.method === "OPTIONS") {
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token')
        return res.status(200).json({})
    }
    next()
})


app.use('/tokengenerator', tokenGenerator)
app.use('/cabang', cabang) // Pakai file cabang.js untuk handle endpoint /cabang
app.use('/department', department) 
app.use('/user', user) 
app.use('/vendor', vendor) 
app.use('/login', login) 



app.listen(8000, (req, res) => {
    console.log('Server is Running on Port 8000')
})