const db = require('../db');

exports.register = (req, res) => {
    const { username, password, student_id, birth_date } = req.body;
    const sqlQuery = "INSERT INTO users (username, password, student_id, birth_date) VALUES (?, ?, ?, ?)";
    db.query(sqlQuery, [username, password, student_id, birth_date], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
};

exports.login = (req, res) => {
    const { student_id, password } = req.body;
    const sqlQuery = "SELECT * FROM users WHERE student_id = ? AND password = ?";
    db.query(sqlQuery, [student_id, password], (err, result) => {
        if (err) {
            console.error('Error logging in:', err);
            res.status(500).send(err.message);
        } else if (result.length > 0) {
            req.session.user = result[0];
            res.send({ token: 'dummy-token' });
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
};

exports.checkSession = (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
};
