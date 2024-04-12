import Image from 'next/image'
import { ReduxProvider } from "@/redux/provider"

// import css
import './styles/globals.css'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

// metadata
export const metadata = {
  title: 'Colorful Tiles Game',
  description: 'Created by Purva Dixit',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div className='background-image'>
          </div>
          <main className="main">
            <div className="app">
              <nav className="nav">
                Colorful Tile Game
              </nav>
              {children}
            </div>
          </main>
        </ReduxProvider>
      </body>
    </html>
  )
}
