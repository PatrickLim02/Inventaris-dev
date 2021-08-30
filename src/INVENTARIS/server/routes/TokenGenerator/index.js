var express = require('express')
const jwt = require('jsonwebtoken')
let router = express.Router();
var mysql = require('../database')
var server = new mysql()

router
    .route('/')
    .post((req, res) =>{
        //mock user data
        console.log('body: ', req.body)
        const user = {
            username: req.body.username,
            password: req.body.password
        }
        jwt.sign({user}, 'secretkey', (err, token) =>{ // 'secretkey' dipakai di setiap endpoint yang mau pakai access token
            res.status(200).json({
                token // send generated token to clients
            })
        })
    })

module.exports = router;