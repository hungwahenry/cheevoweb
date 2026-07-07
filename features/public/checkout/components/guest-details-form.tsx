import { useState } from "react"
import type { GuestBuyer } from "../api/create-order"

const EMAIL_RE = /.+@.+\..+/

export function GuestDetailsForm({
  submitLabel,
  submitting,
  onSubmit,
}: {
  submitLabel: string
  submitting: boolean
  onSubmit: (buyer: GuestBuyer) => void
}) {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [invalid, setInvalid] = useState(false)

  function submit() {
    if (!EMAIL_RE.test(email)) {
      setInvalid(true)
      return
    }
    onSubmit({ email: email.trim(), firstName, lastName })
  }

  return (
    <div className="space-y-3">
      <div>
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email — where we send your ticket"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setInvalid(false)
          }}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground/40"
        />
        {invalid ? (
          <p className="mt-1 text-xs text-destructive">
            Enter a valid email so we can send your ticket.
          </p>
        ) : null}
      </div>
      <div className="flex gap-3">
        <input
          type="text"
          autoComplete="given-name"
          placeholder="First name (optional)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground/40"
        />
        <input
          type="text"
          autoComplete="family-name"
          placeholder="Last name (optional)"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground/40"
        />
      </div>
      <button
        type="button"
        disabled={submitting}
        onClick={submit}
        className="w-full rounded-full bg-primary py-3 font-medium text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-50"
      >
        {submitting ? "Starting checkout…" : submitLabel}
      </button>
      <p className="text-center text-xs text-foreground/50">
        Your ticket is emailed to you and shown on the next screen.
      </p>
    </div>
  )
}
