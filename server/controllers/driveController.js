const db = require('../config/db');

exports.createDrive = (req, res) => {
  const { vaccine, date, doses, classes } = req.body;
  const query = 'INSERT INTO vaccination_drives (vaccine, date, doses, classes) VALUES (?, ?, ?, ?)';
  db.query(query, [vaccine, date, doses, classes], (err, result) => {
    if (err) {
      console.error('❌ DB Insert Error:', err.message);
      return res.status(500).json({ message: 'Failed to create vaccination drive' });
    }
    res.status(201).json({ message: 'Vaccination drive created' });
  });
};

exports.getDrives = (req, res) => {
  db.query('SELECT * FROM vaccination_drives', (err, results) => {
    if (err) {
      console.error('❌ DB Fetch Error:', err.message);
      return res.status(500).json({ message: 'Failed to fetch drives' });
    }
    res.json(results);
  });
};

exports.updateDrive = (req, res) => {
  const { id } = req.params;
  const { vaccine, date, doses, classes } = req.body;
  const query = 'UPDATE vaccination_drives SET vaccine=?, date=?, doses=?, classes=? WHERE id=?';
  db.query(query, [vaccine, date, doses, classes, id], (err) => {
    if (err) return res.status(500).json({ message: 'Update failed' });
    res.json({ message: 'Drive updated successfully' });
  });
};

exports.deleteDrive = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM vaccination_drives WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ message: 'Delete failed' });
    res.json({ message: 'Drive deleted successfully' });
  });
};