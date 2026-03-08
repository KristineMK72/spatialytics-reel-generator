import VideoForm from "@/components/VideoForm";

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-14 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-100">
          Spatialytics Reel Generator
        </div>

        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Generate clean promo reels for websites, GIS services, and map-based storytelling
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-white/70 sm:text-lg">
          Build vertical social media promos with readable text, a strong call to action,
          and reusable content blocks for Spatialytics projects.
        </p>

        <div className="mt-10">
          <VideoForm />
        </div>
      </div>
    </main>
  );
}
