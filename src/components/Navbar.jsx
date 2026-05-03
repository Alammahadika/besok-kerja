'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Besok Kerja"
              width={140}
              height={40}
              className="object-contain"
            />
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">Beranda</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">Fitur</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">Simulasi Interview</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">Pengembangan Skill</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">Harga</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">Tentang Kami</a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-gray-600 hover:text-indigo-600 text-sm font-medium px-4 py-2">Masuk</button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">Daftar Gratis</button>
          </div>

          {/* Hamburger */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
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
              <a href="#" className="text-gray-600 text-sm">Beranda</a>
              <a href="#" className="text-gray-600 text-sm">Fitur</a>
              <a href="#" className="text-gray-600 text-sm">Simulasi Interview</a>
              <a href="#" className="text-gray-600 text-sm">Pengembangan Skill</a>
              <a href="#" className="text-gray-600 text-sm">Harga</a>
              <a href="#" className="text-gray-600 text-sm">Tentang Kami</a>
              <div className="flex gap-3 pt-2">
                <button className="text-gray-600 text-sm">Masuk</button>
                <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg">Daftar Gratis</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}