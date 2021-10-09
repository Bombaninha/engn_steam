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
        res.send(result);
        //console.log('Data received from Db:');
        //console.log(rows);
      });
});

app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //const name = req.body.name;
    //const isDev = req.body.isDev;

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

/* CATEGORIES */
app.get('/categories', (req, res) => {
    const sql = 'SELECT * FROM categories';

    db.query(
        sql, 
        (err, result) => {
            if(err) {
                res.send({ err: err });
            } 
            
            res.send(result);
        }
    );    
});

app.post('/categories', (req, res) => {
    const name = req.body.name;

    const sql = "INSERT INTO categories (name) VALUES (?)";

    db.query(
        sql, 
        name,
        (err, result) => {
            if(err) console.log(err);
            console.log(result);
            res.send({ message: 'teste', data: result});
        }
    );    
});

/* ROLES */
app.get('/roles', (req, res) => {
    const sql = 'SELECT * FROM roles';

    db.query(
        sql, 
        (err, result) => {
            if(err) {
                res.send({ err: err });
            } 
            
            res.send(result);
        }
    );    
});

app.post('/roles', (req, res) => {
    const name = req.body.name;
    const label = req.body.label;

    const sql = "INSERT INTO roles (name, label) VALUES (?, ?)";

    db.query(
        sql, 
        [ name, label],
        (err, result) => {
            if(err) console.log(err);
            console.log(result);
            res.send({ message: 'teste', data: result});
        }
    );    
});

/* GAMES */
app.get('/games', (req, res) => {
    // trocar email por nome
    const sql = `
        SELECT g.id, g.name, g.price, IFNULL(GROUP_CONCAT(c.name), "") categories, IFNULL(GROUP_CONCAT(u.email), "") developers FROM games g
        LEFT JOIN games_categories gc ON (gc.game_id = g.id)
        LEFT JOIN categories c ON (gc.category_id = c.id)
        LEFT JOIN games_developers gd ON (gd.game_id = g.id)
        LEFT JOIN users u ON (gd.user_id = u.id)
        GROUP BY g.id;
    `;

    db.query(
        sql, 
        (err, result) => {
            if(err) {
                res.send({ err: err });
            } 
            
            res.send(result);
        }
    );    
});

/* GAMES */
app.get('/games/:id/buy', (req, res) => {
    const id = req.params.id;
    // trocar email por nome
    const sql = `
        SELECT g.id, g.name, g.price, IFNULL(GROUP_CONCAT(c.name), "") categories, IFNULL(GROUP_CONCAT(u.email), "") developers FROM games g
        LEFT JOIN games_categories gc ON (gc.game_id = g.id)
        LEFT JOIN categories c ON (gc.category_id = c.id)
        LEFT JOIN games_developers gd ON (gd.game_id = g.id)
        LEFT JOIN users u ON (gd.user_id = u.id)
        WHERE g.id = (?)
        GROUP BY g.id
        LIMIT 1
    `;

    db.query(
        sql, 
        id,
        (err, result) => {
            if(err) {
                res.send({ err: err });
            } 
            
            res.send(result);
        }
    );    
});

app.post('/games', (req, res) => {
    const name = req.body.name;
    const price = req.body.price;

    const sql = "INSERT INTO games (name, price) VALUES (?, ?)";

    db.query(
        sql, 
        [ name, price],
        (err, result) => {
            if(err) console.log(err);
            console.log(result);
            res.send({ message: 'teste', data: result});
        }
    );    
});

app.listen(3001, () => {
    console.log("running server");
});