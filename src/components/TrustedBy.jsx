export default function TrustedBy() {
  const segments = [
    {
      icon: '👥',
      bg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      title: 'Fresh Graduate',
      desc: 'Siap memasuki dunia kerja',
    },
    {
      icon: '💼',
      bg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: 'Profesional',
      desc: 'Kembangkan karier dan level berikutnya',
    },
    {
      icon: '🚀',
      bg: 'bg-teal-100',
      iconColor: 'text-teal-600',
      title: 'Career Switcher',
      desc: 'Beralih ke jalur karier baru',
    },
    {
      icon: '🏢',
      bg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      title: 'Entrepreneur',
      desc: 'Bangun bisnis dan kembangkan dirimu',
    },
    {
      icon: '❤️',
      bg: 'bg-pink-100',
      iconColor: 'text-pink-600',
      title: 'Job Seeker',
      desc: 'Temukan peluang kerja terbaik',
    },
    {
      icon: '💻',
      bg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      title: 'Freelancer',
      desc: 'Tingkatkan skill dan nilai profesionalmu',
    },
    {
      icon: '⭐',
      bg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      title: 'Student',
      desc: 'Persiapkan dirimu sejak sekarang',
    },
    {
      icon: '···',
      bg: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      title: 'Lainnya',
      desc: 'Semua peran, semua bisa',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full text-sm font-semibold border border-indigo-200">
            <span>Bergabung Sekarang!</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-4 leading-tight">
          Untuk{' '}
          <span className="text-indigo-600">siapa pun</span>
          , di bidang{' '}
          <span className="text-indigo-600">apa pun.</span>
        </h2>

        {/* Sub heading */}
        <p className="text-center text-gray-500 mb-10 text-base leading-relaxed">
          Apa pun latar belakang dan tujuan kariermu, Besok Kerja hadir untuk
          <br />
          membantu kamu lebih siap, percaya diri, dan selangkah lebih maju.
        </p>

        {/* Tags */}
        <div className="flex items-center justify-center gap-4 mb-14 flex-wrap">
          {[
            { icon: '🏢', label: 'Semua Industri' },
            { icon: '📊', label: 'Semua Level' },
            { icon: '🎓', label: 'Semua Jurusan' },
            { icon: '🎯', label: 'Semua Tujuan Karier' },
          ].map((tag, i) => (
            <div key={i} className="flex items-center gap-6">
              {i > 0 && <div className="h-5 w-px bg-gray-300" />}
              <div className="flex items-center gap-2">
                <span className="text-base text-indigo-500">{tag.icon}</span>
                <span className="text-sm text-gray-600 font-medium">{tag.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Segment Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-14">
          {segments.map((segment, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 flex flex-col items-center text-center gap-4 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              {/* Icon Circle */}
              <div className={`w-20 h-20 ${segment.bg} rounded-full flex items-center justify-center`}>
                <span className="text-3xl">{segment.icon}</span>
              </div>
              {/* Text */}
              <div>
                <p className="font-bold text-gray-900 text-sm">{segment.title}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{segment.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-px bg-gray-300 w-32" />
          <p className="text-sm text-gray-500 text-center flex items-center gap-2">
            Kami siap membantumu mencapai pekerjaan impian dan{' '}
            <span className="text-indigo-600 font-bold">melangkah lebih jauh.</span>
          </p>
          <div className="h-px bg-gray-300 w-32" />
        </div>

      </div>
    </section>
  )
}