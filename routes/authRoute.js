import express from 'express';
import {login , logout ,register } from '../controllers/authController.js';

const route = express.Router();

// Login Route
route.get('/login' ,login);

// Register Route
route.get('/register' ,register);

// Logout Route
route.get('/logout' ,logout);



export default route;

