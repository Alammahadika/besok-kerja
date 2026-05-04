export default function TrustedBy() {
  const segments = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
        </svg>
      ),
      title: 'Fresh Graduate',
      desc: 'Siap memasuki dunia kerja',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h4z"/>
        </svg>
      ),
      title: 'Profesional',
      desc: 'Kembangkan karier dan level berikutnya',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z"/>
        </svg>
      ),
      title: 'Career Switcher',
      desc: 'Beralih ke jalur karier baru',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      ),
      title: 'Entrepreneur',
      desc: 'Bangun bisnis dan kembangkan dirimu',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      ),
      title: 'Job Seeker',
      desc: 'Temukan peluang kerja terbaik',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
        </svg>
      ),
      title: 'Freelancer',
      desc: 'Tingkatkan skill dan nilai profesionalmu',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
        </svg>
      ),
      title: 'Student',
      desc: 'Persiapkan dirimu sejak sekarang',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      ),
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
            <span>👥</span>
            <span>Untuk Semua Segmen Pekerjaan</span>
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

        {/* Tags - warna slate/gray yang elegan */}
        <div className="flex items-center justify-center gap-6 mb-12 flex-wrap">
          {[
            {
              label: 'Semua Industri',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                </svg>
              )
            },
            {
              label: 'Semua Level',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              )
            },
            {
              label: 'Semua Jurusan',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                </svg>
              )
            },
            {
              label: 'Semua Tujuan Karier',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.13 22.19l-1.63-3.83c1.57-.58 3.04-1.36 4.4-2.27l-2.77 6.1zM5.64 12.5l-3.83-1.63 6.1-2.77C7 9.46 6.22 10.93 5.64 12.5zM21.61 2.39S16.66.269 11 5.93c-2.19 2.19-3.5 4.6-4.35 7.32-.28.93-.03 1.93.63 2.59l1.88 1.88c.66.66 1.66.91 2.59.63 2.72-.85 5.13-2.16 7.32-4.35 5.66-5.66 3.54-10.61 3.54-10.61zM15.5 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM5.85 20.14c1.17-1.17 1.17-3.07 0-4.24-1.17-1.17-3.07-1.17-4.24 0L0 17.51l1.41 1.41.71-.71c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-.71.71L4.24 21.8l1.61-1.66z"/>
                </svg>
              )
            },
          ].map((tag, i) => (
            <div key={i} className="flex items-center gap-6">
              {i > 0 && <div className="h-5 w-px bg-gray-300" />}
              <div className="flex items-center gap-2">
                <span className="text-slate-500">{tag.icon}</span>
                <span className="text-sm text-gray-600 font-medium">{tag.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Segment Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
          {segments.map((segment, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 flex flex-col items-center text-center gap-3 border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500">
                {segment.icon}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{segment.title}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{segment.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-px bg-gray-200 w-32" />
          <p className="text-sm text-gray-500 text-center">
            Kami siap membantumu mencapai pekerjaan impian dan{' '}
            <span className="text-indigo-600 font-semibold">melangkah lebih jauh.</span>
          </p>
          <div className="h-px bg-gray-200 w-32" />
        </div>

      </div>
    </section>
  )
}