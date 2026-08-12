import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_jwt_secret_key';
const JWT_EXPIRES_IN = '7d';

export interface SignUpDTO {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export interface SignInDTO {
  email: string;
  password: string;
}

/**
 * Registers a new user with hashed password
 */
const signUpUser = async (data: SignUpDTO) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error('User with this email already exists.');
  }

  // Hash password with salt round 10
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      avatarUrl: data.avatarUrl || null,
    },
  });

  // Exclude password from returned object
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

/**
 * Authenticates user and generates JWT token
 */
const signInUser = async (data: SignInDTO) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  console.log('user found: ', user.password, data.password  )

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password.');
  }

  // Payload formatted specifically for frontend extraction & usage
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const { password, ...userWithoutPassword } = user;

  return { token, user: userWithoutPassword };
};


export const AuthService = {
  signUpUser,
  signInUser,
};