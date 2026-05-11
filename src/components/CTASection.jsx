import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-24 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="relative rounded-[32px] bg-black px-8 py-16 lg:px-16 overflow-hidden">

          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 blur-3xl rounded-full"></div>

          {/* Content */}
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

            {/* Left */}
            <div className="max-w-2xl">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400 mb-5">
                Start Your Journey
              </p>

              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                Bangun karier yang lebih siap,
                lebih percaya diri,
                dan lebih terarah.
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed">
                Persiapkan proses rekrutmen dengan simulasi interview,
                evaluasi CV, dan insight pengembangan karier dalam satu platform.
              </p>

            </div>

            {/* Right */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 font-semibold px-8 py-4 rounded-2xl transition-all duration-200"
              >
                Mulai Gratis
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/tentang-kami"
                className="inline-flex items-center justify-center border border-white/10 hover:border-white/20 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200"
              >
                Pelajari Lebih Lanjut
              </Link>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}