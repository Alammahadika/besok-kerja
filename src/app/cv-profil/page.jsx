'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function CVProfilPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('cv')
  const [previewUrl, setPreviewUrl] = useState(null)
  const [imageBase64, setImageBase64] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [reviewResult, setReviewResult] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
    }
    getUser()
  }, [])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result)
      setImageBase64(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleReviewCV = async () => {
    if (!imageBase64) {
      alert('Upload foto CV dulu!')
      return
    }
    setAiLoading(true)
    setReviewResult(null)

    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'cvReview',
        imageUrl: imageBase64,
        messages: []
      })
    })

    const data = await response.json()

    const skorMatch = data.message.match(/SKOR:\s*(\d+)/)
    const formatMatch = data.message.match(/FORMAT:\s*(\d+)/)
    const kelengkapanMatch = data.message.match(/KELENGKAPAN:\s*(\d+)/)
    const deskripsiMatch = data.message.match(/DESKRIPSI:\s*(\d+)/)
    const skillMatch = data.message.match(/SKILL:\s*(\d+)/)

    setReviewResult({
      skor: skorMatch ? parseInt(skorMatch[1]) : 75,
      format: formatMatch ? parseInt(formatMatch[1]) : 80,
      kelengkapan: kelengkapanMatch ? parseInt(kelengkapanMatch[1]) : 75,
      deskripsi: deskripsiMatch ? parseInt(deskripsiMatch[1]) : 70,
      skill: skillMatch ? parseInt(skillMatch[1]) : 75,
      feedback: data.message
    })

    if (user) {
      await supabase.from('cv').upsert({
        user_id: user.id,
        skor_cv: skorMatch ? parseInt(skorMatch[1]) : 75,
      })
    }
    setAiLoading(false)
  }

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
            { icon: '/Icon_CV Review.png', label: 'CV & Profil', href: '/cv-profil', active: true },
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">CV & Profil</h1>
          <p className="text-gray-500 mt-1">Kelola CV dan profil profesionalmu</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white rounded-xl p-1.5 border border-gray-100 w-fit shadow-sm">
          {[
            { id: 'cv', label: 'CV Review' },
            { id: 'profil', label: 'Profil Saya' },
            { id: 'foto', label: 'Foto Profil' },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors
                ${activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-gray-900'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: CV Review */}
        {activeTab === 'cv' && (
          <div className="grid grid-cols-2 gap-6">

            {/* Upload Foto CV */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Image src="/Icon_CV Review.png" alt="CV" width={24} height={24} className="object-contain" />
                <h2 className="font-bold text-gray-900">Upload Foto CV</h2>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-4">
                <p className="text-xs text-blue-700 font-medium mb-1">Cara menggunakan:</p>
                <p className="text-xs text-blue-600 leading-relaxed">
                  Upload foto atau screenshot CV kamu. AI akan membaca dan menganalisis CV secara visual menggunakan teknologi computer vision.
                </p>
              </div>

              <div
                className="border-2 border-dashed border-indigo-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-indigo-50 mb-4 cursor-pointer hover:bg-indigo-100 transition-colors"
                onClick={() => document.getElementById('cvInput').click()}>
                {previewUrl ? (
                  <div className="w-full">
                    <img src={previewUrl} alt="CV Preview" className="w-full rounded-xl object-contain max-h-64" />
                    <p className="text-xs text-center text-indigo-600 mt-2 font-medium">Klik untuk ganti foto</p>
                  </div>
                ) : (
                  <>
                    <span className="text-4xl mb-3">📄</span>
                    <p className="font-semibold text-gray-900 mb-1">Upload Foto CV</p>
                    <p className="text-xs text-gray-500 mb-2 text-center">Klik atau drag & drop foto CV kamu</p>
                    <p className="text-xs text-gray-400">JPG, PNG (Maks. 10MB)</p>
                  </>
                )}
              </div>

              <input
                id="cvInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

              <button
                onClick={handleReviewCV}
                disabled={aiLoading || !previewUrl}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50">
                {aiLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    AI sedang menganalisis CV...
                  </span>
                ) : 'Review CV dengan AI →'}
              </button>
            </div>

            {/* Hasil Review */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Image src="/Icon_CV Review.png" alt="Review" width={24} height={24} className="object-contain" />
                <h2 className="font-bold text-gray-900">Hasil Review AI</h2>
              </div>

              {!reviewResult && !aiLoading && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                    <Image src="/Icon_CV Review.png" alt="CV" width={40} height={40} className="object-contain" />
                  </div>
                  <p className="font-semibold text-gray-700 mb-1">Belum ada hasil review</p>
                  <p className="text-xs text-gray-400">Upload foto CV untuk mendapatkan feedback dari AI</p>
                </div>
              )}

              {aiLoading && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-gray-500 text-sm">AI sedang menganalisis CV kamu...</p>
                  <p className="text-gray-400 text-xs mt-1">Mohon tunggu sebentar</p>
                </div>
              )}

              {reviewResult && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center mb-2">
                    <div className="relative w-28 h-28">
                      <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#E5E7EB" strokeWidth="10"/>
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#4F46E5" strokeWidth="10"
                          strokeDasharray={`${2 * Math.PI * 50 * (reviewResult.skor / 100)} ${2 * Math.PI * 50}`}
                          strokeLinecap="round"/>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900">{reviewResult.skor}</span>
                        <span className="text-xs text-gray-500">/100</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      { label: 'Format & Tampilan', value: reviewResult.format, color: 'bg-green-400' },
                      { label: 'Kelengkapan Data', value: reviewResult.kelengkapan, color: 'bg-indigo-400' },
                      { label: 'Deskripsi Pengalaman', value: reviewResult.deskripsi, color: 'bg-orange-400' },
                      { label: 'Kesesuaian Skill', value: reviewResult.skill, color: 'bg-blue-400' },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-500">{item.label}</span>
                          <span className="text-xs font-medium text-gray-700">{item.value}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full">
                          <div className={`h-1.5 ${item.color} rounded-full`} style={{ width: `${item.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100 max-h-48 overflow-y-auto">
                    <p className="text-xs font-semibold text-indigo-700 mb-2">Feedback dari AI HR:</p>
                    <p className="text-xs text-indigo-800 leading-relaxed whitespace-pre-line">
                      {reviewResult.feedback}
                    </p>
                  </div>

                  <button
                    onClick={() => { setReviewResult(null); setPreviewUrl(null); setImageBase64(null) }}
                    className="w-full border border-indigo-200 text-indigo-600 font-medium py-2.5 rounded-xl hover:bg-indigo-50 transition-colors text-sm">
                    Review CV Baru
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab: Profil Saya */}
        {activeTab === 'profil' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 max-w-2xl">
            <h2 className="font-bold text-gray-900 mb-6">Informasi Profil</h2>
            <div className="space-y-4">
              {[
                { label: 'Nama Lengkap', placeholder: 'Masukkan nama lengkap', value: user?.user_metadata?.nama || '' },
                { label: 'Email', placeholder: 'Email', value: user?.email || '' },
                { label: 'Nomor HP', placeholder: 'Masukkan nomor HP', value: '' },
                { label: 'Posisi yang Dilamar', placeholder: 'Contoh: Product Designer', value: '' },
                { label: 'Kota', placeholder: 'Masukkan kota', value: '' },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                  <input
                    type="text"
                    defaultValue={field.value}
                    placeholder={field.placeholder}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              ))}
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors">
                Simpan Profil
              </button>
            </div>
          </div>
        )}

        {/* Tab: Foto Profil */}
        {activeTab === 'foto' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 max-w-2xl">
            <h2 className="font-bold text-gray-900 mb-6">Foto Profil Profesional</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="border-2 border-dashed border-indigo-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-indigo-50 mb-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-4xl">👤</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Upload Foto Profil</p>
                  <p className="text-xs text-gray-400 mb-4">JPG, PNG (Maks. 2MB)</p>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors">
                    Pilih Foto
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-4">Review Foto oleh AI</p>
                <div className="space-y-2">
                  {[
                    { label: 'Wajah jelas', status: true },
                    { label: 'Pencahayaan baik', status: true },
                    { label: 'Latar belakang rapi', status: true },
                    { label: 'Ekspresi profesional', status: true },
                    { label: 'Pakaian formal', status: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className={`text-sm ${item.status ? 'text-green-500' : 'text-red-400'}`}>
                        {item.status ? '✓' : '✗'}
                      </span>
                      <span className="text-sm text-gray-600">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}