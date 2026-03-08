"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import GIF from "gif.js.optimized";
import gifshot from "gifshot";

type Template = "website" | "gis" | "dashboard";

type LoadedAssets = {
  backgroundImg: HTMLImageElement | null;
  promoImg: HTMLImageElement | null;
  logoImg: HTMLImageElement | null;
};

type Star = {
  x: number;
  y: number;
  size: number;
  speed: number;
  alpha: number;
  color: string;
};

const VIDEO_WIDTH = 1080;
const VIDEO_HEIGHT = 1920;
const VIDEO_FPS = 30;
const VIDEO_DURATION_MS = 8000;

export default function VideoForm() {
  const previewRef = useRef<HTMLDivElement | null>(null);

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
  const [copyStatus, setCopyStatus] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    setter(URL.createObjectURL(file));
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

    setCaption("");
    setCopyStatus("");
  }

  function generateCaption() {
    const text = `🚀 ${headline}

${subtext}

✔ ${items.join("\n✔ ")}

Start your project today:
https://spatialytics.space/project-intake

#Spatialytics #GIS #WebDesign #DataVisualization`;

    setCaption(text);
    setCopyStatus("");
  }

  async function copyCaption() {
    try {
      const textToCopy =
        caption ||
        `🚀 ${headline}

${subtext}

✔ ${items.join("\n✔ ")}

Start your project today:
https://spatialytics.space/project-intake

#Spatialytics #GIS #WebDesign #DataVisualization`;

      await navigator.clipboard.writeText(textToCopy);
      setCopyStatus("Caption copied!");
      setTimeout(() => setCopyStatus(""), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
      setCopyStatus("Copy failed");
      setTimeout(() => setCopyStatus(""), 2000);
    }
  }

  async function downloadPreview() {
    if (!previewRef.current) return;

    try {
      setIsDownloading(true);

      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = "spatialytics-preview.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
      alert("Could not download preview image.");
    } finally {
      setIsDownloading(false);
    }
  }

  async function loadImage(url: string | null): Promise<HTMLImageElement | null> {
    if (!url) return null;

    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  function getSupportedMimeType() {
    const candidates = [
      "video/webm;codecs=vp9",
      "video/webm;codecs=vp8",
      "video/webm",
    ];

    for (const type of candidates) {
      if (
        typeof MediaRecorder !== "undefined" &&
        MediaRecorder.isTypeSupported(type)
      ) {
        return type;
      }
    }

    return "";
  }

  function buildStars(count: number): Star[] {
    const palette = [
      "rgba(255,255,255,0.95)",
      "rgba(180,220,255,0.95)",
      "rgba(140,210,255,0.9)",
    ];

    const stars: Star[] = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * VIDEO_WIDTH,
        y: Math.random() * VIDEO_HEIGHT,
        size: Math.random() * 2.8 + 0.8,
        speed: Math.random() * 1.8 + 0.3,
        alpha: Math.random() * 0.5 + 0.35,
        color: palette[Math.floor(Math.random() * palette.length)],
      });
    }
    return stars;
  }

  function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function drawWrappedText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const words = text.split(" ");
    let line = "";
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = `${line}${words[n]} `;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = `${words[n]} `;
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }

    if (line) {
      ctx.fillText(line.trim(), x, currentY);
    }

    return currentY;
  }
    function drawGradientBackground(ctx: CanvasRenderingContext2D) {
    const bg = ctx.createLinearGradient(0, 0, 0, VIDEO_HEIGHT);
    bg.addColorStop(0, "#07111f");
    bg.addColorStop(0.48, "#0b1730");
    bg.addColorStop(1, "#09111f");

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);

    const glow = ctx.createRadialGradient(
      VIDEO_WIDTH / 2,
      VIDEO_HEIGHT * 0.2,
      60,
      VIDEO_WIDTH / 2,
      VIDEO_HEIGHT * 0.2,
      460
    );

    glow.addColorStop(0, "rgba(76,119,255,0.34)");
    glow.addColorStop(0.4, "rgba(64,196,255,0.16)");
    glow.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
  }

  function drawStars(
    ctx: CanvasRenderingContext2D,
    stars: Star[],
    progress: number
  ) {
    for (const star of stars) {
      const drift = progress * (220 + star.speed * 220);
      const y = (star.y + drift) % (VIDEO_HEIGHT + 300) - 150;

      const scale = 1 + progress * (0.8 + star.speed * 0.12);
      const size = star.size * scale;

      ctx.globalAlpha = star.alpha;
      ctx.fillStyle = star.color;

      ctx.beginPath();
      ctx.arc(star.x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }

  function drawOverlay(ctx: CanvasRenderingContext2D) {
    const overlay = ctx.createLinearGradient(0, 0, 0, VIDEO_HEIGHT);

    overlay.addColorStop(0, "rgba(7,17,31,0.18)");
    overlay.addColorStop(0.55, "rgba(7,17,31,0.46)");
    overlay.addColorStop(1, "rgba(7,17,31,0.76)");

    ctx.fillStyle = overlay;
    ctx.fillRect(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
  }

  function drawTextBlock(
    ctx: CanvasRenderingContext2D,
    elapsed: number,
    textHeadline: string,
    textSubtext: string,
    bulletItems: string[]
  ) {
    const fadeIn = Math.min(1, elapsed / 1200);
    const yOffset = (1 - fadeIn) * 30;

    ctx.save();

    ctx.globalAlpha = fadeIn;

    ctx.shadowColor = "rgba(0,0,0,0.45)";
    ctx.shadowBlur = 18;

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 64px Arial";

    drawWrappedText(ctx, textHeadline, 72, 150 + yOffset, 760, 76);

    roundRect(ctx, 72, 360 + yOffset, 520, 84, 18);

    ctx.fillStyle = "#f5d547";
    ctx.fill();

    ctx.fillStyle = "#102246";
    ctx.font = "800 34px Arial";
    ctx.shadowBlur = 0;

    ctx.fillText(textSubtext, 96, 414 + yOffset);

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 34px Arial";

    let bulletY = 520 + yOffset;

    for (const item of bulletItems) {
      ctx.fillText(`✓ ${item}`, 72, bulletY);
      bulletY += 58;
    }

    ctx.restore();
  }

  function drawPromoCard(
    ctx: CanvasRenderingContext2D,
    promoImg: HTMLImageElement | null,
    elapsed: number,
    progress: number
  ) {
    if (!promoImg) return;

    const appear = Math.max(0, Math.min(1, (elapsed - 1200) / 1000));

    const floatY = Math.sin(progress * Math.PI * 2 * 1.2) * 10;

    const x = 470;
    const y = 980 + (1 - appear) * 50 + floatY;

    const w = 470;
    const h = 340;

    const rotation =
      (-6 + Math.sin(progress * Math.PI * 2) * 2) * (Math.PI / 180);

    ctx.save();

    ctx.globalAlpha = appear;

    ctx.translate(x + w / 2, y + h / 2);
    ctx.rotate(rotation);

    ctx.shadowColor = "rgba(0,0,0,0.45)";
    ctx.shadowBlur = 30;

    roundRect(ctx, -w / 2, -h / 2, w, h, 28);

    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fill();

    ctx.clip();

    ctx.drawImage(promoImg, -w / 2, -h / 2, w, h);

    ctx.restore();
  }
    function drawBottomBar(
    ctx: CanvasRenderingContext2D,
    logoImg: HTMLImageElement | null,
    elapsed: number
  ) {
    const appear = Math.max(0, Math.min(1, (elapsed - 2200) / 900));
    const yOffset = (1 - appear) * 24;

    ctx.save();
    ctx.globalAlpha = appear;

    roundRect(ctx, 56, 1520 + yOffset, 968, 96, 24);
    ctx.fillStyle = "rgba(255,255,255,0.96)";
    ctx.fill();

    ctx.fillStyle = "#102246";
    ctx.font = "900 42px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Start your project", VIDEO_WIDTH / 2, 1580 + yOffset);

    ctx.textAlign = "left";

    if (logoImg) {
      ctx.save();
      roundRect(ctx, 56, 1682 + yOffset, 92, 92, 20);
      ctx.clip();
      ctx.drawImage(logoImg, 56, 1682 + yOffset, 92, 92);
      ctx.restore();
    } else {
      roundRect(ctx, 56, 1682 + yOffset, 92, 92, 20);
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.font = "500 18px Arial";
      ctx.fillText("Logo", 83, 1738 + yOffset);
    }

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 52px Arial";
    ctx.fillText("SPATIALYTICS", 176, 1734 + yOffset);

    ctx.fillStyle = "rgba(255,255,255,0.88)";
    ctx.font = "500 30px Arial";
    ctx.fillText("spatialytics.space", 176, 1774 + yOffset);

    ctx.restore();
  }

  function drawFrame(
    ctx: CanvasRenderingContext2D,
    assets: LoadedAssets,
    stars: Star[],
    elapsed: number,
    durationMs: number
  ) {
    const progress = Math.max(0, Math.min(1, elapsed / durationMs));

    ctx.clearRect(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);

    if (assets.backgroundImg) {
      ctx.drawImage(assets.backgroundImg, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
    } else {
      drawGradientBackground(ctx);
    }

    if (spaceMode) {
      drawStars(ctx, stars, progress);
    }

    drawOverlay(ctx);
    drawTextBlock(ctx, elapsed, headline, subtext, items);
    drawPromoCard(ctx, assets.promoImg, elapsed, progress);
    drawBottomBar(ctx, assets.logoImg, elapsed);
  }

  async function downloadReelWebM() {
  const mimeType = getSupportedMimeType();

  if (!mimeType) {
    alert(
      "Video recording is not supported in this browser. Desktop Chrome or Edge works best."
    );
    return;
  }

  try {
    setIsRecording(true);

    const [backgroundImg, promoImg, logoImg] = await Promise.all([
      loadImage(background),
      loadImage(promoImage),
      loadImage(logo),
    ]);

    const assets: LoadedAssets = { backgroundImg, promoImg, logoImg };

    const canvas = document.createElement("canvas");
    canvas.width = VIDEO_WIDTH;
    canvas.height = VIDEO_HEIGHT;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas context could not be created.");
    }

    const stream = canvas.captureStream(VIDEO_FPS);
    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 8_000_000,
    });

    const chunks: Blob[] = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    const stopped = new Promise<Blob>((resolve) => {
      recorder.onstop = () => {
        resolve(new Blob(chunks, { type: mimeType }));
      };
    });

    const stars = buildStars(spaceMode ? 180 : 0);

    recorder.start(250);

    const start = performance.now();

    await new Promise<void>((resolve) => {
      function step(now: number) {
        const elapsed = now - start;
        drawFrame(ctx, assets, stars, elapsed, VIDEO_DURATION_MS);

        if (elapsed < VIDEO_DURATION_MS) {
          requestAnimationFrame(step);
        } else {
          drawFrame(ctx, assets, stars, VIDEO_DURATION_MS, VIDEO_DURATION_MS);
          recorder.stop();
          resolve();
        }
      }

      requestAnimationFrame(step);
    });

    const blob = await stopped;
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "spatialytics-reel.webm";
    a.click();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("WebM render failed:", error);
    alert("Could not create the reel video.");
  } finally {
    setIsRecording(false);
  }
}

async function downloadGIF() {
  try {
    setIsRecording(true);

    const canvas = document.createElement("canvas");
    canvas.width = VIDEO_WIDTH;
    canvas.height = VIDEO_HEIGHT;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      alert("Canvas not supported.");
      return;
    }

    ctx.fillStyle = "#07111f";
    ctx.fillRect(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 60px Arial";
    ctx.fillText("SPATIALYTICS", 120, 300);

    ctx.font = "40px Arial";
    ctx.fillText("Website + GIS Solutions", 120, 380);

    const url = canvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = url;
    a.download = "spatialytics-preview.png";
    a.click();

  } catch (error) {
    console.error("GIF fallback failed:", error);
  } finally {
    setIsRecording(false);
  }
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

        <div className="flex flex-wrap gap-3">
          <button
            className="rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-5 py-3 font-semibold text-slate-950"
            onClick={generateCaption}
            type="button"
          >
            Generate Caption
          </button>

          <button
            className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950"
            onClick={copyCaption}
            type="button"
          >
            Copy Caption
          </button>

          <button
            className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            onClick={downloadPreview}
            disabled={isDownloading}
            type="button"
          >
            {isDownloading ? "Downloading..." : "Download Preview PNG"}
          </button>

          <button
            className="rounded-2xl border border-indigo-300/20 bg-indigo-400/20 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => {
  if (typeof MediaRecorder !== "undefined") {
    downloadReelWebM();
  } else {
    downloadGIF();
  }
}}
            disabled={isRecording}
            type="button"
          >
            {isRecording ? "Recording Reel..." : "Download Reel WebM"}
          </button>
        </div>

        {copyStatus ? (
          <div className="text-sm text-cyan-200">{copyStatus}</div>
        ) : null}

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
            ref={previewRef}
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
                <div
                  className={
                    spaceMode
                      ? "floating-card mx-auto mt-6 w-[72%]"
                      : "mx-auto mt-6 w-[72%]"
                  }
                >
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
                <button
                  type="button"
                  className="w-full rounded-2xl bg-white px-5 py-4 text-center text-xl font-extrabold text-slate-900 shadow-xl"
                >
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
