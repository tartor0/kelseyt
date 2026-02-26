import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center pointer-events-auto gap-3 pb-4 md:pb-6">
      {/* Website URL — prominent, centered, matching the image */}
      <a
        href="https://www.kelseyt.co"
        className="text-xs sm:text-sm tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300 uppercase font-light"
        target="_blank"
        rel="noopener noreferrer"
      >
        www.kelseyt.co
      </a>

      {/* Bottom row — copyright + legal links */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-[10px] tracking-wider text-white/20 font-light">
        <p>© <span id="current-year"></span> KELSEYT. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-white/50 transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-white/50 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}