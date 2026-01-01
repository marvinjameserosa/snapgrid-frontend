"use client";
import React from "react";
import { DINEng, TTFirsNeue, segmentA, DSDIGI, segmentAbold } from "@/lib/fonts";

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

  const indicatorPalette = ["#39FF14", "#39FF14", "#FF1D25", "#FFD400"];

  return (
    <aside id="main-navigation" className={classes.join(' ')} style={{ fontFamily: 'TT Firs Neue Trial Var Roman, sans-serif' }}>
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
          <h2 className={`text-5xl font-extrabold tracking-wide text-white tracking-tight ${segmentA.className}`}>
            SnapGrid <span className="text-yellow-400">Station</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">Are you lost in the city too?</p>
          <hr className="border-gray-500"></hr>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className={`rounded-full bg-red-500 text-white font-bold h-10 w-10 flex items-center justify-center text-lg ${DSDIGI.className}`}>5G</div>
            <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">SUBWAY LINE STATUS</p>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <svg width="20" height="12" viewBox="0 0 32 16" fill="none" aria-hidden>
              <path d="M20 3l7 5-7 5" stroke="#FACC15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 8h22" stroke="#FACC15" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <h4 className={`text-lg text-yellow-400 uppercase tracking-wide font-semibold ${DINEng.className}`}>Your Journey</h4>
          </div>

          <nav className="relative space-y-4">
            <span
              aria-hidden
              className="pointer-events-none absolute top-[10px] bottom-[10px] w-[2px]"
              style={{ left: 12, backgroundColor: "#2F2F2F" }}
            />
            {stations.map((st, index) => {
              const active = st.id === activeStationId;
              const indicatorColor =
                indicatorPalette[index] ?? indicatorPalette[indicatorPalette.length - 1];
              const indicatorStyle: React.CSSProperties = {
                backgroundColor: indicatorColor,
                marginLeft: active ? -7 : 0,
              };
              const subtitleTone =
                st.subtitle?.trim().toUpperCase() === "PHOTO GALLERY" ? "text-white" : "text-gray-400";
              return (
                <div
                  key={st.id}
                  className="w-full flex items-start gap-4 text-left"
                >
                  <span
                    className="mt-1 h-3 w-3 rounded-full flex-none flex-shrink-0"
                    style={indicatorStyle}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold uppercase text-yellow-400">{st.title}</p>
                      {active && (
                        <span
                          className="ml-4 bg-red-500 text-white text-xs px-3 py-1"
                          style={{
                            borderRadius: 0,
                            fontFamily: "Arial, Helvetica, sans-serif",
                            fontSize: "0.6rem",
                          }}
                        >
                          IN TRANSIT
                        </span>
                      )}
                    </div>
                    <p className={`text-sm uppercase font-semibold mt-0.10 ${subtitleTone} ${DINEng.className}`}>{st.subtitle}</p>
                  </div>
                </div>
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
