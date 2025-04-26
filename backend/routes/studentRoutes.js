const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  updateVaccination,
  updateVaccinationStatus,
  updateBookingStatus,
  uploadCSV
} = require('../controllers/studentController');

router.get('/', getStudents);
router.post('/', addStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

router.put('/vaccination/:id', updateVaccination);
router.put('/vaccinationStatus/:id', updateVaccinationStatus);
router.put('/booking/:id', updateBookingStatus);

router.post('/upload-csv', upload.single('file'), uploadCSV);

module.exports = router;