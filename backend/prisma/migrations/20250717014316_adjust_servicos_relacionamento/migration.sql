/*
  Warnings:

  - You are about to drop the column `imagemUrl` on the `ServicosBarbeiro` table. All the data in the column will be lost.
  - You are about to drop the column `preco` on the `ServicosBarbeiro` table. All the data in the column will be lost.
  - Added the required column `imagemUrl` to the `Servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco` to the `Servico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Servico" ADD COLUMN     "imagemUrl" TEXT NOT NULL,
ADD COLUMN     "preco" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "ServicosBarbeiro" DROP COLUMN "imagemUrl",
DROP COLUMN "preco";
