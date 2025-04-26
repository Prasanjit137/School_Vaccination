// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
const PORT = 5000;

const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' }); // creates 'uploads/' folder


// Middleware
app.use(cors());
app.use(express.json());

// Register Route

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error('❌ Register Error:', err.message);
        return res.status(400).json({ message: 'User already exists or error occurred' });
      }
      return res.status(201).json({ message: 'User registered' });
    });
  } catch (error) {
    console.error('❌ Hashing Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', username, password); // 👈
  
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
      if (err) {
        console.error('DB error:', err.message);
        return res.status(500).json({ message: 'Database error' });
      }
  
      if (results.length === 0) {
        console.log('❌ User not found');
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', isMatch); // 👈
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log('✅ Token generated:', token); // 👈
      res.json({ token });
    });
  });

// Middleware to Authenticate Token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}


// Add this after your existing routes
app.post('/vaccination-drives', authenticateToken, (req, res) => {
  const { vaccine, date, doses, classes } = req.body;
  const query = 'INSERT INTO vaccination_drives (vaccine, date, doses, classes) VALUES (?, ?, ?, ?)';
  db.query(query, [vaccine, date, doses, classes], (err, result) => {
    if (err) {
      console.error('❌ DB Insert Error:', err.message);
      return res.status(500).json({ message: 'Failed to create vaccination drive' });
    }
    res.status(201).json({ message: 'Vaccination drive created' });
  });
});

app.get('/vaccination-drives', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM vaccination_drives';
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ DB Fetch Error:', err.message);
      return res.status(500).json({ message: 'Failed to fetch vaccination drives' });
    }
    res.json(results);
  });
});

// 🔄 Update Vaccination Drive
app.put('/vaccination-drives/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { vaccine, date, doses, classes } = req.body;

  const query = 'UPDATE vaccination_drives SET vaccine = ?, date = ?, doses = ?, classes = ? WHERE id = ?';
  db.query(query, [vaccine, date, doses, classes, id], (err, result) => {
    if (err) {
      console.error('❌ Update Error:', err.message);
      return res.status(500).json({ message: 'Failed to update drive' });
    }
    res.json({ message: 'Vaccination drive updated successfully' });
  });
});

// ❌ Delete Vaccination Drive
app.delete('/vaccination-drives/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM vaccination_drives WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('❌ Delete Error:', err.message);
      return res.status(500).json({ message: 'Failed to delete drive' });
    }
    res.json({ message: 'Vaccination drive deleted successfully' });
  });
});



// Get all students
app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch' });
    res.json(results);
  });
});

// Add new student
app.post('/students', (req, res) => {
  const { name, class: studentClass, studentId} = req.body;
const query = 'INSERT INTO students (name, class, studentId) VALUES (?, ?, ?)';
db.query(query, [name, studentClass, studentId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Insert failed' });
    res.status(201).json({ message: 'Student added' });
  });
});



// Update student
app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { name, class: studentClass, studentId } = req.body;
  const query = 'UPDATE students SET name=?, class=?, studentId=? WHERE id=?';
db.query(query, [name, studentClass, studentId, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Update failed' });
    res.json({ message: 'Student updated' });
  });
});


//Update vaccination drive data
app.put('/vaccination/:id', (req, res) => {
  const { id } = req.params;
  const { vaccinationName, vaccinationDate, vaccinationStatus, bookingStatus } = req.body;

  const query = `
    UPDATE students
    SET vaccinationName = ?, vaccinationDate = ?, vaccinationStatus = ?, bookingStatus = ?
    WHERE id = ?
  `;
  db.query(query, [vaccinationName, vaccinationDate, vaccinationStatus, bookingStatus, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Vaccination drive data updated!' });
  });
});

app.put('/vaccinationStatus/:id', (req, res) => {
  const { id } = req.params;
  const { vaccinationStatus} = req.body;

  const query = `
    UPDATE students
    SET vaccinationStatus = ?
    WHERE id = ?
  `;
  db.query(query, [vaccinationStatus, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Vaccination status data updated!' });
  });
});




// Delete student
app.delete('/students/:id', (req, res) => {
  db.query('DELETE FROM students WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: 'Delete failed' });
    res.json({ message: 'Student deleted' });
  });
});


app.put('/booking/:id', (req, res) => {
  const { id } = req.params;
  const { bookingStatus } = req.body;

  const query = `
    UPDATE students
    SET bookingStatus = ?
    WHERE id = ?
  `;
  db.query(query, [bookingStatus, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Booking status updated!' });
  });
});




app.post('/upload-csv', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push([
        data.name,
        data.class,
        data.studentId,
        data.bookingStatus, // ✅ Add this line
        data.vaccinationName,
        data.vaccinationStatus,
        data.vaccinationDate ? data.vaccinationDate : null
      ]);
    })
    .on('end', () => {
      const query = `
        INSERT INTO students 
        (name, class, studentId, bookingStatus, vaccinationName, vaccinationStatus, vaccinationDate) 
        VALUES ?
      `;

      db.query(query, [results], (err, result) => {
        fs.unlinkSync(filePath);
        if (err) {
          console.error('❌ Bulk Insert Error:', err.message);
          return res.status(500).json({ message: 'Failed to import CSV data' });
        }
        res.status(201).json({ message: 'CSV data imported successfully', inserted: result.affectedRows });
      });
    });
});

// Protected Route
app.get('/home', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the home page!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
