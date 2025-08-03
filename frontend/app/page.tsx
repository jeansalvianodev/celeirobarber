"use client"

import { useEffect, useState } from "react"
import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import BarberItem from "./_components/barber-item"
import ServicosItem from "./_components/servicos-item"
import { buscaRapida } from "./_constants/search"

interface Barbeiro {
  id: string
  nome: string
  ativo: boolean
  // adicione outras propriedades conforme necessário
}

interface Servico {
  id: string
  nome: string
  barbeiros: {
    barbeiro: Barbeiro
  }[]
}

const Home = () => {
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([])
  const [servicos, setServicos] = useState<Servico[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const barbeirosRes = await fetch("http://localhost:3333/barbeiros")
        const barbeirosData = await barbeirosRes.json()
        setBarbeiros(barbeirosData)

        const servicosRes = await fetch("http://localhost:3333/servicos")
        const servicosData = await servicosRes.json()
        setServicos(servicosData)
      } catch (err) {
        console.error("Erro ao buscar dados do backend", err)
      }
    }

    fetchData()
  }, [])

  const getBarberWidthClass = (count: number) => {
    if (count === 1) return "w-250"
    if (count === 2) return "w-1/2"
    if (count === 3) return "w-1/3"
    if (count === 4) return "w-1/4"
    if (count >= 5) return "w-1/5"
    return "w-full"
  }

  const barberCount = barbeiros.length

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Daniel!</h2>
        <p> Segunda - Feira, 10 de Março.</p>
        <div className="mt-6 flex items-center gap-2">
          <Input
            placeholder="Faça sua busca"
            className="border-2 border-lime-900"
          />
          <Button className="cursor-pointer bg-lime-900 text-lime-200 hover:bg-lime-700">
            <SearchIcon />
          </Button>
        </div>

        <div className="mt-6 flex gap-3">
          {buscaRapida.map((option) => (
            <Button className="gap-2 text-lime-200" key={option.title}>
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
            </Button>
          ))}
        </div>

        <div className="relative mt-6 flex w-full flex-row items-stretch gap-4">
          <div className="relative h-[300px] flex-1">
            <Image
              alt="agende seu horário"
              src="/Teste01.jpg"
              fill
              className="rounded-xl object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col justify-center rounded-xl bg-gray-100 p-6 shadow">
            <h2 className="mb-4 text-2xl font-bold">Celeiro Sallon Barber</h2>
            <p className="text-gray-600">
              Desde o ano 2000, somos referência em cortes clássicos e modernos,
              atendendo com excelência e tradição na cidade de Navegantes. Venha
              nos conhecer e agende já o seu horário para uma experiência única
              em barbearia!
            </p>
          </div>
        </div>

        <h2 className="mt-6 mb-3 text-xs font-bold text-lime-800 uppercase">
          Agendamentos
        </h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-5 py-3 pl-5">
              <Badge className="w-fit bg-lime-900 text-lime-200">
                Confirmado
              </Badge>
              <h3 className="font-semibold text-lime-900">Corte de Cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/Logoceleiro.png" />
                </Avatar>
                <p className="text-lime-900">Barbeiro André</p>
              </div>
            </div>
            <div className="flex flex-col justify-center border-l-1 border-solid px-5">
              <p className="text-sm text-lime-900">Agosto</p>
              <p className="text-xl text-lime-900">05</p>
              <p className="text-sm text-lime-900">10:30</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="mt-6 mb-3 text-xs font-bold text-lime-800 uppercase">
          Recomendado
        </h2>

        <div
          className={`flex flex-nowrap justify-center gap-1 overflow-x-auto ${
            barberCount > 5 ? "space-x-2" : ""
          }`}
        >
          {barbeiros.map((barbeiro) => {
            const widthClass = getBarberWidthClass(barberCount)
            return (
              <div key={barbeiro.id} className={`${widthClass} flex-none`}>
                <BarberItem barbeiro={barbeiro} />
              </div>
            )
          })}
        </div>

        <div className="scrollbar-hiden md:scrollbar-thin md:scrollbar-thumb-lime-100 md:scrollbar-track-lime-200 mt-6 flex gap-4 overflow-x-auto">
          {servicos.map((servico) => (
            <ServicosItem key={servico.id} servicos={servico} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
