var express = require('express')
let router = express.Router()
var mysql = require('../database')
var server = new mysql()
var multer = require('multer')
var jwt = require('jsonwebtoken')

const verifyToken = require('../TokenValidation')


var storageFile = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, './images')
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now() + file.originalname)
    }
})
var uploads = multer({storage: storageFile})

router
    .route('/submit')
    .post(uploads.single('fileImage'),(req,res)=>{
        console.log('req:' , req)
    var gallery = {
        images: req.file.filename, //images -> nama kolom di database
        namafile: req.body.namafile
    }
    console.log(gallery)
    server.query('Insert into image SET ?', gallery, (err, result) =>{
        if(err){
            res.status(400).json({
                status: 400,
                message: err
            })
        }
        else{
            res.status(200).json({
                status: 200,
                message: result
            })
        }
    })
    console.log('berhasil simpan data ke local')
})

router
    .route('/getFile')
    .get((req, res) =>{
        const query = "select * from image"
        server.query(query, (err, rows) =>{
            try{
                if(err){
                    res.status(400).json({
                        status: 400,
                        message: err
                    })
                }
                else{
                    res.status(200).json({
                        status: 200,
                        data: rows
                    })
                }
            }
            catch{
                console.log('Failed to Fetch Data')
            }
        })
    })

module.exports = router