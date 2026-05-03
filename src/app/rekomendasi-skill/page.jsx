'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function RekomendasiSkillPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('rekomendasi')
  const [posisi, setPosisi] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [hasilRekomendasi, setHasilRekomendasi] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
    }
    getUser()
  }, [])

  const handleRekomendasi = async () => {
    if (!posisi.trim()) {
      alert('Masukkan posisi yang kamu inginkan dulu!')
      return
    }
    setAiLoading(true)
    setHasilRekomendasi(null)

    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'rekomendasi',
        messages: [{
          role: 'user',
          content: `Berikan rekomendasi skill lengkap untuk posisi ${posisi}. 
          Format response:
          
          SKILL_WAJIB: [list skill wajib, pisahkan dengan koma]
          SKILL_PENDUKUNG: [list skill pendukung, pisahkan dengan koma]
          SKILL_PLUS: [list skill nilai plus, pisahkan dengan koma]
          
          ROADMAP:
          Fase 1 (1-3 bulan): [deskripsi]
          Fase 2 (3-6 bulan): [deskripsi]
          Fase 3 (6-12 bulan): [deskripsi]
          
          SUMBER_BELAJAR: [list platform dan sumber belajar]
          
          PENJELASAN: [penjelasan lengkap mengapa skill ini penting]`
        }]
      })
    })

    const data = await response.json()
    setHasilRekomendasi(data.message)
    setAiLoading(false)
  }

  // Parse skill dari response AI
  const parseSkill = (text, key) => {
    if (!text) return []
    const match = text.match(new RegExp(`${key}:\\s*([^\\n]+)`))
    if (!match) return []
    return match[1].split(',').map(s => s.trim()).filter(Boolean)
  }

  const skillWajib = parseSkill(hasilRekomendasi, 'SKILL_WAJIB')
  const skillPendukung = parseSkill(hasilRekomendasi, 'SKILL_PENDUKUNG')
  const skillPlus = parseSkill(hasilRekomendasi, 'SKILL_PLUS')

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col fixed h-full">
        <div className="mb-10">
          <Image src="/logo.png" alt="Besok Kerja" width={140} height={40} className="object-contain" />
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {[
            { icon: '/Icon_Progres Persiapanmu.png', label: 'Beranda', href: '/dashboard' },
            { icon: '/Icon_CV Review.png', label: 'CV & Profil', href: '/cv-profil' },
            { icon: '/Icon_Interview.png', label: 'Simulasi Interview', href: '/simulasi-interview' },
            { icon: '/Icon_Feedback Interview.png', label: 'Hasil & Feedback', href: '/hasil-feedback' },
            { icon: '/Icon_Analisis Penolakan.png', label: 'Analisis Ditolak', href: '/analisis-ditolak' },
            { icon: '/Icon_Rekomendasi Skill.png', label: 'Rekomendasi Skill', href: '/rekomendasi-skill', active: true },
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
        <div className="border-t border-gray-100 pt-4 mt-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 font-bold text-sm">
                {user?.user_metadata?.nama?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.user_metadata?.nama || 'Pengguna'}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={async () => { await supabase.auth.signOut(); router.push('/login') }}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
            <span>🚪</span><span>Keluar</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="ml-64 flex-1 p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Rekomendasi Skill</h1>
          <p className="text-gray-500 mt-1">Skill yang perlu kamu kuasai untuk karier impianmu</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white rounded-xl p-1.5 border border-gray-100 w-fit shadow-sm">
          {[
            { id: 'rekomendasi', label: 'Rekomendasi AI' },
            { id: 'roadmap', label: 'Roadmap Belajar' },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors
                ${activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-gray-900'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Rekomendasi */}
        {activeTab === 'rekomendasi' && (
          <div className="space-y-6">

            {/* Input Posisi */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/Icon_Rekomendasi Skill.png" alt="Skill" width={24} height={24} className="object-contain" />
                <h2 className="font-bold text-gray-900">Dapatkan Rekomendasi Skill dari AI</h2>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Masukkan posisi yang kamu inginkan, contoh: Product Designer"
                  value={posisi}
                  onChange={(e) => setPosisi(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRekomendasi()}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleRekomendasi}
                  disabled={aiLoading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap disabled:opacity-50">
                  {aiLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Loading...
                    </span>
                  ) : 'Cari Skill →'}
                </button>
              </div>
            </div>

            {/* Loading */}
            {aiLoading && (
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-gray-500 text-sm">AI sedang menganalisis skill yang dibutuhkan...</p>
                <p className="text-gray-400 text-xs mt-1">Mohon tunggu sebentar</p>
              </div>
            )}

            {/* Belum ada hasil */}
            {!hasilRekomendasi && !aiLoading && (
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                  <Image src="/Icon_Rekomendasi Skill.png" alt="Skill" width={40} height={40} className="object-contain" />
                </div>
                <p className="font-semibold text-gray-700 mb-1">Masukkan posisi yang kamu inginkan</p>
                <p className="text-xs text-gray-400">AI akan merekomendasikan skill yang perlu kamu kuasai</p>
              </div>
            )}

            {/* Hasil Rekomendasi */}
            {hasilRekomendasi && !aiLoading && (
              <div className="space-y-4">

                {/* Skill Wajib */}
                {skillWajib.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">🔴</span>
                      <h3 className="font-bold text-gray-900">Skill Wajib</h3>
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">Prioritas Tinggi</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {skillWajib.map((skill, i) => (
                        <div key={i} className="bg-red-50 border border-red-100 rounded-xl p-3 text-center">
                          <p className="text-sm font-semibold text-gray-900">{skill}</p>
                          <span className="text-xs text-red-600 font-medium">Wajib</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skill Pendukung */}
                {skillPendukung.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">🟡</span>
                      <h3 className="font-bold text-gray-900">Skill Pendukung</h3>
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">Prioritas Sedang</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {skillPendukung.map((skill, i) => (
                        <div key={i} className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-center">
                          <p className="text-sm font-semibold text-gray-900">{skill}</p>
                          <span className="text-xs text-orange-600 font-medium">Disarankan</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skill Nilai Plus */}
                {skillPlus.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">🟢</span>
                      <h3 className="font-bold text-gray-900">Skill Nilai Plus</h3>
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">Prioritas Rendah</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {skillPlus.map((skill, i) => (
                        <div key={i} className="bg-green-50 border border-green-100 rounded-xl p-3 text-center">
                          <p className="text-sm font-semibold text-gray-900">{skill}</p>
                          <span className="text-xs text-green-600 font-medium">Nilai Plus</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Penjelasan Lengkap AI */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">🤖</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Penjelasan dari AI</p>
                      <p className="text-xs text-gray-500">Analisis lengkap untuk posisi {posisi}</p>
                    </div>
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                    <p className="text-sm text-indigo-800 leading-relaxed whitespace-pre-line">
                      {hasilRekomendasi}
                    </p>
                  </div>
                </div>

                {/* Tombol Cari Lagi */}
                <button
                  onClick={() => { setHasilRekomendasi(null); setPosisi('') }}
                  className="w-full border border-indigo-200 text-indigo-600 font-medium py-3 rounded-xl hover:bg-indigo-50 transition-colors text-sm">
                  Cari Rekomendasi Skill Lain
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab: Roadmap */}
        {activeTab === 'roadmap' && (
          <div className="max-w-3xl space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-2">Roadmap Belajar</h2>
              <p className="text-sm text-gray-500 mb-6">
                Masukkan posisi di tab Rekomendasi AI terlebih dahulu untuk mendapatkan roadmap personal
              </p>

              {hasilRekomendasi ? (
                <div className="space-y-4">
                  {[
                    { fase: 'Fase 1', judul: '1-3 Bulan', color: 'bg-red-50 border-red-100', badge: 'bg-red-100 text-red-600' },
                    { fase: 'Fase 2', judul: '3-6 Bulan', color: 'bg-orange-50 border-orange-100', badge: 'bg-orange-100 text-orange-600' },
                    { fase: 'Fase 3', judul: '6-12 Bulan', color: 'bg-blue-50 border-blue-100', badge: 'bg-blue-100 text-blue-600' },
                  ].map((fase, i) => {
                    const match = hasilRekomendasi.match(new RegExp(`${fase.fase}[^:]*:\\s*([^\\n]+)`))
                    const content = match ? match[1] : 'Dapatkan rekomendasi terlebih dahulu'
                    return (
                      <div key={i} className={`rounded-2xl p-5 border ${fase.color}`}>
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${fase.badge}`}>{fase.fase}</span>
                          <h3 className="font-bold text-gray-900">{fase.judul}</h3>
                        </div>
                        <p className="text-sm text-gray-700">{content}</p>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                    <Image src="/Icon_Rekomendasi Skill.png" alt="Skill" width={40} height={40} className="object-contain" />
                  </div>
                  <p className="font-semibold text-gray-700 mb-1">Belum ada roadmap</p>
                  <p className="text-xs text-gray-400 mb-4">Dapatkan rekomendasi skill terlebih dahulu</p>
                  <button
                    onClick={() => setActiveTab('rekomendasi')}
                    className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-indigo-700 transition-colors">
                    Dapatkan Rekomendasi →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}