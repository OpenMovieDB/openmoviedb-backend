/*
  Warnings:

  - You are about to drop the column `seasonId` on the `ReleaseDate` table. All the data in the column will be lost.
  - Added the required column `releaseDateId` to the `Season` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReleaseDate" DROP CONSTRAINT "ReleaseDate_seasonId_fkey";

-- AlterTable
ALTER TABLE "ReleaseDate" DROP COLUMN "seasonId";

-- AlterTable
ALTER TABLE "Season" ADD COLUMN     "releaseDateId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_releaseDateId_fkey" FOREIGN KEY ("releaseDateId") REFERENCES "ReleaseDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
