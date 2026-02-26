import Link from 'next/link';
import Background3D from '../src/components/three/Background3D';

export default function HealthTechPage() {
  return (
    <>
      <Background3D />
      
      <main className="relative z-10 flex flex-col min-h-screen w-screen pointer-events-none overflow-y-auto overflow-x-hidden">
        
        <header className="pointer-events-auto px-6 pt-8">
          <div className="max-w-7xl mx-auto">
            <Link href="/">
              <h1 className="text-2xl font-bold tracking-tighter uppercase text-white hover:text-[#1E6F9F] transition-colors inline-block">KELSEYT</h1>
            </Link>
          </div>
        </header>

        <section className="flex-1 flex items-center justify-center pointer-events-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center gap-2 text-4xl text-[#1E6F9F]/40 mb-6">
              <span className="animate-bounce delay-0">Z</span>
              <span className="animate-bounce delay-100">Z</span>
              <span className="animate-bounce delay-200">Z</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white whitespace-nowrap">
              HealthTech? 
              <br />
              <span className="text-[#1E6F9F] relative inline-block">
                We're napping.
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#1E6F9F]/30"></span>
              </span>
            </h2>
            
            <p className="text-base md:text-lg text-white/50 mt-4">
              Working behind the scenes to serve you better.
            </p>
            
            <div className="mt-10">
              <Link 
                href="/" 
                className="inline-block bg-[#1E6F9F] hover:bg-[#16567d] text-white text-xs font-medium px-6 py-3 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </section>

        <footer className="pointer-events-auto px-6 py-6 mt-auto">
          <div className="max-w-7xl mx-auto border-t border-white/5 pt-4">
            <div className="flex flex-col sm:flex-row items-center justify-between text-[9px] text-white/30">
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white/60">Privacy</Link>
                <Link href="/terms" className="hover:text-white/60">Terms</Link>
                <Link href="/contact" className="hover:text-white/60">Contact</Link>
              </div>
              <p className="mt-2 sm:mt-0">© {new Date().getFullYear()} KELSEYT</p>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}