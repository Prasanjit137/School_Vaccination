const db = require('../config/db');
const fs = require('fs');
const csv = require('csv-parser');

exports.getStudents = (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).json({ message: 'Fetch failed' });
    res.json(results);
  });
};

exports.addStudent = (req, res) => {
  const { name, class: studentClass, studentId } = req.body;
  const query = 'INSERT INTO students (name, class, studentId) VALUES (?, ?, ?)';
  db.query(query, [name, studentClass, studentId], (err) => {
    if (err) return res.status(500).json({ message: 'Insert failed' });
    res.status(201).json({ message: 'Student added' });
  });
};

exports.updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, class: studentClass, studentId } = req.body;
  const query = 'UPDATE students SET name=?, class=?, studentId=? WHERE id=?';
  db.query(query, [name, studentClass, studentId, id], (err) => {
    if (err) return res.status(500).json({ message: 'Update failed' });
    res.json({ message: 'Student updated' });
  });
};

exports.deleteStudent = (req, res) => {
  db.query('DELETE FROM students WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: 'Delete failed' });
    res.json({ message: 'Student deleted' });
  });
};

exports.updateVaccination = (req, res) => {
  const { id } = req.params;
  const { vaccinationName, vaccinationDate, vaccinationStatus, bookingStatus } = req.body;
  const query = `
    UPDATE students
    SET vaccinationName=?, vaccinationDate=?, vaccinationStatus=?, bookingStatus=?
    WHERE id=?
  `;
  db.query(query, [vaccinationName, vaccinationDate, vaccinationStatus, bookingStatus, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Vaccination data updated!' });
  });
};

exports.updateVaccinationStatus = (req, res) => {
  const { id } = req.params;
  const { vaccinationStatus } = req.body;
  const query = `
    UPDATE students
    SET vaccinationStatus=?
    WHERE id=?
  `;
  db.query(query, [vaccinationStatus, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Vaccination status updated!' });
  });
};

exports.updateBookingStatus = (req, res) => {
  const { id } = req.params;
  const { bookingStatus } = req.body;
  const query = `
    UPDATE students
    SET bookingStatus=?
    WHERE id=?
  `;
  db.query(query, [bookingStatus, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Booking status updated!' });
  });
};

exports.uploadCSV = (req, res) => {
  const filePath = req.file.path;
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push([
        data.name,
        data.class,
        data.studentId,
        data.bookingStatus,
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
      db.query(query, [results], (err) => {
        fs.unlinkSync(filePath);
        if (err) {
          console.error('❌ Bulk Insert Error:', err.message);
          return res.status(500).json({ message: 'CSV import failed' });
        }
        res.status(201).json({ message: 'CSV imported successfully' });
      });
    });
};