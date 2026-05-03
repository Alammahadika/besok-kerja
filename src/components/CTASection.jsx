export default function CTASection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-600 rounded-3xl p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Siap wujudkan karier impianmu?
            </h2>
            <p className="text-indigo-200 text-sm">
              Mulai persiapanmu sekarang, gratis. Upgrade diri, tingkatkan peluang,
              dan jadi kandidat yang dicari perusahaan.
            </p>
          </div>
          <button className="bg-white text-indigo-600 font-bold px-8 py-3.5 rounded-xl whitespace-nowrap hover:bg-indigo-50 transition-colors">
            Daftar Gratis Sekarang →
          </button>
        </div>
      </div>
    </section>
  )
}