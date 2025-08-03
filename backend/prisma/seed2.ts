// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient: PrismaClient2 } = require("@prisma/client")

const prisma2 = new PrismaClient2()

async function seedDatabase() {
  try {
    const services = [
      {
        nome: "Corte de Cabelo", // Correção para 'nome'
        descricao: "Estilo personalizado com as últimas tendências.",
        preco: 60.0,
        imagemUrl:
          "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
      },
      {
        nome: "Barba",
        descricao: "Modelagem completa para destacar sua masculinidade.",
        preco: 40.0,
        imagemUrl:
          "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
      },
      {
        nome: "Pézinho",
        descricao: "Acabamento perfeito para um visual renovado.",
        preco: 35.0,
        imagemUrl:
          "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
      {
        nome: "Sobrancelha",
        descricao: "Expressão acentuada com modelagem precisa.",
        preco: 20.0,
        imagemUrl:
          "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png",
      },
      {
        nome: "Massagem",
        descricao: "Relaxe com uma massagem revigorante.",
        preco: 50.0,
        imagemUrl:
          "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png",
      },
      {
        nome: "Hidratação",
        descricao: "Hidratação profunda para cabelo e barba.",
        preco: 25.0,
        imagemUrl:
          "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
    ]

    await prisma2.servico.createMany({
      data: services,
      skipDuplicates: true, // evita erro se já existir
    })

    const servicosCriados = await prisma2.servico.findMany()

    // Busca todos os barbeiros existentes
    const barbeiros = await prisma2.barbeiros.findMany()

    // Cria os vínculos entre cada barbeiro e cada serviço
    const relacoes = []

    for (const barbeiro of barbeiros) {
      for (const servico of servicosCriados) {
        relacoes.push({
          barbeirosId: barbeiro.id, // <- CORRETO
          servicoId: servico.id,
        })
      }
    }

    await prisma2.servicosBarbeiro.createMany({
      data: relacoes,
      skipDuplicates: true,
    })

    console.log("Serviços criados com sucesso!")
  } catch (error) {
    console.error("Erro ao criar os barbeiros:", error)
    await prisma2.$disconnect()
    process.exit(1)
  }
}

seedDatabase()
