export interface OpsHealth {
  database: { ok: boolean; latencyMs: number | null };
  search: Record<string, number>;
  push: { tokens: number; devices: number; staleTokens: number };
}

export interface OpsCommand {
  command: string;
  description: string;
}
