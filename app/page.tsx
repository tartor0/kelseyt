'use client';

import { useEffect, useState } from 'react';
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
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 45);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance < 0) return;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
        seconds: Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0')
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    const yearElement = document.getElementById('current-year');
    if (yearElement) yearElement.textContent = new Date().getFullYear().toString();

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && email.includes('@')) {
      setNotificationMessage(`✅ ${email} added to waitlist!`);
      setShowNotification(true);
      setEmail('');
      setTimeout(() => setShowNotification(false), 4000);
    } else {
      setNotificationMessage('❌ Valid email required');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  // Service data with SVG icons (no emojis)
  const services = [
    {
      title: 'HealthTech',
      description: 'Advanced medical software, patient management systems, and digital health infrastructure.',
      icon: (
        <svg className="w-8 h-8 text-[#1E6F9F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.5 12.75l6 6 9-13.5" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 12h-15" />
        </svg>
      )
    },
    {
      title: 'Payment Systems',
      description: 'Secure payment gateways, fraud detection, and scalable transaction processing.',
      icon: (
        <svg className="w-8 h-8 text-[#1E6F9F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
      )
    },
    {
      title: 'Integrations',
      description: 'Seamless API connections, middleware solutions, and enterprise system integration.',
      icon: (
        <svg className="w-8 h-8 text-[#1E6F9F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      )
    },
    {
      title: 'IT Consulting',
      description: 'Expert technology strategy, infrastructure planning, and digital transformation.',
      icon: (
        <svg className="w-8 h-8 text-[#1E6F9F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      )
    }
  ];

  return (
    <>
      <Background3D />
      
      {/* Notification */}
      <div className={`fixed top-5 right-5 z-50 transition-all duration-500 ${showNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="bg-[#111118] border-l-4 border-[#1E6F9F] shadow-2xl px-5 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="text-[#1E6F9F] text-sm">{notificationMessage}</span>
            <button onClick={() => setShowNotification(false)} className="text-white/30 hover:text-white/60">✕</button>
          </div>
        </div>
      </div>
      
      {/* Main - NOW SCROLLABLE FOR ONE PAGER */}
      <main className="relative z-10 flex flex-col min-h-screen w-screen pointer-events-none overflow-y-auto overflow-x-hidden">
        
        {/* Header */}
        <header className="pointer-events-auto px-6 pt-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold tracking-tighter uppercase text-white">KELSEYT</h1>
            <div className="flex flex-wrap gap-x-3 text-[10px] text-white/40 font-light uppercase mt-1">
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

        {/* Hero Section - Playful Message */}
        <section className="pointer-events-auto px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="flex gap-2 text-3xl text-[#1E6F9F]/40 mb-4">
                <span className="animate-bounce delay-0">Z</span>
                <span className="animate-bounce delay-100">Z</span>
                <span className="animate-bounce delay-200">Z</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight text-white">
                Oops!! You caught us{" "}
                <span className="text-[#1E6F9F] relative inline-block">
                  napping.
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#1E6F9F]/30"></span>
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-white/50 max-w-2xl mt-4 leading-relaxed">
                Working behind the scenes to serve you better.
              </p>
              
              <p className="text-sm text-white/30 uppercase tracking-wider mt-2">
                Please watch out for this space!!
              </p>
            </div>
          </div>
        </section>

        {/* Services Section - Based on services listed */}
        <section className="pointer-events-auto px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-[#0A0A0F]/60 backdrop-blur-sm border border-white/5 p-6 hover:border-[#1E6F9F]/30 transition-all group"
                >
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">{service.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Countdown & Signup Section */}
        <section className="pointer-events-auto px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#0A0A0F]/40 backdrop-blur-sm border border-white/5 p-8 max-w-2xl">
              <h3 className="text-xl font-medium text-white mb-4">Stay Updated</h3>
              
              {/* Countdown */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                <TimeBox value={timeLeft.days} label="Days" />
                <TimeBox value={timeLeft.hours} label="Hours" />
                <TimeBox value={timeLeft.minutes} label="Mins" />
                <TimeBox value={timeLeft.seconds} label="Secs" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="flex-1 bg-transparent border border-white/10 px-5 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1E6F9F] transition-colors" 
                  required 
                />
                
                <button 
                  type="submit" 
                  className="bg-[#1E6F9F] hover:bg-[#16567d] text-white text-sm font-medium px-8 py-3.5 flex items-center justify-center gap-2 transition-all group whitespace-nowrap"
                >
                  <span>Get Notified</span>
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
              
              <p className="text-[10px] text-white/20 text-center mt-4">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pointer-events-auto px-6 py-8 mt-auto">
          <div className="max-w-7xl mx-auto border-t border-white/5 pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/30">
              <div className="flex gap-6">
                <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
                <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
                <a href="#" className="hover:text-white/60 transition-colors">Contact</a>
              </div>
              <p className="mt-2 sm:mt-0">© <span id="current-year"></span> KELSEYT. All rights reserved.</p>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center bg-[#0A0A0F]/60 backdrop-blur-sm border border-[#1E6F9F]/20 p-3 transition-all hover:border-[#1E6F9F]/40">
      <span className="text-xl sm:text-2xl md:text-3xl font-mono font-medium text-[#1E6F9F]">{value}</span>
      <span className="text-[8px] sm:text-[10px] tracking-wider text-white/30 mt-1 uppercase font-light">{label}</span>
    </div>
  );
}