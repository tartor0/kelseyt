'use client';

import { useEffect, useState } from 'react';
import Background3D from './src/components/three/Background3D';
import Link from 'next/link';
import {
  HeartPulseIcon,
  CreditCardIcon,
  PuzzleIcon,
  ComputerIcon,
  StethoscopeIcon,
  ActivityIcon,
  MedicineIcon,
  BankIcon,
  CoinIcon,
  ShieldIcon,
  PlugIcon,
  FlowIcon,
  CloudIcon,
  ChartIcon,
  UsersIcon,
  SettingsIcon,
} from './src/ServiceIcons';

type ServiceKey = 'healthtech' | 'payments' | 'integrations' | 'consulting' | null;

const serviceData = {
  healthtech: {
    badge: 'HEALTHTECH',
    BadgeIcon: ActivityIcon,
    icons: [
      { Icon: MedicineIcon, size: 32, cls: 'text-[#1E6F9F]/50 animate-pulse' },
      { Icon: HeartPulseIcon, size: 52, cls: 'text-[#1E6F9F] animate-bounce' },
      { Icon: StethoscopeIcon, size: 32, cls: 'text-[#1E6F9F]/50 animate-pulse' },
    ],
    subtitle: "We're building smarter healthcare technology that keeps patients at the center. Vital signs are looking good — launching soon.",
    NotifyIcon: HeartPulseIcon,
  },
  payments: {
    badge: 'PAYMENT SYSTEMS',
    BadgeIcon: CreditCardIcon,
    icons: [
      { Icon: CoinIcon, size: 32, cls: 'text-[#1E6F9F]/50 animate-pulse' },
      { Icon: CreditCardIcon, size: 52, cls: 'text-[#1E6F9F] animate-bounce' },
      { Icon: BankIcon, size: 32, cls: 'text-[#1E6F9F]/50 animate-pulse' },
    ],
    subtitle: "Seamless, secure payment infrastructure is being assembled. Every transaction will be fast, safe, and frictionless.",
    NotifyIcon: ShieldIcon,
  },
  integrations: {
    badge: 'INTEGRATIONS',
    BadgeIcon: PuzzleIcon,
    icons: [
      { Icon: CloudIcon, size: 32, cls: 'text-[#1E6F9F]/50 animate-pulse' },
      { Icon: PuzzleIcon, size: 52, cls: 'text-[#1E6F9F] animate-bounce' },
      { Icon: PlugIcon, size: 32, cls: 'text-[#1E6F9F]/50 animate-pulse' },
    ],
    subtitle: "We're connecting the dots between your tools and workflows. Plug-and-play integrations that just work — coming very soon.",
    NotifyIcon: FlowIcon,
  },
  consulting: {
    badge: 'IT CONSULTING',
    BadgeIcon: ComputerIcon,
    icons: [
      { Icon: ChartIcon, size: 32, cls: 'text-[#1E6F9F]/50 animate-pulse' },
      { Icon: ComputerIcon, size: 52, cls: 'text-[#1E6F9F] animate-bounce' },
      { Icon: UsersIcon, size: 32, cls: 'text-[#1E6F9F]/50 animate-pulse' },
    ],
    subtitle: "World-class IT consulting tailored to your business needs is on the way. We're building a team and toolkit ready to transform your operations.",
    NotifyIcon: SettingsIcon,
  },
};

export default function Home() {
  const [activeModal, setActiveModal] = useState<ServiceKey>(null);
  const [email, setEmail] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) yearElement.textContent = new Date().getFullYear().toString();
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeModal]);

  const notify = (msg: string) => {
    setNotificationMessage(msg);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const handleHomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      notify(`✅ ${email} added to waitlist!`);
      setEmail('');
    } else {
      notify('❌ Valid email required');
    }
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalEmail && modalEmail.includes('@')) {
      notify(`✅ ${modalEmail} added to waitlist!`);
      setModalEmail('');
      setTimeout(() => setActiveModal(null), 1200);
    } else {
      notify('❌ Valid email required');
    }
  };

  const services = [
    { name: 'HEALTHTECH', key: 'healthtech' as ServiceKey, Icon: HeartPulseIcon },
    { name: 'PAYMENT SYSTEMS', key: 'payments' as ServiceKey, Icon: CreditCardIcon },
    { name: 'INTEGRATIONS', key: 'integrations' as ServiceKey, Icon: PuzzleIcon },
    { name: 'IT CONSULTING', key: 'consulting' as ServiceKey, Icon: ComputerIcon },
  ];

  const modal = activeModal ? serviceData[activeModal] : null;

  return (
    <>
      <Background3D />

      {/* Toast */}
      <div className={`fixed top-5 right-5 z-[999] transition-all duration-500 ${showNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
        <div className="bg-[#111118] border-l-4 border-[#1E6F9F] shadow-2xl px-5 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="text-[#1E6F9F] text-sm font-medium">{notificationMessage}</span>
            <button onClick={() => setShowNotification(false)} className="text-white/50 hover:text-white/80 ml-2">✕</button>
          </div>
        </div>
      </div>

      {/* ── SERVICE MODAL ── */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 ease-in-out ${activeModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setActiveModal(null)} />

        {/* Slide-up panel */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-[#0D0D14] border-t-2 border-[#1E6F9F]/50 transition-transform duration-500 ease-out ${activeModal ? 'translate-y-0' : 'translate-y-full'}`}
          style={{ maxHeight: '85vh', overflowY: 'auto' }}
        >
          {/* Close */}
          <button
            onClick={() => setActiveModal(null)}
            className="absolute top-4 right-5 text-white/60 hover:text-white transition-colors z-10 text-2xl leading-none font-light"
          >
            ✕
          </button>

          {/* Handle */}
          <div className="flex justify-center pt-4 pb-1">
            <div className="w-12 h-1.5 bg-white/20 rounded-full" />
          </div>

          {modal && (
            <div className="px-6 pb-14 pt-4 max-w-2xl mx-auto text-center">

              {/* Icon cluster */}
              <div className="flex justify-center items-end gap-6 mb-8 mt-4">
                {modal.icons.map(({ Icon, size, cls }, i) => (
                  <div key={i} className={cls}><Icon size={size} /></div>
                ))}
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 text-[#1E6F9F] text-xs font-semibold uppercase tracking-widest mb-5 border-2 border-[#1E6F9F]/40 px-5 py-2">
                <modal.BadgeIcon size={13} />
                {modal.badge}
              </div>

              {/* Headline */}
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mt-1">
                Oops!! You caught us{' '}
                <span className="text-[#1E6F9F] relative inline-block">
                  napping.
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#1E6F9F]/50" />
                </span>
              </h2>

              <p className="text-base md:text-lg text-white/70 mt-6 max-w-lg mx-auto leading-relaxed font-normal">
                {modal.subtitle}
              </p>

              {/* "Please watch this space" - thicker/more visible */}
              <p className="text-sm text-white/50 font-medium mt-4 uppercase tracking-widest">
                Please watch out for this space!!
              </p>

              {/* Divider */}
              <div className="flex justify-center gap-2 my-7">
                <span className="w-10 h-px bg-[#1E6F9F]/40"></span>
                <span className="w-2 h-2 rotate-45 border-2 border-[#1E6F9F]/40"></span>
                <span className="w-10 h-px bg-[#1E6F9F]/40"></span>
              </div>

              {/* Email form */}
              <div className="max-w-md mx-auto">
                <form onSubmit={handleModalSubmit} className="flex">
                  <input
                    type="email"
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    placeholder="Your email for early access"
                    className="flex-1 bg-white/5 border-2 border-white/20 border-r-0 px-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#1E6F9F] transition-colors font-normal"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#1E6F9F] hover:bg-[#16567d] text-white text-xs font-bold px-5 py-3.5 transition-all flex items-center gap-2 whitespace-nowrap tracking-wide"
                  >
                    <modal.NotifyIcon size={14} />
                    NOTIFY ME
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MAIN PAGE ── */}
      <main className="relative z-10 flex flex-col min-h-screen w-screen pointer-events-none overflow-y-auto overflow-x-hidden">

        <header className="pointer-events-auto px-6 pt-8">
          <div className="max-w-7xl mx-auto">
            <Link href="/">
              <h1 className="text-2xl font-bold tracking-tighter uppercase text-white hover:text-[#1E6F9F] transition-colors inline-block">KELSEYT</h1>
            </Link>
            {/* Nav - thicker text, more visible */}
            <div className="flex flex-wrap gap-x-6 text-xs font-semibold text-white/60 uppercase tracking-wider mt-3">
              {services.map((service, i) => (
                <button
                  key={i}
                  onClick={() => setActiveModal(service.key)}
                  className="flex items-center gap-1.5 hover:text-[#1E6F9F] transition-colors group cursor-pointer"
                >
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                    <service.Icon size={13} />
                  </span>
                  {service.name}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="flex-1 flex items-center justify-center pointer-events-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center gap-2 text-3xl text-[#1E6F9F]/60 mb-6">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>Z</span>
              <span className="animate-bounce" style={{ animationDelay: '150ms' }}>Z</span>
              <span className="animate-bounce" style={{ animationDelay: '300ms' }}>Z</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white whitespace-nowrap">
              Oops!! You caught us{' '}
              <span className="text-[#1E6F9F] relative inline-block">
                napping.
                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#1E6F9F]/50" />
              </span>
            </h2>

            <p className="text-lg md:text-xl text-white/70 mt-5 font-normal">
              Working behind the scenes to serve you better.
            </p>

            {/* "Please watch this space" - bumped up */}
            <p className="text-sm text-white/50 font-medium mt-3 uppercase tracking-widest">
              Please watch out for this space!!
            </p>

            {/* Service pills */}
            <div className="flex justify-center gap-3 mt-8 flex-wrap">
              {services.map((service, i) => (
                <button
                  key={i}
                  onClick={() => setActiveModal(service.key)}
                  className="flex items-center gap-2 border-2 border-white/20 hover:border-[#1E6F9F]/70 text-white/50 hover:text-[#1E6F9F] text-xs font-semibold uppercase tracking-wider px-4 py-2.5 transition-all group"
                >
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                    <service.Icon size={13} />
                  </span>
                  {service.name}
                </button>
              ))}
            </div>

            {/* Main email form */}
            <div className="mt-8 max-w-md mx-auto">
              <form onSubmit={handleHomeSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for updates"
                  className="flex-1 bg-[#0A0A0F]/60 backdrop-blur-sm border-2 border-white/20 border-r-0 px-4 py-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#1E6F9F] transition-colors font-normal text-center"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#1E6F9F] hover:bg-[#16567d] text-white text-xs font-bold px-5 py-4 transition-all flex items-center gap-2 whitespace-nowrap group relative overflow-hidden tracking-wide"
                >
                  <span className="relative z-10">WAKE ME UP</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 group-hover:rotate-12 transition-transform">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </form>
            </div>
          </div>
        </section>

        <footer className="pointer-events-auto px-6 py-6">
          <div className="max-w-7xl mx-auto border-t-1 border-white/10 pt-4">
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 font-medium tracking-wide">
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white/80 transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-white/80 transition-colors">Terms</Link>
                <Link href="/contact" className="hover:text-white/80 transition-colors">Contact</Link>
              </div>
              <p className="mt-2 sm:mt-0">© <span id="current-year"></span> KELSEYT</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}