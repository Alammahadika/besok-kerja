import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck, Sparkles, BadgeCheck } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-7">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Platform Persiapan Karier Modern
            </div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-6">
              Persiapkan kariermu
              <br />
              lebih matang,
              <br />
              <span className="text-indigo-600">
                lebih percaya diri.
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-xl">
              Besok Kerja adalah platform yang membantu kamu mempersiapkan diri, 
              melamar dengan lebih tepat, dan meningkatkan peluang diterima kerja impianmu.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">

              <Link
                href="/register"
                className="bg-black hover:bg-gray-900 text-white font-semibold px-7 py-4 rounded-2xl transition-all duration-200 text-center"
              >
                Mulai Gratis
              </Link>

              <Link
                href="/simulasi-interview"
                className="border border-gray-300 hover:border-gray-400 text-gray-800 font-semibold px-7 py-4 rounded-2xl transition-all duration-200 text-center"
              >
                Lihat Simulasi
              </Link>

            </div>

            {/* Trust */}
            <div className="flex flex-wrap gap-6">

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <ShieldCheck size={18} />
                Aman & terpercaya
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Sparkles size={18} />
                AI-powered insights
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <BadgeCheck size={18} />
                Gratis untuk memulai
              </div>

            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">

            {/* Glow */}
            <div className="absolute inset-0 bg-indigo-100 blur-3xl opacity-40 rounded-full"></div>

            <div className="relative bg-white rounded-3xl border border-gray-100 shadow-2xl p-4">
              <Image
                src="/hero-dashboard.png"
                alt="Dashboard Besok Kerja"
                width={650}
                height={500}
                className="object-contain w-full h-auto rounded-2xl"
                priority
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
