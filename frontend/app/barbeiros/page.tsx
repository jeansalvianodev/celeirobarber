"use client"

import { useEffect, useState } from "react"
import BarberItem from "../_components/barber-item"

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

interface BarbeirosPageProps {
  searchParams: {
    search?: string
  }
}

export default function BarbeirosPage({ searchParams }: BarbeirosPageProps) {
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([])
  const [loading, setLoading] = useState(true)

  const search = searchParams?.search || ""

  useEffect(() => {
    async function fetchBarbeiros() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/barbeiros`)
        const data = await res.json()

        const barbeirosFiltrados = data.filter((barbeiro: Barbeiro) =>
          barbeiro.nome.toLowerCase().includes(search.toLowerCase())
        )

        setBarbeiros(barbeirosFiltrados)
      } catch (error) {
        console.error("Erro ao buscar barbeiros:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBarbeiros()
  }, [search])

  if (loading) return <p className="p-4">Carregando barbeiros...</p>

  return (
    <div className="p-4">
      <h2 className="mt-6 mb-3 text-xs font-bold text-lime-800 uppercase">
        Resultados para &quot;{search}&quot;
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {barbeiros.map((barbeiro) => (
          <BarberItem key={barbeiro.id} barbeiro={barbeiro} />
        ))}
      </div>
    </div>
  )
}
