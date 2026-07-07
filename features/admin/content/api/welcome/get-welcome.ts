import { api } from "@/lib/api/client"
import type { Welcome } from "../../types"

export function getWelcome(): Promise<Welcome> {
  return api.get<Welcome>("/admin/welcome")
}
