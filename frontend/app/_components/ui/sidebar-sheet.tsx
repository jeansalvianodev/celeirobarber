"use client"
import Image from "next/image"
import { Button } from "./button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./sheet"
import { FcGoogle } from "react-icons/fc"

import { Avatar } from "./avatar"
import { AvatarImage } from "./avatar"

import Link from "next/link"
import { buscaRapida } from "@/app/_constants/search"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { signIn, signOut, useSession } from "next-auth/react"

const Sidebar = () => {
  const handleLogingoogleclick = () => signIn("google")
  const handleLogoutClick = () => signOut()
  const { data } = useSession()

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>MENU</SheetTitle>
      </SheetHeader>

      <div className="flex w-full items-center gap-3 border-b border-solid p-5 py-5">
        {data?.user ? (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>
            <div>
              <p className="font-bold"> {data?.user.name}</p>
              <p className="text-xs">{data.user.email} </p>
            </div>
            <div className="items-right ml-auto flex gap-2">
              <Button variant="lime" onClick={handleLogoutClick}>
                <LogOutIcon />
                Sair
              </Button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold">olá, faça seu login</h2>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="cursor-pointer bg-lime-900 text-lime-200 hover:bg-lime-700"
                  size="icon"
                  onClick={handleLogingoogleclick}
                >
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Faça seu login na Plataforma</DialogTitle>
                  <DialogDescription>
                    Faça seu login usando sua conta do Google
                  </DialogDescription>
                </DialogHeader>
                <Button variant="lime">
                  <FcGoogle /> Use sua conta google
                </Button>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 border-b border-solid p-5">
        <SheetClose asChild>
          <Button
            className="cursor-pointer justify-start bg-lime-900 text-lime-100 hover:bg-lime-700"
            asChild
          >
            <Link href="/">
              <HomeIcon size={12} /> Inicio
            </Link>
          </Button>
        </SheetClose>
        <Button className="cursor-pointer justify-start bg-lime-900 text-lime-100 hover:bg-lime-700">
          <CalendarIcon size={12} /> Agendamentos
        </Button>
      </div>
      <div className="flex flex-col gap-2 border-b border-solid p-5">
        {buscaRapida.map((opcao) => (
          <Button
            className="cursor-pointer justify-start bg-lime-900 text-lime-100 hover:bg-lime-700"
            key={opcao.title}
          >
            <Image
              className="cursor-pointer bg-lime-900 text-lime-100 hover:bg-lime-700"
              src={opcao.imageUrl}
              height={18}
              width={18}
              alt={opcao.title}
            />{" "}
            {opcao.title}
          </Button>
        ))}
      </div>
    </SheetContent>
  )
}

export default Sidebar
