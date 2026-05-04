'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Besok Kerja"
              width={140}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">Beranda</Link>
            <Link href="/#fitur" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">Fitur</Link>
            <Link href="/simulasi-interview" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">Simulasi Interview</Link>
            <Link href="/rekomendasi-skill" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">Pengembangan Skill</Link>
            <Link href="/harga" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">Harga</Link>
            <Link href="/tentang-kami" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">Tentang Kami</Link>
          </div>

          {/* Auth Buttons Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors px-4 py-2">
              Masuk
            </Link>
            <Link
              href="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
              Daftar Gratis
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-600 text-sm font-medium">Beranda</Link>
              <Link href="/#fitur" onClick={() => setIsOpen(false)} className="text-gray-600 text-sm font-medium">Fitur</Link>
              <Link href="/simulasi-interview" onClick={() => setIsOpen(false)} className="text-gray-600 text-sm font-medium">Simulasi Interview</Link>
              <Link href="/rekomendasi-skill" onClick={() => setIsOpen(false)} className="text-gray-600 text-sm font-medium">Pengembangan Skill</Link>
              <Link href="/harga" onClick={() => setIsOpen(false)} className="text-gray-600 text-sm font-medium">Harga</Link>
              <Link href="/tentang-kami" onClick={() => setIsOpen(false)} className="text-gray-600 text-sm font-medium">Tentang Kami</Link>

              {/* Auth Buttons Mobile */}
              <div className="flex gap-3 pt-2 border-t border-gray-100">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center text-gray-600 hover:text-indigo-600 text-sm font-medium px-4 py-2 border border-gray-200 rounded-lg transition-colors">
                  Masuk
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
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