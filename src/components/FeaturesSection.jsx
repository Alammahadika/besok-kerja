import Image from 'next/image'

export default function FeaturesSection() {
  const features = [
    {
      icon: '/Icon_CV Review.png',
      title: 'CV Review',
      desc: 'Buat CV dengan mudah dan dapatkan review serta tips perbaikan dari AI HR.',
    },
    {
      icon: '/Icon_Interview.png',
      title: 'Simulasi Interview',
      desc: 'Latihan interview kapan saja dengan AI yang berperan sebagai HR profesional.',
    },
    {
      icon: '/Icon_Feedback Interview.png',
      title: 'Feedback Interview',
      desc: 'Dapatkan penilaian lengkap tentang jawabanmu, termasuk skor dan saran perbaikan.',
    },
    {
      icon: '/Icon_Analisis Penolakan.png',
      title: 'Analisis Penolakan',
      desc: 'AI akan menganalisis CV dan jawabanmu untuk menemukan kemungkinan alasan penolakan.',
    },
    {
      icon: '/Icon_Rekomendasi Skill.png',
      title: 'Rekomendasi Skill',
      desc: 'Dapatkan rekomendasi skill yang perlu kamu kuasai beserta urutan prioritasnya.',
    },
    {
      icon: '/Icon_Tips Karier Profesional.png',
      title: 'Tips Karier Profesional',
      desc: 'Tips dan strategi karier yang disesuaikan dengan profil dan tujuanmu.',
    },
    {
      icon: '/Icon_Review Kandidat.png',
      title: 'Review Kandidat',
      desc: 'Dapatkan review mendalam tentang profilmu sebagai kandidat yang ideal.',
    },
    {
      icon: '/Icon_Progres Persiapanmu.png',
      title: 'Progres Persiapanmu',
      desc: 'Pantau semua progres persiapan kerjamu dalam satu dashboard yang mudah dipahami.',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Fitur Lengkap untuk Persiapan Kariermu
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Semua yang kamu butuhkan untuk sukses melamar kerja
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              {/* Icon tanpa background */}
              <div className="mb-4">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={72}
                  height={72}
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm">{feature.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}