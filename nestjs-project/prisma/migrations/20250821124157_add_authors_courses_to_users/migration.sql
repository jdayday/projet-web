/*
  Warnings:

  - You are about to drop the column `author` on the `courses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."courses" DROP COLUMN "author",
ADD COLUMN     "authorId" INTEGER;

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "headline" TEXT;

-- AddForeignKey
ALTER TABLE "public"."courses" ADD CONSTRAINT "courses_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
