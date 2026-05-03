import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(request) {
  try {
    const { messages, type } = await request.json()
    const prompts = {
      interview: 'Kamu adalah AI HR profesional. Lakukan simulasi interview dalam Bahasa Indonesia. Nilai jawaban dari 1-100 dengan format SKOR: [angka].',
      cvReview: 'Kamu adalah HR profesional. Analisis CV dan berikan skor 1-100, kelebihan, kekurangan, dan saran dalam Bahasa Indonesia.',
      analisis: 'Kamu adalah career coach. Analisis penolakan kerja dan berikan saran perbaikan dalam Bahasa Indonesia.',
      rekomendasi: 'Kamu adalah career advisor. Berikan rekomendasi skill dan roadmap belajar dalam Bahasa Indonesia.',
    }
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: prompts[type] || prompts.interview }, ...messages],
      max_tokens: 1000,
      temperature: 0.7,
    })
    return NextResponse.json({ message: completion.choices[0].message.content })
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghubungi AI.' }, { status: 500 })
  }
}