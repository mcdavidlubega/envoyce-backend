import { db } from '@utils/dbconnection';
import { Request, Response } from 'express';

const getAllInvoices = async (req: Request, res: Response): Promise<void> => {
  const invoices = await db.invoices.findMany();
  if (!invoices) res.status(400).json({ mesage: 'no invoices found' });

  res.status(200).json(invoices);
  return;
};
const getInvoice = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const invoice = await db.invoices.findUnique({
    where: { id },
    include: {
      client: true,
      author: true,
      Addons: true,
    },
  });
  if (!invoice) res.status(404).json({ message: 'Invoice not found' });

  res.status(200).json(invoice);
  return;
};

const createInvoice = async (req: Request, res: Response): Promise<void> => {
  ///This is a hack --- fix it.
  const { userId } = req.user as any;
  const { clientId, items, terms, paymentDetails, dueDate, currency, addons } =
    req.body;
  console.log(userId);
  const newInvoice = await db.invoices.create({
    data: {
      terms,
      dueDate,
      paymentDetails,
      author: {
        connect: { id: userId },
      },
      client: {
        connect: { id: clientId },
      },
      currency,
      items: {
        createMany: {
          data: items,
        },
      },
      Addons: {
        create: addons,
      },
    },
    include: {
      client: true,
      author: true,
      Addons: true,
    },
  });

  res.status(200).json(newInvoice);
  return;
};
const updateInvoice = async (req: Request, res: Response): Promise<void> => {
  ///This is a hack --- fix it.
  const { userId } = req.user as any;
  const { id } = req.params;
  const invoiceExits = await db.invoices.findUnique({ where: { id } });
  if (!invoiceExits) res.status(404).json({ message: 'Invoice not found' });

  const {
    clientId,
    status,
    items,
    terms,
    paymentDetails,
    dueDate,
    currency,
    addons,
  } = req.body;

  const updatedInvoice = await db.invoices.update({
    where: {
      id,
    },
    data: {
      terms,
      status,
      dueDate,
      paymentDetails,
      author: {
        connect: { id: userId },
      },
      client: {
        connect: { id: clientId },
      },
      currency,
      items: {
        createMany: {
          data: items,
        },
      },
      Addons: {
        create: addons,
      },
    },
    include: {
      client: true,
      author: true,
      Addons: true,
    },
  });

  res.status(200).json(updatedInvoice);
  return;
};
const deteleteInvoice = async (req: Request, res: Response): Promise<void> => {
  ///This is a hack --- fix it.
  const { userId } = req.user as any;
  const { id } = req.params;
  const invoiceExits = await db.invoices.findUnique({ where: { id } });

  if (!invoiceExits) res.status(404).json({ message: 'Invoice not found' });

  const deletedInvoice = await db.invoices.delete({
    where: { id },
  });

  res.status(200).json(deletedInvoice);
};

const getClientInvoices = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const clientExists = await db.clients.findUnique({ where: { id } });
  if (!clientExists) res.status(401).json({ message: 'Client not found' });

  const clientInvoices = await db.invoices.findMany({
    where: { clientId: id },
    include: {
      items: true,
      Addons: true,
    },
  });

  res.status(200).json(clientInvoices);
  return;
};

export default {
  getAllInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deteleteInvoice,
  getClientInvoices,
};
