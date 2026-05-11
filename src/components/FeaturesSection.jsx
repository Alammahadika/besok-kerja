import {
  FileText,
  Mic,
  BarChart3,
  SearchCheck,
  BrainCircuit,
  Briefcase,
  UserCheck,
  LayoutDashboard,
  ArrowRight
} from 'lucide-react'

export default function FeaturesSection() {

  const features = [
    {
      icon: FileText,
      title: 'CV Review',
      desc: 'Evaluasi CV secara lebih profesional dengan insight dan rekomendasi yang relevan.',
    },
    {
      icon: Mic,
      title: 'Simulasi Interview',
      desc: 'Latihan interview realistis untuk membantu meningkatkan kesiapan dan rasa percaya diri.',
    },
    {
      icon: BarChart3,
      title: 'Feedback Interview',
      desc: 'Dapatkan evaluasi jawaban, penilaian performa, dan saran pengembangan.',
    },
    {
      icon: SearchCheck,
      title: 'Analisis Penolakan',
      desc: 'Identifikasi kemungkinan faktor yang memengaruhi hasil lamaran kerja.',
    },
    {
      icon: BrainCircuit,
      title: 'Rekomendasi Skill',
      desc: 'Temukan skill yang perlu diprioritaskan sesuai target posisi dan industri.',
    },
    {
      icon: Briefcase,
      title: 'Tips Karier',
      desc: 'Akses insight dan strategi pengembangan karier yang lebih terarah.',
    },
    {
      icon: UserCheck,
      title: 'Review Kandidat',
      desc: 'Pahami kekuatan dan area pengembangan dari profil profesionalmu.',
    },
    {
      icon: LayoutDashboard,
      title: 'Progress Dashboard',
      desc: 'Pantau perkembangan persiapan kerja dalam satu dashboard terintegrasi.',
    },
  ]

  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-20">

          <p className="text-sm font-semibold tracking-wide uppercase text-indigo-600 mb-3">
            Features
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-6">
            Semua yang kamu butuhkan
            <span className="text-indigo-600"> untuk berkembang </span>
            dalam karier
          </h2>

          <p className="text-lg text-gray-500 leading-relaxed">
            Platform yang membantu kamu mempersiapkan proses rekrutmen
            dengan lebih modern, terarah, dan profesional.
          </p>

        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature, i) => {

            const Icon = feature.icon

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
                  {feature.title}
                </h3>

                {/* Desc */}
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {feature.desc}
                </p>

                {/* Link */}
                <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Pelajari lebih lanjut
                  <ArrowRight size={16} />
                </div>

              </div>
            )
          })}

        </div>
      </div>
    </section>
  )
}