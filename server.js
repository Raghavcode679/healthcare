const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (index.html, signup.html)
app.use(express.static(path.join(__dirname, '/')));

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',          // Replace with your MySQL username
    password: 'raghav',       // Replace with your MySQL password
    database: 'userdb'          // Replace with your MySQL database name
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Route to handle form submission
app.post('/submit-signup', (req, res) => {
    const { name, email, password } = req.body;
    const sql = 'INSERT INTO users1 (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error('Error saving data:', err);
            res.send('Signed in successfully!');
        } else {
            res.send('Signed in successfully!');
        }
    });
});

// Start the server
app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
// Handle form submission
app.post('/submit-signup', (req, res) => {
    const { name, email, password } = req.body;
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error('Error saving data:', err);
            res.send('Signed in successfully!');
        } else {
            res.send('Signed in successfully!');
        }
    });
});
app.post('/submit-contact', (req, res) => {
    const { name, email, message } = req.body;

    const query = 'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (error, results) => {
        if (error) {
            res.status(500).send('Database error');
        } else {
            res.status(200).send('Contact form submitted successfully');
        }
    });
});
