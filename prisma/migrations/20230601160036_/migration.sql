/*
  Warnings:

  - Made the column `pageInfoId` on table `Seo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Seo" DROP CONSTRAINT "Seo_pageInfoId_fkey";

-- AlterTable
ALTER TABLE "Seo" ALTER COLUMN "pageInfoId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Seo" ADD CONSTRAINT "Seo_pageInfoId_fkey" FOREIGN KEY ("pageInfoId") REFERENCES "PageInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
