/*
  Warnings:

  - The values [AVIF] on the enum `ImageAssetFormat` will be removed. If these variants are still used in the database, this will fail.
  - The values [W768,W1366] on the enum `ImageAssetWidth` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ImageAssetFormat_new" AS ENUM ('GIF', 'JPEG', 'PNG', 'WEBP');
ALTER TABLE "ImageAsset" ALTER COLUMN "format" TYPE "ImageAssetFormat_new" USING ("format"::text::"ImageAssetFormat_new");
ALTER TYPE "ImageAssetFormat" RENAME TO "ImageAssetFormat_old";
ALTER TYPE "ImageAssetFormat_new" RENAME TO "ImageAssetFormat";
DROP TYPE "ImageAssetFormat_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ImageAssetWidth_new" AS ENUM ('W375', 'W1024', 'W1920', 'ORIGINAL');
ALTER TABLE "ImageAsset" ALTER COLUMN "width" TYPE "ImageAssetWidth_new" USING ("width"::text::"ImageAssetWidth_new");
ALTER TYPE "ImageAssetWidth" RENAME TO "ImageAssetWidth_old";
ALTER TYPE "ImageAssetWidth_new" RENAME TO "ImageAssetWidth";
DROP TYPE "ImageAssetWidth_old";
COMMIT;
