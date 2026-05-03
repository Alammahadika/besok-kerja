import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import TrustedBy from '@/components/TrustedBy'
import StepsSection from '@/components/StepsSection'
import FeaturesSection from '@/components/FeaturesSection'
import AISection from '@/components/AISection'
import TestimonialSection from '@/components/TestimonialSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <TrustedBy />
      <StepsSection />
      <FeaturesSection />
      <AISection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </main>
  )
}