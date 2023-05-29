/*
  Warnings:

  - You are about to drop the `_CountryToImageLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CountryToImageLink" DROP CONSTRAINT "_CountryToImageLink_A_fkey";

-- DropForeignKey
ALTER TABLE "_CountryToImageLink" DROP CONSTRAINT "_CountryToImageLink_B_fkey";

-- AlterTable
ALTER TABLE "ImageLink" ADD COLUMN     "countryId" UUID;

-- DropTable
DROP TABLE "_CountryToImageLink";

-- AddForeignKey
ALTER TABLE "ImageLink" ADD CONSTRAINT "ImageLink_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
