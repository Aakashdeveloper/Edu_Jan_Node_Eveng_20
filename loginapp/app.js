const express = require('express');
const app = express();
const db = require('./db');

const AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

const UserController = require('./user/UserController');
app.use('/users', UserController)

module.exports = app;