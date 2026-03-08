import { bundle } from "@remotion/bundler";
import { renderMedia } from "@remotion/renderer";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const entry = path.join(process.cwd(), "remotion/index.ts");

    const bundleLocation = await bundle({
      entryPoint: entry,
      webpackOverride: (config) => config,
    });

    const outputLocation = `/tmp/spatialytics-reel-${Date.now()}.mp4`;

    await renderMedia({
      composition: "SpacePromo",
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation,
      inputProps: data,
    });

    const fs = await import("fs");

    const file = fs.readFileSync(outputLocation);

    return new Response(file, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": "attachment; filename=spatialytics-reel.mp4",
      },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err }), { status: 500 });
  }
}
