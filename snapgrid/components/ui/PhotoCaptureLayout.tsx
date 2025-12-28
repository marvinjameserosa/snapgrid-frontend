"use client";
import React, { useState } from "react";
import { DINEng } from '@/lib/fonts';
import PhotoGrid from './PhotoGrid';


/* Preview area with optional selected image. */
export function PreviewPanel({ selected }: { selected?: string }) {
  return (
    <div className={`${DINEng.className} bg-[#171717] border border-[#222] rounded-md overflow-hidden`}>
      <div className="h-72 md:h-[420px] flex items-center justify-center bg-[#1b1b1b]">
        {selected ? (
            <img src={selected} alt="Selected" className="h-full w-full object-cover" />
        ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 h-full">
                <img src="/icons/uploading (white).png" alt="upload" className="h-12 w-12 mb-4 opacity-60" />
                <div className="uppercase text-sm tracking-wide">Upload your photos</div>
                <div className="text-xs text-gray-500 mt-2">Drag & drop or click</div>
            </div>
        )}
      </div>
    </div>
  );
}

/* Primary action buttons and the yellow 'UPLOAD PHOTOS' CTA */
export function ControlsBar({ onToggleFilters, filtersOpen }: { onToggleFilters?: () => void; filtersOpen?: boolean }) {
  return (
    <div className={`${DINEng.className} mt-4`}>
      <div className="flex gap-4">
        <button className="flex-1 border border-[#2a2a2a] bg-transparent text-gray-200 py-3 px-4 rounded flex items-center justify-center gap-3 cursor-pointer">
          <img src="/icons/camera (white).png" alt="camera" className="h-4 w-4" />
          <span className="uppercase text-lg font-extralight">Camera</span>
        </button>
        <button className="cursor-pointer flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded flex items-center justify-center gap-3">
          <img src="/icons/uploading (white).png" alt="upload" className="h-4 w-4" />
          <span className="uppercase text-lg">Upload</span>
        </button>
      </div>

      <button className="cursor-pointer mt-4 w-full h-15 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded uppercase  flex items-center justify-center gap-3">
        <img src="/icons/uploading (black).png" alt="upload photos" className="h-4 w-4" />
        <span className="text-lg">Upload Photos</span>
      </button>

      <div className="mt-4 flex gap-3">
        <button className="cursor-pointer flex-1 bg-sky-500 text-white py-2 px-3 rounded text-s flex items-center justify-center gap-2">
          <img src="/icons/STICKERS.png" alt="stickers" className="h-4 w-4" />
          <span className="uppercase text-lg">Stickers</span>
        </button>
        <button onClick={onToggleFilters} className={`cursor-pointer flex-1 py-2 px-3 rounded text-s flex items-center justify-center gap-2 ${filtersOpen ? 'bg-cyan-700 text-white' : 'bg-cyan-500 text-white'}`}>
          <img src="/icons/FILTERS.png" alt="filters" className="h-4 w-4" />
          <span className="uppercase text-lg">Filters</span>
        </button>
        <button className="cursor-pointer flex-1 border border-[#2a2a2a] text-gray-200 py-2 px-3 rounded text-s flex items-center justify-center gap-2">
          <img src="/icons/RESET.png" alt="reset" className="h-4 w-4" />
          <span className="uppercase text-lg">Reset</span>
        </button>
      </div>

      {filtersOpen && (
        <div className="mt-4 border-t border-[#1e1e1e] pt-3">
          <div className="text-center text-lg uppercase text-cyan-300 py-3 border border-solid border-[#092433] rounded">Select a photo below to add filters</div>
        </div>
      )}
    </div>
  );
}

/* Filter thumbnail strip */
export function FilterStrip() {
  const thumbs = new Array(6).fill(0).map((_, i) => `/images/placeholder-${i + 1}.jpg`);
  return (
    <div className={`${DINEng.className} mt-4 bg-[#121212] p-3 border border-[#202020] rounded` }>
      <div className="flex gap-3 overflow-x-auto py-2">
        {thumbs.map((t, i) => (
          <div key={i} className="min-w-[72px] h-16 bg-[#111] rounded overflow-hidden border border-[#222]">
            <img src={t} alt={`filter-${i}`} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}


export default function PhotoCaptureLayout({ gridItems, gridSize, gridTitle }: { gridItems?: Array<string | { id?: number; src?: string }>, gridSize?: number, gridTitle?: string }) {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className={`${DINEng.className} grid grid-cols-1 md:grid-cols-3 gap-6`}>
      <div className="md:col-span-2">
        <PreviewPanel selected={selected} />
        <ControlsBar onToggleFilters={() => setFiltersOpen((v) => !v)} filtersOpen={filtersOpen} />
        {filtersOpen && <FilterStrip />}
      </div>

      <div className="md:col-span-1">
        <PhotoGrid 
                items={gridItems} 
                size={4}          // total size
                columns={2}       // n of columns
                title="PHOTO GRID" 
                onSelect={(src) => setSelected(src)} 
              />
      </div>
    </div>
  );
}
