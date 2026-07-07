import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
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
        <Input
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-invalid={invalid}
          placeholder="Email — where we send your ticket"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setInvalid(false)
          }}
        />
        {invalid ? (
          <p className="mt-1 px-3 text-xs text-destructive">
            Enter a valid email so we can send your ticket.
          </p>
        ) : null}
      </div>
      <div className="flex gap-3">
        <Input
          type="text"
          autoComplete="given-name"
          placeholder="First name (optional)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="text"
          autoComplete="family-name"
          placeholder="Last name (optional)"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <Button
        size="lg"
        className="w-full"
        disabled={submitting}
        onClick={submit}
      >
        {submitting ? <Spinner /> : submitLabel}
      </Button>
      <p className="text-center text-xs text-foreground/50">
        Your ticket is emailed to you and shown on the next screen.
      </p>
    </div>
  )
}
