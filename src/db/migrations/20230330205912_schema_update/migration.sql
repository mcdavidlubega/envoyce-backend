-- DropForeignKey
ALTER TABLE "Addons" DROP CONSTRAINT "Addons_invoicesId_fkey";

-- DropForeignKey
ALTER TABLE "Invoices" DROP CONSTRAINT "Invoices_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_invoiceId_fkey";

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addons" ADD CONSTRAINT "Addons_invoicesId_fkey" FOREIGN KEY ("invoicesId") REFERENCES "Invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
