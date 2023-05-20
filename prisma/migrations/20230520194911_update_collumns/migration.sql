/*
  Warnings:

  - You are about to drop the column `position` on the `Slide` table. All the data in the column will be lost.
  - Added the required column `order` to the `Slide` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "value" FLOAT8 NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Slide" DROP COLUMN "position";
ALTER TABLE "Slide" ADD COLUMN     "order" INT4 NOT NULL;
