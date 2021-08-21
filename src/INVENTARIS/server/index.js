
var http = require('http');
var express = require('express')
var app = express()
var bodyParser = require('body-parser') // Method Post
var mysql = require('mysql');
const { type } = require('os');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*') // Token
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    if (req.method === "OPTIONS") {
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        return res.status(200).json({})
    }
    next();
})

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "inventaris"
})

conn.connect((err) => {
    if (err) {
        console.log('Failed To Connect To Database', err)
    }
    else {
        console.log("Connected with Database")
    }
})

app.listen(8000, () => {
    console.log('Server is Running on Port 8000')
})

app.get('/', (req, res) => {
    res.send('Server Node JS') // Res.send => Untuk cetak sebuah value ke browser
})

app.get(['/cabang', '/cabang/limit/:limit'], (req, res) => {  // List Cabang / Search dan limit
    var limit = req.params.limit || false// req.params.limit sesuai dengan params
    var paramQuery = Object.entries(req.query)
    var paramObject = paramQuery[0]
    if (limit !== '') { //Jika limit memiliki isi
        query = "select * from cabang limit " + limit
    }
    if (limit === false) { // Jika limit bernilai false
        query = paramObject ? `select * from cabang where ${paramObject[0]} like '%${paramObject[1]}%'` : "select * from cabang limit 10";
    }

    conn.query(query, (err, rows) => {
        if (err) {
            res.json({ message: err })
        }
        res.status(200).json({
            status: 200,
            data: rows
        })
    })
})


app.get('/cabang/:id', (req, res) => {  //Edit Cabang

    var id = req.params.id
    var query = "SELECT * From Cabang Where id = " + id

    conn.query(query, (err, rows) => {
        if (err) {
            res.json({ message: err })
        }
        res.status(200).json({
            status: 200,
            data: rows[0] // agar saat panggil data tidak perlu masuk ke index [0] // tidak ada [] saat get data
        })
    })
})

// app.post('/submit/cabang', (req, res) => {  // Create Cabang
//     var cabangSubmit = {  //Ini diusahakan harus sama dengan kolom di database
//         kode: req.body.kode,
//         nama_cabang: req.body.nama_cabang,
//         alamat: req.body.alamat,
//         status: req.body.status,
//         telepon: req.body.telepon
//     }
//     console.log('data submit: ', cabangSubmit)
//     if (cabangSubmit.kode === ''){
//         res.status(400).json({           
//             message: 'Silahkan Isi Kode'
//         })
//     }
//     else if(cabangSubmit.nama_cabang === ''){
//         res.status(400).json({           
//             message: 'Silahkan Isi Nama Cabang'
//         })
//     }
//     else if(cabangSubmit.alamat === ''){
//         res.status(400).json({            
//             message: 'Silahkan Isi Alamat'
//         })
//     }  
//     else if(cabangSubmit.telepon === ''){
//         res.status(400).json({           
//             message: 'Silahkan Isi Telepon'
//         })
//     }
//     else{
//         conn.query("INSERT INTO cabang SET ?", cabangSubmit, (err, result) => {
//             res.status(200).json({ // Untuk return value dari hasil submit
//                 status: result,
//                 data: cabangSubmit,
//                 message: 'Data Berhasil Ditambahkan'

//             })
//         })
//     }
// })
app.post('/submit/cabang', (req, res) => {
    var data = {  //Ini diusahakan harus sama dengan kolom di database
        kode: req.body.kode || '',
        nama_cabang: req.body.nama_cabang || '',
        alamat: req.body.alamat || '',
        status: req.body.status || '',
        telepon: req.body.telepon || ''
    }
    
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
        conn.query("INSERT INTO cabang SET ?", data, (err, result) => {
            res.status(200).json({ // Untuk return value dari hasil submit
                status: result,
                data: data,
                message: 'Data Berhasil Ditambahkan'

            })
        })
})
app.post('/edit/cabang', (req, res) => {
    var editcabang = {
        id: req.body.id,
        kode: req.body.kode,
        nama_cabang: req.body.nama_cabang,
        alamat: req.body.alamat,
        status: req.body.status,
        telepon: req.body.telepon,
    }

    var query = "UPDATE cabang SET kode = '" + editcabang.kode + "', nama_cabang = '" + editcabang.nama_cabang + "', alamat = '" + editcabang.alamat + "', status = " + editcabang.status + ", telepon = '" + editcabang.telepon + "' where id = " + editcabang.id
    conn.query(query, (err, result) => {
        if (err) {
            res.json({
                status: 400,
                data: err
            })
        }
        else {
            res.json({
                status: 200,
                message: 'Berhasil Melakukan Update Data Cabang ' + editcabang.nama_cabang,
                data: editcabang
            })
        }
    })


})

app.get('/delete/cabang:id', (req, res) => {
    var id = req.params.id
    var query = "Delete From Cabang Where id = " + id

    conn.query(query, (err, rows) => {
        if (err) {
            res.json({ message: err })
        }
        res.status(200).json({
            status: 200,
            data: rows[0] // agar saat panggil data tidak perlu masuk ke index [0]
        })
    })
})

app.get('/attributeCabang', (req, res) => {
    var query = "Select * from cabang"
    conn.query(query, (err, rows) => {
        if (err) {
            res.json({ message: err })
        }
        var data = Object.entries(rows[0])
        console.log('data attr: ', Object.entries(rows[0]).length)
        var i = 1;
        var n = Object.entries(rows[0]).length
        var arr = []
        for (i; i < n; i++) {
            arr = [...arr, data[i][0]]
        }
        res.status(200).json({
            status: 200,
            data: arr
        })
        console.log(arr)
    })
})


// ============= FORM DEPARTMENT =============

app.get(['/department', '/department/limit/:limit'], (req, res) => {  // List Cabang / Search dan limit
    var limit = req.params.limit || false// req.params.limit sesuai dengan params
    var paramQuery = Object.entries(req.query)
    var paramObject = paramQuery[0]
    console.log('Params: ', paramQuery)
    var query = ""
    if (limit !== '') { //Jika limit memiliki isi
        query = "select * from department limit " + limit
    }
    if (limit === false) { // Jika limit bernilai false
        query = paramObject ? `select * from department where ${paramObject[0]} like '%${paramObject[1]}%'` : "select * from department limit 5";
    }

    conn.query(query, (err, rows) => {
        if (err) {
            res.json({ message: err })
        }
        res.status(200).json({
            status: 200,
            data: rows
        })
    })
})


app.get('/department/:id', (req, res) => {  //Detail Cabang
   
    var id = req.params.id
    var query = "SELECT * From department Where id = " + id

    conn.query(query, (err, rows) => {
        if (err) {
            res.json({ message: err })
        }
        res.status(200).json({
            status: 200,
            data: rows[0] // agar saat panggil data tidak perlu masuk ke index [0] // tidak ada [] saat get data
        })
    })
})


app.post('/edit/department', (req, res) => { // Tombol Edit Cabang
    var data = {
        id: req.body.id,
        kode_department: req.body.kode_department,
        nama_department: req.body.nama_department,
        status: req.body.status,
    }

    var query = "UPDATE department SET kode_department = '" + data.kode_department + "', nama_department = '" + data.nama_department + "', status = " + data.status + " where id = " + data.id
    console.log('query: ', query)
    conn.query(query, (err, result) => {
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


app.post('/create/department', (req, res) => {  // Create Cabang
    var data = {  //Ini diusahakan harus sama dengan kolom di database
        kode_department: req.body.kode_department,
        nama_department: req.body.nama_department,
        status: req.body.status,
    }
    console.log(data)
    conn.query("INSERT INTO department SET ?", data, (err, result) => {
        res.status(200).json({ // Untuk return value dari hasil submit
            status: result,
            data: data
        })
    })
})

app.get('/delete/department:id', (req, res) => {
    var id = req.params.id
    var query = "Delete From department Where id = " + id

    conn.query(query, (err, rows) => {
        if (err) {
            res.json({ message: err })
        }
        res.status(200).json({
            status: 200,
            data: rows[0] // agar saat panggil data tidak perlu masuk ke index [0]
        })
    })
})



// ============= FORM USER =============

app.get('/user', (req, res) => {  // List Cabang / Search dan limit
    var paramQuery = Object.entries(req.query)
    var paramObject = paramQuery[0]

    var query = paramObject ? `select * from user where ${paramObject[0]} like '%${paramObject[1]}%'` : "select * from user limit 5";
    console.log('query: ', query)

    conn.query(query, (err, rows) => {
        if (err) {
            res.json({ message: err })
        }
        res.status(200).json({
            status: 200,
            data: rows
        })
    })
})

app.get('/user/:id', (req, res) => {  //Detail Cabang

    var id = req.params.id
    var query = "SELECT * from user Where id = " + id

    conn.query(query, (err, rows) => {
        if (err) {
            res.json({ message: err })
        }
        res.status(200).json({
            status: 200,
            data: rows[0] // agar saat panggil data tidak perlu masuk ke index [0] // tidak ada [] saat get data
        })
    })
})


app.post('/edit/user', (req, res) => { // Tombol Edit Cabang
    var data = {
        id: req.body.id,
        kode_user: req.body.kode_user,
        nama_user: req.body.nama_user,
        cabang: req.body.cabang,
        department: req.body.department,
        status: req.body.status,
    }

    var query = `UPDATE user set kode_user = '${data.kode_user}', nama_user = '${data.nama_user}', cabang = '${data.cabang}', department = '${data.department}', status = ${data.status} where id = ${data.id}`
    console.log('query: ', query)
    conn.query(query, (err, result) => {
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

app.post('/create/user', (req, res) => {  // Create Cabang
    var data = {  //Ini diusahakan harus sama dengan kolom di database
        id: req.body.id,
        kode_user: req.body.kode_user,
        nama_user: req.body.nama_user,
        cabang: req.body.cabang,
        department: req.body.department,
        status: req.body.status,
    }
    console.log(data)
    conn.query("INSERT INTO user SET ?", data, (err, result) => {
        res.status(200).json({ // Untuk return value dari hasil submit
            status: result,
            message: 'Berhasil Menambahkan Data',
            data: data
        })
    })
})

app.get('/filter/user', (req, res) =>{
    var cabang = req.query.cabang
    var department = req.query.department
    var limit = req.query.limit || ''
    var query ="";
    console.log(req.query)
    if ( cabang === ''  &&  department !== ''){
        query = `Select * from user where department = '${department}' ${limit === '' ? '' : `limit ${limit}`}`
    }
    else if ( department === '' &&  cabang !== ''){
        query = `Select * from user where cabang = '${cabang}' ${limit === '' ? '' : `limit ${limit}`}`
    }
    else if ( cabang === '' &&  department === ''){
        query = `Select * from user ${limit === '' ? '' : `limit ${limit}`}`
    }
    else if ( cabang !== '' &&  department !== ''){
        query = `Select * from user where department = '${department}' and cabang = '${cabang}' ${limit === '' ? '' : `limit ${limit}`}`
    }
    console.log(query)
    conn.query(query, (err, rows) =>{
        if (err) {
            res.json({err, rows})
        }
        res.status(200).json({
            status:200,
            data: rows
        })
    })
})


app.get('/delete/user:id', (req, res) => {
    var id = req.params.id
    var query = "Delete From user Where id = " + id

    conn.query(query, (err, rows) => {
        if (err) {
            res.json({ message: err })
        }
        res.status(200).json({
            status: 200,
            message: 'Berhasil Menghapus Data',
            data: rows[0] // agar saat panggil data tidak perlu masuk ke index [0]
        })
    })
})

app.get('/attributeUser', (req, res) => {
    var query = "Select * from user"
    conn.query(query, (err, rows) => {
        if (err) {
            res.json({ message: err })
        }
        var data = Object.entries(rows[0])
        var i = 1;
        var n = Object.entries(rows[0]).length
        var arr = []
        for (i; i < n; i++) {
            arr = [...arr, data[i][0]]
        }
        res.status(200).json({
            status: 200,
            data: arr
        })
    })
})