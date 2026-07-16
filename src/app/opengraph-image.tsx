import { ImageResponse } from "next/og";
import { siteConfig } from "@/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#141414",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: "#c8e600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 700,
              color: "#141414",
              fontFamily: "monospace",
            }}
          >
            N
          </div>
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
              color: "#f5f5f4",
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            {siteConfig.name}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#f5f5f4",
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            {siteConfig.tagline}
          </span>
          <span style={{ fontSize: 26, color: "#a3a3a1", maxWidth: 820 }}>
            Brand design, UI/UX, web engineering & payments integrations — {siteConfig.location}.
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
