const mysql = require('mysql');

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "steam"
});

db.connect((err) => {
    if(err) console.log(err);
    console.log('Connected!');
});