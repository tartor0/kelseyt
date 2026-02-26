'use client';

import { useEffect, useState } from 'react';
import Header from './src/components/layout/Header';
import Footer from './src/components/layout/Footer';
import StatusBadge from './src/components/ui/StatusBadge';
import CountdownTimer from './src/components/ui/CountdownTimer';
import NewsletterForm from './src/components/ui/NewsletterForm';
import Background3D from './src/components/three/Background3D';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    // Set launch date to 45 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 45);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) return;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    // Set current year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear().toString();
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Background3D />
      
      {/* UI Overlay - reduced padding, better spacing */}
      <main className="relative z-10 flex flex-col h-screen w-screen p-4 md:p-6 pointer-events-none">
        
        {/* Header - minimal spacing */}
        <header className="flex flex-col items-center justify-center w-full pointer-events-auto pt-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase text-white">
            KELSEYT
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-x-2 text-[10px] md:text-xs tracking-wider text-white/50 mt-2 font-light uppercase max-w-[90vw]">
            <span>HEALTHTECH</span>
            <span className="text-[#1E6F9F]">·</span>
            <span>PAYMENT SYSTEMS</span>
            <span className="text-[#1E6F9F]">·</span>
            <span>INTEGRATIONS</span>
            <span className="text-[#1E6F9F]">·</span>
            <span>IT CONSULTING</span>
          </div>
        </header>

        {/* Hero Content - centered vertically with flex grow */}
        <section className="flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto gap-4 md:gap-6 pointer-events-auto w-full px-2">
          
          <div className="space-y-2 md:space-y-3">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight text-white">
              Something Massive<br />Is Coming.
            </h2>
            <p className="text-xs sm:text-sm md:text-base font-light text-white/60 max-w-2xl mx-auto leading-relaxed px-4">
              Next-generation solid-state solutions in healthtech, secure payment systems and enterprise integrations. Launching soon.
            </p>
          </div>

          {/* Countdown Timer - compact */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full max-w-lg mt-2">
            <TimeBox value={timeLeft.days} label="Days" />
            <TimeBox value={timeLeft.hours} label="Hours" />
            <TimeBox value={timeLeft.minutes} label="Mins" />
            <TimeBox value={timeLeft.seconds} label="Secs" />
          </div>

          {/* Email Form - compact */}
          <form className="flex flex-col sm:flex-row w-full max-w-md gap-0 mt-2 shadow-xl" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter email" 
              className="flex-1 bg-[#0A0A0F] border border-white/10 border-r-0 sm:border-r-0 text-xs sm:text-sm text-white placeholder-white/30 px-4 py-3 sm:px-5 sm:py-3.5 focus:outline-none focus:border-[#1E6F9F]/50 transition-colors rounded-none font-light" 
              required 
            />
            <button 
              type="submit" 
              className="bg-[#1E6F9F] hover:bg-[#16567d] text-white text-xs sm:text-sm font-medium px-6 py-3 sm:px-8 sm:py-3.5 flex items-center justify-center gap-2 transition-colors rounded-none whitespace-nowrap group"
            >
              Notify
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </form>

        </section>

        {/* Footer - minimal */}
        <footer className="flex flex-col sm:flex-row items-center justify-between w-full text-[10px] text-white/30 font-light pointer-events-auto gap-2 tracking-wider pb-2">
          <a href="https://www.kelseyt.co" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
            www.kelseyt.co
          </a>
          <p>© <span id="current-year"></span> KELSEYT</p>
        </footer>

      </main>
    </>
  );
}

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center bg-[#0A0A0F]/50 backdrop-blur-sm border border-[#1E6F9F]/30 p-3 sm:p-4 w-16 sm:w-20 md:w-24 transition-colors hover:border-[#1E6F9F]/60">
      <span className="text-xl sm:text-2xl md:text-3xl font-mono font-medium text-[#1E6F9F]">{value}</span>
      <span className="text-[8px] sm:text-[10px] tracking-wider text-white/40 mt-1 uppercase font-light">{label}</span>
    </div>
  );
}