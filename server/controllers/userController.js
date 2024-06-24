const db = require('../db');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const { username, password, student_id } = req.body;

    if (!username || !password || !student_id) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sqlQuery = "INSERT INTO users (username, password, student_id) VALUES (?, ?, ?)";
        db.query(sqlQuery, [username, hashedPassword, student_id], (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                return res.status(500).send(err.message);
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
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
exports.logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Error logging out');
      }
      res.send({ message: 'Logged out successfully' });
    });
  };
  
exports.checkSession = (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
};
exports.saveUserCredits = (req, res) => {
    if (!req.session.user) {
      return res.status(401).send('Unauthorized');
    }
  
    const userId = req.session.user.id;
    const {
      curriculum,
      major,
      majorType,
      basic_liberal_arts,
      balanced_liberal_arts,
      basic_studies,
      major_required,
      major_elective,
      free_elective,
    } = req.body;
  
    const sqlQuery = `
      UPDATE users SET 
        curriculum = ?,
        major = ?,
        majorType = ?,
        basic_liberal_arts = ?,
        balanced_liberal_arts = ?,
        basic_studies = ?,
        major_required = ?,
        major_elective = ?,
        free_elective = ?
      WHERE id = ?
    `;
  
    db.query(sqlQuery, [
      curriculum,
      major,
      majorType,
      basic_liberal_arts,
      balanced_liberal_arts,
      basic_studies,
      major_required,
      major_elective,
      free_elective,
      userId
    ], (err, result) => {
      if (err) {
        console.error('Error saving credits:', err);
        res.status(500).send(err.message);
      } else {
        res.send('Credits saved successfully');
      }
    });
  };
  exports.getUserCredits = (req, res) => {
    if (!req.session.user) {
      return res.status(401).send("Unauthorized");
    }
  
    const { student_id } = req.session.user;
  
    const sqlQuery = `
      SELECT curriculum, major, majorType, basic_liberal_arts, balanced_liberal_arts, basic_studies, major_required, major_elective, free_elective
      FROM users
      WHERE student_id = ?;
    `;
  
    db.query(sqlQuery, [student_id], (err, result) => {
      if (err) {
        console.error("Error fetching user credits:", err);
        res.status(500).send(err.message);
      } else if (result.length === 0) {
        res.status(404).send("User not found");
      } else {
        res.send(result[0]);
      }
    });
  };
  