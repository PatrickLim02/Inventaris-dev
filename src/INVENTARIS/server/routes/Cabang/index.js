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
        var query = paramObject ? `select * from cabang where ${paramObject[0]} like '%${paramObject[1]}%'` : 'Select * from cabang limit 5'
        console.log('/cabang: ', query)
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
        var query = "Select * from cabang where id = " + id
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
        var nama_cabang = req.query.nama_cabang
        var limit = req.query.limit || ''
        var query = `select * from cabang where nama_cabang like '%${nama_cabang}%' limit ${limit} `;
        console.log('search:', query)
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
            kode: req.body.kode || '',
            nama_cabang: req.body.nama_cabang || '',
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
            server.query("INSERT INTO cabang SET ? ", data, (err, result) => {
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
                kode: req.body.kode,
                nama_cabang: req.body.nama_cabang,
                alamat: req.body.alamat,
                status: req.body.status,
                telepon: req.body.telepon,
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
            var query = "UPDATE cabang SET kode = '" + data.kode + "', nama_cabang = '" + data.nama_cabang + "', alamat = '" + data.alamat + "', status = " + data.status + ", telepon = '" + data.telepon + "' where id = " + data.id
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
                        message: 'Berhasil Melakukan Update Data Cabang ' + data.nama_cabang,
                        data: data
                    })
                }
            }) 
    })

router
    .route('/delete/:id')
    .get((req, res)=>{      
            var id = req.params.id
            var query = "Delete From Cabang Where id = " + id        
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