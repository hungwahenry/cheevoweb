import { api } from "@/lib/api/client"

export function runCommand(
  command: string
): Promise<{ command: string; result: unknown }> {
  return api.post<{ command: string; result: unknown }>(
    `/admin/ops/commands/${command}/run`
  )
}
