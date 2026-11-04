import Navbar from '@/components/Navbar';
import Starfield from '@/components/Starfield';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#02050e] text-slate-100 overflow-x-clip">
      {/* Dynamic Starfield & Ambient Night Sky Background */}
      <Starfield />

      {/* Floating Capsule Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col gap-12 sm:gap-20">
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>

      {/* Minimalist Footer */}
      <Footer />
    </div>
  );
}
