/*
  Warnings:

  - You are about to drop the column `overdueDays` on the `borrow_records` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "borrow_records" DROP CONSTRAINT "borrow_records_bookId_fkey";

-- AlterTable
ALTER TABLE "borrow_records" DROP COLUMN "overdueDays";

-- AddForeignKey
ALTER TABLE "borrow_records" ADD CONSTRAINT "borrow_records_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("bookId") ON DELETE CASCADE ON UPDATE CASCADE;
