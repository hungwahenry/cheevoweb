const COLUMNS = 5
const SPEEDS = [120, 150, 132, 164, 142]
// Each half of a column must overflow the tall wall container so the -50%
// loop never runs dry; repeat the column up to this many tiles first.
const MIN_TILES = 10

function fill(column: string[]): string[] {
  if (column.length === 0) return column
  const out: string[] = []
  while (out.length < MIN_TILES) out.push(...column)
  return out
}

export function PhotoWall({ photos }: { photos: string[] }) {
  const columns = Array.from({ length: COLUMNS }, (_, c) =>
    fill(photos.filter((_, i) => i % COLUMNS === c))
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 flex h-[160%] w-[150%] -translate-x-1/2 -translate-y-1/2 gap-3 sm:w-[120%] sm:gap-4">
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
                  className="aspect-[3/4] overflow-hidden rounded-xl bg-muted shadow-lg ring-1 shadow-black/10 ring-black/5"
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
