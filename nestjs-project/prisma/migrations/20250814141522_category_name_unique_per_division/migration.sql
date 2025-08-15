/*
  Warnings:

  - A unique constraint covering the columns `[name,division]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."categories_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_division_key" ON "public"."categories"("name", "division");
