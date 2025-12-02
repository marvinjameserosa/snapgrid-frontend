"use client";
import React from "react";

export type StationItem = {
  id: number;
  title: string;
  subtitle?: string;
};

export default function Sidebar({
  stations = [],
  activeStationId = 1,
  isOpen = false,
  onClose,
  onSelect,
  isDesktop = false,
  onToggle,
}: Readonly<{
  stations?: StationItem[];
  activeStationId?: number;
  isOpen?: boolean;
  onClose?: () => void;
  onSelect?: (id: number) => void;
  isDesktop?: boolean;
  onToggle?: () => void;
}>) {
  const classes = [
    'w-72',
    'bg-[#0b0b0b]',
    'border-r',
    'border-gray-900',
    'flex',
    'flex-col',
    'justify-between',
    'p-6',
    'transform',
    'transition-transform',
    'duration-300',
    'ease-in-out',
  ];

  if (isDesktop) {
    classes.push('translate-x-0', 'relative', 'md:static');
  } else {
    classes.push(isOpen ? 'translate-x-0' : '-translate-x-full', 'fixed', 'inset-y-0', 'left-0');
  }

  classes.push('z-30');

  return (
    <aside id="main-navigation" className={classes.join(' ')}>
      {!isDesktop && (
        <button
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-controls="main-navigation"
          aria-expanded={isOpen}
          onClick={onToggle}
          className="absolute top-4 right-4 z-40 p-2 rounded focus:outline-none"
        >
          <div className="w-8 h-8 flex items-center justify-center relative">
            <span className={`absolute block w-6 h-0.5 bg-yellow-400 transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45' : '-rotate-45 translate-y-2'}`} />
            <span className={`absolute block w-6 h-0.5 bg-yellow-400 transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45' : 'rotate-45 -translate-y-2'}`} />
          </div>
        </button>
      )}

      <div className="flex-1 flex flex-col">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            SnapGrid <span className="text-yellow-400">Station</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">Are you lost in the city too?</p>
          <hr className="border-gray-500"></hr>
        </div>

        <div className="mb-6">
          
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-full bg-red-500 text-white font-bold h-10 w-10 flex items-center justify-center text-sm">55</div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">SUBWAY LINE STATUS</p>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-yellow-400">
              <path d="M2 12h20" stroke="currentColor" strokeWidth="2" />
            </svg>
            <h4 className="text-xs text-yellow-400 uppercase tracking-wider font-semibold">Your Journey</h4>
          </div>

          <nav className="space-y-4">
            {stations.map((st) => {
              const active = st.id === activeStationId;
              return (
                <button
                  key={st.id}
                  onClick={() => onSelect?.(st.id)}
                  className="w-full flex items-start gap-4 text-left hover:opacity-80 transition-opacity"
                >
                  <span className={`mt-1 h-3 w-3 rounded-full flex-none flex-shrink-0 ${active ? "bg-red-500" : "bg-yellow-400"}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-semibold uppercase ${active ? "text-yellow-400" : "text-white"}`}>{st.title}</p>
                      {active && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded font-semibold">IN TRANSIT</span>}
                    </div>
                    <p className="text-xs text-gray-400 uppercase mt-1">{st.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="text-xs text-gray-400 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        <span>SYSTEM ONLINE</span>
      </div>
    </aside>
  );
}
