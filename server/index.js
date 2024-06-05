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
    const sqlQuery = "SELECT * FROM users WHERE student_id = ? AND password = ?;";
    db.query(sqlQuery, [student_id, password], (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (result.length > 0) {
            req.session.user = result[0];
            res.send({ token: 'dummy-token' });
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

app.get('/check-session', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
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




// 여기에 기존의 register, login, insert, board list, delete 등의 엔드포인트가 있어야 합니다.
//임의의 색상을 할당하는 함수
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
// 일정 추가 엔드포인트
// 이벤트 생성 시 임의의 색상을 추가합니다.
app.post('/api/calendar/add', (req, res) => {
    const { title, start, end, student_id } = req.body;
    const color = getRandomColor(); // 임의의 색상을 생성
    const sqlQuery = "INSERT INTO events (title, start, end, student_id, color) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlQuery, [title, start, end, student_id, color], (err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.send(result);
      }
    });
  });

app.get('/api/calendar/events', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    const { student_id } = req.session.user;
    const sqlQuery = "SELECT * FROM events WHERE student_id = ?";
    db.query(sqlQuery, [student_id], (err, result) => {
        if (err) {
            console.error('Error fetching events:', err);
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
});
  
app.delete('/api/calendar/:id', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    const { id } = req.params;
    const { student_id } = req.session.user;

    const sqlQuery = "DELETE FROM events WHERE id = ? AND student_id = ?";
    db.query(sqlQuery, [id, student_id], (err, result) => {
        if (err) {
            console.error('Error deleting event:', err);
            res.status(500).send(err.message);
        } else {
            console.log('Event deleted:', result);
            res.send(result);
        }
    });
});



app.listen(PORT, () => {///?
    console.log(`Server is running on port ${PORT}`);
});