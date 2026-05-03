export default function AISection() {
  const points = [
    { icon: '💬', title: 'Feedback Jujur', desc: 'Bukan asal bagus, kami beri kritik yang membangun.' },
    { icon: '🎯', title: 'Saran Spesifik', desc: 'Saran detail sesuai kondisi dan level pengalamanmu.' },
    { icon: '📋', title: 'Contoh Nyata', desc: 'Dilengkapi contoh perbaikan yang bisa langsung kamu pakai.' },
    { icon: '🏆', title: 'Fokus ke Hasil', desc: 'Tujuan kami satu: membantumu lebih siap dan diterima.' },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AI yang Terasa<br />Seperti HR Beneran
            </h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Kami tidak hanya menilai, tapi juga memberi arahan yang jujur, spesifik, dan dapat kamu aksi-kan.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Pelajari Lebih Lanjut
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {points.map((point, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-xl mb-3">
                  {point.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{point.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}