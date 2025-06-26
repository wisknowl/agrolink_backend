import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser, validatePassword } from '../models/User';
import { AuthRequest } from '../middleware/authMiddleware';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const register = async (req: Request, res: Response) => {
  
  try {
    const { name, email, phone, password } = req.body;
    

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const user = await createUser(name, email, phone, password);
    res.status(201).json({ id: user.id, name: user.name, email: user.email, phone: user.phone });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await validatePassword(user, password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const me = (req: AuthRequest, res: Response): void => {
  res.json({ user: req.user });
};
