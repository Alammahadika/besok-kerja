export default function StepsSection() {
  const steps = [
    { number: 1, icon: '📄', title: 'Buat CV Terbaikmu', desc: 'Buat CV profesional dengan template menarik. Dapatkan review dan tips dari AI HR.' },
    { number: 2, icon: '🎤', title: 'Latihan Interview AI', desc: 'Simulasi interview realistis sesuai posisi yang kamu inginkan.' },
    { number: 3, icon: '📊', title: 'Dapatkan Feedback', desc: 'AI HR akan menilai jawabanmu dan memberikan feedback mendetail.' },
    { number: 4, icon: '🔍', title: 'Analisis jika Ditolak', desc: 'Cari tahu kemungkinan alasan ditolak dan cara memperbaikinya.' },
    { number: 5, icon: '🎓', title: 'Tingkatkan Skill', desc: 'Dapatkan rekomendasi skill dan roadmap belajar yang paling relevan.' },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
          5 Langkah Jadi Kandidat yang <span className="text-indigo-600">Siap & Dicari</span> Perusahaan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              {/* Icon saja tanpa angka */}
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl mb-4">
                {step.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm">{step.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}