'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Besok Kerja"
              width={135}
              height={38}
              className="object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {[
              ['Beranda', '/'],
              ['Fitur', '/#fitur'],
              ['Simulasi', '/simulasi-interview'],
              ['Skill', '/rekomendasi-skill'],
              ['Harga', '/harga'],
              ['Tentang', '/tentang-kami'],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              Masuk
            </Link>

            <Link
              href="/register"
              className="bg-black hover:bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200"
            >
              Daftar Gratis
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-5 border-t border-gray-100 bg-white">
            <div className="flex flex-col gap-5">

              {[
                ['Beranda', '/'],
                ['Fitur', '/#fitur'],
                ['Simulasi Interview', '/simulasi-interview'],
                ['Pengembangan Skill', '/rekomendasi-skill'],
                ['Harga', '/harga'],
                ['Tentang Kami', '/tentang-kami'],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                >
                  {label}
                </Link>
              ))}

              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700"
                >
                  Masuk
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center bg-black text-white rounded-xl py-3 text-sm font-semibold"
                >
                  Daftar Gratis
                </Link>
              </div>

            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
