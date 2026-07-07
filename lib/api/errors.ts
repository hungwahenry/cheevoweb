/** Thrown for any non-2xx response; carries the backend's machine code + field errors. */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
    readonly errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = "ApiError"
  }
}

/** Best-effort human message for any thrown value — use for toasts. */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message
  if (error instanceof Error) return error.message
  return "Something went wrong."
}
