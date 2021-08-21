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
        var query = paramObject ? `select * from user where ${paramObject[0]} like '%${paramObject[1]}%'` : 'Select * from user limit 5'
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
    .route('/detail/:id')
    .get((req, res) => {
        var id = req.params.id
        var query = "Select * from user where id = " + id
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
    .route('/search')
    .get((req, res) => {
        var nama_user = req.query.nama_user
        var cabang = req.query.cabang
        var department = req.query.department
        var limit = req.query.limit || ''
        var query = "";
        console.log(req.query)
        if (cabang === '' && department !== '') { // kalau cabang kosong, department berisi
            query = `Select * from user where nama_user like '%${nama_user}%' and department = '${department}' ${limit === '' ? '' : `limit ${limit}`}`
        }
        else if (department === '' && cabang !== '') { // kalau cabang berisi, department kosong
            query = `Select * from user where nama_user like '%${nama_user}%' and cabang = '${cabang}' ${limit === '' ? '' : `limit ${limit}`}`
        }
        else if (cabang === '' && department === '') { // kalau cabang kosong, department kosong
            query = `Select * from user where nama_user like '%${nama_user}%' ${limit === '' ? '' : `limit ${limit}`}`
        }
        else if (cabang !== '' && department !== '') { // kalau cabang berisi, department berisi
            query = `Select * from user where nama_user like '%${nama_user}%' and department = '${department}' and cabang = '${cabang}' ${limit === '' ? '' : `limit ${limit}`}`
        }

        console.log(query)
        server.query(query, (err, rows) => {
            if (err) {
                res.json({ err, rows })
            }
            res.status(200).json({
                status: 200,
                data: rows
            })
        })

    })


router
    .route('/create')
    .post((req, res) => {
        var data = {  //Ini diusahakan harus sama dengan kolom di database
            kode_user: req.body.kode_user || '',
            nama_user: req.body.nama_user || '',
            cabang: req.body.cabang || '',
            department: req.body.department || '',
            status: req.body.status || '',

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
        server.query("INSERT INTO user SET ? ", data, (err, result) => {
            res.status(200).json({ // Untuk return value dari hasil submit
                status: result,
                data: data,
                message: 'Data Berhasil Ditambahkan'
            })

        })
    })

router
    .route('/edit')
    .post((req, res) => {
        var data = {
            id: req.body.id,
            kode_user: req.body.kode_user,
            nama_user: req.body.nama_user,
            cabang: req.body.cabang,
            department: req.body.department,
            status: req.body.status,

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
        var query = `UPDATE user set kode_user = '${data.kode_user}', nama_user = '${data.nama_user}', cabang = '${data.cabang}', department = '${data.department}', status = ${data.status} where id = ${data.id}`
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
                    message: 'Berhasil Melakukan Update Data User ' + data.nama_user,
                    data: data
                })
            }
        })
    })

router
    .route('/delete/:id')
    .get((req, res) => {
        var id = req.params.id
        var query = "Delete From user Where id = " + id
        server.query(query, (err, rows) => {
            if (err) {
                res.json({ message: err })
            }
            res.status(200).json({
                status: 200,
                data: rows[0] // agar saat panggil data tidak perlu masuk ke index [0]
            })
        })
    })

module.exports = router