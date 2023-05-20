/*
  Warnings:

  - You are about to drop the `MovieModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExternalID" DROP CONSTRAINT "ExternalID_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Fact" DROP CONSTRAINT "Fact_movieId_fkey";

-- DropForeignKey
ALTER TABLE "FilmographyEntry" DROP CONSTRAINT "FilmographyEntry_movieId_fkey";

-- DropForeignKey
ALTER TABLE "ImageLink" DROP CONSTRAINT "ImageLink_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MediaLink" DROP CONSTRAINT "MediaLink_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieModel" DROP CONSTRAINT "Movie_pageInfoId_fkey";

-- DropForeignKey
ALTER TABLE "MovieModel" DROP CONSTRAINT "Movie_ratingId_fkey";

-- DropForeignKey
ALTER TABLE "ReleaseDate" DROP CONSTRAINT "ReleaseDate_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Slide" DROP CONSTRAINT "Slide_movieId_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToMovie" DROP CONSTRAINT "_CollectionToMovie_B_fkey";

-- DropForeignKey
ALTER TABLE "_CountryToMovie" DROP CONSTRAINT "_CountryToMovie_B_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToMovie" DROP CONSTRAINT "_GenreToMovie_B_fkey";

-- DropTable
DROP TABLE "MovieModel";

-- CreateTable
CREATE TABLE "Movie" (
    "id" UUID NOT NULL,
    "slug" STRING NOT NULL,
    "type" "MovieType" NOT NULL,
    "pageInfoId" UUID NOT NULL,
    "title" STRING NOT NULL,
    "originalTitle" STRING,
    "description" STRING,
    "year" INT4 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ratingId" UUID NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_slug_key" ON "Movie"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_ratingId_key" ON "Movie"("ratingId");

-- AddForeignKey
ALTER TABLE "ExternalID" ADD CONSTRAINT "ExternalID_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_pageInfoId_fkey" FOREIGN KEY ("pageInfoId") REFERENCES "PageInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fact" ADD CONSTRAINT "Fact_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReleaseDate" ADD CONSTRAINT "ReleaseDate_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilmographyEntry" ADD CONSTRAINT "FilmographyEntry_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageLink" ADD CONSTRAINT "ImageLink_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaLink" ADD CONSTRAINT "MediaLink_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryToMovie" ADD CONSTRAINT "_CountryToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToMovie" ADD CONSTRAINT "_CollectionToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
