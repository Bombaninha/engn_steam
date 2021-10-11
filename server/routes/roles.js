const express = require('express');
const router = express.Router();

const db = require('../connection');

router.get("/", (req, res) => {
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

module.exports = router;