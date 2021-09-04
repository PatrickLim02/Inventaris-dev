var express = require('express')
let router = express.Router()
var mysql = require('../database')
var server = new mysql()
var jwt = require('jsonwebtoken')
const verifyToken = require('../TokenValidation')


router
    .route('/') //endpoint /cabang 
    .get((req, res) => {
        var paramQuery = Object.entries(req.query)
        var paramObject = paramQuery[0]
        var query = paramObject ? `select * from user_login where ${paramObject[0]} like '%${paramObject[1]}%'` : 'Select * from user_login limit 5'
        server.query(query, (err, rows) => {
            if (err) {
                res.status(400).json({
                    status: 400,
                    message: err
                })
            }
            res.status(200).json({
                status: 200,
                data: rows,
            })
        })
    })

router
    .route('/verifylogin') //endpoint /login
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
    })


    router
    .route('/create')
    .post((req, res) => {
        var data = {  //Ini diusahakan harus sama dengan kolom di database
            nama_lengkap: req.body.nama_lengkap || '',
            username: req.body.username || '',
            password: req.body.password || '',
        }

        console.log(data)
        for (var i = 0; i <= Object.keys(data).length; i++) {
            const keys = Object.keys(data)[i]
            const values = Object.values(data)[i]
            if (values === '') {
                res.status(400).json({
                    status: 400,
                    message: `field ${keys.replace('_', ' ')} tidak boleh kosong`
                })
                return ''; // Agar code tidak lanjut kebawah
            }
        }
        server.query("INSERT INTO user_login SET ? ", data, (err, result) => {
            res.status(200).json({ // Untuk return value dari hasil submit
                status: result,
                data: data,
                message: 'Data Berhasil Ditambahkan'
            })

        })
    })


    router
    .route('/detail/:id')
    .get((req, res) => {
        var id = req.params.id
        var query = "Select * from user_login where id = " + id
        server.query(query, (err, rows) => {
            if (err) {
                res.status(400).json({
                    status: 400,
                    message: err
                })
            }
            res.status(200).json({
                status: 200,
                data: rows[0]
            })
        })
    })

    router
    .route('/edit')
    .post((req, res) => {
        var data = {
            id: req.body.id,
            nama_lengkap: req.body.nama_lengkap,
            username: req.body.username,
            password: req.body.password
        }

        // validasi untuk agar field tidak boleh kosong
        for (var i = 0; i <= Object.keys(data).length; i++) {
            const keys = Object.keys(data)[i]  // nama kolom database
            const values = Object.values(data)[i] // value kolom
            if (values === '') {
                res.status(400).json({
                    status: 400,
                    message: `field ${keys.replace('_', ' ')} tidak boleh kosong`
                })
                return ''; // Agar code tidak lanjut kebawah
            }
        }
        var query = "UPDATE user_login SET nama_lengkap = '" + data.nama_lengkap + "', username = '" + data.username + "', password = '" + data.password + "' where id = " + data.id
        server.query(query, (err, result) => {
            if (err) {
                res.json({
                    status: 400,
                    data: err
                })
            }
            else {
                res.json({
                    status: 200,
                    message: 'Berhasil Melakukan Update Data User Login ' + data.nama_lengkap,
                    data: data
                })
            }
        })
    })



    module.exports = router