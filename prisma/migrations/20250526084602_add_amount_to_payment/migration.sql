-- Drop kolom typo
ALTER TABLE "Payment" DROP COLUMN "amout";

-- Tambah kolom amount dengan default supaya bisa jalan
ALTER TABLE "Payment" ADD COLUMN "amount" INTEGER NOT NULL DEFAULT 0;
