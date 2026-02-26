import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full">
      <div className="text-xl font-medium tracking-tighter text-white uppercase">
        ANSPA
      </div>
      <Link 
        href="mailto:contact@kelseyt.com" 
        className="text-sm font-light text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
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