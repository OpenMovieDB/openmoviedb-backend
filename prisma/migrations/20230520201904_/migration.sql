/*
  Warnings:

  - Added the required column `type` to the `ImageLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageLink" ADD COLUMN     "type" "ImageType" NOT NULL;
