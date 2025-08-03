import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

const prisma = new PrismaClient();

app.get("/barbeiros", async (_req, res) => {
  try {
    const barbeiros = await prisma.barbeiros.findMany({
      where: { ativo: true },
    });
    res.json(barbeiros);
  } catch (error) {
    console.error("Erro ao buscar barbeiros:", error);
    res.status(500).json({ error: "Erro ao buscar barbeiros" });
  }
});

app.get("/servicos", async (_req, res) => {
  try {
    const servicos = await prisma.servico.findMany({
      where: {
        barbeiros: {
          some: {
            ativo: true,
            barbeiro: { ativo: true },
          },
        },
      },
      include: {
        barbeiros: {
          where: {
            ativo: true,
            barbeiro: { ativo: true },
          },
          include: { barbeiro: true },
        },
      },
    });
    res.json(servicos);
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    res.status(500).json({ error: "Erro ao buscar serviços" });
  }
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});

app.get("/barbeiros/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const barbeiro = await prisma.barbeiros.findUnique({
      where: {
        id,
        ativo: true,
      },
      include: {
        servicos: {
          where: {
            ativo: true,
          },
          include: {
            servico: true,
          },
        },
      },
    });

    if (!barbeiro) {
      return res.status(404).json({ error: "Barbeiro não encontrado" });
    }

    res.json(barbeiro);
  } catch (error) {
    console.error("Erro ao buscar barbeiro:", error);
    res.status(500).json({ error: "Erro ao buscar barbeiro" });
  }
});
