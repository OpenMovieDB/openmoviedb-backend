/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Genre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Genre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "slug" STRING NOT NULL;

-- AlterTable
ALTER TABLE "Genre" ADD COLUMN     "slug" STRING NOT NULL;

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "slug" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Country_slug_key" ON "Country"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_slug_key" ON "Genre"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Person_slug_key" ON "Person"("slug");
