import { Router } from 'express';
import { register, login, me } from '../controllers/authController';
import { authenticateJWT, AuthRequest } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', (req, res) => { register(req, res); });
router.post('/login', (req, res) => { login(req, res); });
router.get('/me', authenticateJWT, (req, res) => { me(req as AuthRequest, res); });

export default router;
