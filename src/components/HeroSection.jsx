import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>⭐</span>
              <span>Platform HR Terlengkap di Indonesia</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Bukan cuma cari kerja.<br />
              Kami bantu kamu<br />
              <span className="text-indigo-600">sampai diterima.</span>
            </h1>

            <p className="text-gray-500 text-base lg:text-lg mb-8 leading-relaxed">
              Besok Kerja adalah platform yang membantu kamu mempersiapkan diri,
              melamar dengan lebih tepat, dan meningkatkan peluang diterima kerja impianmu.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/register"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                Mulai Sekarang →
              </Link>
              <Link href="/register"
                className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold px-6 py-3.5 rounded-xl transition-colors text-center">
                Coba Simulasi Interview
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: '🛡️', text: '100% Gratis untuk fitur dasar' },
                { icon: '🤖', text: 'AI-Powered & Personalized' },
                { icon: '👤', text: 'Aman & Terpercaya' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-xs text-gray-500 leading-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <Image
              src="/hero-dashboard.png"
              alt="Dashboard Besok Kerja"
              width={650}
              height={500}
              className="object-contain w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}