/*
  Warnings:

  - Made the column `updatedAt` on table `Clients` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Invoices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Services` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Clients" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Invoices" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Services" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "updatedAt" SET NOT NULL;
