/*
  Warnings:

  - You are about to drop the column `imageId` on the `Block` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_imageId_fkey";

-- AlterTable
ALTER TABLE "Block" DROP COLUMN "imageId";

-- AlterTable
ALTER TABLE "ImageLink" ADD COLUMN     "blockId" UUID;

-- AddForeignKey
ALTER TABLE "ImageLink" ADD CONSTRAINT "ImageLink_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("id") ON DELETE SET NULL ON UPDATE CASCADE;
