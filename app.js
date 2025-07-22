const express = require('express');
const cors = require('cors');
const authController = require('./controllers/authController');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

module.exports = app;
