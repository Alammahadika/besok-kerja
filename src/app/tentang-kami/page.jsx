import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TentangKamiPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/auth-banner2.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay (biar teks kebaca) */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-indigo-100/40 backdrop-blur-[2px]" />

        {/* Fade ke bawah */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>Tentang Kami</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Kami hadir untuk membantu kamu
            <br />
            <span className="text-indigo-600">wujudkan karier impian</span>
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Besok Kerja adalah platform persiapan karier berbasis AI yang membantu
            pencari kerja Indonesia tampil lebih percaya diri dan siap bersaing.
          </p>
        </div>
      </section>

      {/* Misi & Visi */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Kenapa Kami Ada?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Masalah yang Kami Lihat',
                    desc: 'Banyak pencari kerja di Indonesia yang sebenarnya berbakat, namun tidak tahu cara mempersiapkan diri dengan baik.',
                  },
                  {
                    title: 'Solusi yang Kami Tawarkan',
                    desc: 'Platform AI seperti HR profesional yang memberikan feedback jujur dan actionable.',
                  },
                  {
                    title: 'Dampak yang Kami Harapkan',
                    desc: 'Setiap orang punya peluang lebih besar untuk diterima kerja sesuai potensinya.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                      ●
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '10.000+', label: 'Pengguna Aktif' },
                { number: '85%', label: 'Kepuasan' },
                { number: '3', label: 'Fitur AI' },
                { number: '500+', label: 'Perusahaan' },
              ].map((stat, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <p className="text-4xl font-extrabold text-indigo-600 mb-1">{stat.number}</p>
                  <p className="font-bold text-gray-900">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-3xl p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Siap mulai perjalanan kariermu?
            </h2>
            <Link
              href="/register"
              className="inline-block bg-white text-indigo-600 font-bold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors">
              Daftar Gratis Sekarang →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}