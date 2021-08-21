var express = require('express')
const jwt = require('jsonwebtoken')
let router = express.Router();
var mysql = require('../database')
var server = new mysql()

router
    .route('/')
    .post((req, res) =>{
        //mock user data
        const user = {
            id:1,
            username: 'patrick',
            email: 'patricklim@gmail.com'
        }
        jwt.sign({user}, 'secretkey', (err, token) =>{
            res.status(200).json({
                token // send generated token to clients
            })
        })
    })

module.exports = router;