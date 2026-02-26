export default function StatusBadge() {
  return (
    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-none border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-medium uppercase tracking-widest mb-10">
      <span className="relative flex w-2 h-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
        <span className="relative inline-flex rounded-full w-2 h-2 bg-teal-500" />
      </span>
      System Infrastructure Deployment
    </div>
  );
}