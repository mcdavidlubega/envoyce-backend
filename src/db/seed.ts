import { PrismaClient } from '@prisma/client';
import { error } from 'console';
import argon from 'argon2';

const prisma = new PrismaClient();
async function main() {
  const mark = await prisma.users.upsert({
    where: { email: 'mark@email.com' },
    update: {},
    create: {
      email: 'mark@email.com',
      username: 'Mark David',
      password: await argon.hash('secretpassword'),
      role: 'ADMIN',
      profile: {
        create: {
          bio: 'The chillest one of them all.',
        },
      },
      invoices: {
        create: [
          {
            terms: 'Invoice due in 30 minutes',
            items: {
              create: [
                {
                  name: 'Item 1',
                  description: 'Item 1 description',
                  quantity: 2,
                  unit_cost: 1000,
                },
                {
                  name: 'Item 2',
                  description: 'Item 2 description',
                  quantity: 1,
                  unit_cost: 200,
                },
                {
                  name: 'Item 3',
                  description: 'Item 3 description',
                  quantity: 3,
                  unit_cost: 3500,
                },
                {
                  name: 'Item 4',
                  description: 'Item 4 description',
                  quantity: 4,
                  unit_cost: 500,
                },
              ],
            },
            client: {
              create: {
                email: 'info@shirtcat.com',
                name: 'Shirtcat Carpentry',
                address: 'Kigundu Road Kitalanga, Kampala',
                tel: '256 789 826 6434',
              },
            },
            Addons: {
              create: [
                {
                  name: 'VAT',
                  type: 'TAX',
                  amount: 20,
                },
                {
                  name: 'DISCOUNT',
                  type: 'DISCOUNT',
                  amount: 15,
                },
              ],
            },
            paymentDetails: 'Make payments to the bank',
            dueDate: '2023-03-29T10:31:57.955Z',
            currency: 'UGX',
          },
        ],
      },
    },
  });
  const timo = await prisma.users.upsert({
    where: { email: 'timo@email.com' },
    update: {},
    create: {
      email: 'timo@email.com',
      username: 'Timothy Ssali',
      password: await argon.hash('secretpassword'),
      profile: {
        create: {
          bio: 'The coolest one of them all.',
        },
      },
      invoices: {
        create: [
          {
            terms: 'Invoice due in 30 minutes',
            items: {
              create: [
                {
                  name: 'Item 1',
                  description: 'Item 1 description',
                  quantity: 2,
                  unit_cost: 1000,
                },
                {
                  name: 'Item 2',
                  description: 'Item 2 description',
                  quantity: 1,
                  unit_cost: 200,
                },
                {
                  name: 'Item 4',
                  description: 'Item 4 description',
                  quantity: 4,
                  unit_cost: 500,
                },
              ],
            },
            client: {
              create: {
                email: 'info@aic.com',
                name: 'Agro Consortium Ltd',
                address: '1 Vale, Naguru Hill, Kampala',
                tel: '256 789 8146 6443',
              },
            },
            Addons: {
              create: [
                {
                  name: 'VAT',
                  type: 'TAX',
                  amount: 16,
                },
                {
                  name: 'DISCOUNT',
                  type: 'DISCOUNT',
                  amount: 35,
                },
              ],
            },
            paymentDetails: 'Make payments to the bank',
            dueDate: '2023-03-29T10:31:57.955Z',
            currency: 'UGX',
          },
        ],
      },
    },
  });
  const isaac = await prisma.users.upsert({
    where: { email: 'isaac@email.com' },
    update: {},
    create: {
      email: 'isaac@email.com',
      username: 'Isaac Mukasa',
      password: await argon.hash('secretpassword'),
      profile: {
        create: {
          bio: 'The wisest one of them all.',
        },
      },
      invoices: {
        create: [
          {
            terms: 'Invoice due in 30 minutes',
            items: {
              create: [
                {
                  name: 'Item 1',
                  description: 'Item 1 description',
                  quantity: 2,
                  unit_cost: 1000,
                },
                {
                  name: 'Item 2',
                  description: 'Item 2 description',
                  quantity: 1,
                  unit_cost: 200,
                },
                {
                  name: 'Item 3',
                  description: 'Item 3 description',
                  quantity: 4,
                  unit_cost: 500,
                },
                {
                  name: 'Item 4',
                  description: 'Item 4 description',
                  quantity: 2,
                  unit_cost: 1500,
                },
                {
                  name: 'Item 5',
                  description: 'Item 5 description',
                  quantity: 1,
                  unit_cost: 5000,
                },
                {
                  name: 'Item 6',
                  description: 'Item 6 description',
                  quantity: 2,
                  unit_cost: 300,
                },
              ],
            },
            client: {
              create: {
                email: 'info@ctb.com',
                name: 'Created To Build',
                address: '1 Katalina, Kampala',
                tel: '256 789 8146 6443',
              },
            },
            Addons: {
              create: [
                {
                  name: 'VAT',
                  type: 'TAX',
                  amount: 16,
                },
                {
                  name: 'DISCOUNT',
                  type: 'DISCOUNT',
                  amount: 50,
                },
              ],
            },
            paymentDetails: 'Make payments to the bank',
            dueDate: '2023-03-29T10:31:57.955Z',
            currency: 'USD',
          },
        ],
      },
    },
  });

  console.log({ mark });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
