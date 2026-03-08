"use client";

import { useMemo, useState } from "react";

type FormState = {
  headline: string;
  subheadline: string;
  bullets: string;
  cta: string;
  website: string;
  backgroundUrl: string;
  promoImageUrl: string;
  logoUrl: string;
};

const defaultState: FormState = {
  headline: "START YOUR WEBSITE OR GIS PROJECT",
  subheadline: "Websites, GIS, and data storytelling",
  bullets: "Interactive maps\nData dashboards\nGIS consulting\nModern business websites",
  cta: "Start your project",
  website: "spatialytics.space",
  backgroundUrl: "/space-bg.jpg",
  promoImageUrl: "/promo-card.jpg",
  logoUrl: "/logo.png",
};

export default function VideoForm() {
  const [state, setState] = useState<FormState>(defaultState);

  const previewBullets = useMemo(
    () =>
      state.bullets
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    [state.bullets]
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-2xl font-semibold text-white">Reel Content</h2>
        <p className="mt-2 text-sm leading-6 text-white/70">
          Start with a simple promo structure for websites, GIS services, and dashboards.
        </p>

        <div className="mt-6 space-y-4">
          <Field label="Headline">
            <input
              value={state.headline}
              onChange={(e) => update("headline", e.target.value)}
              className={inputClass}
              placeholder="START YOUR WEBSITE OR GIS PROJECT"
            />
          </Field>

          <Field label="Subheadline">
            <input
              value={state.subheadline}
              onChange={(e) => update("subheadline", e.target.value)}
              className={inputClass}
              placeholder="Websites, GIS, and data storytelling"
            />
          </Field>

          <Field label="Bullets (one per line)">
            <textarea
              value={state.bullets}
              onChange={(e) => update("bullets", e.target.value)}
              className={textareaClass}
              rows={6}
              placeholder={"Interactive maps\nData dashboards\nGIS consulting"}
            />
          </Field>

          <Field label="CTA">
            <input
              value={state.cta}
              onChange={(e) => update("cta", e.target.value)}
              className={inputClass}
              placeholder="Start your project"
            />
          </Field>

          <Field label="Website">
            <input
              value={state.website}
              onChange={(e) => update("website", e.target.value)}
              className={inputClass}
              placeholder="spatialytics.space"
            />
          </Field>

          <Field label="Background image URL">
            <input
              value={state.backgroundUrl}
              onChange={(e) => update("backgroundUrl", e.target.value)}
              className={inputClass}
              placeholder="/space-bg.jpg"
            />
          </Field>

          <Field label="Promo card image URL">
            <input
              value={state.promoImageUrl}
              onChange={(e) => update("promoImageUrl", e.target.value)}
              className={inputClass}
              placeholder="/promo-card.jpg"
            />
          </Field>

          <Field label="Logo URL">
            <input
              value={state.logoUrl}
              onChange={(e) => update("logoUrl", e.target.value)}
              className={inputClass}
              placeholder="/logo.png"
            />
          </Field>
        </div>
      </section>

      <section className="rounded-3xl border border-cyan-300/15 bg-gradient-to-br from-cyan-400/10 to-indigo-500/10 p-6">
        <div className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-100">
          Preview Content
        </div>

        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#091321] shadow-2xl">
          <div className="aspect-[9/16] w-full bg-[radial-gradient(circle_at_top,rgba(82,125,255,0.20),transparent_28%),linear-gradient(180deg,#07111f_0%,#0b1730_48%,#09111f_100%)] p-6">
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="max-w-md text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                  {state.headline}
                </div>

                <div className="mt-5 inline-flex rounded-2xl bg-[#f5d547] px-4 py-3 text-lg font-extrabold text-slate-900">
                  {state.subheadline}
                </div>

                <div className="mt-6 space-y-3 text-lg font-semibold text-white/95">
                  {previewBullets.map((item, idx) => (
                    <div key={idx}>✓ {item}</div>
                  ))}
                </div>
              </div>

              <div>
                <div className="rounded-2xl bg-white px-5 py-4 text-center text-xl font-extrabold text-slate-900">
                  {state.cta}
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-xs text-white/60">
                    Logo
                  </div>
                  <div>
                    <div className="text-2xl font-bold tracking-wide text-white">
                      SPATIALYTICS
                    </div>
                    <div className="text-sm text-white/70">{state.website}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/70">
          This page is a content editor preview. Final MP4 export will come from the
          Remotion template.
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/85">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-cyan-300/40 focus:bg-white/10";

const textareaClass =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-cyan-300/40 focus:bg-white/10";
