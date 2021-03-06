var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = express.Router()
var cabang = require('./routes/Cabang')
var department = require('./routes/department')
var user = require('./routes/user')
var barang = require('./routes/barang')
var vendor = require('./routes/vendor')
var login = require('./routes/Login')

var pembelian = require('./routes/Pembelian')
var multer = require('multer')

var tokenGenerator = require('./routes/TokenGenerator')
var uploadImage = require('./routes/UploadImages')
var uploadMusic = require('./routes/UploadMusic')

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
app.use('/images', express.static('./images')) // mau compare file yang ada di folder images (local disk)
app.use('/music', express.static('./music'))


app.use('/tokengenerator', tokenGenerator)
app.use('/cabang', cabang) // Pakai file cabang.js untuk handle endpoint /cabang
app.use('/department', department) 
app.use('/user', user) 
app.use('/barang', barang) 
app.use('/vendor', vendor) 
app.use('/userlogin', login) 
app.use('/pembelian', pembelian) 

app.use('/files', uploadImage)
app.use('/music', uploadMusic)



app.listen(8000, (req, res) => {
    console.log('Server is Running on Port 8000')
})