/*
  Warnings:

  - You are about to drop the column `name` on the `ServicosBarbeiro` table. All the data in the column will be lost.
  - Added the required column `nome` to the `ServicosBarbeiro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServicosBarbeiro" DROP COLUMN "name",
ADD COLUMN     "nome" TEXT NOT NULL;
