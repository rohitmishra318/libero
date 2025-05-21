import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();
const router = express.Router();

// Register
router.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ email, passwordHash, role });
    res.json({ msg: 'Registered' });
  } catch (e) {
    res.status(400).json({ msg: 'Email in use?' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.passwordHash))
    return res.status(401).json({ msg: 'Bad credentials' });

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
  res.json({ token, role: user.role });
});

export default router;
