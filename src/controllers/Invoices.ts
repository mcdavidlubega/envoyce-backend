import { Services } from '@prisma/client';
import { db } from '@utils/dbconnection';
import { Request, Response } from 'express';
import { omitDeep } from 'lodash-omitdeep';
import { servicesData } from '../types/typings';

const getAllInvoices = async (req: Request, res: Response): Promise<void> => {
  const invoices = await db.invoices.findMany({
    include: {
      client: true,
      items: true,
      Addons: true,
      author: true,
    },
  });
  if (!invoices) res.status(404).json({ mesage: 'no invoices found' });

  res.status(200).json(omitDeep(invoices, 'password'));
  return;
};
const getInvoice = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const invoice = await db.invoices.findUnique({
    where: { id },
    include: {
      client: true,
      items: true,
      Addons: true,
      author: true,
    },
  });
  if (!invoice) res.status(404).json({ message: 'Invoice not found' });

  res.status(200).json(omitDeep(invoice, 'password'));
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

  res.status(201).json(omitDeep(newInvoice, 'password'));
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

  res.status(200).json(omitDeep(updatedInvoice, 'password'));
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

  res.status(200).json(omitDeep(deletedInvoice, 'password'));
};

const getClientInvoices = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const clientExists = await db.clients.findUnique({ where: { id } });
  if (!clientExists) res.status(404).json({ message: 'Client not found' });

  const clientInvoices = await db.invoices.findMany({
    where: { clientId: id },
    include: {
      items: true,
      Addons: true,
    },
  });

  res.status(200).json(omitDeep(clientInvoices, 'password'));
  return;
};

const addItem = async (req: Request, res: Response): Promise<void> => {
  const { inid } = req.params;
  const { name, description, quantity, unit_cost } = (<servicesData>(
    req.body
  )) as Services;
  const newItem = await db.services.create({
    data: {
      name: name,
      description: description,
      quantity: quantity,
      unit_cost: unit_cost,
      invoiceId: inid,
    },
  });

  res.status(201).json(`${newItem} added to invoice ${inid}`);
  return;
};

const editItem = async (req: Request, res: Response): Promise<void> => {
  const { inid, itid } = req.params;
  const { name, description, quantity, unit_cost } = req.body;

  const invoiceExists = await db.invoices.findFirst({
    where: { id: inid },
  });

  if (!invoiceExists) res.status(404).json({ message: 'Invoice not found' });

  const itemExists = await db.services.findFirst({
    where: { id: itid },
  });
  if (!itemExists) res.status(404).json({ message: 'Item not found' });

  const updatedItem = await db.services.update({
    where: { id: itid },
    data: {
      name,
      description,
      quantity,
      unit_cost,
    },
  });
  res.status(200).json(updatedItem);
  return;
};

const deleteItem = async (req: Request, res: Response): Promise<void> => {
  const { inid, itid } = req.params;
  const invoiceExists = await db.invoices.findFirst({
    where: { id: inid },
  });

  if (!invoiceExists) res.status(404).json({ message: 'Invoice not found' });

  const itemExists = await db.services.findFirst({
    where: { id: itid },
  });
  if (!itemExists) res.status(404).json({ message: 'Item not found' });

  const deletedItem = await db.services.delete({
    where: { id: itid },
  });

  res.status(200).json(deletedItem);
  return;
};

const createAddon = async (req: Request, res: Response): Promise<void> => {
  const { inid } = req.params;
  const invoiceExists = await db.invoices.findFirst({ where: { id: inid } });
  if (!invoiceExists) res.status(404).json({ message: 'Invoice not found' });

  const { name, type, amount } = req.body;
  const newAddon = await db.addons.create({
    data: {
      name,
      type,
      amount: Number(amount),
      invoicesId: inid,
    },
  });

  res
    .status(201)
    .json({ message: `${amount}% ${type} added to invoince ${inid}` });
  return;
};

const updateAddon = async (req: Request, res: Response): Promise<void> => {
  const { inid, aoid } = req.params;
  const invoiceExists = await db.invoices.findFirst({ where: { id: inid } });
  if (!invoiceExists)
    res.sendStatus(404).json({ message: 'Invoice not found' });
  const addOnExists = await db.addons.findFirst({ where: { id: aoid } });
  if (!aoid) res.status(404).json({ message: 'Addon not found' });

  const { name, type, amount } = req.body;

  const updatedOn = await db.addons.update({
    where: { id: aoid },
    data: {
      name,
      type,
      amount: Number(amount),
      invoicesId: inid,
    },
  });
  res
    .status(200)
    .json({ message: ` ${type} on invoince ${inid} updated to ${amount}%` });
  return;
};

const deleteAddOn = async (req: Request, res: Response): Promise<void> => {
  const { inid, aoid } = req.params;
  const invoiceExists = await db.invoices.findFirst({ where: { id: inid } });
  if (!invoiceExists) res.status(404).json({ message: 'Invoice not found' });
  const addOnExists = await db.addons.findFirst({ where: { id: aoid } });
  if (!addOnExists) res.status(404).json({ message: 'Addon not found' });

  const deletedAddon = await db.addons.delete({
    where: { id: aoid },
  });
  res.status(200).json({
    message: ` ${addOnExists?.type} was removed from invoice ${inid}`,
  });
  return;
};
export default {
  getAllInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deteleteInvoice,
  getClientInvoices,
  addItem,
  editItem,
  deleteItem,
  createAddon,
  updateAddon,
  deleteAddOn,
};
