/*
  Warnings:

  - Added the required column `description` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gifURL` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "gifURL" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
