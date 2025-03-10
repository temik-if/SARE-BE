/*
  Warnings:

  - The `start_date` column on the `Penalty` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `duration` to the `Penalty` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `end_date` on the `Penalty` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Penalty" ADD COLUMN     "duration" INTEGER NOT NULL,
DROP COLUMN "start_date",
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "end_date",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL;
