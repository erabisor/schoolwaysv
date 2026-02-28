// backend/index.js
const express = require('express');
const cors = require('cors');
const db = require('./config/database');
const usuariosRoutes = require('./routes/usuariosRoutes');
const authRoutes = require('./routes/authRoutes');
const alumnosRoutes = require('./routes/alumnosRoutes'); 

const app = express();
app.use(cors());
app.use(express.json());

db.connect();

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/alumnos', alumnosRoutes); 
app.use('/api', authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Servidor SchoolWaySV en puerto ${PORT}`));