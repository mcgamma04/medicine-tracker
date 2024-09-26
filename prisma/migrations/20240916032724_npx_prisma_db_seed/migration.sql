/*
  Warnings:

  - Added the required column `expirationDate` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manufactureDate` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "expirationDate" DATE NOT NULL,
ADD COLUMN     "manufactureDate" DATE NOT NULL;
