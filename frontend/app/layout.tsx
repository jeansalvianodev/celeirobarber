import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { Card, CardContent } from "./_components/ui/card"
import AuthProvider from "./_providers/auth"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Sallon barber Celeiro",
  description: "Sallon barber Celeiro",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt_br" className="dark">
      <body className={geistSans.className}>
        <div className="flex h-full flex-col">
          <div className="flex-1">
            <AuthProvider>{children}</AuthProvider>
          </div>
        </div>
        <footer>
          <Card>
            <CardContent className="px-5 py-2">
              <p className="text-center text-sm text-lime-950">
                © Copyright Celeiro Saloon Barber Av. Pref. José Juvenal Mafra,
                1340 - Centro, Navegantes - SC, 88372-506 Telefone: (47)
                99118-1181
              </p>
            </CardContent>
          </Card>
        </footer>
      </body>
    </html>
  )
}
