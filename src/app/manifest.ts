import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LIFEWS GreenSkills™",
    short_name: "GreenSkills",
    description: "Skills for Food • Energy • Water • Livelihoods — LIFEWS Pathways™, Kadara™ and GreenTech™.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F5ED",
    theme_color: "#006B3C",
    orientation: "portrait",
    categories: ["education", "productivity"],
  };
}
