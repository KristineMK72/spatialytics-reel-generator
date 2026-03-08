"use client";

import { useState } from "react";

type Template = "website" | "gis" | "dashboard";

export default function VideoForm() {
  const [template, setTemplate] = useState<Template>("website");
  const [spaceMode, setSpaceMode] = useState(true);

  const [headline, setHeadline] = useState(
    "START YOUR WEBSITE OR GIS PROJECT"
  );

  const [subtext, setSubtext] = useState(
    "Websites, GIS, and data storytelling"
  );

  const [items, setItems] = useState([
    "Interactive maps",
    "Data dashboards",
    "GIS consulting",
    "Modern business websites",
  ]);

  const [logo, setLogo] = useState<string | null>(null);
  const [background, setBackground] = useState<string | null>(null);
  const [promoImage, setPromoImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");

  function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setter(url);
  }

  function applyTemplate(value: Template) {
    setTemplate(value);

    if (value === "website") {
      setHeadline("START YOUR BUSINESS WEBSITE");
      setSubtext("Modern websites for growing businesses");
      setItems([
        "Responsive websites",
        "Online booking",
        "SEO optimization",
        "Mobile-friendly design",
      ]);
    }

    if (value === "gis") {
      setHeadline("START YOUR GIS PROJECT");
      setSubtext("Spatial intelligence for real-world decisions");
      setItems([
        "Interactive maps",
        "Spatial data analysis",
        "Environmental mapping",
        "Municipal GIS solutions",
      ]);
    }

    if (value === "dashboard") {
      setHeadline("BUILD A DATA DASHBOARD");
      setSubtext("Turn your data into visual insight");
      setItems([
        "Data dashboards",
        "Analytics visualizations",
        "Interactive charts",
        "Decision-support tools",
      ]);
    }
  }

  function generateCaption() {
    const text = `🚀 ${headline}

${subtext}

✔ ${items.join("\n✔ ")}

Start your project today:
https://spatialytics.space

#Spatialytics #GIS #WebDesign #DataVisualization`;
    setCaption(text);
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <div>
          <label className="font-semibold text-white">Template</label>
          <select
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white outline-none"
            value={template}
            onChange={(e) => applyTemplate(e.target.value as Template)}
          >
            <option value="website" className="text-black">
              Website Promo
            </option>
            <option value="gis" className="text-black">
              GIS Project
            </option>
            <option value="dashboard" className="text-black">
              Data Dashboard
            </option>
          </select>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-white">
          <input
            id="space-mode"
            type="checkbox"
            checked={spaceMode}
            onChange={(e) => setSpaceMode(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="space-mode" className="font-medium">
            Space fly-through mode
          </label>
        </div>

        <div>
          <label className="font-semibold text-white">Headline</label>
          <input
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white outline-none"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold text-white">Subtext</label>
          <input
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white outline-none"
            value={subtext}
            onChange={(e) => setSubtext(e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold text-white">Bullet Items</label>
          <div className="mt-2 space-y-2">
            {items.map((item, i) => (
              <input
                key={i}
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white outline-none"
                value={item}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = e.target.value;
                  setItems(next);
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="font-semibold text-white">Upload Logo</label>
          <input
            type="file"
            accept="image/*"
            className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white"
            onChange={(e) => handleImageUpload(e, setLogo)}
          />
        </div>

        <div>
          <label className="font-semibold text-white">Upload Background</label>
          <input
            type="file"
            accept="image/*"
            className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white"
            onChange={(e) => handleImageUpload(e, setBackground)}
          />
        </div>

        <div>
          <label className="font-semibold text-white">Upload Promo Image</label>
          <input
            type="file"
            accept="image/*"
            className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white"
            onChange={(e) => handleImageUpload(e, setPromoImage)}
          />
        </div>

        <button
          className="rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-5 py-3 font-semibold text-slate-950"
          onClick={generateCaption}
        >
          Generate Caption
        </button>

        {caption && (
          <textarea
            className="h-48 w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none"
            value={caption}
            readOnly
          />
        )}
      </div>

      <div className="rounded-3xl border border-cyan-300/15 bg-gradient-to-br from-cyan-400/10 to-indigo-500/10 p-6">
        <div className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-100">
          Space Preview
        </div>

        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#091321] shadow-2xl">
          <div
            className={[
              "relative aspect-[9/16] w-full p-6",
              spaceMode ? "space-preview" : "",
            ].join(" ")}
            style={{
              backgroundImage: background
                ? `linear-gradient(180deg, rgba(7,17,31,0.45) 0%, rgba(9,17,31,0.72) 100%), url(${background})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#07111f",
            }}
          >
            {spaceMode && (
              <>
                <div className="space-stars layer-1" />
                <div className="space-stars layer-2" />
                <div className="space-stars layer-3" />
                <div className="space-glow" />
              </>
            )}

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <h1 className="max-w-md text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                  {headline}
                </h1>

                <div className="mt-5 inline-block rounded-2xl bg-[#f5d547] px-4 py-3 text-lg font-extrabold text-slate-900 shadow-lg">
                  {subtext}
                </div>

                <ul className="mt-6 space-y-3 text-lg font-semibold text-white/95">
                  {items.map((item, i) => (
                    <li key={i}>✓ {item}</li>
                  ))}
                </ul>
              </div>

              {promoImage && (
                <div className={spaceMode ? "floating-card mx-auto mt-6 w-[72%]" : "mx-auto mt-6 w-[72%]"}>
                  <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/5 shadow-2xl">
                    <img
                      src={promoImage}
                      alt="Promo preview"
                      className="block h-auto w-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="pt-5">
                <button className="w-full rounded-2xl bg-white px-5 py-4 text-center text-xl font-extrabold text-slate-900 shadow-xl">
                  Start your project
                </button>

                <div className="mt-5 flex items-center gap-4">
                  {logo ? (
                    <img
                      src={logo}
                      alt="Logo"
                      className="h-14 w-14 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-xs text-white/60">
                      Logo
                    </div>
                  )}

                  <div>
                    <div className="text-2xl font-bold tracking-wide text-white">
                      SPATIALYTICS
                    </div>
                    <div className="text-sm text-white/70">
                      spatialytics.space
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/70">
          Space fly-through mode adds animated stars and floating motion so the
          preview feels more like a reel concept.
        </div>
      </div>
    </div>
  );
}
