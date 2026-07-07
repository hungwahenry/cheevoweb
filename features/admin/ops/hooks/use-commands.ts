import { useQuery } from "@tanstack/react-query"
import { listCommands } from "../api/list-commands"

export function useCommands() {
  return useQuery({ queryKey: ["ops-commands"], queryFn: listCommands })
}
