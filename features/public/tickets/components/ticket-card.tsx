"use client"

import { QrCode } from "lucide-react"
import { useState } from "react"
import { TicketQr } from "./ticket-qr"

const STATUS_TEXT: Record<string, string> = {
  scanned: "Checked in",
  revoked: "Revoked",
  valid: "Show this QR at the door",
}

export function TicketCard({
  name,
  code,
  status,
}: {
  name: string
  code: string
  status: string
}) {
  const [shown, setShown] = useState(false)

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border p-4">
      {shown ? (
        <TicketQr value={code} />
      ) : (
        <button
          type="button"
          onClick={() => setShown(true)}
          aria-label={`Show QR for ${name}`}
          className="flex size-[172px] shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-muted/40 text-foreground/50 transition-colors hover:bg-muted hover:text-foreground/70"
        >
          <QrCode className="size-7" />
          <span className="text-xs font-medium">Tap to show QR</span>
        </button>
      )}
      <div className="min-w-0">
        <p className="font-semibold">{name}</p>
        {shown ? (
          <p className="mt-1 font-mono text-xs break-all text-foreground/70">
            {code}
          </p>
        ) : null}
        <p className="mt-2 text-xs text-foreground/55">
          {STATUS_TEXT[status] ?? STATUS_TEXT.valid}
        </p>
        {shown ? (
          <button
            type="button"
            onClick={() => setShown(false)}
            className="mt-2 text-xs font-medium text-primary hover:underline"
          >
            Hide
          </button>
        ) : null}
      </div>
    </div>
  )
}
