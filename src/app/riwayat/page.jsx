'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function RiwayatPage() {
  const [activeTab, setActiveTab] = useState('semua')

  const riwayat = [
    {
      type: 'simulasi',
      icon: '/Icon_Interview.png',
      bg: 'bg-green-50',
      judul: 'Simulasi Interview selesai',
      desc: 'Posisi: Product Designer • HR Interview',
      skor: 'Skor: 85',
      skorColor: 'text-green-600 bg-green-100',
      waktu: '2 jam lalu',
      tanggal: '20 Jan 2025',
      link: '/hasil-feedback',
      linkLabel: 'Lihat Feedback',
    },
    {
      type: 'cv',
      icon: '/Icon_CV Review.png',
      bg: 'bg-blue-50',
      judul: 'CV diperbarui',
      desc: 'Pengalaman kerja & skill ditambahkan',
      skor: 'Skor CV: 78',
      skorColor: 'text-blue-600 bg-blue-100',
      waktu: '1 hari lalu',
      tanggal: '19 Jan 2025',
      link: '/cv-profil',
      linkLabel: 'Lihat CV',
    },
    {
      type: 'feedback',
      icon: '/Icon_Feedback Interview.png',
      bg: 'bg-orange-50',
      judul: 'Feedback diterima',
      desc: 'Simulasi Interview • UI/UX Designer',
      skor: 'Nilai: Baik',
      skorColor: 'text-orange-600 bg-orange-100',
      waktu: '2 hari lalu',
      tanggal: '18 Jan 2025',
      link: '/hasil-feedback',
      linkLabel: 'Lihat Detail',
    },
    {
      type: 'analisis',
      icon: '/Icon_Analisis Penolakan.png',
      bg: 'bg-red-50',
      judul: 'Analisis penolakan selesai',
      desc: 'PT Inovasi Digital • HR Interview',
      skor: 'Risiko: Sedang',
      skorColor: 'text-red-600 bg-red-100',
      waktu: '3 hari lalu',
      tanggal: '17 Jan 2025',
      link: '/analisis-ditolak',
      linkLabel: 'Lihat Analisis',
    },
    {
      type: 'skill',
      icon: '/Icon_Rekomendasi Skill.png',
      bg: 'bg-cyan-50',
      judul: 'Rekomendasi Skill baru',
      desc: 'Figma, UI/UX Design, User Research',
      skor: 'Prioritas: Tinggi',
      skorColor: 'text-cyan-600 bg-cyan-100',
      waktu: '4 hari lalu',
      tanggal: '16 Jan 2025',
      link: '/rekomendasi-skill',
      linkLabel: 'Lihat Skill',
    },
    {
      type: 'simulasi',
      icon: '/Icon_Interview.png',
      bg: 'bg-green-50',
      judul: 'Simulasi Interview selesai',
      desc: 'Posisi: UI/UX Designer • HR Interview',
      skor: 'Skor: 78',
      skorColor: 'text-green-600 bg-green-100',
      waktu: '5 hari lalu',
      tanggal: '15 Jan 2025',
      link: '/hasil-feedback',
      linkLabel: 'Lihat Feedback',
    },
    {
      type: 'tips',
      icon: '/Icon_Tips Karier Profesional.png',
      bg: 'bg-yellow-50',
      judul: 'Tips Karier dibaca',
      desc: 'Cara Menjawab Ceritakan Tentang Dirimu',
      skor: '7 menit baca',
      skorColor: 'text-yellow-600 bg-yellow-100',
      waktu: '6 hari lalu',
      tanggal: '14 Jan 2025',
      link: '/tips-karier',
      linkLabel: 'Baca Lagi',
    },
    {
      type: 'cv',
      icon: '/Icon_CV Review.png',
      bg: 'bg-blue-50',
      judul: 'CV pertama diupload',
      desc: 'CV_Andi_2024.pdf • 2.4 MB',
      skor: 'Skor CV: 65',
      skorColor: 'text-blue-600 bg-blue-100',
      waktu: '1 minggu lalu',
      tanggal: '13 Jan 2025',
      link: '/cv-profil',
      linkLabel: 'Lihat CV',
    },
  ]

  const tabs = [
    { id: 'semua', label: 'Semua' },
    { id: 'simulasi', label: 'Simulasi Interview' },
    { id: 'cv', label: 'CV' },
    { id: 'analisis', label: 'Analisis' },
    { id: 'skill', label: 'Skill' },
    { id: 'tips', label: 'Tips' },
  ]

  const filteredRiwayat = activeTab === 'semua'
    ? riwayat
    : riwayat.filter(r => r.type === activeTab)

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
            { icon: '/Icon_Tips Karier Profesional.png', label: 'Tips Karier', href: '/tips-karier' },
            { icon: '/Icon_Review Kandidat.png', label: 'Riwayat', href: '/riwayat', active: true },
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
          <h1 className="text-2xl font-bold text-gray-900">Riwayat Aktivitas</h1>
          <p className="text-gray-500 mt-1">Semua aktivitas persiapan kariermu dalam satu tempat</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { icon: '/Icon_Interview.png', label: 'Simulasi Selesai', value: '5', color: 'bg-green-50 border-green-100' },
            { icon: '/Icon_CV Review.png', label: 'CV Diperbarui', value: '3', color: 'bg-blue-50 border-blue-100' },
            { icon: '/Icon_Analisis Penolakan.png', label: 'Analisis Ditolak', value: '2', color: 'bg-red-50 border-red-100' },
            { icon: '/Icon_Rekomendasi Skill.png', label: 'Skill Dipelajari', value: '8', color: 'bg-cyan-50 border-cyan-100' },
          ].map((stat, i) => (
            <div key={i} className={`bg-white rounded-2xl p-4 border ${stat.color} shadow-sm flex items-center gap-3`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Image src={stat.icon} alt={stat.label} width={24} height={24} className="object-contain" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-xl p-1.5 border border-gray-100 w-fit shadow-sm flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-500 hover:text-gray-900'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Riwayat List */}
        <div className="space-y-3">
          {filteredRiwayat.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">

              {/* Icon */}
              <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Image src={item.icon} alt={item.judul} width={28} height={28} className="object-contain" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">{item.judul}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.skorColor}`}>
                    {item.skor}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">{item.tanggal}</span>
                </div>
              </div>

              {/* Waktu & Link */}
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-gray-400 mb-2">{item.waktu}</p>
                <Link href={item.link}
                  className="text-xs text-indigo-600 font-medium border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors">
                  {item.linkLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRiwayat.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📋</span>
            </div>
            <p className="font-semibold text-gray-900 mb-1">Belum ada aktivitas</p>
            <p className="text-sm text-gray-500">Mulai persiapan kariermu sekarang!</p>
            <Link href="/dashboard"
              className="inline-block mt-4 bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-indigo-700 transition-colors">
              Mulai Sekarang →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}