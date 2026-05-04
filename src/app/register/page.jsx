'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    konfirmasi: '',
  })

  const passwordChecks = {
    minLength: formData.password.length >= 8,
    hasUpper: /[A-Z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
    hasSymbol: /[!@#$%^&*()_+\-=\$\${};':"\\|,.<>\/?]/.test(formData.password),
  }

  const isPasswordValid = Object.values(passwordChecks).every(Boolean)

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!isPasswordValid) {
      setError('Password belum memenuhi semua syarat!')
      setLoading(false)
      return
    }

    if (formData.password !== formData.konfirmasi) {
      setError('Password dan konfirmasi password tidak sama!')
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { nama: formData.nama },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      setError('Gagal daftar. Email mungkin sudah digunakan.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  const handleGoogleRegister = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) setError('Gagal daftar dengan Google.')
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📧</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cek Email Kamu!</h2>
          <p className="text-gray-500 text-sm mb-3">
            Kami sudah mengirim link konfirmasi ke{' '}
            <strong>{formData.email}</strong>.
          </p>
          <p className="text-gray-400 text-xs mb-6">
            Klik link di email untuk mengaktifkan akun dan otomatis masuk ke dashboard.
          </p>
          <Link href="/login"
            className="block w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl text-center hover:bg-indigo-700 transition-colors">
            Kembali ke Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* LEFT - Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-8">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Besok Kerja"
                width={140}
                height={40}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Buat Akun Gratis</h1>
          <p className="text-gray-500 text-sm mb-8">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-indigo-600 font-medium hover:underline">
              Masuk di sini
            </Link>
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          {/* Google Register */}
          <button
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-6 bg-white shadow-sm">
            {/* Google Icon SVG */}
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Daftar dengan Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">atau daftar dengan email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">

            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData.nama}
                onChange={(e) => setFormData({...formData, nama: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="contoh@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none pr-12
                    ${formData.password.length > 0
                      ? isPasswordValid
                        ? 'border-green-400 focus:border-green-500'
                        : 'border-red-300 focus:border-red-400'
                      : 'border-gray-200 focus:border-indigo-500'}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              {/* Syarat Password */}
              {formData.password.length > 0 && (
                <div className="mt-3 bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Syarat Password:</p>
                  {[
                    { check: passwordChecks.minLength, label: 'Minimal 8 karakter' },
                    { check: passwordChecks.hasUpper, label: 'Minimal 1 huruf besar (A-Z)' },
                    { check: passwordChecks.hasNumber, label: 'Minimal 1 angka (0-9)' },
                    { check: passwordChecks.hasSymbol, label: 'Minimal 1 simbol (! @ # $ % _ -)' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${item.check ? 'text-green-500' : 'text-red-400'}`}>
                        {item.check ? '✓' : '✗'}
                      </span>
                      <span className={`text-xs ${item.check ? 'text-green-600' : 'text-red-400'}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Password Strength Bar */}
              {formData.password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => {
                      const filled = Object.values(passwordChecks).filter(Boolean).length >= level
                      const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400']
                      return (
                        <div key={level}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${filled ? colors[level - 1] : 'bg-gray-200'}`}
                        />
                      )
                    })}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {Object.values(passwordChecks).filter(Boolean).length === 0 && 'Sangat Lemah'}
                    {Object.values(passwordChecks).filter(Boolean).length === 1 && 'Lemah'}
                    {Object.values(passwordChecks).filter(Boolean).length === 2 && 'Cukup'}
                    {Object.values(passwordChecks).filter(Boolean).length === 3 && 'Kuat'}
                    {Object.values(passwordChecks).filter(Boolean).length === 4 && '✅ Sangat Kuat'}
                  </p>
                </div>
              )}
            </div>

            {/* Konfirmasi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Konfirmasi Password</label>
              <input
                type="password"
                placeholder="Ulangi password kamu"
                value={formData.konfirmasi}
                onChange={(e) => setFormData({...formData, konfirmasi: e.target.value})}
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none
                  ${formData.konfirmasi.length > 0
                    ? formData.password === formData.konfirmasi
                      ? 'border-green-400 focus:border-green-500'
                      : 'border-red-300 focus:border-red-400'
                    : 'border-gray-200 focus:border-indigo-500'}`}
                required
              />
              {formData.konfirmasi.length > 0 && formData.password !== formData.konfirmasi && (
                <p className="text-xs text-red-500 mt-1">Password tidak sama!</p>
              )}
              {formData.konfirmasi.length > 0 && formData.password === formData.konfirmasi && (
                <p className="text-xs text-green-500 mt-1">✓ Password sama!</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1 accent-indigo-600" required />
              <p className="text-xs text-gray-500">
                Saya setuju dengan{' '}
                <Link href="#" className="text-indigo-600 hover:underline">Syarat & Ketentuan</Link>
                {' '}dan{' '}
                <Link href="#" className="text-indigo-600 hover:underline">Kebijakan Privasi</Link>
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !isPasswordValid}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sedang mendaftar...
                </span>
              ) : 'Daftar Sekarang'}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT - Banner */}
      <div className="hidden lg:flex flex-1 bg-indigo-600 items-center justify-center p-12">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Mulai Perjalanan Kariermu!</h2>
          <p className="text-indigo-200 text-sm leading-relaxed mb-8">
            Bergabung dengan 10.000+ pencari kerja yang sudah merasakan manfaat Besok Kerja.
          </p>
          <div className="space-y-3 text-left">
            {[
              '✅ CV Builder dengan AI Review',
              '✅ Simulasi Interview Realistis',
              '✅ Analisis Alasan Penolakan',
              '✅ Rekomendasi Skill Personal',
              '✅ Tips Karier dari AI HR',
            ].map((item, i) => (
              <div key={i} className="bg-white/10 rounded-xl px-4 py-2.5">
                <p className="text-sm text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}