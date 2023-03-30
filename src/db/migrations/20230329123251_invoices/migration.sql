/*
  Warnings:

  - Added the required column `amount` to the `Addons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Addons" ADD COLUMN     "amount" INTEGER NOT NULL;
