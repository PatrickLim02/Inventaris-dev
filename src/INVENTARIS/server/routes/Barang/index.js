var express = require('express')
let router = express.Router()
var mysql = require('../database')
var server = new mysql()
var jwt = require('jsonwebtoken')
const verifyToken = require('../TokenValidation')



router
    .route('/') //endpoint /barang
    .get(verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretkey', (err, autData) => {
            if (typeof autData === 'undefined') { // Jika autdata  ==== undefined . typeof mengubah fungsi sehingga jadi string
                try {
                    if (err.message.includes('expired')) {
                        res.status(401).json({
                            status: 401,
                            message: err
                        })
                    }
                    res.status(400).json({
                        status: 400,
                        message: err
                    })
                }
                catch {
                    console.log('Token is not recognized') // Client mengirim token yang expired ke backend
                }
            }
            else {
                var paramQuery = Object.entries(req.query)
                var paramObject = paramQuery[0]
                var query = paramObject ? `select * from barang where ${paramObject[0]} like '%${paramObject[1]}%'` : 'Select * from barang limit 10'
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
            }
        })
    })
router
    .route('/detail/:id')
    .get((req, res) => {
        var id = req.params.id
        var query = "Select * from barang where id = " + id
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
        var nama_barang = req.query.nama_barang
        var limit = req.query.limit || ''
        var query = `select * from barang where nama_barang like '%${nama_barang}%' limit ${limit} `;
        console.log('search:', query)
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
            nama_barang: req.body.nama_barang || '',
            satuan: req.body.satuan || '',
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
        server.query("INSERT INTO barang SET ? ", data, (err, result) => {
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
            id : req.body.id,
            nama_barang: req.body.nama_barang,
            satuan: req.body.satuan
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
        var query = "UPDATE barang SET nama_barang = '" + data.nama_barang + "', satuan = '" + data.satuan + "' where id = " + data.id
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
                    message: 'Berhasil Melakukan Update Data Barang ' + data.nama_barang,
                    data: data
                })
            }
        })
    })

router
    .route('/delete/:id')
    .get((req, res) => {
        var id = req.params.id
        var query = "Delete From barang Where id = " + id
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


router
    .route('/paging') //endpoint /cabang
    .get(verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretkey', (err, autData) => {
            if (typeof autData === 'undefined') { // Jika autdata  ==== undefined . typeof mengubah fungsi sehingga jadi string
                try {
                    if (err.message.includes('expired')) {
                        res.status(401).json({
                            status: 401,
                            message: err
                        })
                    }
                    res.status(400).json({
                        status: 400,
                        message: err
                    })
                }
                catch {
                    console.log('Token is not recognized') // Client mengirim token yang expired ke backend
                }
            }
            else {
                var paramQuery = req.query
                const paging = paramQuery?.page - 1
                const pageConverter = paging * 10
                var query = `select * from barang limit ${pageConverter}, 10`
                server.query(query, (err, rows) => {
                    var queryString = 'select * from barang'
                    server.query(queryString, (err, datas) => {
                        if (err) {
                            res.status(400).json({
                                status: 400,
                                message: err
                            })
                        }
                        res.status(200).json({
                            status: 200,
                            totalRows: datas.length,
                            data: rows.length === 0 ? 'no data' : rows,
                            
                        })
                    })
                })

            }
        })
    })
module.exports = router