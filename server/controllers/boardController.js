const db = require('../db');

exports.listPosts = (req, res) => {
    const sqlQuery = "SELECT id, title, author, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at FROM board";
    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error fetching posts:', err);
            res.status(500).send(err.message);
        } else {
            res.json(results);
        }
    });
};

exports.insertPost = (req, res) => {
    const { title, content } = req.body;
    const author = req.session.user ? req.session.user.username : 'anonymous';
    const sqlQuery = "INSERT INTO board (title, content, author) VALUES (?, ?, ?)";
    db.query(sqlQuery, [title, content, author], (err, result) => {
        if (err) {
            console.error('Error inserting post:', err);
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
};

exports.updatePost = (req, res) => {
    const { id, title, content } = req.body;
    const sqlQuery = "UPDATE board SET title = ?, content = ? WHERE id = ?";
    db.query(sqlQuery, [title, content, id], (err, result) => {
        if (err) {
            console.error('Error updating post:', err);
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
};

exports.deletePost = (req, res) => {
    const { id } = req.params;
    const sqlQuery = "DELETE FROM board WHERE id = ?";
    db.query(sqlQuery, [id], (err, result) => {
        if (err) {
            console.error('Error deleting post:', err);
            res.status(500).send(err.message);
        } else {
            res.send(result);
        }
    });
};
