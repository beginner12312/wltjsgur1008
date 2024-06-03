const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 8000;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'bbs',
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // In production, set secure to true
}));

app.post('/register', (req, res) => {
    const { username, password, student_id, birth_date } = req.body;
    console.log('/register', req.body);
    const sqlQuery = "INSERT INTO users (username, password, student_id, birth_date) VALUES (?, ?, ?, ?);";
    db.query(sqlQuery, [username, password, student_id, birth_date], (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
});

app.post('/login', (req, res) => {
    const { student_id, password } = req.body;
    console.log('/login', req.body);
    const sqlQuery = "SELECT * FROM users WHERE student_id = ? AND password = ?;";
    db.query(sqlQuery, [student_id, password], (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (result.length > 0) {
            req.session.user = result[0];
            res.send({ token: 'dummy-token' }); // 실제 토큰 발급 로직을 추가해야 합니다.
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

app.post('/insert', (req, res) => {
    const { title, content } = req.body;
    const author = req.session.user.username;
    console.log('/insert', req.body, author);
    const sqlQuery = "INSERT INTO board (title, content, author) VALUES (?, ?, ?);";
    db.query(sqlQuery, [title, content, author], (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
});

app.get('/api/board/list', (req, res) => {
    console.log('/api/board/list endpoint called');
    const sqlQuery = "SELECT * FROM board;";
    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.error('Error fetching posts:', err);
            res.status(500).send(err.message);
        } else {
            console.log('Fetched posts:', result);
            res.send(result);
        }
    });
});

app.delete('/api/board/delete/:id', (req, res) => {
    const { id } = req.params;
    console.log(`/api/board/delete/${id} endpoint called`);
    const sqlQuery = "DELETE FROM board WHERE id = ?;";
    db.query(sqlQuery, [id], (err, result) => {
        if (err) {
            console.error('Error deleting post:', err);
            res.status(500).send(err.message);
        } else {
            console.log('Deleted post:', result);
            res.send(result);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});