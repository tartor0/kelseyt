'use client';

import useCountdown from '../../hooks/useCountdown';

export default function CountdownTimer() {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <div className="flex items-center justify-center gap-6 md:gap-12 mb-16 w-full">
      <TimeUnit value={days} label="Days" />
      <Separator />
      <TimeUnit value={hours} label="Hours" />
      <Separator />
      <TimeUnit value={minutes} label="Mins" />
      <Separator className="hidden sm:block" />
      <TimeUnit value={seconds} label="Secs" className="text-teal-400 hidden sm:flex" />
    </div>
  );
}

function TimeUnit({ value, label, className = '' }: { value: number; label: string; className?: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className={`text-4xl md:text-6xl font-medium text-white tracking-tighter tabular-nums ${className}`}>
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs font-light text-gray-500 mt-2 tracking-widest uppercase">{label}</span>
    </div>
  );
}

function Separator({ className = '' }: { className?: string }) {
  return <div className={`text-2xl md:text-4xl font-light text-gray-700 pb-6 ${className}`}>:</div>;
}