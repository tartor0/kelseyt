'use client';

import { useEffect, useState } from 'react';
import Background3D from '../src/components/three/Background3D';
import Link from 'next/link';
import {
  HeartPulseIcon,
  CreditCardIcon,
  PuzzleIcon,
  ComputerIcon,
  PlugIcon,
  FlowIcon,
  CloudIcon,
} from '../src/ServiceIcons';

export default function IntegrationsPage() {
  const [email, setEmail] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) yearElement.textContent = new Date().getFullYear().toString();
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
    { name: 'HEALTHTECH', path: '/healthtech', icon: <HeartPulseIcon size={13} /> },
    { name: 'PAYMENT SYSTEMS', path: '/payments', icon: <CreditCardIcon size={13} /> },
    { name: 'INTEGRATIONS', path: '/integrations', icon: <PuzzleIcon size={13} /> },
    { name: 'IT CONSULTING', path: '/consulting', icon: <ComputerIcon size={13} /> },
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
                <Link key={i} href={service.path} className="flex items-center gap-1.5 hover:text-[#1E6F9F] transition-colors group">
                  <span className="opacity-50 group-hover:opacity-100 transition-opacity">{service.icon}</span>
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        </header>

        <section className="flex-1 flex items-center justify-center pointer-events-auto px-6">
          <div className="max-w-4xl mx-auto text-center">

            {/* Icon cluster */}
            <div className="flex justify-center items-end gap-6 mb-8">
              <div className="text-[#1E6F9F]/30 animate-pulse">
                <CloudIcon size={32} />
              </div>
              <div className="text-[#1E6F9F]/70 animate-bounce">
                <PuzzleIcon size={48} />
              </div>
              <div className="text-[#1E6F9F]/30 animate-pulse" style={{ animationDelay: '500ms' }}>
                <PlugIcon size={32} />
              </div>
            </div>

            {/* Service badge */}
            <div className="inline-flex items-center gap-2 text-[#1E6F9F]/60 text-[10px] uppercase tracking-widest mb-6 border border-[#1E6F9F]/20 px-4 py-1.5">
              <PuzzleIcon size={11} />
              INTEGRATIONS
            </div>

            {/* Main headline */}
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-tight">
              Oops!! You caught us <span className="text-[#1E6F9F] relative inline-block">
                napping.
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#1E6F9F]/30"></span>
              </span>
            </h2>

            <p className="text-base md:text-lg text-white/50 mt-6 max-w-xl mx-auto">
              We're connecting the dots between your tools and workflows. Plug-and-play integrations that just work — coming very soon.
            </p>

            <p className="text-xs text-white/30 mt-4 uppercase tracking-widest">
              Please watch out for this space!!
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