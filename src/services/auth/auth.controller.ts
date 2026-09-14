import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { AppError } from '../../utils/appError.js';

const signUp = async (req: Request, res: Response) => {

  const { name, email, password, avatarUrl } = req.body;

  if (!name || !email || !password) {
    throw new AppError('Name, email, and password are required.', 400);
  }
  const user = await AuthService.signUpUser({ name, email, password, avatarUrl });

  return res.status(201).json({
    success: true,
    message: 'User registered successfully.',
    data: {},
  });


};

const signIn = async (req: Request, res: Response) => {
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const { token, user } = await AuthService.signInUser({ email, password });

    // Attach token to HTTP-Only cookie for secure transport
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
    });

    // Send both token and sanitized user details in the body
    return res.status(200).json({
      success: true,
      message: 'Signed in successfully.',
      data: user
    });
  } catch (error: any) {
    throw new AppError(error.message || 'Authentication failed.', 401);
   
  }
};

export const AuthController = {
  signUp,
  signIn,
};