/*
  Warnings:

  - A unique constraint covering the columns `[seasonId,number]` on the table `Episode` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[movieId,number]` on the table `Season` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `releaseDateId` to the `Episode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Episode" ADD COLUMN     "releaseDateId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Episode_seasonId_number_key" ON "Episode"("seasonId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Season_movieId_number_key" ON "Season"("movieId", "number");

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_releaseDateId_fkey" FOREIGN KEY ("releaseDateId") REFERENCES "ReleaseDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
