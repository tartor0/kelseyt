'use client';

import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StatusBadge from '@/components/ui/StatusBadge';
import CountdownTimer from '@/components/ui/CountdownTimer';
import NewsletterForm from '@/components/ui/NewsletterForm';
import Background3D from '@/components/three/Background3D';

export default function Home() {
  useEffect(() => {
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear().toString();
    }
  }, []);

  return (
    <>
      <Background3D />
      
      {/* Overlay for text readability */}
      <div className="fixed inset-0 z-0 bg-[#0A0A0F]/70 pointer-events-none" />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen w-full max-w-7xl mx-auto px-6 py-8 md:px-12 md:py-12">
        <Header />
        
        <main className="flex-1 flex flex-col justify-center items-center text-center mt-12 md:mt-0 w-full max-w-4xl mx-auto">
          <StatusBadge />
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white leading-none mb-6 w-full uppercase">
            Kelseyt
          </h1>
          
          {/* Business Lines */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 text-sm md:text-base font-light text-gray-300 mb-16 tracking-wide">
            <span>HealthTech</span>
            <span className="w-1.5 h-1.5 rounded-none bg-purple-500" />
            <span>Payment Systems</span>
            <span className="w-1.5 h-1.5 rounded-none bg-teal-500" />
            <span>Integrations</span>
            <span className="w-1.5 h-1.5 rounded-none bg-white/50" />
            <span>IT Consulting</span>
          </div>
          
          <CountdownTimer />
          <NewsletterForm />
          
          <p className="text-xs font-light text-gray-600 mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </main>
        
        <Footer />
      </div>
    </>
  );
}