import Image from 'next/image'

export default function TestimonialSection() {
  const testimonials = [
    {
      name: 'Rizky Pratama',
      role: 'Staff HR',
      avatar: '/testimonial-1.jpg',
      rating: 5,
      text: 'Feedbacknya detail banget, berasa di-review langsung sama HR. Aku jadi tahu apa yang harus diperbaiki.',
    },
    {
      name: 'Dina Ayu',
      role: 'Fresh Graduate',
      avatar: '/testimonial-2.jpg',
      rating: 5,
      text: 'Sebagai fresh graduate, aku jadi lebih percaya diri setelah latihan interview di sini.',
    },
    {
      name: 'Samuel Wijaya',
      role: 'Marketing Executive',
      avatar: '/testimonial-3.jpg',
      rating: 5,
      text: 'Fitur analisis alasan ditolak membuka mata saya. Ternyata ada hal kecil yang selama ini saya lewatkan.',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Kata Mereka yang Sudah Merasakan Manfaatnya
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                {/* Foto Profil */}
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
                <div className="ml-auto flex">
                  {Array(t.rating).fill(0).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-indigo-600' : 'bg-gray-300'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}