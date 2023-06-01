-- DropForeignKey
ALTER TABLE "Episode" DROP CONSTRAINT "Episode_releaseDateId_fkey";

-- DropForeignKey
ALTER TABLE "ReleaseDate" DROP CONSTRAINT "ReleaseDate_countryId_fkey";

-- DropForeignKey
ALTER TABLE "ReleaseDate" DROP CONSTRAINT "ReleaseDate_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_releaseDateId_fkey";

-- AlterTable
ALTER TABLE "Episode" ALTER COLUMN "releaseDateId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ReleaseDate" ALTER COLUMN "countryId" DROP NOT NULL;
ALTER TABLE "ReleaseDate" ALTER COLUMN "movieId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Season" ALTER COLUMN "releaseDateId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_releaseDateId_fkey" FOREIGN KEY ("releaseDateId") REFERENCES "ReleaseDate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_releaseDateId_fkey" FOREIGN KEY ("releaseDateId") REFERENCES "ReleaseDate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReleaseDate" ADD CONSTRAINT "ReleaseDate_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReleaseDate" ADD CONSTRAINT "ReleaseDate_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
