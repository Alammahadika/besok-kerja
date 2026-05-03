'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function TipsKarierPage() {
  const [activeTab, setActiveTab] = useState('semua')
  const [activeKategori, setActiveKategori] = useState('Semua')

  const tips = [
    {
      kategori: 'CV & Lamaran',
      icon: '📄',
      bg: 'bg-blue-50',
      color: 'text-blue-600',
      border: 'border-blue-100',
      judul: '5 Kesalahan CV yang Sering Diabaikan',
      desc: 'Pelajari kesalahan umum dalam membuat CV yang sering luput dari perhatian para pencari kerja.',
      waktu: '5 menit baca',
      tag: 'CV & Lamaran',
    },
    {
      kategori: 'Interview',
      icon: '🎤',
      bg: 'bg-green-50',
      color: 'text-green-600',
      border: 'border-green-100',
      judul: 'Cara Menjawab "Ceritakan Tentang Dirimu"',
      desc: 'Panduan lengkap menjawab pertanyaan interview paling umum dengan percaya diri dan terstruktur.',
      waktu: '7 menit baca',
      tag: 'Interview',
    },
    {
      kategori: 'Karier',
      icon: '💡',
      bg: 'bg-yellow-50',
      color: 'text-yellow-600',
      border: 'border-yellow-100',
      judul: 'Tips Negosiasi Gaji untuk Fresh Graduate',
      desc: 'Strategi negosiasi gaji yang efektif meski kamu baru pertama kali melamar pekerjaan.',
      waktu: '6 menit baca',
      tag: 'Karier',
    },
    {
      kategori: 'Interview',
      icon: '🎤',
      bg: 'bg-green-50',
      color: 'text-green-600',
      border: 'border-green-100',
      judul: 'Metode STAR untuk Menjawab Pertanyaan Behavioral',
      desc: 'Teknik menjawab pertanyaan interview berbasis pengalaman dengan struktur yang jelas dan meyakinkan.',
      waktu: '8 menit baca',
      tag: 'Interview',
    },
    {
      kategori: 'CV & Lamaran',
      icon: '📄',
      bg: 'bg-blue-50',
      color: 'text-blue-600',
      border: 'border-blue-100',
      judul: 'Cara Menulis Cover Letter yang Menarik HRD',
      desc: 'Panduan membuat surat lamaran yang menonjol dan membuat HRD ingin segera menghubungimu.',
      waktu: '6 menit baca',
      tag: 'CV & Lamaran',
    },
    {
      kategori: 'Karier',
      icon: '💡',
      bg: 'bg-yellow-50',
      color: 'text-yellow-600',
      border: 'border-yellow-100',
      judul: 'Membangun Personal Branding di LinkedIn',
      desc: 'Cara memaksimalkan profil LinkedIn agar dilirik recruiter dan membuka peluang karier lebih luas.',
      waktu: '10 menit baca',
      tag: 'Karier',
    },
    {
      kategori: 'Skill',
      icon: '⚡',
      bg: 'bg-purple-50',
      color: 'text-purple-600',
      border: 'border-purple-100',
      judul: 'Skill yang Paling Dicari Perusahaan di 2025',
      desc: 'Daftar skill teknis dan soft skill yang paling dibutuhkan perusahaan di era digital saat ini.',
      waktu: '9 menit baca',
      tag: 'Skill',
    },
    {
      kategori: 'Skill',
      icon: '⚡',
      bg: 'bg-purple-50',
      color: 'text-purple-600',
      border: 'border-purple-100',
      judul: 'Cara Belajar Skill Baru dengan Cepat',
      desc: 'Metode belajar yang efektif untuk menguasai skill baru dalam waktu singkat tanpa overwhelmed.',
      waktu: '7 menit baca',
      tag: 'Skill',
    },
  ]

  const kategoris = ['Semua', 'CV & Lamaran', 'Interview', 'Karier', 'Skill']

  const filteredTips = activeKategori === 'Semua'
    ? tips
    : tips.filter(t => t.tag === activeKategori)

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
            { icon: '/Icon_Feedback Interview.png', label: 'Hasil & Feedback', href: '/hasil-feedback' },
            { icon: '/Icon_Analisis Penolakan.png', label: 'Analisis Ditolak', href: '/analisis-ditolak' },
            { icon: '/Icon_Rekomendasi Skill.png', label: 'Rekomendasi Skill', href: '/rekomendasi-skill' },
            { icon: '/Icon_Tips Karier Profesional.png', label: 'Tips Karier', href: '/tips-karier', active: true },
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
          <h1 className="text-2xl font-bold text-gray-900">Tips Karier</h1>
          <p className="text-gray-500 mt-1">Tips dan strategi karier yang disesuaikan untukmu</p>
        </div>

        {/* AI Tips Personal */}
        <div className="bg-indigo-600 rounded-2xl p-6 mb-8 flex items-center gap-6">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <span className="text-3xl">🤖</span>
          </div>
          <div className="flex-1">
            <p className="font-bold text-white mb-1">Tips Personal dari AI HR</p>
            <p className="text-indigo-200 text-sm leading-relaxed">
              Berdasarkan profil dan aktivitasmu, AI merekomendasikan kamu untuk fokus pada
              <strong className="text-white"> peningkatan skill Figma</strong> dan
              <strong className="text-white"> latihan menjawab pertanyaan behavioral</strong> untuk meningkatkan peluang diterima.
            </p>
          </div>
          <button className="bg-white text-indigo-600 font-semibold text-sm px-5 py-2.5 rounded-xl whitespace-nowrap hover:bg-indigo-50 transition-colors">
            Lihat Detail →
          </button>
        </div>

        {/* Filter Kategori */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {kategoris.map((kat) => (
            <button
              key={kat}
              onClick={() => setActiveKategori(kat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border
                ${activeKategori === kat
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'}`}
            >
              {kat}
            </button>
          ))}
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredTips.map((tip, i) => (
            <div key={i} className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer`}>
              <div className={`w-12 h-12 ${tip.bg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {tip.icon}
              </div>
              <span className={`text-xs font-medium ${tip.color} ${tip.bg} px-2 py-1 rounded-full border ${tip.border} mb-3 inline-block`}>
                {tip.tag}
              </span>
              <h3 className="font-bold text-gray-900 mb-2 text-sm leading-snug">{tip.judul}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{tip.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">⏱ {tip.waktu}</span>
                <button className={`text-xs font-semibold ${tip.color} hover:underline`}>
                  Baca Selengkapnya →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Harian */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-900">Tips Harian</h2>
            <span className="text-xs text-gray-400">Diperbarui setiap hari</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                icon: '☀️',
                judul: 'Tips Hari Ini',
                desc: 'Selalu sesuaikan CV dengan job description setiap posisi yang kamu lamar. Jangan kirim CV yang sama ke semua perusahaan!',
                color: 'bg-yellow-50 border-yellow-100',
              },
              {
                icon: '💪',
                judul: 'Motivasi',
                desc: 'Penolakan bukan akhir segalanya. Setiap penolakan adalah kesempatan untuk belajar dan menjadi lebih baik.',
                color: 'bg-green-50 border-green-100',
              },
              {
                icon: '📌',
                judul: 'Fakta Menarik',
                desc: 'Recruiter rata-rata hanya butuh 7 detik untuk memutuskan apakah akan membaca CV lebih lanjut. Buat kesan pertama yang kuat!',
                color: 'bg-blue-50 border-blue-100',
              },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-5 border ${item.color}`}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-bold text-gray-900 text-sm mb-2">{item.judul}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}