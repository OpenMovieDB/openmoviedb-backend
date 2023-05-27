/*
  Warnings:

  - You are about to drop the `_GenreToImageLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GenreToImageLink" DROP CONSTRAINT "_GenreToImageLink_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToImageLink" DROP CONSTRAINT "_GenreToImageLink_B_fkey";

-- AlterTable
ALTER TABLE "ImageLink" ADD COLUMN     "genreId" UUID;

-- DropTable
DROP TABLE "_GenreToImageLink";

-- AddForeignKey
ALTER TABLE "ImageLink" ADD CONSTRAINT "ImageLink_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE SET NULL ON UPDATE CASCADE;
