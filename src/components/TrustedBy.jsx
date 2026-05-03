export default function TrustedBy() {
  const companies = [
    { name: 'Binus University', logo: '🎓' },
    { name: 'Telkom Indonesia', logo: '📡' },
    { name: 'Tokopedia', logo: '🛒' },
    { name: 'Gojek', logo: '🛵' },
    { name: 'Deloitte', logo: '💼' },
  ]

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500 mb-8">
          Sudah dipercaya oleh <span className="font-semibold text-gray-700">10.000+ pencari kerja</span> di Indonesia
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {companies.map((company, i) => (
            <div key={i} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
              <span className="text-2xl">{company.logo}</span>
              <span className="font-bold text-gray-600">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}