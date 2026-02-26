'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
      setNotificationMessage(`✅ ${email} has been added to the waitlist!`);
      setShowNotification(true);
      setEmail('');
      
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    } else {
      setNotificationMessage('❌ Please enter a valid email address');
      setShowNotification(true);
      
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  const services = [
    { name: 'HEALTHTECH', path: '/healthtech' },
    { name: 'PAYMENT SYSTEMS', path: '/payments' },
    { name: 'INTEGRATIONS', path: '/integrations' },
    { name: 'IT CONSULTING', path: '/consulting' }
  ];

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
      
      {/* UI Overlay - new playful layout */}
      <main className="relative z-10 flex flex-col h-screen w-screen pointer-events-none">
        
        {/* Header - minimal */}
        <header className="pointer-events-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto w-full">
            <Link href="/">
              <h1 className="text-xl md:text-2xl font-bold tracking-tighter uppercase text-white hover:text-[#1E6F9F] transition-colors inline-block cursor-pointer">
                KELSEYT
              </h1>
            </Link>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[8px] md:text-xs tracking-wider text-white/40 mt-2 font-light uppercase">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-x-3">
                  <Link 
                    href={service.path}
                    className="hover:text-[#1E6F9F] transition-colors cursor-pointer"
                  >
                    {service.name}
                  </Link>
                  {index < services.length - 1 && (
                    <span className="text-[#1E6F9F]">◆</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Hero Content - centered playful message */}
        <div className="flex-1 flex items-center justify-center pointer-events-auto px-4">
          <div className="max-w-4xl mx-auto w-full text-center">
            
            {/* Playful "Oops" section */}
            <div className="space-y-8">
              {/* ZZZ Icon - sleeping/napping indicator */}
              <div className="flex justify-center gap-2 text-4xl md:text-5xl text-[#1E6F9F]/40 animate-pulse">
                <span className="animate-bounce delay-0">Z</span>
                <span className="animate-bounce delay-100">Z</span>
                <span className="animate-bounce delay-200">Z</span>
              </div>
              
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none text-white">
                Oops!! You caught us
                <br />
                <span className="text-[#1E6F9F] relative inline-block">
                  napping.
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#1E6F9F]/30"></span>
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light">
                Working behind the scenes to serve you better.
              </p>
              
              <p className="text-sm md:text-base text-white/40 max-w-md mx-auto leading-relaxed uppercase tracking-wider">
                Please watch out for this space!!
              </p>
              
              {/* Decorative line */}
              <div className="flex justify-center gap-2 pt-4">
                <span className="w-12 h-px bg-[#1E6F9F]/30"></span>
                <span className="w-2 h-2 rotate-45 border border-[#1E6F9F]/30"></span>
                <span className="w-12 h-px bg-[#1E6F9F]/30"></span>
              </div>
            </div>

            {/* Email Form - compact and centered */}
            <div className="mt-12 max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for updates" 
                    className="w-full bg-[#0A0A0F]/60 backdrop-blur-sm border border-white/10 px-5 py-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1E6F9F] transition-colors rounded-none font-light text-center" 
                    required 
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-[#1E6F9F] hover:bg-[#16567d] text-white text-sm font-medium px-6 py-4 flex items-center justify-center gap-3 transition-all rounded-none group relative overflow-hidden"
                >
                  <span className="relative z-10">Wake Me Up When It's Ready</span>
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
                    className="relative z-10 group-hover:rotate-12 transition-transform"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer - minimal */}
        <footer className="pointer-events-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/30 font-light tracking-wider">
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white/60 transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-white/60 transition-colors">Contact</Link>
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