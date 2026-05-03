import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Besok Kerja"
                width={130}
                height={35}
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Platform persiapan karier dengan AI seperti HR beneran.
            </p>
            <div className="flex gap-3">
              {['📷', '💼', '▶️'].map((icon, i) => (
                <button key={i} className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-sm hover:bg-gray-700 transition-colors">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Platform</h4>
            {[
              { label: 'Fitur', href: '/#fitur' },
              { label: 'Simulasi Interview', href: '/simulasi-interview' },
              { label: 'Pengembangan Skill', href: '/rekomendasi-skill' },
              { label: 'Harga', href: '/#harga' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="block text-sm hover:text-white mb-2 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Bantuan */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Bantuan</h4>
            {[
              { label: 'Pusat Bantuan', href: '#' },
              { label: 'Panduan Pengguna', href: '#' },
              { label: 'Kebijakan Privasi', href: '#' },
              { label: 'Syarat & Ketentuan', href: '#' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="block text-sm hover:text-white mb-2 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Perusahaan */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Perusahaan</h4>
            {[
              { label: 'Tentang Kami', href: '/#tentang' },
              { label: 'Karier', href: '#' },
              { label: 'Kontak Kami', href: '#' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="block text-sm hover:text-white mb-2 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Akun</h4>
            <div className="flex flex-col gap-2 mb-6">
              <Link
                href="/login"
                className="text-sm text-gray-400 hover:text-white transition-colors">
                Masuk
              </Link>
              <Link
                href="/register"
                className="text-sm text-gray-400 hover:text-white transition-colors">
                Daftar Gratis
              </Link>
            </div>
            <h4 className="text-white font-semibold mb-2 text-sm">Newsletter</h4>
            <p className="text-xs mb-3">Tips karier terbaru untuk kamu.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Masukkan email kamu"
                className="flex-1 bg-gray-800 text-white text-xs px-3 py-2.5 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2.5 rounded-lg transition-colors">→</button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-xs">© 2024 Besok Kerja. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}