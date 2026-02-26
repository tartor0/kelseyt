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
  
  const [email, setEmail] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && email.includes('@')) {
      // Show success notification
      setNotificationMessage(`✅ ${email} has been added to the waitlist!`);
      setShowNotification(true);
      setEmail('');
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    } else {
      // Show error notification
      setNotificationMessage('❌ Please enter a valid email address');
      setShowNotification(true);
      
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  return (
    <>
      <Background3D />
      
      {/* Notification System */}
      <div className={`fixed top-6 right-6 z-50 transition-all duration-500 transform ${showNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
        <div className="bg-[#111118] border-l-4 border-[#1E6F9F] shadow-2xl px-6 py-4 max-w-md backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="text-[#1E6F9F]">
              {notificationMessage.includes('✅') ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <p className="text-sm text-white/90 font-light">{notificationMessage}</p>
            <button 
              onClick={() => setShowNotification(false)}
              className="ml-auto text-white/30 hover:text-white/60 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* UI Overlay - new layout */}
      <main className="relative z-10 flex flex-col h-screen w-screen pointer-events-none">
        
        {/* Header - left aligned */}
        <header className="pointer-events-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-xl md:text-2xl font-bold tracking-tighter uppercase text-white">
              KELSEYT
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[8px] md:text-xs tracking-wider text-white/40 mt-2 font-light uppercase">
              <span>HEALTHTECH</span>
              <span className="text-[#1E6F9F]">◆</span>
              <span>PAYMENT SYSTEMS</span>
              <span className="text-[#1E6F9F]">◆</span>
              <span>INTEGRATIONS</span>
              <span className="text-[#1E6F9F]">◆</span>
              <span>IT CONSULTING</span>
            </div>
          </div>
        </header>

        {/* Hero Content - centered but more dynamic */}
        <div className="flex-1 flex items-center justify-center pointer-events-auto px-4">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left side - Text content */}
            <div className="text-left space-y-6">
              <div className="inline-block px-3 py-1 border border-[#1E6F9F]/30 bg-[#1E6F9F]/10 text-[#1E6F9F] text-xs font-medium tracking-wider uppercase">
                Coming 2026
              </div>
              
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none text-white">
                Something
                <br />
                <span className="text-[#1E6F9F]">Massive</span>
                <br />
                Is Coming.
              </h2>
              
              <p className="text-sm md:text-base text-white/50 max-w-md leading-relaxed">
                Next-generation solid-state solutions in healthtech, secure payment systems and enterprise integrations.
              </p>
            </div>

            {/* Right side - Interactive elements */}
            <div className="bg-[#0A0A0F]/40 backdrop-blur-sm border border-white/5 p-6 md:p-8 space-y-6">
              
              {/* Countdown Timer - horizontal */}
              <div className="grid grid-cols-4 gap-2">
                <TimeBox value={timeLeft.days} label="Days" />
                <TimeBox value={timeLeft.hours} label="Hours" />
                <TimeBox value={timeLeft.minutes} label="Mins" />
                <TimeBox value={timeLeft.seconds} label="Secs" />
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    className="w-full bg-transparent border border-white/10 px-5 py-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1E6F9F] transition-colors rounded-none font-light" 
                    required 
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-[#1E6F9F] hover:bg-[#16567d] text-white text-sm font-medium px-6 py-4 flex items-center justify-center gap-3 transition-all rounded-none group relative overflow-hidden"
                >
                  <span className="relative z-10">Get Priority Access</span>
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
                    className="relative z-10 group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                  
                  {/* Animated background on hover */}
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </button>
                
                <p className="text-[10px] text-white/20 text-center">
                  Join the waitlist for exclusive updates and early access
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Footer - bottom with links */}
        <footer className="pointer-events-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/30 font-light tracking-wider">
            <div className="flex gap-6">
              <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
              <a href="#" className="hover:text-white/60 transition-colors">Contact</a>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="https://www.kelseyt.co" className="hover:text-white/60 transition-colors" target="_blank" rel="noopener noreferrer">
                www.kelseyt.co
              </a>
              <span>|</span>
              <p>© <span id="current-year"></span> KELSEYT</p>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center bg-[#0A0A0F]/60 backdrop-blur-sm border border-[#1E6F9F]/20 p-3 transition-all hover:border-[#1E6F9F]/40 hover:scale-105 duration-300">
      <span className="text-xl sm:text-2xl md:text-3xl font-mono font-medium text-[#1E6F9F]">{value}</span>
      <span className="text-[8px] sm:text-[10px] tracking-wider text-white/30 mt-1 uppercase font-light">{label}</span>
    </div>
  );
}