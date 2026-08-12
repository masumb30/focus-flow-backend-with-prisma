import express from 'express';
import cors from 'cors';
import type { Application, Request, Response, NextFunction } from 'express';
import router from './routes/index.js';
// Example route import (replace with your actual router)
// import userRouter from './routes/user.routes';



const app: Application = express();

const CLIENT_ORIGIN = process.env.CLIENT_URL || 'http://localhost:3000'; // Match your exact frontend port (NO trailing slash!)

app.use(
  cors({
    origin: CLIENT_ORIGIN, // Must be specific, e.g., 'http://localhost:3000' or 'http://localhost:5173'
    credentials: true,     // Allows cookies and Authorization headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

app.use('/', router);


export const signOutUser = async (_req: Request, res: Response) => {
  try {
    // Clear the HTTP-Only cookie from the client's browser
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/', // Ensures the cookie is removed across all paths
    });

    return res.status(200).json({
      success: true,
      message: 'Signed out successfully.',
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to sign out. Please try again.',
    });
  }
};

app.post('/logout', signOutUser); // Endpoint for signing out users

// --- Health Check ---
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// --- API Routes ---
// app.use('/api/users', userRouter);

// --- 404 Handler ---
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// --- Global Error Handler ---
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Error]:', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

export default app;