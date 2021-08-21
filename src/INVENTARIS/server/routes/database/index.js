var mysql = require('mysql');
module.exports = function(){
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
    return conn 
}