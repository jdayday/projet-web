-- AlterTable
ALTER TABLE "public"."courses" ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "ratingCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."testimonials" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorTitle" TEXT NOT NULL,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);
