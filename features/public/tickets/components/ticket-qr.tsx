"use client"

import { useEffect, useRef } from "react"

const INK = "#0a0a0a"
const BRAND = "#e1580c"
const SIZE = 140

export function TicketQr({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    const container = ref.current
    if (!container) return

    import("qr-code-styling").then(({ default: QRCodeStyling }) => {
      if (cancelled || !container) return
      container.replaceChildren()
      const qr = new QRCodeStyling({
        width: SIZE,
        height: SIZE,
        type: "svg",
        data: value,
        image: "/icon.png",
        margin: 0,
        qrOptions: { errorCorrectionLevel: "H" },
        dotsOptions: { type: "rounded", color: INK },
        backgroundOptions: { color: "#ffffff" },
        cornersSquareOptions: { type: "extra-rounded", color: INK },
        cornersDotOptions: { color: BRAND },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 6,
          imageSize: 0.4,
          hideBackgroundDots: true,
        },
      })
      qr.append(container)
    })

    return () => {
      cancelled = true
    }
  }, [value])

  return (
    <div className="shrink-0 rounded-2xl border border-primary/20 bg-white p-4">
      <div ref={ref} style={{ width: SIZE, height: SIZE }} />
    </div>
  )
}
