import React from "react";
import { Composition } from "remotion";
import { SpacePromo } from "./compositions/SpacePromo";
import type { PromoVideoProps } from "@/lib/types";

const defaultProps: PromoVideoProps = {
  headline: "START YOUR WEBSITE OR GIS PROJECT",
  subheadline: "Websites, GIS, and data storytelling",
  bullets: [
    "Interactive maps",
    "Data dashboards",
    "GIS consulting",
    "Modern business websites",
  ],
  cta: "Start your project",
  website: "spatialytics.space",
  backgroundUrl: "/space-bg.jpg",
  promoImageUrl: "/promo-card.jpg",
  logoUrl: "/logo.png",
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SpacePromo"
      component={SpacePromo}
      durationInFrames={300}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={defaultProps}
    />
  );
};
