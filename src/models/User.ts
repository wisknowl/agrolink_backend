import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string) => {
  console.log('Debug info:', {email});
  // process.exit();

  return prisma.user.findUnique({ where: { email } });
};

export const createUser = async (name: string, email: string, phone: string, password: string) => {
  console.log('Debug info:', { name });
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { name, email, phone, password: hashedPassword },
  });
};

export const validatePassword = async (user: { password: string }, password: string) => {
  return bcrypt.compare(password, user.password);
};
