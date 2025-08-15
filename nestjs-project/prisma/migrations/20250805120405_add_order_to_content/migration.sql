-- AlterTable
ALTER TABLE "public"."chapters" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "public"."lessons" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 1;
