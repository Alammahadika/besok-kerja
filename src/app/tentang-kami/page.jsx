import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const missionData = [
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
]

const statsData = [
  { number: '10.000+', label: 'Pengguna Aktif' },
  { number: '85%', label: 'Kepuasan' },
  { number: '3', label: 'Fitur AI' },
  { number: '500+', label: 'Perusahaan' },
]

export default function TentangKamiPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/auth-banner2.png"
            alt="Background"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-indigo-100/40 backdrop-blur-sm" />

        {/* Fade bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

          <div className="inline-flex items-center bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Tentang Kami
          </div>

          <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight mb-6 leading-tight">
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

      {/* MISI & VISI */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div>
              <h2 className="text-3xl font-semibold mb-10">
                Kenapa Kami Ada?
              </h2>

              <div className="space-y-8">
                {missionData.map((item, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold text-sm">
                      {i + 1}
                    </div>

                    <div>
                      <h3 className="font-semibold mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-2 gap-6">
              {statsData.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <p className="text-4xl font-semibold text-indigo-600 mb-2">
                    {stat.number}
                  </p>
                  <p className="font-medium text-gray-900">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-gray-500 mb-8">
            Dipercaya oleh pengguna dari berbagai perusahaan
          </p>

          <div className="flex flex-wrap justify-center gap-10 text-gray-400 font-medium">
            <span>Tokopedia</span>
            <span>Gojek</span>
            <span>Shopee</span>
            <span>Traveloka</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-indigo-600 rounded-3xl p-12 text-center">

            <h2 className="text-3xl font-semibold text-white mb-4">
              Siap mulai perjalanan kariermu?
            </h2>

            <p className="text-indigo-100 mb-8">
              Mulai sekarang dan dapatkan feedback AI dalam hitungan menit.
            </p>

            <Link
              href="/register"
              className="inline-block bg-white text-indigo-600 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-50 transition"
            >
              Daftar Gratis Sekarang
            </Link>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}