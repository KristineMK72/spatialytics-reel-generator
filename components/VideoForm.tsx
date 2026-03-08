"use client";

import { useState } from "react";

type Template = "website" | "gis" | "dashboard";

export default function VideoForm() {
  const [template, setTemplate] = useState<Template>("website");

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
    const text = `
Need help with a website or GIS project?

Spatialytics helps businesses and organizations turn data into powerful tools.

✔ ${items.join("\n✔ ")}

Start your project today:
https://spatialytics.space
`;

    setCaption(text);
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">

      {/* LEFT SIDE CONTROLS */}

      <div className="space-y-6">

        <div>
          <label className="font-semibold">Template</label>
          <select
            className="w-full border rounded p-2 mt-2"
            value={template}
            onChange={(e) =>
              applyTemplate(e.target.value as Template)
            }
          >
            <option value="website">Website Promo</option>
            <option value="gis">GIS Project</option>
            <option value="dashboard">Data Dashboard</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Headline</label>
          <input
            className="w-full border rounded p-2 mt-2"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold">Subtext</label>
          <input
            className="w-full border rounded p-2 mt-2"
            value={subtext}
            onChange={(e) => setSubtext(e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold">Upload Logo</label>
          <input
            type="file"
            className="mt-2"
            onChange={(e) => handleImageUpload(e, setLogo)}
          />
        </div>

        <div>
          <label className="font-semibold">Upload Background</label>
          <input
            type="file"
            className="mt-2"
            onChange={(e) => handleImageUpload(e, setBackground)}
          />
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={generateCaption}
        >
          Generate Caption
        </button>

        {caption && (
          <textarea
            className="w-full border rounded p-3 h-40"
            value={caption}
            readOnly
          />
        )}
      </div>

      {/* RIGHT SIDE PREVIEW */}

      <div
        className="rounded-xl p-8 text-white"
        style={{
          backgroundImage: background ? `url(${background})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#0b1d3a",
        }}
      >
        <div className="space-y-6">

          <h1 className="text-3xl font-bold leading-tight">
            {headline}
          </h1>

          <div className="bg-yellow-400 text-black px-4 py-2 rounded inline-block">
            {subtext}
          </div>

          <ul className="space-y-2">
            {items.map((item, i) => (
              <li key={i}>✔ {item}</li>
            ))}
          </ul>

          <button className="bg-white text-black px-6 py-2 rounded">
            Start your project
          </button>

          <div className="flex items-center gap-4 pt-6">
            {logo && (
              <img
                src={logo}
                className="w-12 h-12 rounded"
              />
            )}

            <div>
              <div className="font-bold">SPATIALYTICS</div>
              <div className="text-sm">spatialytics.space</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
