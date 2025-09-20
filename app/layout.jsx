import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '../src/components/ui/sonner'
import { AppProvider } from '../src/context/AppProvider'
import MuiProvider from '../src/components/MuiProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Job Portal',
  description: 'Find your dream job',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MuiProvider>
          <AppProvider>
            {children}
            <Toaster />
          </AppProvider>
        </MuiProvider>
      </body>
    </html>
  )
}
