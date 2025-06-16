const express = require('express');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./notes.db');
const { generateToken, authenticateToken } = require('./auth');

const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// User registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], function(err) {
    if (err) return res.status(400).json({ error: 'Username already taken' });
    res.status(201).json({ message: 'User registered' });
  });
});

// User login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ token, username: user.username });
  });
});

// Middleware to authenticate token
app.use(authenticateToken);

// Add note
app.post('/notes', (req, res) => {
  const { content } = req.body;
  db.run('INSERT INTO notes (user_id, content, created_at) VALUES (?, ?, datetime("now"))',
    [req.user.id, content],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to save note' });
      res.status(201).json({ id: this.lastID });
    });
});

// Get notes
app.get('/notes', (req, res) => {
  db.all('SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC', [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch notes' });
    res.json(rows);
  });
});

// Delete note
app.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  db.run('DELETE FROM notes WHERE id = ? AND user_id = ?', [noteId, req.user.id], function(err) {
    if (err) return res.status(500).json({ error: 'Failed to delete note' });
    if (this.changes === 0) return res.status(404).json({ error: 'Note not found' });
    res.json({ message: 'Note deleted' });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
