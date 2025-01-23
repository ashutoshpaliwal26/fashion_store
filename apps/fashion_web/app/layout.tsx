import "./global.css"
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import Toast from "./components/Toast"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chic Couture - Modern Fashion Store',
  description: 'Discover the latest trends in fashion at Chic Couture',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative min-h-screen flex flex-col`}>
        <Toast/>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

