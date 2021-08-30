var express = require('express')
let router = express.Router()
var mysql = require('../database')
var server = new mysql()
var jwt = require('jsonwebtoken')
const verifyToken = require('../TokenValidation')

router
    .route('/') //endpoint /cabang
    .post(verifyToken, (req, res) => {
        var username = req.body.username
        var password = req.body.password
        var query = `select * from user_login where username = '${username}' and password = '${password}'`
        console.log('query: ', query)
        console.log('body: ', req.body)
        server.query(query, (err, rows) => {
           if(rows.length > 0){         
               res.status(200).json({
                   status: 200,
                   message: 'Berhasil Login',
               })
           }
           else{
               res.status(400).json({
                   status: 400,
                   message: 'Login Tidak Berhasil'
               })
           }
        })


        // jwt.verify(req.token, 'secretkey', (err, authData) => {  
        //     res.send(authData)
        //     if (err) {
        //         res.status(400).json({
        //             status: 400,
        //             message: err
        //         })
        //     }
        //     else {            
              
                
        //     }

        // })
    })


module.exports = router