const express = require('express');
const router = express.Router();
const alumnosController = require('../controllers/alumnosController');

router.get('/', alumnosController.getAlumnos);
router.post('/', alumnosController.createAlumno);

module.exports = router;