'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  const namaUser = user?.user_metadata?.nama || user?.email?.split('@')[0] || 'Pengguna'

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col fixed h-full">
        <div className="mb-10">
          <Image src="/logo.png" alt="Besok Kerja" width={140} height={40} className="object-contain" />
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {[
            { icon: '/Icon_Progres Persiapanmu.png', label: 'Beranda', href: '/dashboard', active: true },
            { icon: '/Icon_CV Review.png', label: 'CV & Profil', href: '/cv-profil' },
            { icon: '/Icon_Interview.png', label: 'Simulasi Interview', href: '/simulasi-interview' },
            { icon: '/Icon_Feedback Interview.png', label: 'Hasil & Feedback', href: '/hasil-feedback' },
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

        {/* User Info & Logout */}
        <div className="border-t border-gray-100 pt-4 mt-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 font-bold text-sm">
                {namaUser.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{namaUser}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
            <span>🚪</span>
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="ml-64 flex-1 p-8">

        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Halo, {namaUser}!
          </h1>
          <p className="text-gray-500 mt-1">
            Yuk lanjutkan persiapan kariermu hari ini.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">

          {/* Skor CV */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/Icon_CV Review.png" alt="CV" width={24} height={24} className="object-contain" />
              <p className="text-sm font-semibold text-gray-700">Skor CV Kamu</p>
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#E5E7EB" strokeWidth="10"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#4F46E5" strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 50 * 0} ${2 * Math.PI * 50}`}
                    strokeLinecap="round"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-400">-</span>
                  <span className="text-xs text-gray-400">/100</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center mb-3">
              Upload CV kamu untuk mendapatkan skor!
            </p>
            <Link href="/cv-profil"
              className="block text-center text-xs text-indigo-600 font-medium border border-indigo-200 rounded-lg py-1.5 hover:bg-indigo-50 transition-colors">
              Upload CV Sekarang
            </Link>
          </div>

          {/* Simulasi Selesai */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/Icon_Interview.png" alt="Interview" width={24} height={24} className="object-contain" />
              <p className="text-sm font-semibold text-gray-700">Simulasi Interview</p>
            </div>
            <div className="flex flex-col items-start justify-center">
              <p className="text-5xl font-bold text-gray-400 mb-1">0</p>
              <p className="text-sm text-gray-400 mb-4">Sesi Selesai</p>
              <Link href="/simulasi-interview"
                className="text-xs text-indigo-600 font-medium border border-indigo-200 rounded-lg py-1.5 px-3 hover:bg-indigo-50 transition-colors">
                Mulai Simulasi
              </Link>
            </div>
          </div>

          {/* Progress Persiapan */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/Icon_Progres Persiapanmu.png" alt="Progress" width={24} height={24} className="object-contain" />
              <p className="text-sm font-semibold text-gray-700">Progress Persiapan</p>
            </div>
            {[
              { label: 'CV & Profil', value: 0, color: 'bg-indigo-500' },
              { label: 'Simulasi Interview', value: 0, color: 'bg-blue-400' },
              { label: 'Pengembangan Skill', value: 0, color: 'bg-purple-400' },
              { label: 'Analisis Ditolak', value: 0, color: 'bg-orange-400' },
            ].map((item, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-500">{item.label}</span>
                  <span className="text-xs font-medium text-gray-400">{item.value}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div className={`h-1.5 ${item.color} rounded-full`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6">

          {/* Lanjutkan Persiapanmu */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Lanjutkan Persiapanmu</h2>
            <div className="flex flex-col gap-3">
              {[
                { icon: '/Icon_CV Review.png', title: 'CV Review', desc: 'Upload & review CV kamu dengan AI', href: '/cv-profil', color: 'bg-blue-50' },
                { icon: '/Icon_Interview.png', title: 'Simulasi Interview', desc: 'Latihan interview dengan AI HR', href: '/simulasi-interview', color: 'bg-green-50' },
                { icon: '/Icon_Analisis Penolakan.png', title: 'Analisis Penolakan', desc: 'Cari tahu alasan kamu ditolak', href: '/analisis-ditolak', color: 'bg-red-50' },
                { icon: '/Icon_Rekomendasi Skill.png', title: 'Rekomendasi Skill', desc: 'Skill apa yang perlu ditingkatkan', href: '/rekomendasi-skill', color: 'bg-cyan-50' },
              ].map((item, i) => (
                <Link key={i} href={item.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                  <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center`}>
                    <Image src={item.icon} alt={item.title} width={24} height={24} className="object-contain" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <span className="ml-auto text-gray-300">→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Aktivitas Terakhir */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Aktivitas Terakhir</h2>
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <p className="font-semibold text-gray-700 mb-1">Belum ada aktivitas</p>
              <p className="text-xs text-gray-400 mb-4">Mulai persiapan kariermu sekarang!</p>
              <Link href="/simulasi-interview"
                className="bg-indigo-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors">
                Mulai Sekarang →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}