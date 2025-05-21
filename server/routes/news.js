import express from 'express';
import { requireAuth, requirePremium } from '../middleware/auth.js';
const router = express.Router();

// Mock headlines
const headlines = [
  { id:1, title:'AI breakthrough', source:'TechCrunch' },
  { id:2, title:'Mars water discovery', source:'SciTechDaily' },
];

// Public: get headlines
router.get('/', (req, res) => {
  res.json(headlines);
});

// Premium: verify a piece of news
router.post('/verify/:id', requireAuth, requirePremium, (req, res) => {
  // TODO: plug in real bias/fake detection
  res.json({ id: req.params.id, verdict: 'real', confidence: 0.92 });
});

export default router;
