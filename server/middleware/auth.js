import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ msg: 'Missing token' });

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; 
    next();
  } catch {
    res.status(403).json({ msg: 'Invalid token' });
  }
};

export const requirePremium = (req, res, next) => {
  if (req.user.role !== 'premium')
    return res.status(403).json({ msg: 'Premium only' });
  next();
};
