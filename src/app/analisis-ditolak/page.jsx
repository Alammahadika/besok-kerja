'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AnalisisDitolakPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [step, setStep] = useState('form')
  const [activeTab, setActiveTab] = useState('situasi')
  const [aiLoading, setAiLoading] = useState(false)
  const [hasilAnalisis, setHasilAnalisis] = useState(null)
  const [cvPreview, setCvPreview] = useState(null)
  const [cvBase64, setCvBase64] = useState(null)

  const [formData, setFormData] = useState({
    posisi: '',
    perusahaan: '',
    tahap: 'Screening CV',
    cerita: '',
    alasan: '',
    coverLetter: '',
    kirimCoverLetter: 'ya',
  })

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
    }
    getUser()
  }, [])

  const handleCVUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setCvPreview(reader.result)
      setCvBase64(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleAnalisis = async () => {
    if (!formData.posisi || !formData.perusahaan) {
      alert('Isi posisi dan nama perusahaan dulu!')
      return
    }
    setAiLoading(true)
    setHasilAnalisis(null)

    let prompt = `Analisis kasus penolakan kerja berikut:
    
    Posisi: ${formData.posisi}
    Perusahaan: ${formData.perusahaan}
    Ditolak di tahap: ${formData.tahap}
    Cerita proses: ${formData.cerita}
    Alasan penolakan (jika ada): ${formData.alasan}
    `

    if (formData.coverLetter) {
      prompt += `\nCover Letter yang dikirim:\n${formData.coverLetter}`
    }

    prompt += `\n\nBerikan analisis lengkap dengan format:
    1. KEMUNGKINAN_ALASAN: [list alasan penolakan]
    2. ANALISIS_CV: [analisis CV jika ada]
    3. ANALISIS_COVER_LETTER: [analisis cover letter jika ada]
    4. SARAN_PERBAIKAN: [saran konkret]
    5. LANGKAH_SELANJUTNYA: [langkah yang harus dilakukan]`

    const messages = [{ role: 'user', content: prompt }]

    // Jika ada foto CV
    if (cvBase64) {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'analisis',
          imageUrl: cvBase64,
          messages: [{ role: 'user', content: prompt + '\n\nCV terlampir dalam bentuk foto.' }]
        })
      })
      const data = await response.json()
      setHasilAnalisis(data.message)
    } else {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'analisis',
          messages
        })
      })
      const data = await response.json()
      setHasilAnalisis(data.message)
    }

    // Simpan ke database
    if (user) {
      await supabase.from('analisis').insert({
        user_id: user.id,
        posisi: formData.posisi,
        perusahaan: formData.perusahaan,
        tahap: formData.tahap,
        cerita: formData.cerita,
        alasan: formData.alasan,
      })
    }

    setStep('hasil')
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
            { icon: '/Icon_CV Review.png', label: 'CV & Profil', href: '/cv-profil' },
            { icon: '/Icon_Interview.png', label: 'Simulasi Interview', href: '/simulasi-interview' },
            { icon: '/Icon_Feedback Interview.png', label: 'Hasil & Feedback', href: '/hasil-feedback' },
            { icon: '/Icon_Analisis Penolakan.png', label: 'Analisis Ditolak', href: '/analisis-ditolak', active: true },
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

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Analisis Ditolak</h1>
          <p className="text-gray-500 mt-1">Cari tahu kenapa kamu ditolak dan cara memperbaikinya</p>
        </div>

        {/* STEP: Form */}
        {step === 'form' && (
          <div className="grid grid-cols-2 gap-6">

            {/* Form Input */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Image src="/Icon_Analisis Penolakan.png" alt="Analisis" width={24} height={24} className="object-contain" />
                <h2 className="font-bold text-gray-900">Ceritakan Situasimu</h2>
              </div>

              {/* Sub Tabs */}
              <div className="flex gap-2 mb-6 bg-gray-50 rounded-xl p-1.5 border border-gray-100">
                {[
                  { id: 'situasi', label: 'Situasi' },
                  { id: 'cv', label: 'Upload CV' },
                  { id: 'coverletter', label: 'Cover Letter' },
                ].map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors
                      ${activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab: Situasi */}
              {activeTab === 'situasi' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Posisi yang Dilamar *</label>
                    <input type="text" placeholder="Contoh: Product Designer"
                      value={formData.posisi}
                      onChange={(e) => setFormData({...formData, posisi: e.target.value})}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Perusahaan *</label>
                    <input type="text" placeholder="Contoh: PT Inovasi Digital"
                      value={formData.perusahaan}
                      onChange={(e) => setFormData({...formData, perusahaan: e.target.value})}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ditolak di Tahap</label>
                    <select value={formData.tahap}
                      onChange={(e) => setFormData({...formData, tahap: e.target.value})}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500">
                      <option>Screening CV</option>
                      <option>HR Interview</option>
                      <option>User Interview</option>
                      <option>Test Teknis</option>
                      <option>Offering</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ceritakan Prosesnya</label>
                    <textarea rows={4} placeholder="Ceritakan proses interview yang kamu jalani..."
                      value={formData.cerita}
                      onChange={(e) => setFormData({...formData, cerita: e.target.value})}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Alasan Penolakan (jika ada)</label>
                    <textarea rows={3} placeholder="Tulis alasan penolakan yang diberikan perusahaan..."
                      value={formData.alasan}
                      onChange={(e) => setFormData({...formData, alasan: e.target.value})}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 resize-none" />
                  </div>
                </div>
              )}

              {/* Tab: Upload CV */}
              {activeTab === 'cv' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <p className="text-xs text-blue-700 font-medium mb-1">Konsultasi CV</p>
                    <p className="text-xs text-blue-600 leading-relaxed">
                      Upload foto CV kamu. AI akan menganalisis apakah CV menjadi alasan penolakan.
                    </p>
                  </div>
                  <div
                    className="border-2 border-dashed border-indigo-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-indigo-50 cursor-pointer hover:bg-indigo-100 transition-colors"
                    onClick={() => document.getElementById('cvAnalisisInput').click()}>
                    {cvPreview ? (
                      <div className="w-full">
                        <img src={cvPreview} alt="CV" className="w-full rounded-xl object-contain max-h-48" />
                        <p className="text-xs text-center text-indigo-600 mt-2 font-medium">Klik untuk ganti foto</p>
                      </div>
                    ) : (
                      <>
                        <span className="text-3xl mb-2">📄</span>
                        <p className="text-sm font-medium text-gray-700 mb-1">Upload Foto CV</p>
                        <p className="text-xs text-gray-400">JPG, PNG (Maks. 10MB)</p>
                      </>
                    )}
                  </div>
                  <input id="cvAnalisisInput" type="file" accept="image/*" className="hidden" onChange={handleCVUpload} />
                  {cvPreview && (
                    <button onClick={() => { setCvPreview(null); setCvBase64(null) }}
                      className="w-full text-xs text-red-500 border border-red-200 rounded-xl py-2 hover:bg-red-50 transition-colors">
                      Hapus Foto CV
                    </button>
                  )}
                </div>
              )}

              {/* Tab: Cover Letter */}
              {activeTab === 'coverletter' && (
                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                    <p className="text-xs text-purple-700 font-medium mb-1">Analisis Cover Letter</p>
                    <p className="text-xs text-purple-600 leading-relaxed">
                      AI akan menganalisis surat lamaranmu dan menilai kekuatannya.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apakah kamu mengirim cover letter?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'ya', label: 'Ya, saya kirim' },
                        { id: 'tidak', label: 'Tidak kirim' },
                      ].map((opt) => (
                        <div key={opt.id}
                          onClick={() => setFormData({...formData, kirimCoverLetter: opt.id})}
                          className={`border-2 rounded-xl p-3 cursor-pointer text-center transition-colors
                            ${formData.kirimCoverLetter === opt.id
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-indigo-300'}`}>
                          <p className="text-sm font-medium text-gray-700">{opt.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {formData.kirimCoverLetter === 'ya' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Isi Cover Letter</label>
                      <textarea rows={6} placeholder="Paste isi cover letter kamu di sini..."
                        value={formData.coverLetter}
                        onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 resize-none" />
                    </div>
                  )}
                  {formData.kirimCoverLetter === 'tidak' && (
                    <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                      <p className="text-xs font-semibold text-green-700 mb-2">💡 Tahukah kamu?</p>
                      <p className="text-xs text-green-600 mb-3">
                        Cover letter yang kuat bisa meningkatkan peluang lolos screening hingga 2x lipat!
                      </p>
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-2 rounded-lg transition-colors">
                        Generate Cover Letter dengan AI →
                      </button>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handleAnalisis}
                disabled={aiLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors mt-6 disabled:opacity-50">
                {aiLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    AI sedang menganalisis...
                  </span>
                ) : 'Analisis Sekarang →'}
              </button>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-900 mb-4">Bagaimana AI Menganalisis?</h2>
                <div className="space-y-3">
                  {[
                    { step: '1', title: 'Analisis situasi & cerita', desc: 'AI membaca cerita proses interview kamu' },
                    { step: '2', title: 'Cek CV jika ada', desc: 'AI menganalisis foto CV yang kamu upload' },
                    { step: '3', title: 'Evaluasi cover letter', desc: 'AI menilai kekuatan surat lamaranmu' },
                    { step: '4', title: 'Berikan solusi', desc: 'AI memberikan saran konkret untuk perbaikan' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-600 rounded-2xl p-6 text-white">
                <p className="font-bold mb-2">Tips sebelum analisis:</p>
                <ul className="space-y-2">
                  {[
                    'Ceritakan proses interview sejujur mungkin',
                    'Upload foto CV yang jelas dan mudah dibaca',
                    'Sertakan cover letter jika kamu mengirimnya',
                    'Tulis alasan penolakan jika diberitahu',
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-indigo-100">
                      <span className="text-indigo-300 mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* STEP: Hasil Analisis */}
        {step === 'hasil' && (
          <div className="max-w-3xl space-y-4">

            {/* Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">{formData.posisi} - {formData.perusahaan}</p>
                <p className="text-sm text-gray-500">Ditolak di tahap: {formData.tahap}</p>
              </div>
              <button onClick={() => { setStep('form'); setHasilAnalisis(null) }}
                className="text-sm text-indigo-600 border border-indigo-200 px-4 py-2 rounded-xl hover:bg-indigo-50 transition-colors">
                Analisis Baru
              </button>
            </div>

            {/* AI Response */}
            <div className="bg-indigo-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <p className="font-bold">Analisis AI HR</p>
                  <p className="text-indigo-200 text-xs">Berdasarkan informasi yang kamu berikan</p>
                </div>
              </div>
              <p className="text-sm text-indigo-100 leading-relaxed">
                Berikut adalah hasil analisis lengkap dari situasi penolakan yang kamu alami.
              </p>
            </div>

            {/* Hasil Analisis AI */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Hasil Analisis Lengkap</h3>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {hasilAnalisis}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <Link href="/simulasi-interview"
                className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
                Latihan Simulasi Interview →
              </Link>
              <Link href="/cv-profil"
                className="flex-1 text-center border border-indigo-200 text-indigo-600 font-semibold py-3 rounded-xl hover:bg-indigo-50 transition-colors text-sm">
                Perbaiki CV →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}