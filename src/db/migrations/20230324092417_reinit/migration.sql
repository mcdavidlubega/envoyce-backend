/*
  Warnings:

  - Added the required column `tel` to the `Clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clients" ADD COLUMN     "tel" TEXT NOT NULL;
