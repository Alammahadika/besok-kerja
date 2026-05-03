import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Besok Kerja - Platform HR Terlengkap di Indonesia',
  description: 'Platform yang membantu kamu mempersiapkan diri, melamar dengan lebih tepat, dan meningkatkan peluang diterima kerja impianmu.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  )
}