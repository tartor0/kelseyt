import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center w-full pointer-events-auto pt-4 md:pt-6 gap-3">
      {/* Logo — large, bold, tightly tracked */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.06em] uppercase text-white leading-none">
        KELSEYT
      </h1>

      {/* Service categories row */}
      <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 text-[10px] sm:text-xs md:text-sm tracking-[0.15em] text-white/50 font-light uppercase">
        <span>HEALTHTECH</span>
        <span className="text-[#1E6F9F]">•</span>
        <span>PAYMENT SYSTEMS</span>
        <span className="text-[#1E6F9F]">•</span>
        <span>INTEGRATIONS</span>
        <span className="text-[#1E6F9F]">•</span>
        <span>IT CONSULTING</span>
      </div>

      {/* Optional contact link — subtle, top-right absolute if you want it */}
      <Link
        href="mailto:contact@kelseyt.com"
        className="absolute top-4 right-4 md:top-6 md:right-6 text-xs font-light text-white/30 hover:text-white transition-colors duration-300 flex items-center gap-1.5 tracking-wider uppercase"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        Contact
      </Link>
    </header>
  );
}