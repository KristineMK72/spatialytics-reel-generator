import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { PromoVideoProps } from "@/lib/types";

const textShadow = "0 8px 24px rgba(0,0,0,0.45)";

export const SpacePromo: React.FC<PromoVideoProps> = ({
  headline,
  subheadline,
  bullets,
  cta,
  website,
  backgroundUrl,
  promoImageUrl,
  logoUrl,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgScale = interpolate(frame, [0, 299], [1, 1.12], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  const headlineIn = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const panelIn = spring({
    frame: frame - 14,
    fps,
    config: { damping: 16, stiffness: 110 },
  });

  const imageIn = spring({
    frame: frame - 28,
    fps,
    config: { damping: 16, stiffness: 100 },
  });

  const ctaIn = spring({
    frame: frame - 52,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#07111f",
        color: "white",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {backgroundUrl ? (
        <Img
          src={backgroundUrl}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${bgScale})`,
          }}
        />
      ) : null}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(5,11,25,0.18) 0%, rgba(5,11,25,0.48) 55%, rgba(5,11,25,0.80) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 92,
          left: 64,
          right: 64,
        }}
      >
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: 0.5,
            opacity: headlineIn,
            transform: `translateY(${(1 - headlineIn) * 40}px)`,
            textShadow,
            maxWidth: 760,
          }}
        >
          {headline}
        </div>

        <div
          style={{
            display: "inline-block",
            marginTop: 26,
            padding: "16px 24px",
            borderRadius: 16,
            background: "#f5d547",
            color: "#102246",
            fontWeight: 900,
            fontSize: 34,
            opacity: panelIn,
            transform: `translateY(${(1 - panelIn) * 28}px)`,
          }}
        >
          {subheadline}
        </div>

        <div
          style={{
            marginTop: 42,
            fontSize: 30,
            lineHeight: 1.35,
            fontWeight: 700,
            opacity: panelIn,
            transform: `translateY(${(1 - panelIn) * 24}px)`,
            textShadow,
          }}
        >
          {bullets.map((item, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              ✓ {item}
            </div>
          ))}
        </div>
      </div>

      {promoImageUrl ? (
        <Img
          src={promoImageUrl}
          style={{
            position: "absolute",
            right: 56,
            bottom: 372,
            width: 420,
            borderRadius: 30,
            boxShadow: "0 28px 64px rgba(0,0,0,0.44)",
            opacity: imageIn,
            transform: `translateY(${(1 - imageIn) * 42}px) rotate(-7deg)`,
          }}
        />
      ) : null}

      <div
        style={{
          position: "absolute",
          left: 56,
          right: 56,
          bottom: 210,
          background: "rgba(255,255,255,0.96)",
          borderRadius: 24,
          color: "#102246",
          textAlign: "center",
          padding: "28px 30px",
          fontWeight: 900,
          fontSize: 40,
          opacity: ctaIn,
          transform: `translateY(${(1 - ctaIn) * 30}px)`,
        }}
      >
        {cta}
      </div>

      <div
        style={{
          position: "absolute",
          left: 56,
          bottom: 66,
          display: "flex",
          alignItems: "center",
          gap: 22,
          opacity: ctaIn,
        }}
      >
        {logoUrl ? (
          <Img
            src={logoUrl}
            style={{
              width: 92,
              height: 92,
              objectFit: "contain",
            }}
          />
        ) : (
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: 24,
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(255,255,255,0.08)",
            }}
          />
        )}

        <div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              letterSpacing: 1,
              textShadow,
            }}
          >
            SPATIALYTICS
          </div>
          <div style={{ fontSize: 28, opacity: 0.95 }}>{website}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
