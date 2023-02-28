/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Role` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleName` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "categoryName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "name",
ADD COLUMN     "roleName" TEXT NOT NULL;
