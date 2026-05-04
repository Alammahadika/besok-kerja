import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function HargaPage() {
  const plans = [
    {
      name: 'Gratis',
      price: 'Rp 0',
      period: '/ bulan',
      desc: 'Cocok untuk kamu yang baru mulai mempersiapkan karier',
      color: 'bg-white border-gray-200',
      textColor: 'text-gray-900',
      subTextColor: 'text-gray-500',
      badgeBg: 'bg-indigo-50',
      badgeText: 'text-indigo-600',
      buttonColor: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
      buttonText: 'Mulai Gratis',
      href: '/register',
      popular: false,
      features: [
        { label: 'CV Review', value: '1x per bulan', included: true },
        { label: 'Simulasi Interview', value: '1x per bulan', included: true },
        { label: 'Hasil & Feedback', value: 'Dasar', included: true },
        { label: 'Tips Karier', value: '5 artikel', included: true },
        { label: 'Analisis Ditolak', value: null, included: false },
        { label: 'Rekomendasi Skill', value: null, included: false },
        { label: 'Generate Cover Letter', value: null, included: false },
        { label: 'Priority Support', value: null, included: false },
        { label: '1-on-1 Konsultasi', value: null, included: false },
      ]
    },
    {
      name: 'Pro',
      price: 'Rp 49.000',
      period: '/ bulan',
      desc: 'Untuk kamu yang serius ingin meningkatkan peluang diterima kerja',
      color: 'bg-indigo-600 border-indigo-600',
      textColor: 'text-white',
      subTextColor: 'text-indigo-200',
      badgeBg: 'bg-indigo-500',
      badgeText: 'text-white',
      buttonColor: 'bg-white text-indigo-600 hover:bg-indigo-50',
      buttonText: 'Mulai Pro',
      href: '/register',
      popular: true,
      features: [
        { label: 'CV Review', value: 'Unlimited', included: true },
        { label: 'Simulasi Interview', value: 'Unlimited', included: true },
        { label: 'Hasil & Feedback', value: 'Lengkap', included: true },
        { label: 'Tips Karier', value: 'Semua artikel', included: true },
        { label: 'Analisis Ditolak', value: 'Unlimited', included: true },
        { label: 'Rekomendasi Skill', value: 'Unlimited', included: true },
        { label: 'Generate Cover Letter', value: 'AI-Powered', included: true },
        { label: 'Priority Support', value: null, included: true },
        { label: '1-on-1 Konsultasi', value: null, included: false },
      ]
    },
    {
      name: 'Premium',
      price: 'Rp 99.000',
      period: '/ bulan',
      desc: 'Untuk kamu yang ingin hasil maksimal dengan bimbingan HR profesional',
      color: 'bg-white border-gray-200',
      textColor: 'text-gray-900',
      subTextColor: 'text-gray-500',
      badgeBg: 'bg-indigo-50',
      badgeText: 'text-indigo-600',
      buttonColor: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
      buttonText: 'Mulai Premium',
      href: '/register',
      popular: false,
      features: [
        { label: 'CV Review', value: 'Unlimited', included: true },
        { label: 'Simulasi Interview', value: 'Unlimited', included: true },
        { label: 'Hasil & Feedback', value: 'Lengkap', included: true },
        { label: 'Tips Karier', value: 'Semua artikel', included: true },
        { label: 'Analisis Ditolak', value: 'Unlimited', included: true },
        { label: 'Rekomendasi Skill', value: 'Unlimited', included: true },
        { label: 'Generate Cover Letter', value: 'AI-Powered', included: true },
        { label: 'Priority Support', value: '24/7', included: true },
        { label: '1-on-1 Konsultasi', value: '2x per bulan', included: true },
      ]
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>Harga Transparan & Terjangkau</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Pilih Paket yang{' '}
            <span className="text-indigo-600">Sesuai Kebutuhanmu</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
            Mulai gratis tanpa kartu kredit. Upgrade kapan saja untuk akses fitur lengkap.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-1.5 shadow-sm">
            <button className="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white">
              Bulanan
            </button>
            <button className="px-5 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900">
              Tahunan
              <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-semibold">
                Hemat 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-3xl border-2 p-8 relative ${plan.color} ${plan.popular ? 'shadow-2xl scale-105' : 'shadow-sm'}`}>

                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                      Paling Populer
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-3 ${plan.textColor}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-end gap-1 mb-3">
                    <span className={`text-4xl font-extrabold ${plan.textColor}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm mb-1 ${plan.subTextColor}`}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${plan.subTextColor}`}>
                    {plan.desc}
                  </p>
                </div>

                {/* Button */}
                <Link
                  href={plan.href}
                  className={`block w-full text-center font-semibold py-3 rounded-xl transition-colors mb-8 ${plan.buttonColor}`}>
                  {plan.buttonText} →
                </Link>

                {/* Divider */}
                <div className={`h-px mb-6 ${plan.popular ? 'bg-indigo-500' : 'bg-gray-100'}`} />

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {/* Check/X Icon SVG */}
                        {feature.included ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`flex-shrink-0 ${plan.popular ? 'text-green-300' : 'text-green-500'}`}>
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`flex-shrink-0 ${plan.popular ? 'text-indigo-400' : 'text-gray-300'}`}>
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        )}
                        <span className={`text-sm ${plan.popular ? 'text-indigo-100' : feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                          {feature.label}
                        </span>
                      </div>
                      {feature.value && feature.included && (
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${plan.badgeBg} ${plan.badgeText}`}>
                          {feature.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Apakah saya perlu kartu kredit untuk mendaftar gratis?',
                a: 'Tidak! Paket gratis bisa digunakan tanpa kartu kredit. Cukup daftar dengan email atau Google.'
              },
              {
                q: 'Bagaimana cara upgrade ke paket Pro atau Premium?',
                a: 'Kamu bisa upgrade kapan saja dari dashboard. Pembayaran dilakukan secara online dan aman.'
              },
              {
                q: 'Apakah bisa cancel langganan kapan saja?',
                a: 'Ya! Kamu bisa cancel langganan kapan saja tanpa biaya tambahan.'
              },
              {
                q: 'Apakah data saya aman?',
                a: 'Ya, keamanan data adalah prioritas kami. Semua data dienkripsi dan tidak dibagikan ke pihak ketiga.'
              },
              {
                q: 'Apa perbedaan Feedback dasar dan lengkap?',
                a: 'Feedback dasar memberikan penilaian umum. Feedback lengkap mencakup analisis mendalam, skor per kategori, dan saran perbaikan yang spesifik.'
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <p className="font-semibold text-gray-900 mb-2">{faq.q}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-3xl p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Mulai persiapan kariermu sekarang!
            </h2>
            <p className="text-indigo-200 mb-8">
              Bergabung dengan 10.000+ pencari kerja yang sudah merasakan manfaat Besok Kerja.
            </p>
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