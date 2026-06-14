export interface FeatureFlag {
  id: string;
  key: string;
  description: string | null;
  enabled: boolean;
  rollout_pct: number;
  is_public: boolean;
}

export type ConfigType = "int" | "decimal" | "string" | "bool";

export interface SystemConfig {
  id: string;
  key: string;
  group: string;
  type: ConfigType;
  description: string | null;
  value: unknown;
  default_value: unknown;
  is_public: boolean;
}
