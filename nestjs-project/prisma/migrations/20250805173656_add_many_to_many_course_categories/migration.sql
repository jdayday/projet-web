-- DropForeignKey
ALTER TABLE "public"."courses" DROP CONSTRAINT "courses_categoryId_fkey";

-- CreateTable
CREATE TABLE "public"."_CategoryToCourse" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoryToCourse_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryToCourse_B_index" ON "public"."_CategoryToCourse"("B");

-- AddForeignKey
ALTER TABLE "public"."_CategoryToCourse" ADD CONSTRAINT "_CategoryToCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CategoryToCourse" ADD CONSTRAINT "_CategoryToCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
