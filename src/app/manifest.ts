import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Netiva — Web Design & Engineering Studio",
    short_name: "Netiva",
    description:
      "Netiva crafts campaigns, interfaces, and web systems that provoke, perform, and persuade—brand design, UX, Next.js builds, headless CMS, and payments integrations.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f5f4",
    theme_color: "#141414",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
