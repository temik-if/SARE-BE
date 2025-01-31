/*
  Warnings:

  - The primary key for the `Equipment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Equipment` table. All the data in the column will be lost.
  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Room` table. All the data in the column will be lost.
  - Added the required column `capacity` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Equipment_resource_id_key";

-- DropIndex
DROP INDEX "Room_resource_id_key";

-- AlterTable
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD CONSTRAINT "Equipment_pkey" PRIMARY KEY ("resource_id");

-- AlterTable
ALTER TABLE "Room" DROP CONSTRAINT "Room_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("resource_id");
