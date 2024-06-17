const db = require('../db');

exports.addEvent = (req, res) => {
    const { title, start, end } = req.body;
    const { student_id } = req.session.user;
    const color = getRandomColor();
    const sqlQuery = "INSERT INTO events (title, start, end, student_id, color) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlQuery, [title, start, end, student_id, color], (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
};

exports.getEvents = (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    const { student_id } = req.session.user;
    const sqlQuery = "SELECT * FROM events WHERE student_id = ?";
    db.query(sqlQuery, [student_id], (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
};

exports.deleteEvent = (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    const { id } = req.params;
    const { student_id } = req.session.user;
    const sqlQuery = "DELETE FROM events WHERE id = ? AND student_id = ?";
    db.query(sqlQuery, [id, student_id], (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
};

// 임의의 색상을 할당하는 함수
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
