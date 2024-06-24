const db = require('../db');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  const { student_id, password } = req.body;

  const sqlQuery = "SELECT * FROM users WHERE student_id = ?;";
  db.query(sqlQuery, [student_id], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).send(err.message);
    } else if (results.length === 0) {
      res.status(401).send("User not found");
    } else {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          res.status(500).send(err.message);
        } else if (!isMatch) {
          res.status(401).send("Incorrect password");
        } else {
          // 세션에 필요한 정보를 저장
          req.session.user = {
            id: user.id,
            username: user.username,
            student_id: user.student_id
          };
          res.send("Login successful");
        }
      });
    }
  });
};
