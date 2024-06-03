const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "bbs",
});

router.post('/list', (req, res) => {
    const sqlQuery = "SELECT BOARD_ID, BOARD_TITLE, REGISTER_ID, DATE_FORMAT(REGISTER_DATE, '%Y-%m-%d') AS REGISTER_DATE FROM BOARD;";
    db.query(sqlQuery, (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
});

router.post('/insert', (req, res) => {
    const { title, content } = req.body;
    const sqlQuery = "INSERT INTO BOARD (BOARD_TITLE, BOARD_CONTENT, REGISTER_ID) VALUES (?, ?, 'artistJay');";
    db.query(sqlQuery, [title, content], (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
});

router.post('/update', (req, res) => {
    const { id, title, content } = req.body;
    const sqlQuery = "UPDATE BOARD SET BOARD_TITLE = ?, BOARD_CONTENT = ? WHERE BOARD_ID = ?;";
    db.query(sqlQuery, [title, content, id], (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
});

router.post('/delete', (req, res) => {
    const { id } = req.body;
    const sqlQuery = "DELETE FROM BOARD WHERE BOARD_ID = ?;";
    db.query(sqlQuery, [id], (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;
