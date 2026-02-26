import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs font-light text-gray-600 mt-12 md:mt-0">
      <p>© <span id="current-year"></span> KELSEYT. All rights reserved.</p>
      <div className="flex gap-4 mt-4 md:mt-0">
        <Link href="#" className="hover:text-white transition-colors">
          Privacy Policy
        </Link>
        <Link href="#" className="hover:text-white transition-colors">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}