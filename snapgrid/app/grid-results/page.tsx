"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Squares from "@/components/ui/bg-particles";
import Sidebar from "@/components/ui/sidebar";
import { DINEng } from "@/lib/fonts";

type Station = {
	id: number;
	title: string;
	subtitle: string;
};

const journeySteps: Station[] = [
	{ id: 1, title: "STATION 01", subtitle: "SELECT LAYOUT" },
	{ id: 2, title: "STATION 02", subtitle: "CAPTURE PHOTOS" },
	{ id: 3, title: "STATION 03", subtitle: "PHOTO GALLERY" },
	{ id: 4, title: "STATION 04", subtitle: "SHARE RESULTS" },
];

type ResultsView = "photo-strip" | "gallery-view";

function StationBadge({ children }: { children: React.ReactNode }) {
	return (
		<span className="relative inline-flex items-center justify-center px-10 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-green-400">
			<span className="absolute inset-0 border border-green-400/80" aria-hidden />
			<span className="absolute -top-1 -left-1 h-3 w-3 bg-green-400" aria-hidden />
			<span className="absolute -top-1 -right-1 h-3 w-3 bg-green-400" aria-hidden />
			<span className="absolute -bottom-1 -left-1 h-3 w-3 bg-green-400" aria-hidden />
			<span className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400" aria-hidden />
			<span className="relative tracking-[0.4em]">{children}</span>
		</span>
	);
}

function PillButton({
	active,
	children,
	onClick,
}: {
	active?: boolean;
	children: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={
				"inline-flex items-center justify-center gap-3 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.32em] border transition " +
				(active
					? "bg-red-600 text-white border-red-500 shadow-[0_18px_40px_rgba(220,38,38,0.35)]"
					: "bg-neutral-900/70 text-neutral-200 border-neutral-800 hover:border-neutral-600")
			}
		>
			{children}
		</button>
	);
}

function CircleShareButton({
	href,
	label,
	accent,
}: {
	href: string;
	label: string;
	accent: "blue" | "red" | "sky" | "neutral";
}) {
	const accentClass =
		accent === "blue"
			? "border-blue-500 text-blue-400"
			: accent === "red"
				? "border-red-500 text-red-400"
				: accent === "sky"
					? "border-sky-500 text-sky-400"
					: "border-neutral-700 text-neutral-500";

	return (
		<a
			href={href}
			target="_blank"
			rel="noreferrer"
			className="flex flex-col items-center gap-2"
		>
			<span
				className={
					"h-16 w-16 rounded-full border bg-black/40 flex items-center justify-center text-xs font-semibold uppercase tracking-[0.25em] " +
					accentClass
				}
			>
				{label.slice(0, 2)}
			</span>
			<span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400">
				{label}
			</span>
		</a>
	);
}

function ResultsPreview({ view }: { view: ResultsView }) {
	// Visual-only preview matching the screenshot; real photo wiring can be added once capture step persists images.
	const grid = (
		<div className="grid grid-cols-2 gap-4">
			{Array.from({ length: 4 }).map((_, index) => (
				<div
					key={index}
					className="relative aspect-[4/5] border border-neutral-300 bg-neutral-100 overflow-hidden"
				>
					<span className="absolute bottom-2 right-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1">
						{index + 1}
					</span>
					<div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.03),rgba(0,0,0,0.0),rgba(0,0,0,0.03))]" />
				</div>
			))}
		</div>
	);

	if (view === "gallery-view") {
		return (
			<div className="w-full max-w-2xl mx-auto bg-[#121212] border border-neutral-800/70 px-6 py-8 shadow-[0_50px_120px_rgba(0,0,0,0.65)]">
				<div className="text-center text-xs uppercase tracking-[0.35em] text-neutral-400">
					Gallery View
				</div>
				<div className="mt-6">{grid}</div>
			</div>
		);
	}

	return (
		<div className="w-full max-w-3xl mx-auto bg-white border border-neutral-200 shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
			<div className="px-10 pt-10 pb-6 text-center">
				<div className="text-2xl font-extrabold tracking-wide text-neutral-900">
					SNAPGRID STATION
				</div>
				<div className="mt-1 text-[10px] uppercase tracking-[0.35em] text-neutral-500">
					SUBWAY 1
				</div>
				<div className="mt-6 h-px bg-neutral-300" />
			</div>
			<div className="px-10 pb-10">{grid}</div>
			<div className="px-10 pb-10">
				<div className="h-px bg-neutral-300" />
				<div className="mt-4 text-center text-[10px] uppercase tracking-[0.35em] text-neutral-500">
					SNAPGRID-STATION
				</div>
			</div>
		</div>
	);
}

export default function GridResultsPage() {
	const router = useRouter();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isDesktop, setIsDesktop] = useState(true);
	const [view, setView] = useState<ResultsView>("photo-strip");

	useEffect(() => {
		const handleResize = () => {
			const desktop = window.innerWidth >= 1000;
			setIsDesktop(desktop);
			setIsSidebarOpen(desktop);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (!isDesktop) {
			document.body.style.overflow = isSidebarOpen ? "hidden" : "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isSidebarOpen, isDesktop]);

	const shareUrl = useMemo(() => {
		if (typeof window === "undefined") return "";
		return window.location.href;
	}, []);

	const handlePrint = () => {
		if (typeof window === "undefined") return;
		window.print();
	};

	const handleShare = async () => {
		if (typeof window === "undefined") return;
		const url = window.location.href;
		try {
			if (navigator.share) {
				await navigator.share({ title: "SnapGrid Results", url });
				return;
			}
			await navigator.clipboard.writeText(url);
		} catch {
			// no-op
		}
	};

	return (
		<div className="min-h-screen flex bg-[#070707] text-gray-100">
			{!isDesktop && !isSidebarOpen && (
				<button
					aria-label="Open navigation"
					aria-controls="main-navigation"
					aria-expanded={isSidebarOpen}
					onClick={() => setIsSidebarOpen(true)}
					className="fixed top-4 left-4 z-40 p-2"
				>
					<div className="w-8 h-8 flex flex-col items-center justify-center gap-1.5">
						<span className="block h-0.5 w-6 bg-yellow-400" />
						<span className="block h-0.5 w-6 bg-yellow-400" />
						<span className="block h-0.5 w-6 bg-yellow-400" />
					</div>
				</button>
			)}

			<Sidebar
				stations={journeySteps}
				activeStationId={4}
				indicatorPalette={["#39FF14", "#39FF14", "#39FF14", "#FF1D25"]}
				isOpen={isSidebarOpen}
				isDesktop={isDesktop}
				onToggle={() => setIsSidebarOpen((v) => !v)}
				onClose={() => setIsSidebarOpen(false)}
			/>

			<main className="relative flex-1 px-6 py-10 sm:px-10 lg:px-16 overflow-hidden">
				{!isDesktop && isSidebarOpen && (
					<div
						className="fixed inset-0 z-20 bg-black/40"
						onClick={() => setIsSidebarOpen(false)}
					/>
				)}

				<div className="absolute inset-0 pointer-events-none">
					<Squares
						speed={0.6}
						squareSize={52}
						direction="diagonal"
						borderColor="rgba(255,255,255,0.04)"
						hoverFillColor="rgba(255,255,255,0.03)"
					/>
				</div>

				<div className="relative z-10 max-w-6xl mx-auto">
					<div className="text-center">
						<StationBadge>Station 04</StationBadge>
						<h1
							className={`mt-8 flex items-center justify-center gap-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase ${DINEng.className}`}
						>
							<span className="tracking-[0.03em] text-white">Share</span>
							<span className="tracking-[0.03em] text-green-400">Results</span>
						</h1>
						<p
							className="mt-2 text-sm sm:text-base text-gray-400 tracking-[0.10em]"
							style={{ fontFamily: "TT Firs Neue Trial Var Roman, sans-serif" }}
						>
							Your journey is complete. Download or share your memories.
						</p>
						<div className="mt-6 flex items-center justify-center">
							<span className="inline-flex items-center justify-center gap-4 px-10 py-3 text-[11px] font-semibold uppercase tracking-[0.35em] border border-green-400/70 text-green-400 bg-black/35">
								<span className="h-3 w-3 rounded-full bg-green-400" aria-hidden />
								Journey Completed
							</span>
						</div>

						<div className="mt-6 flex flex-wrap items-center justify-center gap-3">
							<PillButton
								active={view === "photo-strip"}
								onClick={() => setView("photo-strip")}
							>
								PHOTO STRIP
							</PillButton>
							<PillButton
								active={view === "gallery-view"}
								onClick={() => setView("gallery-view")}
							>
								GALLERY VIEW
							</PillButton>
						</div>
					</div>

					<section className="mt-12">
						<ResultsPreview view={view} />
					</section>

					<div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 sm:gap-6">
						<button
							type="button"
							className="flex items-center justify-center gap-4 bg-yellow-400 px-10 py-5 text-xs font-semibold uppercase tracking-[0.32em] text-black shadow-[0_20px_45px_rgba(250,204,21,0.25)] hover:bg-yellow-300 transition"
							// Visual-only for now: capture step doesn’t persist a renderable asset yet
							onClick={() => {
								// no-op
							}}
						>
							DOWNLOAD
						</button>
						<button
							type="button"
							className="flex items-center justify-center gap-4 bg-sky-500 px-10 py-5 text-xs font-semibold uppercase tracking-[0.32em] text-black shadow-[0_20px_45px_rgba(14,165,233,0.25)] hover:bg-sky-400 transition"
							onClick={handleShare}
						>
							SHARE
						</button>
						<button
							type="button"
							className="flex items-center justify-center gap-4 border border-neutral-700 bg-neutral-900/80 px-10 py-5 text-xs font-semibold uppercase tracking-[0.32em] text-gray-100 shadow-[0_18px_40px_rgba(0,0,0,0.45)] hover:border-neutral-500 hover:bg-neutral-900 transition"
							onClick={handlePrint}
						>
							PRINT
						</button>
					</div>

					<section className="mt-14">
						<div className="mx-auto max-w-4xl bg-[#0e0e0e] border border-neutral-800/70 px-6 py-10 shadow-[0_40px_90px_rgba(0,0,0,0.55)]">
							<div className="text-center">
								<div className="text-sm uppercase tracking-[0.35em] text-sky-400">
									Share on Transit Lines
								</div>
								<div className="mt-2 text-[11px] uppercase tracking-[0.35em] text-neutral-500">
									Choose your destination
								</div>
							</div>

							<div className="mt-10 flex flex-wrap items-center justify-center gap-10">
								<CircleShareButton
									href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
									label="Facebook"
									accent="blue"
								/>
								<CircleShareButton
									href={`https://www.instagram.com/`}
									label="Instagram"
									accent="red"
								/>
								<CircleShareButton
									href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
									label="Twitter"
									accent="sky"
								/>
								<CircleShareButton
									href={shareUrl}
									label="More"
									accent="neutral"
								/>
							</div>

							<div className="mt-10 flex items-center justify-center gap-3">
								<span className="h-2 w-2 rounded-full bg-green-500" />
								<span className="text-[10px] uppercase tracking-[0.35em] text-neutral-500">
									All Lines Operational
								</span>
							</div>
						</div>
					</section>

					<div className="mt-12 flex items-center justify-center">
						<button
							type="button"
							className="bg-red-600 px-14 py-6 text-xs font-semibold uppercase tracking-[0.35em] text-white shadow-[0_20px_45px_rgba(220,38,38,0.45)] hover:bg-red-500 transition"
							onClick={() => router.push("/")}
						>
							Start New Journey
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}
