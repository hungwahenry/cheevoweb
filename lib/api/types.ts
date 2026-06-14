/** Shared contract shapes mirroring the backend's ApiEnvelope + admin primitives. */

export interface Envelope<T> {
  status: string;
  message: string;
  data: T;
  meta?: Record<string, unknown>;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiErrorBody {
  status: "error";
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

/** The universal cross-link every admin 360 response uses for related entities. */
export interface EntityRef {
  type: string;
  id: string;
  label: string;
  sublabel?: string | null;
  thumbnail?: string | null;
  deep_link?: string | null;
}
