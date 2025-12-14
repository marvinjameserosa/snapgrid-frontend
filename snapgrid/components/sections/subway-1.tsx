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

export default function subwayOne() {
    return(

        <>
        <p>Hello world!</p>
        </>
    )
}