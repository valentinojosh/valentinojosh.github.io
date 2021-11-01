var mysql = require('mysql2');
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Rootroot21",
    database: "ball"
});

//had to npm install mysql and npm install mysql2
//Works, no data output bc no data in the database currently
//had to use msql2 - >https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM Player", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});

// var con = mysql.createConnection({
//     host: "45.55.136.114",
//     user: "csc3610",
//     password: "csc3610",
//     database: "csc3610"
// });
// con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM candy", function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//     });
// });