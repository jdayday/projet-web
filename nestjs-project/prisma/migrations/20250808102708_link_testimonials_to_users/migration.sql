/*
  Warnings:

  - You are about to drop the column `authorName` on the `testimonials` table. All the data in the column will be lost.
  - You are about to drop the column `authorTitle` on the `testimonials` table. All the data in the column will be lost.
  - Added the required column `userId` to the `testimonials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."testimonials" DROP COLUMN "authorName",
DROP COLUMN "authorTitle",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."testimonials" ADD CONSTRAINT "testimonials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
