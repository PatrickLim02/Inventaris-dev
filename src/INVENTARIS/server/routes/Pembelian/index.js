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
                var paramObject = paramQuery[0] || ''               
                var query = paramObject ?
                `SELECT ph.id, ph.id_vendor, v.nama_vendor, ph.id_employee, u.nama_user, ph.tgl_pembelian, ph.total_pembelian from pembelian_header ph inner join vendor v on ph.id_vendor = v.id inner join user u on 
                ph.id_employee = u.id where ${paramObject[0]} like '%${paramObject[1]}%'`
                : 
                'SELECT ph.id, ph.id_vendor, v.nama_vendor, ph.id_employee, u.nama_user, ph.tgl_pembelian, ph.total_pembelian from pembelian_header ph inner join vendor v on ph.id_vendor = v.id inner join user u on ph.id_employee = u.id limit 10'               
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
        var query = "Select * from pembelian_header where id = " + id
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
        var nama_vendor = req.query.nama_vendor
        var limit = req.query.limit || ''
        var query = `select * from pembelian_header where nama_vendor like '%${nama_vendor}%' limit ${limit} `;
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
        let grandTotal = req.body.reduce(function(accumulation, item){
            return accumulation + item.subtotal
        },0)
      
        var data={
            id_vendor: req.body[0].id_vendor,
            id_employee: req.body[0].id_employee,
            tgl_pembelian: req.body[0].tgl_pembelian,
            total_pembelian : grandTotal,
        }
        server.query("insert into pembelian_header SET ?", data,(err, results)=>{
            if(results){
                   server.query(`select * from pembelian_header where id_vendor = '${data.id_vendor}' and id_employee = '${data.id_employee}' and tgl_pembelian = '${data.tgl_pembelian}' `, (err, row)=>{
                       if (err){
                        res.status(400).json({
                            status:400,
                            message:err
                        })
                       }
                       else{
                           console.log('ID Pembelian: ', row)
                           for(var i = 0; i < req.body.length;i++){
                               const dataDetails={
                                   id_pembelian: row[0].id,
                                   id_barang: req.body[i].id_barang,
                                   harga: req.body[i].harga,
                                   qty: req.body[i].qty,
                                   keterangan: req.body[i].keterangan
                               }
                              server.query('insert into pembelian_detail SET ?', dataDetails, (err, results)=>{
                                try{
                                    if(err){
                                        res.status(400).json({
                                            status:400,
                                            message:err
                                        })
                                    }
                                    else{
                                        res.status(200).json({
                                            status:200,
                                            data:results,
                                            
                                        })
                                    }
                                }
                                catch(err){
                                    console.log(err)
                                }
                              })
                           }
                       }
                   })         
            }
            else{
                res.status(400).json({
                    status: 400,
                    message: err
                })
            }
        })
    })

router
    .route('/edit')
    .post((req, res) => {
        var data = {
            id : req.body.id,
            id_vendor: req.body.id_vendor,
            id_employee: req.body.id_employee,
            tgl_pembelian: req.body.tgl_pembelian,
            total_pembelian: req.body.total_pembelian,
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
        var query = `UPDATE pembelian_header SET id_vendor = '${data.id_vendor}' , id_employee = '${data.id_employee}' , tgl_pembelian = '${data.tgl_pembelian}', total_pembelian = '${data.total_pembelian}' where id = ${data.id}`
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
                    message: 'Berhasil Melakukan Update Data Pembelian',
                    data: data
                })
            }
        })
    })

router
    .route('/delete/:id')
    .get((req, res) => {
        var id = req.params.id
        var query = "Delete From pembelian_header Where id = " + id
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
                var query = `select * from pembelian_header limit ${pageConverter}, 10`
                server.query(query, (err, rows) => {
                    var queryString = 'select * from pembelian_header'
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