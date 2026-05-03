import Image from 'next/image'

export default function FeaturesSection() {
  const features = [
    {
      icon: '/Icon_CV Review.png',
      color: 'text-blue-600',
      title: 'CV Review',
      desc: 'Buat CV dengan mudah dan dapatkan review serta tips perbaikan dari AI HR.',
      link: 'Buat CV Sekarang'
    },
    {
      icon: '/Icon_Interview.png',
      color: 'text-purple-600',
      title: 'Simulasi Interview',
      desc: 'Latihan interview kapan saja dengan AI yang berperan sebagai HR profesional.',
      link: 'Mulai Simulasi'
    },
    {
      icon: '/Icon_Feedback Interview.png',
      color: 'text-green-600',
      title: 'Feedback Interview',
      desc: 'Dapatkan penilaian lengkap tentang jawabanmu.',
      link: 'Lihat Hasil'
    },
    {
      icon: '/Icon_Analisis Penolakan.png',
      color: 'text-orange-600',
      title: 'Analisis Penolakan',
      desc: 'AI akan menganalisis CV dan jawabanmu untuk menemukan kemungkinan alasan penolakan.',
      link: 'Cek Analisis'
    },
    {
      icon: '/Icon_Rekomendasi Skill.png',
      color: 'text-red-600',
      title: 'Rekomendasi Skill',
      desc: 'Dapatkan rekomendasi skill yang perlu kamu kuasai beserta urutan prioritasnya.',
      link: 'Lihat Rekomendasi'
    },
    {
      icon: '/Icon_Tips Karier Profesional.png',
      color: 'text-cyan-600',
      title: 'Tips Karier Profesional',
      desc: 'Tips dan strategi karier yang disesuaikan dengan profil dan tujuanmu.',
      link: 'Lihat Tips'
    },
    {
      icon: '/Icon_Review Kandidat.png',
      color: 'text-yellow-600',
      title: 'Review Kandidat',
      desc: 'Dapatkan review mendalam tentang profilmu sebagai kandidat yang ideal.',
      link: 'Lihat Review'
    },
    {
      icon: '/Icon_Progres Persiapanmu.png',
      color: 'text-indigo-600',
      title: 'Progres Persiapanmu',
      desc: 'Pantau semua progres persiapan kerjamu dalam satu dashboard.',
      link: 'Lihat Progress'
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
              <p className="text-gray-500 text-xs leading-relaxed mb-4">{feature.desc}</p>
              <a href="#" className={`text-xs font-semibold ${feature.color} hover:underline`}>
                {feature.link} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}