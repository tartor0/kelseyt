'use client';

import { useEffect, useState } from 'react';
import Background3D from '../src/components/three/Background3D';
import Link from 'next/link';

export default function PaymentsSystemsPage() {
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

  const services = [
    { name: 'HEALTHTECH', path: '/healthtech' },
    { name: 'PAYMENT SYSTEMS', path: '/payments' },
    { name: 'INTEGRATIONS', path: '/integrations' },
    { name: 'IT CONSULTING', path: '/consulting' }
  ];

  return (
    <>
      <Background3D />
      
      <div className={`fixed top-5 right-5 z-50 transition-all duration-500 ${showNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="bg-[#111118] border-l-4 border-[#1E6F9F] shadow-2xl px-5 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="text-[#1E6F9F] text-sm">{notificationMessage}</span>
            <button onClick={() => setShowNotification(false)} className="text-white/30 hover:text-white/60">✕</button>
          </div>
        </div>
      </div>
      
      <main className="relative z-10 flex flex-col min-h-screen w-screen pointer-events-none overflow-y-auto overflow-x-hidden">
        
        <header className="pointer-events-auto px-6 pt-8">
          <div className="max-w-7xl mx-auto">
            <Link href="/">
              <h1 className="text-2xl font-bold tracking-tighter uppercase text-white hover:text-[#1E6F9F] transition-colors inline-block">KELSEYT</h1>
            </Link>
            <div className="flex flex-wrap gap-x-6 text-xs text-white/40 font-light uppercase mt-3">
              {services.map((service, i) => (
                <Link 
                  key={i}
                  href={service.path}
                  className="hover:text-[#1E6F9F] transition-colors"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        </header>

        <section className="flex-1 flex items-center justify-center pointer-events-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center gap-2 text-3xl text-[#1E6F9F]/40 mb-6">
              <span className="animate-bounce delay-0">Z</span>
              <span className="animate-bounce delay-100">Z</span>
              <span className="animate-bounce delay-200">Z</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white whitespace-nowrap">
              Oops!! You caught us{" "}
              <span className="text-[#1E6F9F] relative inline-block">
                napping.
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#1E6F9F]/30"></span>
              </span>
            </h2>
            
            <p className="text-base md:text-lg text-white/50 mt-4">
              Working behind the scenes to serve you better.
            </p>
            
            
          </div>
        </section>

        <footer className="pointer-events-auto px-6 py-6">
          <div className="max-w-7xl mx-auto border-t border-white/5 pt-4">
            <div className="flex flex-col sm:flex-row items-center justify-between text-[9px] text-white/30">
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white/60">Privacy</Link>
                <Link href="/terms" className="hover:text-white/60">Terms</Link>
                <Link href="/contact" className="hover:text-white/60">Contact</Link>
              </div>
              <p className="mt-2 sm:mt-0">© <span id="current-year"></span> KELSEYT</p>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[#0A0A0F]/60 backdrop-blur-sm border border-[#1E6F9F]/20 p-2 text-center">
      <span className="text-lg font-mono font-medium text-[#1E6F9F]">{value}</span>
      <span className="block text-[7px] text-white/30 uppercase mt-0.5">{label}</span>
    </div>
  );
}