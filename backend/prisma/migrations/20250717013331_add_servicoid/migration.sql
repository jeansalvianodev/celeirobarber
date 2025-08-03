/*
  Warnings:

  - You are about to drop the column `descricao` on the `ServicosBarbeiro` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `ServicosBarbeiro` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[barbeirosId,servicoId]` on the table `ServicosBarbeiro` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `servicoId` to the `ServicosBarbeiro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServicosBarbeiro" DROP COLUMN "descricao",
DROP COLUMN "nome",
ADD COLUMN     "servicoId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Servico" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServicosBarbeiro_barbeirosId_servicoId_key" ON "ServicosBarbeiro"("barbeirosId", "servicoId");

-- AddForeignKey
ALTER TABLE "ServicosBarbeiro" ADD CONSTRAINT "ServicosBarbeiro_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
