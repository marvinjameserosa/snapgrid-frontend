"use client";
import React, { useState, useEffect } from "react";
import Squares from '@/components/ui/bg-particles';
import Sidebar from '@/components/ui/sidebar';
  
type Station = {
  id: number;
  title: string;
  subtitle?: string;
};

// Values for each station
const stations: Station[] = [
  { id: 1, title: "SUBWAY 1", subtitle: "4-Cut Train Car" },
  { id: 2, title: "SUBWAY 2", subtitle: "Subway Doors" },
  { id: 3, title: "ELEVATOR", subtitle: "Vertical Strip" },
  { id: 4, title: "TRANSIT TERMINAL", subtitle: "Route Maps" },
];

// Header badge
function SmallBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 border border-yellow-400 text-yellow-400 text-xs ">
      {children}
    </span>
  );
}

// Button 1
function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-xs border border-gray-600 text-gray-300 hover:bg-gray-800 px-4 py-2 w-full rounded transition"
    >
      {children}
    </button>
  );
}

// Station card
function StationCard({ station }: { station: Station }) {
  const renderIcon = (id: number) => {
    switch (id) {
      case 1:
        return (
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="text-gray-400">
            <rect x="3" y="3" width="18" height="18" rx="1" stroke="#6b7280" strokeWidth="1.5" />
            <g stroke="#6b7280" strokeWidth="1.5">
              <path d="M7 8h3M7 12h3M7 16h3M14 8h3M14 12h3M14 16h3" />
            </g>
          </svg>
        );
      case 2:
        return (
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="text-gray-400">
            <path d="M8 7v10" stroke="#6b7280" strokeWidth="1.5" />
            <path d="M16 7v10" stroke="#6b7280" strokeWidth="1.5" />
            <path d="M8 12h8" stroke="#6b7280" strokeWidth="1.5" />
          </svg>
        );
      case 3:
        return (
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="text-gray-400">
            <path d="M12 6v12" stroke="#6b7280" strokeWidth="1.5" />
            <path d="M9 9v6" stroke="#6b7280" strokeWidth="1.5" />
            <path d="M15 9v6" stroke="#6b7280" strokeWidth="1.5" />
          </svg>
        );
      default:
        return (
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="text-gray-400">
            <path d="M4 6l7-4 9 4v10l-7 4-9-4z" stroke="#6b7280" strokeWidth="1.5" />
          </svg>
        );
    }
  };

  const renderPreview = (id: number) => {
    switch (id) {
      case 1:
        // 2x2 grid - responsive squares
        return (
          <div className="grid grid-cols-2 gap-2 w-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-800 border border-gray-700 rounded-sm" />
            ))}
          </div>
        );
      case 2:
        // 3x3 grid - responsive squares
        return (
          <div className="grid grid-cols-3 gap-2 w-full">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-800 border border-gray-700 rounded-sm" />
            ))}
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-2 items-center w-full justify-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-3/4 h-2 sm:h-3 bg-gray-800 border border-gray-700 rounded-sm" />
            ))}
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-2 gap-2 w-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-800 border border-gray-700 rounded-sm" />
            ))}
          </div>
        );
    }
  };

  return (
    <article className="relative border border-gray-800 p-6 sm:p-8 rounded-md flex flex-col justify-between items-center text-center min-h-[420px] sm:min-h-[480px] md:min-h-[520px] bg-transparent hover:shadow-[0_0_0_6px_rgba(255,255,255,0.01)] transition">
      <div className="absolute top-3 left-3 text-xs border border-gray-800 px-2 rounded bg-[#0b0b0b]">{String(station.id).padStart(2, "0")}</div>
      <div className="absolute top-3 right-3 h-3 w-3 rounded-full bg-yellow-400" aria-hidden />

      <div className="pt-4 mb-2 flex flex-col items-center">
        <div className="h-14 w-14 sm:h-20 sm:w-20 rounded bg-gray-900 flex items-center justify-center mb-4">
          {renderIcon(station.id)}
        </div>
        <h3 className="text-lg sm:text-2xl text-gray-100 font-extrabold mb-1 uppercase tracking-wide">{station.title}</h3>
        {station.subtitle && <p className="text-xs text-gray-400 mb-6">{station.subtitle}</p>}
      </div>

      <div className="flex-1 flex items-center justify-center mb-6 w-full">
        <div className="w-full max-w-40">
          {renderPreview(station.id)}
        </div>
      </div>

      <div className="w-full mt-6">
        <Button>— BOARD THIS TRAIN</Button>
      </div>
    </article>
  );
}

export default function GridLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeStationId, setActiveStationId] = useState<number>(1);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  useEffect(() => {
    // Lock body scroll when sidebar is open on small screens (only on mobile)
    const shouldLockScroll = !isDesktop && isSidebarOpen;
    document.body.style.overflow = shouldLockScroll ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSidebarOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    // set collapse threshold at 1000px
    const checkWidth = () => {
      const desktop = window.innerWidth >= 1000;
      setIsDesktop(desktop);
      if (desktop) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);
  return (
   
    <div className="min-h-screen flex bg-[#0a0a0a] text-gray-100">
      {/* Fixed burger button visible when sidebar is closed on mobile */}
      {!isDesktop && !isSidebarOpen && (
        <button
          aria-label="Open navigation"
          aria-controls="main-navigation"
          aria-expanded={isSidebarOpen}
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-40 p-2 rounded focus:outline-none"
        >
          <div className="w-8 h-8 flex flex-col items-center justify-center gap-1.5">
            <span className="block w-6 h-0.5 bg-yellow-400" />
            <span className="block w-6 h-0.5 bg-yellow-400" />
            <span className="block w-6 h-0.5 bg-yellow-400" />
          </div>
        </button>
      )}
      <Sidebar
        stations={stations}
        activeStationId={activeStationId}
        isOpen={isSidebarOpen}
        isDesktop={isDesktop}
        onClose={() => setIsSidebarOpen(false)}
        onSelect={(id) => setActiveStationId(id)}
        onToggle={() => setIsSidebarOpen((v) => !v)}
      />

      {/* Main content (with background canvas) */}
      <main className="relative flex-1 p-12">
        {/* Mobile overlay when sidebar is open */}
        <div className={`${(!isDesktop && isSidebarOpen) ? 'block' : 'hidden'} fixed inset-0 bg-black/40 z-20`} onClick={() => setIsSidebarOpen(false)} />
        {/* Background canvas positioned inside main so it scales with the content width */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Squares 
            speed={0.5}
            squareSize={48}
            direction="diagonal"
            borderColor={'rgba(255,255,255,0.04)'}
            hoverFillColor={'rgba(255,255,255,0.02)'}
          />
        </div>
        <div className="relative max-w-6xl mx-auto z-10">
          <div className="text-center mb-12">
            <SmallBadge>STATION 01</SmallBadge>
            <h1 className="text-6xl mt-6 font-extrabold tracking-tight leading-tight">
              SELECT YOUR <br></br><span className="text-yellow-400">STATION</span>
            </h1>
            <p className="mt-3 text-gray-400">Choose your photobooth layout and prepare for departure</p>
            <div className="flex items-center justify-center gap-3 mt-4 border-2 border-solid border-gray-400 w-40 p-2 m-auto">
              <span className="h-3 w-3 rounded-full bg-green-500 inline-block" />
              <span className="text-xs text-green-500">SYSTEM READY</span>
            </div>
            <div className="mt-6 text-red-500 text-2xl">▾</div>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {stations.map((s) => (
              <StationCard key={s.id} station={s} />
            ))}
          </section>
        </div>
      </main>
    </div>

  );
}