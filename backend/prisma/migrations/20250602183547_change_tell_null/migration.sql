/*
  Warnings:

  - You are about to drop the column `nome` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "nome",
ADD COLUMN     "name" TEXT;
