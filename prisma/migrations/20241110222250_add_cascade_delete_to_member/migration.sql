-- DropForeignKey
ALTER TABLE "borrow_records" DROP CONSTRAINT "borrow_records_memberId_fkey";

-- AddForeignKey
ALTER TABLE "borrow_records" ADD CONSTRAINT "borrow_records_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("memberId") ON DELETE CASCADE ON UPDATE CASCADE;
