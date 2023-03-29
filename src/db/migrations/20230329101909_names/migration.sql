/*
  Warnings:

  - Added the required column `name` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AddOnType" AS ENUM ('TAX', 'DISCOUNT');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('UGX', 'USD', 'KSX', 'GBP', 'EUR', 'RMB', 'RWF');

-- AlterTable
ALTER TABLE "Invoices" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'UGX',
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "paymentDetails" TEXT,
ALTER COLUMN "terms" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Addons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AddOnType" NOT NULL,
    "invoicesId" TEXT NOT NULL,

    CONSTRAINT "Addons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Addons" ADD CONSTRAINT "Addons_invoicesId_fkey" FOREIGN KEY ("invoicesId") REFERENCES "Invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
