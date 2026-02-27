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
    subtitle: "We're building smarter healthcare technology that keeps patients at the center.",
    paragraph: "At KELSEYT, we believe technology should make healthcare more human — not less. Our healthtech platform bridges the gap between clinical teams and the data they need, reducing admin burden and improving outcomes. From remote patient monitoring to intelligent diagnostics support, we're designing every feature around the people who matter most: patients and the professionals who care for them.",
    features: [
      { icon: '🩺', label: 'Patient-Centric Design', desc: 'Intuitive tools built around real clinical workflows, reducing friction for both patients and providers' },
      { icon: '📊', label: 'Real-Time Health Analytics', desc: 'Live dashboards for vitals, trends, and population health — surfacing insights when they matter most' },
      { icon: '🔒', label: 'HIPAA-Compliant Infrastructure', desc: 'End-to-end encryption, role-based access controls, and audit-ready data handling as standard' },
    ],
    NotifyIcon: HeartPulseIcon,
    cardBlurb: 'Smarter clinical tools, real-time health data, and patient-first design — built to reduce admin burden and improve outcomes.',
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
    paragraph: "Modern businesses deserve a payments layer that works as hard as they do. KELSEYT's payment systems are being engineered from the ground up for speed, security, and global reach. Whether you're processing thousands of micro-transactions or handling high-value B2B settlements, our infrastructure will give you the reliability and transparency to scale with confidence.",
    features: [
      { icon: '⚡', label: 'Instant Processing', desc: 'Sub-second transaction speeds across all major card networks and payment rails' },
      { icon: '🛡️', label: 'Fraud Protection', desc: 'AI-powered risk scoring and real-time anomaly detection that adapts to your transaction patterns' },
      { icon: '🌍', label: 'Multi-Currency Support', desc: 'Accept payments in 135+ currencies with live FX rates and automatic settlement reconciliation' },
    ],
    NotifyIcon: ShieldIcon,
    cardBlurb: 'Fast, secure, global payment infrastructure engineered for reliability — from micro-transactions to high-value settlements.',
  },
  integrations: {
    badge: 'INTEGRATIONS',
    BadgeIcon: PuzzleIcon,
    icons: [
      { Icon: CloudIcon, size: 32, cls: 'text-[#1E6F9F]/50 animate-pulse' },
      { Icon: PuzzleIcon, size: 52, cls: 'text-[#1E6F9F] animate-bounce' },
      { Icon: PlugIcon, size: 32, cls: 'text-[#1E6F9F]/50 animate-pulse' },
    ],
    subtitle: "We're connecting the dots between your tools and workflows. Plug-and-play integrations that just work.",
    paragraph: "The average business runs on dozens of disconnected tools — and the gaps between them cost time, money, and sanity. KELSEYT Integrations is being built to eliminate that friction. We're creating a unified connectivity layer that lets your CRM, ERP, communication tools, and custom systems speak fluently to one another.",
    features: [
      { icon: '🔌', label: 'One-Click Connectors', desc: 'Pre-built integrations for Slack, Salesforce, HubSpot, Xero, and dozens more — live in minutes' },
      { icon: '🔄', label: 'Bi-Directional Sync', desc: 'Keep data consistent and up-to-date across all your platforms in real time, with full conflict resolution' },
      { icon: '🧩', label: 'Custom API Builder', desc: 'Design, test, and deploy your own integrations visually — no backend engineering required' },
    ],
    NotifyIcon: FlowIcon,
    cardBlurb: 'One connectivity layer for all your tools — CRM, ERP, comms and beyond — synced in real time with no-code simplicity.',
  },
  consulting: {
    badge: 'IT CONSULTING',
    BadgeIcon: ComputerIcon,
    icons: [
      { Icon: ChartIcon, size: 32, cls: 'text-[#1E6F9F]/50 animate-pulse' },
      { Icon: ComputerIcon, size: 52, cls: 'text-[#1E6F9F] animate-bounce' },
      { Icon: UsersIcon, size: 32, cls: 'text-[#1E6F9F]/50 animate-pulse' },
    ],
    subtitle: "World-class IT consulting tailored to your business needs. Launching very soon.",
    paragraph: "Technology decisions made today shape what your business can achieve tomorrow. KELSEYT's IT consulting practice pairs deep technical expertise with genuine business acumen — so you get strategies that are bold enough to move the needle and practical enough to actually execute. Our consultants embed with your team and stay accountable to outcomes, not just deliverables.",
    features: [
      { icon: '🗺️', label: 'Digital Transformation Roadmaps', desc: 'Clear, actionable strategies built from thorough audits — covering people, process, and technology' },
      { icon: '☁️', label: 'Cloud Migration & Architecture', desc: 'Scalable, cost-optimised infrastructure design with zero-downtime migration planning' },
      { icon: '👥', label: 'Dedicated Expert Teams', desc: 'Senior consultants and engineers embedded within your organisation for the duration of each engagement' },
    ],
    NotifyIcon: SettingsIcon,
    cardBlurb: 'Bold strategies, cloud expertise, and embedded expert teams — turning technology decisions into lasting competitive advantage.',
  },
};

export default function Home() {
  const [activeModal, setActiveModal] = useState<ServiceKey>(null);
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
    { name: 'HEALTHTECH',      key: 'healthtech'   as ServiceKey, Icon: HeartPulseIcon },
    { name: 'PAYMENT SYSTEMS', key: 'payments'     as ServiceKey, Icon: CreditCardIcon },
    { name: 'INTEGRATIONS',    key: 'integrations' as ServiceKey, Icon: PuzzleIcon     },
    { name: 'IT CONSULTING',   key: 'consulting'   as ServiceKey, Icon: ComputerIcon   },
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
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setActiveModal(null)} />

        <div
          className={`absolute bottom-0 left-0 right-0 bg-[#0D0D14] border-t-2 border-[#1E6F9F]/50 transition-transform duration-500 ease-out ${activeModal ? 'translate-y-0' : 'translate-y-full'}`}
          style={{ maxHeight: '85vh', overflowY: 'auto' }}
        >
          <button
            onClick={() => setActiveModal(null)}
            className="absolute top-4 right-5 text-white/60 hover:text-white transition-colors z-10 text-2xl leading-none font-light"
          >
            ✕
          </button>

          <div className="flex justify-center pt-4 pb-1">
            <div className="w-12 h-1.5 bg-white/20 rounded-full" />
          </div>

          {modal && (
            <div className="px-6 pb-14 pt-4 max-w-2xl mx-auto text-center">

              {/* Icon cluster */}
              <div className="flex justify-center items-end gap-6 mb-4 mt-4">
                {modal.icons.map(({ Icon, size, cls }, i) => (
                  <div key={i} className={cls}><Icon size={size} /></div>
                ))}
              </div>

              {/* ZZZ bounce */}
              <div className="flex justify-center gap-2 text-2xl text-[#1E6F9F]/60 mb-4">
                <span className="animate-bounce" style={{ animationDelay: '0ms' }}>Z</span>
                <span className="animate-bounce" style={{ animationDelay: '150ms' }}>Z</span>
                <span className="animate-bounce" style={{ animationDelay: '300ms' }}>Z</span>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 text-[#1E6F9F] text-xs font-semibold uppercase tracking-widest mb-5 border-2 border-[#1E6F9F]/40 px-5 py-2">
                <modal.BadgeIcon size={13} />
                {modal.badge}
              </div>

              {/* Oops headline — modal only */}
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mt-1">
                Oops!! You caught us{' '}
                <span className="text-[#1E6F9F] relative inline-block">
                  napping.
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#1E6F9F]/50" />
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-base md:text-lg text-white/70 mt-6 max-w-lg mx-auto leading-relaxed font-normal">
                {modal.subtitle}
              </p>

              <p className="text-sm text-white/50 font-medium mt-8 uppercase tracking-widest">
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

      {/* ── FIXED NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-40 pointer-events-auto px-6 pt-6 pb-4 bg-gradient-to-b from-[#07070f]/90 to-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          <Link href="/">
            <h1 className="text-2xl font-bold tracking-tighter uppercase text-white hover:text-[#1E6F9F] transition-colors inline-block">KELSEYT</h1>
          </Link>
          <div className="flex flex-wrap gap-x-6 text-xs font-semibold text-white/60 uppercase tracking-wider">
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

        {/* ── HERO: service card grid ── */}
        <section className="pointer-events-auto px-6 pt-[520px] pb-32">
          <div className="max-w-4xl mx-auto w-full">

            {/* Tagline */}
            <p className="text-center text-sm font-semibold text-[#1E6F9F] uppercase tracking-widest mb-2">
              What we&apos;re building
            </p>
            <p className="text-center text-white/40 text-sm mb-10 tracking-wide">
              Click any service to learn more
            </p>

            {/* Service cards — big icons, rounded */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {services.map((service, i) => {
                const data = serviceData[service.key as Exclude<ServiceKey, null>];
                return (
                  <button
                    key={i}
                    onClick={() => setActiveModal(service.key)}
                    className="group text-left rounded-2xl border border-white/10 hover:border-[#1E6F9F]/60 bg-[#07070f]/85 backdrop-blur-md p-8 pb-12 transition-all duration-300 hover:bg-[#0a0a1a]/90 hover:scale-[1.02]"
                    style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.55)' }}
                  >
                    {/* Big icon block */}
                    <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-[#1E6F9F]/10 border border-[#1E6F9F]/20 group-hover:bg-[#1E6F9F]/20 group-hover:border-[#1E6F9F]/50 transition-all duration-300 mb-6">
                      <span className="text-[#1E6F9F] group-hover:scale-110 transition-transform duration-300">
                        <service.Icon size={38} />
                      </span>
                    </div>

                    {/* Name + arrow */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[15px] font-bold uppercase tracking-widest text-white group-hover:text-[#1E6F9F] transition-colors">
                        {service.name}
                      </span>
                      <span className="text-white/20 group-hover:text-[#1E6F9F]/70 transition-all group-hover:translate-x-1 duration-300">→</span>
                    </div>

                    {/* Blurb */}
                    <p className="text-white/50 text-[15px] leading-relaxed group-hover:text-white/70 transition-colors">
                      {data.cardBlurb}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <footer className="pointer-events-auto px-6 py-6">
          <div className="max-w-7xl mx-auto border-t border-white/10 pt-4">
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 font-medium tracking-wide">
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white/80 transition-colors">Privacy</Link>
                <Link href="/terms"   className="hover:text-white/80 transition-colors">Terms</Link>
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