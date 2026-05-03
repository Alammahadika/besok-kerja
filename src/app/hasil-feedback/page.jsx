'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function HasilFeedbackPage() {
  const [activeTab, setActiveTab] = useState('ringkasan')

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col fixed h-full">
        <div className="mb-10">
          <Image src="/logo.png" alt="Besok Kerja" width={140} height={40} className="object-contain" />
        </div>
        <nav className="flex flex-col gap-1">
          {[
            { icon: '/Icon_Progres Persiapanmu.png', label: 'Beranda', href: '/dashboard' },
            { icon: '/Icon_CV Review.png', label: 'CV & Profil', href: '/cv-profil' },
            { icon: '/Icon_Interview.png', label: 'Simulasi Interview', href: '/simulasi-interview' },
            { icon: '/Icon_Feedback Interview.png', label: 'Hasil & Feedback', href: '/hasil-feedback', active: true },
            { icon: '/Icon_Analisis Penolakan.png', label: 'Analisis Ditolak', href: '/analisis-ditolak' },
            { icon: '/Icon_Rekomendasi Skill.png', label: 'Rekomendasi Skill', href: '/rekomendasi-skill' },
            { icon: '/Icon_Tips Karier Profesional.png', label: 'Tips Karier', href: '/tips-karier' },
            { icon: '/Icon_Review Kandidat.png', label: 'Riwayat', href: '/riwayat' },
          ].map((item, i) => (
            <Link key={i} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                ${item.active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
              <Image src={item.icon} alt={item.label} width={20} height={20} className="object-contain" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="ml-64 flex-1 p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Hasil & Feedback</h1>
          <p className="text-gray-500 mt-1">Lihat hasil simulasi interview dan feedback dari AI HR</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white rounded-xl p-1.5 border border-gray-100 w-fit shadow-sm">
          {[
            { id: 'ringkasan', label: 'Ringkasan' },
            { id: 'detail', label: 'Detail Jawaban' },
            { id: 'saran', label: 'Saran Perbaikan' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-500 hover:text-gray-900'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Ringkasan */}
        {activeTab === 'ringkasan' && (
          <div className="grid grid-cols-3 gap-6">

            {/* Skor Keseluruhan */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
              <div className="flex items-center gap-3 mb-4 w-full">
                <Image src="/Icon_Feedback Interview.png" alt="Feedback" width={24} height={24} className="object-contain" />
                <h2 className="font-bold text-gray-900">Skor Keseluruhan</h2>
              </div>
              <div className="relative w-36 h-36 mb-4">
                <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#E5E7EB" strokeWidth="10"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#4F46E5" strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 50 * 0.85} ${2 * Math.PI * 50}`}
                    strokeLinecap="round"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">85</span>
                  <span className="text-xs text-gray-500">/100</span>
                </div>
              </div>
              <span className="bg-green-100 text-green-600 text-sm font-semibold px-4 py-1.5 rounded-full">
                Sangat Baik
              </span>
              <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
                Kamu sudah sangat baik! Tingkatkan sedikit lagi untuk hasil sempurna.
              </p>
            </div>

            {/* Detail Skor */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Detail Skor</h2>
              <div className="space-y-4">
                {[
                  { label: 'Kejelasan Jawaban', value: 88, color: 'bg-indigo-500' },
                  { label: 'Relevansi Jawaban', value: 85, color: 'bg-blue-400' },
                  { label: 'Kepercayaan Diri', value: 80, color: 'bg-purple-400' },
                  { label: 'Struktur Kalimat', value: 87, color: 'bg-green-400' },
                  { label: 'Penggunaan Contoh', value: 75, color: 'bg-orange-400' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">{item.label}</span>
                      <span className="text-xs font-medium text-gray-700">{item.value}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div className={`h-1.5 ${item.color} rounded-full`}
                        style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Sesi */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Info Sesi</h2>
              <div className="space-y-3">
                {[
                  { label: 'Posisi', value: 'Product Designer' },
                  { label: 'Tipe Interview', value: 'HR Interview' },
                  { label: 'Level', value: 'Fresh Graduate' },
                  { label: 'Jumlah Pertanyaan', value: '5 Pertanyaan' },
                  { label: 'Waktu', value: '15 menit' },
                  { label: 'Tanggal', value: '20 Januari 2025' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-500">{item.label}</span>
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
              <Link href="/simulasi-interview"
                className="block w-full text-center mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
                Mulai Simulasi Baru
              </Link>
            </div>
          </div>
        )}

        {/* Tab: Detail Jawaban */}
        {activeTab === 'detail' && (
          <div className="space-y-4 max-w-3xl">
            {[
              {
                no: 1,
                pertanyaan: 'Ceritakan tentang dirimu dan apa yang membuatmu tertarik melamar posisi Product Designer?',
                jawaban: 'Saya adalah fresh graduate dari jurusan Desain Komunikasi Visual. Saya tertarik dengan posisi ini karena...',
                skor: 88,
                status: 'Baik',
                color: 'text-green-600',
                bg: 'bg-green-100',
              },
              {
                no: 2,
                pertanyaan: 'Apa kelebihan dan kekurangan kamu sebagai seorang Product Designer?',
                jawaban: 'Kelebihan saya adalah kemampuan visual yang kuat dan perhatian terhadap detail...',
                skor: 80,
                status: 'Cukup Baik',
                color: 'text-blue-600',
                bg: 'bg-blue-100',
              },
              {
                no: 3,
                pertanyaan: 'Bagaimana cara kamu menangani feedback negatif dari klien atau tim?',
                jawaban: 'Saya selalu menerima feedback dengan terbuka dan mencoba memahami perspektif...',
                skor: 85,
                status: 'Baik',
                color: 'text-green-600',
                bg: 'bg-green-100',
              },
              {
                no: 4,
                pertanyaan: 'Di mana kamu melihat dirimu 5 tahun ke depan?',
                jawaban: 'Saya ingin berkembang menjadi Senior Product Designer dan memimpin tim kreatif...',
                skor: 75,
                status: 'Perlu Ditingkatkan',
                color: 'text-orange-600',
                bg: 'bg-orange-100',
              },
              {
                no: 5,
                pertanyaan: 'Mengapa kamu ingin bergabung dengan perusahaan kami?',
                jawaban: 'Saya sangat mengagumi inovasi yang dilakukan perusahaan ini terutama dalam bidang...',
                skor: 90,
                status: 'Sangat Baik',
                color: 'text-indigo-600',
                bg: 'bg-indigo-100',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {item.no}
                    </div>
                    <p className="text-sm font-medium text-gray-900">{item.pertanyaan}</p>
                  </div>
                  <span className={`text-xs font-semibold ${item.color} ${item.bg} px-3 py-1 rounded-full ml-4 whitespace-nowrap`}>
                    {item.status} ({item.skor})
                  </span>
                </div>
                <div className="ml-10 bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Jawaban kamu:</p>
                  <p className="text-sm text-gray-700">{item.jawaban}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Saran Perbaikan */}
        {activeTab === 'saran' && (
          <div className="max-w-3xl space-y-4">

            {/* Overall Feedback */}
            <div className="bg-indigo-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <p className="font-bold">Feedback dari AI HR</p>
                  <p className="text-indigo-200 text-xs">Berdasarkan simulasi interview kamu</p>
                </div>
              </div>
              <p className="text-sm text-indigo-100 leading-relaxed">
                Secara keseluruhan kamu sudah sangat baik! Jawabanmu terstruktur dan relevan.
                Ada beberapa hal yang bisa ditingkatkan untuk membuat jawabanmu lebih kuat dan meyakinkan.
              </p>
            </div>

            {/* Saran Detail */}
            {[
              {
                icon: '💪',
                title: 'Yang Sudah Baik',
                bg: 'bg-green-50',
                border: 'border-green-100',
                titleColor: 'text-green-700',
                items: [
                  'Jawaban terstruktur dengan baik dan mudah dipahami',
                  'Menunjukkan antusiasme dan motivasi yang tinggi',
                  'Menggunakan bahasa yang sopan dan profesional',
                ]
              },
              {
                icon: '📈',
                title: 'Yang Perlu Ditingkatkan',
                bg: 'bg-orange-50',
                border: 'border-orange-100',
                titleColor: 'text-orange-700',
                items: [
                  'Tambahkan contoh konkret dan pengalaman nyata dalam jawaban',
                  'Perkuat jawaban tentang rencana 5 tahun ke depan dengan lebih spesifik',
                  'Latih kepercayaan diri saat menjawab pertanyaan tentang kekurangan',
                ]
              },
              {
                icon: '💡',
                title: 'Tips untuk Interview Berikutnya',
                bg: 'bg-blue-50',
                border: 'border-blue-100',
                titleColor: 'text-blue-700',
                items: [
                  'Gunakan metode STAR (Situation, Task, Action, Result) untuk menjawab',
                  'Riset lebih dalam tentang perusahaan sebelum interview',
                  'Siapkan 2-3 pertanyaan untuk ditanyakan ke interviewer',
                ]
              },
            ].map((section, i) => (
              <div key={i} className={`${section.bg} rounded-2xl p-6 border ${section.border}`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{section.icon}</span>
                  <h3 className={`font-bold ${section.titleColor}`}>{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <Link href="/simulasi-interview"
              className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors">
              Mulai Simulasi Baru →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}