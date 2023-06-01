/*
  Warnings:

  - A unique constraint covering the columns `[pageInfoId,type]` on the table `Seo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Seo_pageInfoId_type_key" ON "Seo"("pageInfoId", "type");
