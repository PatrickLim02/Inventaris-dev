var express = require('express')
let router = express.Router()
var mysql = require('../database')
var server = new mysql()
var jwt = require('jsonwebtoken')
const verifyToken = require('../TokenValidation')



router
    .route('/') //endpoint /vendor
    .get((req, res) => {
        var paramQuery = Object.entries(req.query)
        var paramObject = paramQuery[0]
        var query = paramObject ? `select * from vendor where ${paramObject[0]} like '%${paramObject[1]}%'` : 'Select * from vendor limit 5'
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
        var query = "Select * from vendor where id = " + id
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
    .get((req, res) =>{
        var nama_vendor = req.query.nama_vendor
        var limit = req.query.limit || ''
        var query = `select * from vendor where nama_vendor like '%${nama_vendor}%' limit ${limit} `;
        server.query(query, (err, rows) =>{
            if (err) {
                res.json({err, rows})
            }
            res.status(200).json({
                status:200,
                data: rows
            })
        })
     
    })


router
    .route('/create')
    .post((req, res) => {
        var data = {  //Ini diusahakan harus sama dengan kolom di database
            nama_vendor: req.body.nama_vendor || '',
            alamat: req.body.alamat || '',
            status: req.body.status || '',
            telepon: req.body.telepon || ''
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
            server.query("INSERT INTO vendor SET ? ", data, (err, result) => {
                res.status(200).json({ // Untuk return value dari hasil submit
                    status: result,
                    data: data,
                    message: 'Data Berhasil Ditambahkan'
                })
                
            })
    })

router
    .route('/edit')
    .post((req, res)=>{
            var data = {
                id: req.body.id,
                nama_vendor: req.body.nama_vendor,
                alamat: req.body.alamat,
                status: req.body.status,
                telepon: req.body.telepon
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
            var query = "UPDATE cabang SET kode = '" + data.kode + "', nama_vendor = '" + data.nama_vendor + "', alamat = '" + data.alamat + "', status = " + data.status + " where id = " + data.id
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
                        message: 'Berhasil Melakukan Update Data Vendor ' + data.nama_vendor,
                        data: data
                    })
                }
            }) 
    })

router
    .route('/delete/:id')
    .get((req, res)=>{      
            var id = req.params.id
            var query = "Delete From vendor Where id = " + id        
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