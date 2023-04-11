import { db } from '@utils/dbconnection';
import { Request, Response } from 'express';
import argon2 from 'argon2';
import { Users } from '@prisma/client';
import { nameQuery } from 'src/types/typings';
import { omitDeep } from 'lodash-omitdeep';

const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const user = await db.users.findUnique({
    where: {
      email,
    },
  });

  if (user) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await argon2.hash(password);
  const newuser = await db.users.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  return res.status(201).json(omitDeep(newuser, 'password'));
};

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await db.users.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!users) res.json(404).json({ message: 'No users found' });
  res.status(200).json(users);
  return;
};

const getAUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const user = await db.users.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) res.status(404).json({ message: 'User not found' });

  res.status(200).json(user);
  return;
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.user as Users;

  const { username, email, password } = req.body;
  const user = await db.users.findUnique({
    where: {
      email,
    },
  });

  const isAdmin = await db.users.findFirst({
    where: { id },
    select: { role: true },
  });

  if (isAdmin?.role !== 'ADMIN')
    res.status(401).json({ message: 'Not authorized' });

  if (user) res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await argon2.hash(password);
  const newuser = await db.users.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  res.status(201).json(omitDeep(newuser, 'password'));
  return;
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.user as Users;
  const { id } = req.params;
  const { email, username, password } = req.body;

  const isAuthorized = await db.users.findMany({
    where: {
      OR: [{ id: userId }, { role: 'ADMIN' }],
    },
  });
  if (!isAuthorized) res.status(401).json({ message: 'Not authorised' });
  const userExists = await db.users.findUnique({ where: { id } });
  if (!userExists) res.status(404).json({ message: 'User not found' });

  const data: {
    email: string;
    username: string;
    password?: string;
  } = {
    email,
    username,
    password: undefined,
  };

  if (password) {
    const hashedPassword = await argon2.hash(password);
    data.password = hashedPassword;
  }
  const updatedUser = await db.users.update({
    where: {
      id,
    },
    data,
  });

  res.status(200).json(omitDeep(updatedUser, 'password'));
  return;
};

const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { role } = req.body;

  const isAdmin = await db.users.findFirst({
    where: { id },
    select: { role: true },
  });

  if (isAdmin?.role !== 'ADMIN')
    res.status(401).json({ message: 'Not authorized' });

  const userExists = await db.users.findUnique({ where: { id } });
  if (userExists) res.status(404).json({ message: 'User not found' });

  const updatedUserRole = await db.users.update({
    where: {
      id,
    },
    data: {
      role,
    },
  });
  res.status(200).json(omitDeep(updatedUserRole, 'password'));
  return;
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const userExists = await db.users.findUnique({ where: { id } });
  if (userExists) res.status(404).json({ message: 'User not found' });

  await db.users.delete({
    where: {
      id,
    },
  });

  res.status(200).json({ message: 'user deleted' });
  return;
};

const searchUser = async (req: Request, res: Response): Promise<void> => {
  const { username } = (<nameQuery>req.query) as Users;
  if (username) {
    const nameSearch = await db.clients.findMany({
      where: {
        name: {
          search: username,
          mode: 'insensitive',
        },
      },
    });

    if (!nameSearch) res.status(404).json({ message: 'Client not found' });
    res.status(200).json(nameSearch);
  }
};
export default {
  signup,
  getAllUsers,
  getAUser,
  createUser,
  updateUser,
  updateUserRole,
  deleteUser,
  searchUser,
};
