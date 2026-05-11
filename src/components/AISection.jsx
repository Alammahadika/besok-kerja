import Link from 'next/link'

import {
  MessageSquareQuote,
  Target,
  ClipboardCheck,
  Trophy,
  ArrowRight
} from 'lucide-react'

export default function AISection() {

  const points = [
    {
      icon: MessageSquareQuote,
      title: 'Feedback Objektif',
      desc: 'Insight yang lebih jujur dan membangun untuk membantu meningkatkan kualitas persiapanmu.',
    },
    {
      icon: Target,
      title: 'Rekomendasi Terarah',
      desc: 'Saran yang disesuaikan dengan posisi, pengalaman, dan tujuan kariermu.',
    },
    {
      icon: ClipboardCheck,
      title: 'Actionable Insights',
      desc: 'Dilengkapi contoh dan arahan yang dapat langsung diterapkan.',
    },
    {
      icon: Trophy,
      title: 'Berorientasi Hasil',
      desc: 'Fokus membantu kamu tampil lebih siap dan kompetitif di proses rekrutmen.',
    },
  ]

  return (
    <section className="py-28 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 mb-5">
              Intelligent Career Preparation
            </p>

            <h2 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-8">
              Persiapan yang lebih
              <span className="text-indigo-600"> strategis </span>
              untuk hasil yang lebih optimal.
            </h2>

            <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-xl">
              Kami membantu kamu memahami kekuatan, kelemahan,
              dan area pengembangan agar proses rekrutmen terasa
              lebih terarah dan profesional.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">

              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200"
              >
                Mulai Gratis
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/tentang-kami"
                className="inline-flex items-center justify-center border border-gray-300 hover:border-gray-400 text-gray-800 font-semibold px-8 py-4 rounded-2xl transition-all duration-200"
              >
                Pelajari Platform
              </Link>

            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">

            {/* Glow */}
            <div className="absolute inset-0 bg-indigo-100 blur-3xl opacity-40 rounded-full"></div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5">

              {points.map((point, i) => {

                const Icon = point.icon

                return (
                  <div
                    key={i}
                    className="group bg-white border border-gray-100 rounded-3xl p-7 hover:shadow-2xl hover:border-indigo-100 transition-all duration-300"
                  >

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <Icon size={26} />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {point.title}
                    </h3>

                    {/* Desc */}
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {point.desc}
                    </p>

                  </div>
                )
              })}

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}