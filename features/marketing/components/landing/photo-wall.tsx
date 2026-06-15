const COLUMNS = 5;
const SPEEDS = [52, 68, 58, 74, 62];

export function PhotoWall({ photos }: { photos: string[] }) {
  const columns = Array.from({ length: COLUMNS }, (_, c) =>
    photos.filter((_, i) => i % COLUMNS === c),
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 flex h-[160%] w-[150%] -translate-x-1/2 -translate-y-1/2 gap-3 sm:w-[120%] sm:gap-4">
        {columns.map((column, c) => (
          <div key={c} className="flex-1">
            <div
              className="wall-col flex flex-col gap-3 sm:gap-4"
              style={{
                animation: `${c % 2 === 0 ? "wall-up" : "wall-down"} ${SPEEDS[c]}s linear infinite`,
              }}
            >
              {[...column, ...column].map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="aspect-[3/4] overflow-hidden rounded-xl bg-muted"
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
