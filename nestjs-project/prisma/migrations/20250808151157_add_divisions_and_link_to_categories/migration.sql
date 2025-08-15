-- CreateEnum
CREATE TYPE "public"."Division" AS ENUM ('BASE_7', 'BASE_8', 'BASE_9', 'SECONDAIRE_1', 'SECONDAIRE_2', 'SECONDAIRE_3', 'BAC_INFO', 'BAC_MATH', 'BAC_SCIENCE', 'BAC_SPORT', 'CONCOURS');

-- AlterTable
ALTER TABLE "public"."categories" ADD COLUMN     "division" "public"."Division" NOT NULL DEFAULT 'BAC_INFO';

-- AlterTable
ALTER TABLE "public"."courses" ADD COLUMN     "division" "public"."Division" NOT NULL DEFAULT 'BAC_INFO';
