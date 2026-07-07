import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cheevo",
    short_name: "Cheevo",
    description: "Find what's on near you.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f2ea",
    theme_color: "#f54900",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  }
}
