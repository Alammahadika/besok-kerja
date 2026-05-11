import {
  FileText,
  Mic,
  BarChart3,
  SearchCheck,
  GraduationCap
} from 'lucide-react'

export default function StepsSection() {

  const steps = [
    {
      number: '01',
      icon: FileText,
      title: 'Buat CV Profesional',
      desc: 'Susun CV yang lebih terstruktur dan relevan dengan posisi yang kamu incar.',
    },
    {
      number: '02',
      icon: Mic,
      title: 'Latihan Interview',
      desc: 'Simulasi interview realistis untuk membantu kamu lebih siap dan percaya diri.',
    },
    {
      number: '03',
      icon: BarChart3,
      title: 'Dapatkan Evaluasi',
      desc: 'Terima feedback dan insight yang membantu meningkatkan kualitas jawabanmu.',
    },
    {
      number: '04',
      icon: SearchCheck,
      title: 'Analisis Kelemahan',
      desc: 'Identifikasi area yang perlu diperbaiki agar peluang diterima semakin besar.',
    },
    {
      number: '05',
      icon: GraduationCap,
      title: 'Kembangkan Skill',
      desc: 'Dapatkan rekomendasi skill dan roadmap belajar sesuai tujuan kariermu.',
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-sm font-semibold text-indigo-600 mb-3 tracking-wide uppercase">
            Career Preparation Flow
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5">
            Persiapan kerja yang lebih
            <span className="text-indigo-600"> terarah </span>
            dan profesional
          </h2>

          <p className="text-lg text-gray-500 leading-relaxed">
            Setiap langkah dirancang untuk membantu kamu tampil lebih siap
            dalam proses rekrutmen modern.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

          {steps.map((step, i) => {
            const Icon = step.icon

            return (
              <div
                key={i}
                className="group bg-white border border-gray-100 rounded-3xl p-6 hover:border-indigo-100 hover:shadow-xl transition-all duration-300"
              >

                {/* Number */}
                <div className="text-xs font-semibold text-gray-400 mb-6">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <Icon size={26} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.desc}
                </p>

              </div>
            )
          })}

        </div>
      </div>
    </section>
  )
}