/*
  Warnings:

  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Clients" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Invoices" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Services" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "name",
ADD COLUMN     "username" TEXT,
ALTER COLUMN "updatedAt" DROP NOT NULL;
