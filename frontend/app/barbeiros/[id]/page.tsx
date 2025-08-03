import ServicosBarbeiroItem from "@/app/_components/servicos-barbeiro-item"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import Sidebar from "@/app/_components/ui/sidebar-sheet"
import {
  ChevronLeftIcon,
  FacebookIcon,
  InstagramIcon,
  MapPinIcon,
  MenuIcon,
  StarIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface Barbeiro {
  id: string
  nome: string
  descricao: string
  imagemUrl: string
  telefones: string
  servicos: {
    id: string
    servico: {
      id: string
      nome: string
      preco: number
      descricao: string
    }
  }[]
}

interface BarbeiroPageProps {
  params: Promise<{ id: string }>
}

export default async function BarbeiroPage({ params }: BarbeiroPageProps) {
  const { id } = await params

  const decodedId = decodeURIComponent(id ?? "")

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/barbeiros/${decodedId}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) return notFound()

  const barbeiro: Barbeiro | null = await res.json()

  if (!barbeiro) return notFound()

  return (
    <div>
      <div className="relative h-[300px] w-full">
        <Image
          src={barbeiro.imagemUrl}
          fill
          className="object-cover"
          alt={barbeiro.nome}
        />
        <Button
          size="icon"
          className="absolute top-4 left-4 fill-lime-900 text-lime-200 hover:bg-lime-600"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute top-4 right-4 cursor-pointer bg-lime-900 text-lime-100 hover:bg-lime-700"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <Sidebar />
        </Sheet>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbeiro.nome}</h1>
        <div className="mb-2 flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p>{barbeiro.telefones}</p>
        </div>
        <div className="flex items-center gap-1">
          <StarIcon className="text-primary fill-lime-800" size={18} />
          <p>4.7 (890 Avaliações)</p>
        </div>
      </div>

      <div className="space-y-2 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase">Sobre</h2>
        <p className="text-justify text-sm">{barbeiro.descricao}</p>
        <div className="flex gap-2 mt-2">
          <a
            href="https://www.instagram.com/mrbeast/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="text-rose-700" />
          </a>
          <a
            href="https://www.instagram.com/mrbeast/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon className="text-blue-800" />
          </a>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <h2 className="text-xs font-bold uppercase">Serviços</h2>
        <div className="space-y-3">
          {barbeiro.servicos.map((servico) => (
            <ServicosBarbeiroItem
              key={servico.id}
              servico={servico.servico}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
