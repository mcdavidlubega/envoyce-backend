import { db } from '@utils/dbconnection';
import { Request, Response } from 'express';
import { Users } from '@prisma/client';

const getAllClients = async (req: Request, res: Response): Promise<void> => {
  const clients = await db.clients.findMany();
  res.status(200).json(clients);
};

const getAClient = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const client = await db.clients.findUnique({
    where: {
      id,
    },
  });

  if (!client) res.status(404).json({ message: 'Client not found' });

  res.status(200).json(client);
};

const createAClient = async (req: Request, res: Response): Promise<void> => {
  const { email, name, address, tel } = req.body;

  const clientExists = await db.clients.findUnique({ where: { email } });

  if (clientExists) {
    res.status(400).json({ message: 'Client already exists' });
    return;
  }

  const newClient = await db.clients.create({
    data: {
      email,
      name,
      address,
      tel,
    },
  });

  res.status(201).json(newClient);
  return;
};

const updateClient = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { email, name, address, tel } = req.body;

  if (email) {
    const emailExists = await db.clients.findFirst({ where: { email } });
    if (emailExists) res.status(401).json({ message: 'Email already exists' });
  }

  const updatedClient = await db.clients.update({
    where: {
      id,
    },
    data: {
      email,
      name,
      address,
      tel,
    },
  });

  res.status(200).json(updatedClient);
  return;
};

const deleteClient = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const clientExists = await db.clients.findUnique({ where: { id } });
  if (!clientExists) res.status(401).json({ message: 'Client not found' });
  const deletedClient = await db.clients.delete({
    where: {
      id: id,
    },
  });

  res.status(200).json([{ message: 'Client deleted' }, deletedClient]);
  return;
};

export default {
  getAllClients,
  getAClient,
  createAClient,
  updateClient,
  deleteClient,
};
