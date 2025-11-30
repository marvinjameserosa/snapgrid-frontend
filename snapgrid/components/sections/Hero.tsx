import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DINEng, TTFirsNeue, segmentA, DSDIGI } from "@/lib/fonts";

function CameraIcon() {
  return (
    <svg
      aria-hidden
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 7.5h-.5A2.5 2.5 0 0 0 4 10v7a2.5 2.5 0 0 0 2.5 2.5h11A2.5 2.5 0 0 0 20 17v-7a2.5 2.5 0 0 0-2.5-2.5H17"
      />
      <path d="M9 7.5 10.5 5h3L15 7.5" />
      <circle cx="12" cy="13.5" r="3" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg
      aria-hidden
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <rect height="6" width="6" x="4" y="4" />
      <rect height="6" width="6" x="14" y="4" />
      <rect height="6" width="6" x="4" y="14" />
      <rect height="6" width="6" x="14" y="14" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg
      aria-hidden
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M11 3 5 13h6l-2 8 8-12h-6z" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg
      aria-hidden
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="m9 4-5 2v14l5-2 6 2 5-2V4l-5 2z" />
      <circle cx="18" cy="8" r="1" />
    </svg>
  );
}

function BusIcon() {
  return (
    <svg
      aria-hidden
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <rect height="12" rx="2" width="16" x="4" y="4" />
      <path d="M6 16h12" />
      <circle cx="9" cy="18" r="1" />
      <circle cx="15" cy="18" r="1" />
    </svg>
  );
}

const featureCards = [
  { title: "Capture", icon: <CameraIcon /> },
  { title: "Arrange", icon: <GridIcon /> },
  { title: "Enhance", icon: <BoltIcon /> },
  { title: "Share", icon: <MapIcon /> },
];

export default function Hero() {
  return (
    <section className="relative isolate h-screen overflow-hidden bg-black text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_55%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,0,0,0.08)_0%,_rgba(0,0,0,0)_55%)]"
      />

      <div className="pointer-events-none absolute left-6 top-6 h-14 w-14 border-l-2 border-t-2 border-yellow-400/80" />
      <div className="pointer-events-none absolute right-6 top-6 h-14 w-14 border-r-2 border-t-2 border-yellow-400/80" />
      <div className="pointer-events-none absolute bottom-6 left-6 h-14 w-14 border-b-2 border-l-2 border-yellow-400/80" />
      <div className="pointer-events-none absolute bottom-6 right-6 h-14 w-14 border-b-2 border-r-2 border-yellow-400/80" />

      <div className="relative mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-between box-border px-6 py-10">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex items-center gap-4 rounded-sm border border-neutral-800 bg-neutral-900/70 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-neutral-300">
            <span className="flex items-center gap-2 text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              System Online
            </span>
            <span className="h-3 w-px bg-neutral-700" />
            <span className="text-neutral-500">2025-11-18</span>
          </div>

          <div className="flex items-center gap-2 rounded-sm border border-red-500 bg-red-600 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-black">
            <span className="flex items-center gap-2">
              <BusIcon />
              Transit
            </span>
            <span className="h-3 w-px bg-black/30" />
            <span>5G</span>
          </div>

          <div className={`${segmentA.className} space-y-2`}>
            <h1 className="text-6xl font-extrabold leading-tight tracking-[0.08em] sm:text-8xl md:text-9xl">
              <span className="block text-white">SnapGrid</span>
              <span className="block text-yellow-400">Station</span>
            </h1>
          </div>
        </div>

        <div className={`${TTFirsNeue.className} relative mx-auto mt-8 w-full max-w-md`}>
            <div className="absolute -left-3 -top-3 h-4 w-4 border-l-2 border-t-2 border-red-500" />
            <div className="absolute -right-3 -top-3 h-4 w-4 border-r-2 border-t-2 border-red-500" />
            <div className="absolute -left-3 -bottom-3 h-4 w-4 border-b-2 border-l-2 border-red-500" />
            <div className="absolute -right-3 -bottom-3 h-4 w-4 border-b-2 border-r-2 border-red-500" />
            <div className="text-center rounded-sm border border-neutral-800 bg-neutral-900/70 px-8 py-4 text-base tracking-[0.28em] text-gray-400">
            Are you lost in the city too?
            </div>
        </div>

        <div className="flex w-full flex-1 flex-col items-center justify-center gap-12">
          <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((feature) => (
              <Card key={feature.title} icon={feature.icon} title={feature.title} />
            ))}
          </div>

          <div className={`${DSDIGI.className} flex flex-col items-center gap-5 text-center`}>
            <Button size="lg" className="px-10">
              {"-> Enter Station ->"}
            </Button>
          </div>
        </div>

        <p className={`${DINEng.className} text-xs uppercase tracking-[0.35em] text-neutral-500`}>
              Press to begin your photo journey
            </p>

        <div className="flex w-full max-w-2xl items-center justify-between rounded-sm border border-neutral-800 bg-neutral-900/70 px-5 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-neutral-400">
          <span className="flex items-center gap-2 text-red-400">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Platform Ready
          </span>
          <span className="h-px flex-1 bg-neutral-800" />
          <span>4 Layouts + Unlimited Memories</span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-1/3 -translate-y-1/2 bg-[radial-gradient(circle,_rgba(255,255,0,0.06)_0%,_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%223%22%20height%3D%223%22%20viewBox%3D%220%200%203%203%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%220.5%22%20fill%3D%22%23ff0000%22%20fill-opacity%3D%220.15%22/%3E%3C/svg%3E')] opacity-40" />
    </section>
  );
}