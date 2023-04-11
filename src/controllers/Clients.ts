import { db } from '@utils/dbconnection';
import { Request, Response } from 'express';
import { Clients } from '@prisma/client';
import { nameQuery } from 'src/types/typings';

db.$use(async (params, next) => {
  const results = await next(params);
  console.log(params.model, params.action, params.args);
  return results;
});

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

const searchClient = async (req: Request, res: Response): Promise<void> => {
  const { name } = (<nameQuery>req.query) as Clients;
  if (name) {
    const nameSearch = await db.clients.findMany({
      where: {
        name: {
          search: name,
          mode: 'insensitive',
        },
      },
    });

    if (!nameSearch) res.status(404).json({ message: 'Client not found' });
    res.status(200).json(nameSearch);
  }
};
export default {
  getAllClients,
  getAClient,
  createAClient,
  updateClient,
  deleteClient,
  searchClient,
};
