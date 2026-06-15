/** Curated photos of people out at events, drifting behind the hero. Drop
 *  portrait JPGs (01–16) into public/photos/people/. */
export const PEOPLE_PHOTOS: string[] = Array.from(
  { length: 16 },
  (_, i) => `/photos/people/${String(i + 1).padStart(2, "0")}.jpg`,
);
