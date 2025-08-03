import { Servico } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"

interface ServicosItemProps {
  servicos: Servico
}

const ServicosItem = ({ servicos }: ServicosItemProps) => {
  return (
    <Card className="w-[159px] py-0">
      <CardContent className="p-0">
        <div className="relative h-[159px] w-[159px]">
          <Image
            fill
            className="rounded-xl object-cover"
            src={servicos.imagemUrl}
            alt={servicos.nome}
          />
        </div>

        <div className="px-2 py-3">
          <h3 className="truncate font-semibold text-lime-900">
            {servicos.nome}
          </h3>
          <p className="truncate text-sm text-lime-800">{servicos.descricao}</p>
          <p className="truncate text-sm text-lime-800">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(servicos.preco))}
          </p>
          <Button className="mt-3 w-full cursor-pointer bg-lime-900 px-1 text-lime-200 hover:bg-lime-700">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServicosItem
