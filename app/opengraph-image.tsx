import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const alt = "cheevo — Find what's on near you"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/images/logo.png"))
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        backgroundColor: "#f7f2ea",
      }}
    >
      <img src={logoSrc} width={480} height={141} alt="cheevo" />
      <div style={{ fontSize: 46, color: "#0a0a0a", opacity: 0.7 }}>
        Find what&apos;s on. Be there.
      </div>
    </div>,
    size
  )
}
