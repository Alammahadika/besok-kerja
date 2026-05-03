'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SimulasiInterviewPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [step, setStep] = useState('pilih')
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [jawaban, setJawaban] = useState('')
  const [pertanyaanKe, setPertanyaanKe] = useState(1)
  const [totalPertanyaan, setTotalPertanyaan] = useState(5)
  const [skor, setSkor] = useState(0)
  const [formData, setFormData] = useState({
    posisi: '',
    level: 'Fresh Graduate',
    tipe: 'HR Interview',
    jumlah: '5',
  })

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
    }
    getUser()
  }, [])

  const mulaiSimulasi = async () => {
    if (!formData.posisi) {
      alert('Masukkan posisi yang dilamar dulu!')
      return
    }
    setLoading(true)
    setTotalPertanyaan(parseInt(formData.jumlah))
    setPertanyaanKe(1)
    setMessages([])
    setSkor(0)

    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'interview',
        messages: [{
          role: 'user',
          content: `Mulai simulasi interview untuk posisi ${formData.posisi}. 
          Level: ${formData.level}. Tipe: ${formData.tipe}.
          Berikan pertanyaan interview pertama saja. Jangan berikan feedback dulu.`
        }]
      })
    })

    const data = await response.json()
    setMessages([{ role: 'assistant', content: data.message }])
    setStep('mulai')
    setLoading(false)
  }

  const kirimJawaban = async () => {
    if (!jawaban.trim()) {
      alert('Tulis jawabanmu dulu!')
      return
    }
    setAiLoading(true)

    const newMessages = [
      ...messages,
      { role: 'user', content: jawaban }
    ]
    setMessages(newMessages)
    setJawaban('')

    if (pertanyaanKe >= totalPertanyaan) {
      // Minta feedback & skor akhir
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'interview',
          messages: [
            ...newMessages,
            {
              role: 'user',
              content: `Berikan evaluasi akhir dari semua jawaban saya. 
              Berikan skor total dari 1-100 dalam format "SKOR: [angka]" di awal response.
              Lalu berikan feedback keseluruhan dan saran perbaikan.`
            }
          ]
        })
      })
      const data = await response.json()

      // Ambil skor dari response
      const skorMatch = data.message.match(/SKOR:\s*(\d+)/)
      if (skorMatch) setSkor(parseInt(skorMatch[1]))

      setMessages([...newMessages, { role: 'assistant', content: data.message }])
      setStep('selesai')
    } else {
      // Minta pertanyaan berikutnya
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'interview',
          messages: [
            ...newMessages,
            {
              role: 'user',
              content: `Berikan feedback singkat untuk jawaban saya tadi (1-2 kalimat), 
              lalu lanjutkan ke pertanyaan interview ke-${pertanyaanKe + 1} dari ${totalPertanyaan}.`
            }
          ]
        })
      })
      const data = await response.json()
      setMessages([...newMessages, { role: 'assistant', content: data.message }])
      setPertanyaanKe(prev => prev + 1)
    }
    setAiLoading(false)
  }

  const simpanHasil = async () => {
    if (!user) return
    await supabase.from('simulasi').insert({
      user_id: user.id,
      posisi: formData.posisi,
      tipe: formData.tipe,
      level: formData.level,
      skor: skor,
      status: 'selesai',
    })
    router.push('/hasil-feedback')
  }

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
            { icon: '/Icon_Interview.png', label: 'Simulasi Interview', href: '/simulasi-interview', active: true },
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
      </div>

      {/* MAIN CONTENT */}
      <div className="ml-64 flex-1 p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Simulasi Interview</h1>
          <p className="text-gray-500 mt-1">Latihan interview dengan AI HR profesional</p>
        </div>

        {/* STEP: Pilih Posisi */}
        {step === 'pilih' && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Image src="/Icon_Interview.png" alt="Interview" width={24} height={24} className="object-contain" />
                <h2 className="font-bold text-gray-900">Atur Simulasi Interview</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Posisi yang Dilamar</label>
                  <input
                    type="text"
                    placeholder="Contoh: Product Designer, HR Manager"
                    value={formData.posisi}
                    onChange={(e) => setFormData({...formData, posisi: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Level Pengalaman</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500">
                    <option>Fresh Graduate</option>
                    <option>1-3 Tahun</option>
                    <option>3-5 Tahun</option>
                    <option>5+ Tahun</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Tipe Interview</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'HR Interview', desc: 'Pertanyaan umum & motivasi' },
                      { id: 'User Interview', desc: 'Pertanyaan teknis & skill' },
                    ].map((type) => (
                      <div
                        key={type.id}
                        onClick={() => setFormData({...formData, tipe: type.id})}
                        className={`border-2 rounded-xl p-3 cursor-pointer transition-colors
                          ${formData.tipe === type.id
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-indigo-300'}`}>
                        <p className="text-sm font-medium text-gray-900">{type.id}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{type.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Jumlah Pertanyaan</label>
                  <select
                    value={formData.jumlah}
                    onChange={(e) => setFormData({...formData, jumlah: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500">
                    <option value="5">5 Pertanyaan</option>
                    <option value="10">10 Pertanyaan</option>
                    <option value="15">15 Pertanyaan</option>
                  </select>
                </div>

                <button
                  onClick={mulaiSimulasi}
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50">
                  {loading ? 'Mempersiapkan simulasi...' : 'Mulai Simulasi →'}
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-900 mb-4">Cara Kerja Simulasi</h2>
                <div className="space-y-3">
                  {[
                    { step: '1', title: 'Pilih posisi & pengaturan', desc: 'Tentukan posisi yang ingin kamu lamar' },
                    { step: '2', title: 'Jawab pertanyaan AI HR', desc: 'AI akan memberikan pertanyaan yang realistis' },
                    { step: '3', title: 'Dapatkan feedback', desc: 'AI menilai jawabanmu dan beri saran perbaikan' },
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
            </div>
          </div>
        )}

        {/* STEP: Mulai Interview */}
        {step === 'mulai' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">

              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-bold text-gray-900">{formData.posisi}</p>
                  <p className="text-xs text-gray-500">{formData.tipe} • {formData.level}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">
                    Pertanyaan {pertanyaanKe}/{totalPertanyaan}
                  </p>
                  <div className="flex gap-1 mt-1">
                    {Array(totalPertanyaan).fill(0).map((_, i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full ${i < pertanyaanKe ? 'bg-indigo-600' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                        <span className="text-white text-xs">🤖</span>
                      </div>
                    )}
                    <div className={`max-w-lg px-4 py-3 rounded-2xl text-sm leading-relaxed
                      ${msg.role === 'assistant'
                        ? 'bg-indigo-50 text-indigo-900'
                        : 'bg-indigo-600 text-white'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {aiLoading && (
                  <div className="flex justify-start">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-white text-xs">🤖</span>
                    </div>
                    <div className="bg-indigo-50 px-4 py-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Answer Box */}
              <div className="mb-4">
                <textarea
                  rows={4}
                  placeholder="Ketik jawabanmu di sini..."
                  value={jawaban}
                  onChange={(e) => setJawaban(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('pilih')}
                  className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                  Keluar
                </button>
                <button
                  onClick={kirimJawaban}
                  disabled={aiLoading}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-50">
                  {aiLoading ? 'AI sedang menilai...' : pertanyaanKe >= totalPertanyaan ? 'Selesai & Lihat Hasil →' : 'Kirim Jawaban →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP: Selesai */}
        {step === 'selesai' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center mb-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎉</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Simulasi Selesai!</h2>
              <p className="text-gray-500 mb-6">Kamu telah menyelesaikan simulasi interview!</p>

              <div className="bg-indigo-50 rounded-2xl p-6 mb-6">
                <p className="text-sm text-gray-500 mb-1">Skor Kamu</p>
                <p className="text-5xl font-bold text-indigo-600 mb-1">{skor}</p>
                <p className="text-sm font-medium text-green-600">
                  {skor >= 85 ? 'Sangat Baik! 🌟' : skor >= 70 ? 'Baik! 👍' : 'Terus Berlatih! 💪'}
                </p>
              </div>

              {/* Feedback AI */}
              <div className="bg-gray-50 rounded-2xl p-5 text-left mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-2">Feedback AI HR:</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {messages[messages.length - 1]?.content}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('pilih')}
                  className="flex-1 border border-indigo-200 text-indigo-600 font-semibold py-3 rounded-xl hover:bg-indigo-50 transition-colors">
                  Ulang Simulasi
                </button>
                <button
                  onClick={simpanHasil}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors">
                  Simpan & Lihat Feedback →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}