-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barbeiros" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefones" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Barbeiros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicosBarbeiro" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "barbeirosId" TEXT NOT NULL,

    CONSTRAINT "ServicosBarbeiro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agendamentos" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "servicoId" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agendamentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_telefone_key" ON "Usuario"("telefone");

-- AddForeignKey
ALTER TABLE "ServicosBarbeiro" ADD CONSTRAINT "ServicosBarbeiro_barbeirosId_fkey" FOREIGN KEY ("barbeirosId") REFERENCES "Barbeiros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamentos" ADD CONSTRAINT "Agendamentos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamentos" ADD CONSTRAINT "Agendamentos_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "ServicosBarbeiro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
