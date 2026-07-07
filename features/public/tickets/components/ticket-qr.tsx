"use client"

import { QRCodeSVG } from "qrcode.react"

export function TicketQr({ value }: { value: string }) {
  return (
    <div className="rounded-2xl bg-white p-3 shadow-sm">
      <QRCodeSVG value={value} size={148} bgColor="#ffffff" fgColor="#0a0a0a" />
    </div>
  )
}
