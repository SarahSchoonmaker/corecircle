import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ msg: 'User already exists' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, name });
    res.status(201).json({ msg: 'User registered', user });


    res.status(201).json({ msg: 'User registered' });
  } catch (err) {
    res.status(500).json({ msg: 'Error registering user', err });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ msg: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ msg: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: 'Login error', err });
  }
};
