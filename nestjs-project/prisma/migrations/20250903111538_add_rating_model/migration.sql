-- CreateTable
CREATE TABLE "public"."ratings" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ratings_userId_courseId_key" ON "public"."ratings"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "public"."ratings" ADD CONSTRAINT "ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ratings" ADD CONSTRAINT "ratings_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
