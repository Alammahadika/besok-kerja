import Image from 'next/image'
import Link from 'next/link'

import {
  Camera,
  Briefcase,
  Play,
  ArrowRight
} from 'lucide-react'

export default function Footer() {

  const platformLinks = [
    { label: 'Fitur', href: '/#fitur' },
    { label: 'Simulasi Interview', href: '/simulasi-interview' },
    { label: 'Pengembangan Skill', href: '/rekomendasi-skill' },
    { label: 'Harga', href: '/harga' },
  ]

  const companyLinks = [
    { label: 'Tentang Kami', href: '/tentang-kami' },
    { label: 'Karier', href: '#' },
    { label: 'Kontak', href: '#' },
  ]

  const supportLinks = [
    { label: 'Pusat Bantuan', href: '#' },
    { label: 'Kebijakan Privasi', href: '#' },
    { label: 'Syarat & Ketentuan', href: '#' },
  ]

  return (
    <footer className="bg-black text-gray-400 pt-24 pb-10 overflow-hidden">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 pb-20 border-b border-white/10">

          {/* Brand */}
          <div className="lg:col-span-4">

            <Link href="/" className="inline-block mb-6">
              <div className="bg-white rounded-2xl px-4 py-3 inline-flex">
                <Image
                  src="/logo.png"
                  alt="Besok Kerja"
                  width={130}
                  height={36}
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
              Platform persiapan karier modern untuk membantu kamu
              tampil lebih siap, percaya diri, dan kompetitif.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">

              {[
                { icon: Camera, href: '#' },
                { icon: Briefcase, href: '#' },
                { icon: Play, href: '#' },
              ].map((item, i) => {

                const Icon = item.icon

                return (
                  <Link
                    key={i}
                    href={item.href}
                    className="w-11 h-11 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <Icon size={18} />
                  </Link>
                )
              })}

            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6">
              Platform
            </h4>

            <div className="flex flex-col gap-4">
              {platformLinks.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6">
              Perusahaan
            </h4>

            <div className="flex flex-col gap-4">
              {companyLinks.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6">
              Bantuan
            </h4>

            <div className="flex flex-col gap-4">
              {supportLinks.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">

            <h4 className="text-white font-semibold mb-6">
              Newsletter
            </h4>

            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Dapatkan insight dan tips karier terbaru setiap minggu.
            </p>

            <div className="space-y-3">

              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 focus:border-white/20 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all"
              />

              <button
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 font-semibold rounded-2xl px-5 py-3 transition-all duration-200"
              >
                Subscribe
                <ArrowRight size={16} />
              </button>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-5">

          <p className="text-sm text-gray-500">
            © 2026 Besok Kerja. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">

            <Link
              href="#"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="#"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>

          </div>
        </div>

      </div>
    </footer>
  )
}
