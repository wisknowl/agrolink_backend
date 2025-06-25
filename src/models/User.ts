import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = async (name: string, email: string, phone: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { name, email, phone, password: hashedPassword },
  });
};

export const validatePassword = async (user: { password: string }, password: string) => {
  return bcrypt.compare(password, user.password);
};
