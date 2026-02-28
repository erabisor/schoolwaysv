const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Definición de Endpoints
router.get('/', usuariosController.getUsuarios);
router.get('/conductores', usuariosController.getConductores); 
router.put('/:id', usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);

module.exports = router;