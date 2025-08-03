import { Servico } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface ServicoBarbeiroItemProps {
  servico: Servico
}

const ServicosBarbeiroItem = ({ servico }: ServicoBarbeiroItemProps) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-3">
        <div className="relative max-h-[140px] min-h-[140px] max-w-[140px] min-w-[140px]">
          <Image
            fill
            className="rounded-xl object-cover"
            src={servico.imagemUrl}
            alt={servico.nome}
          />
        </div>

        <div className="w-full space-y-2">
          <h3 className="text-sm font-semibold text-lime-800">
            {servico.nome}
          </h3>
          <p className="flex text-sm text-lime-800">{servico.descricao}</p>

          <div className="flex items-center justify-between">
            <p className="text-sm text-lime-800">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(servico.preco))}
            </p>

            <Button
              className="mt-3 cursor-pointer bg-lime-900 text-lime-200 hover:bg-lime-700"
              size={"sm"}
            >
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServicosBarbeiroItem
