const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    }
}));

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "steam"
});

db.connect((err) => {
    if(err) throw err;
    console.log('Connected!');
});

console.log(db);

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';

    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result)
        //console.log('Data received from Db:');
        //console.log(rows);
      });
});

app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        
        if(err) {
            console.log(err);
        }

        const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';

        db.query(
            sql, 
            [ email, hash ],
            (err, result) => {
                //if(err) throw err;
                if(err) console.log(err);
          }
        );
    })
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = 'SELECT * FROM users WHERE email = ? LIMIT 1';

    db.query(
        sql, 
        email,
        (err, result) => {
            if(err) {
                res.send({ err: err });
            } 
            
            if(result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if(response) {
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    } else {
                        res.send({ message: "Wrong email/password combination!" });
                    }
                });
            } else {
                res.send({ message: "User doesn't exist!" });
            }
        }
    );
});

app.get('/login', (req, res) => {
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user});    
    } else {
        res.send({loggedIn: false}); 
    }
});

app.listen(3001, () => {
    console.log("running server");
});