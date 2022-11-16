/*
  Warnings:

  - You are about to alter the column `value` on the `Transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE "Transactions" ALTER COLUMN "value" SET DATA TYPE DECIMAL(5,2);
