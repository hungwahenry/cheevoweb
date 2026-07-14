export type PayoutStatus =
  | "requested"
  | "pending_review"
  | "approved"
  | "processing"
  | "paid"
  | "rejected"
  | "failed"

export interface Payout {
  id: string
  amount_minor: number
  fees_minor: number
  net_minor: number
  currency: string
  status: PayoutStatus
  bank_name: string | null
  account_number: string | null
  account_name: string | null
  bank_code: string | null
  provider: string | null
  transfer_method: string | null
  provider_reference: string | null
  failed_reason: string | null
  review_notes: string | null
  requested_at: string
  approved_at: string | null
  paid_at: string | null
  failed_at: string | null
  rejected_at: string | null
  created_at: string
  organisation: { id: string; name: string; slug: string }
  requested_by: { id: string; email: string }
  reviewed_by: { id: string; email: string } | null
}

export interface ListPayoutsParams {
  page: number
  per_page: number
  status?: PayoutStatus
  organisation_id?: string
}
