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
        var query = paramObject ? `select * from department where ${paramObject[0]} like '%${paramObject[1]}%'` : 'Select * from department'
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
        var query = "Select * from department where id = " + id
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
        var nama_department = req.query.nama_department
        var query = `select * from department where nama_department like '%${nama_department}%' `;
       
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
            kode_department: req.body.kode_department || '',
            nama_department: req.body.nama_department || '',         
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
            server.query("INSERT INTO department SET ? ", data, (err, result) => {
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
                kode_department: req.body.kode_department,
                nama_department: req.body.nama_department,
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
            var query = "UPDATE department SET kode_department = '" + data.kode_department + "', nama_department = '" + data.nama_department + "', status = " + data.status + " where id = " + data.id
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
                        message: 'Berhasil Melakukan Update Data Department ' + data.nama_department,
                        data: data
                    })
                }
            }) 
    })

router
    .route('/delete/:id')
    .get((req, res)=>{      
            var id = req.params.id
            var query = "Delete From department Where id = " + id        
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