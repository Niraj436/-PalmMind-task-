import express from 'express';
import { login, logout, resetPassword, signup } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post("/logout", logout)
router.post("/resetpassword", resetPassword)

export default router;
