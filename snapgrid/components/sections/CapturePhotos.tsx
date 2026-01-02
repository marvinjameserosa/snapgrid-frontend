"use client";
import React, { useState, useEffect } from "react";
import Squares from '@/components/ui/bg-particles';
import Sidebar from '@/components/ui/sidebar';
import PhotoCaptureLayout from '@/components/ui/PhotoCaptureLayout';

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

// Journey steps for sidebar
const journeySteps: Station[] = [
  { id: 1, title: "STATION 01", subtitle: "SELECT LAYOUT" },
  { id: 2, title: "STATION 02", subtitle: "CAPTURE PHOTOS" },
  { id: 3, title: "STATION 03", subtitle: "PHOTO GALLERY" },
  { id: 4, title: "STATION 04", subtitle: "SHARE RESULTS" },
];

// are youer badge
function SmallBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 border border-red-600 text-red-600 text-xs font-bold ">
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

export default function CapturePhotos() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeStationId, setActiveStationId] = useState<number>(2);
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
          stations={journeySteps}
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

          {/* Station header */}
          <div className="relative max-w-6xl mx-auto z-10">
            <div className="text-center mb-8">
              <SmallBadge>STATION 02</SmallBadge>
              <h1 className="mt-6 tracking-tight">
                <p className="block text-4xl md:text-6xl font-normal leading-none">CAPTURE <span className="inline text-4xl md:text-6xl font-extrabold leading-none text-red-600">PHOTOS</span></p>
              </h1>
                <p className="mt-3 text-gray-400 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-gray-600" />
                0/4 PHOTOS CAPTURED
                <span className="h-px w-8 bg-gray-600" />
                </p>
                <div className="h-2 bg-gray-600 rounded mt-2 mx-auto w-1/2">
                <div className="h-full bg-yellow-400 rounded" style={{ width: '0%' }} />
                </div>
            </div>

            {/* Photo capture layout component*/}
            <PhotoCaptureLayout gridSize={activeStationId === 3 ? 4 : activeStationId === 3 ? 2 : 5} />

          </div>
        </main>
      </div>
    );
}