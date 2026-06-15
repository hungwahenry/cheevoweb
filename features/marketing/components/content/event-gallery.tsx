import type { PublicEvent } from "../../types";

export function EventGallery({ images }: { images: PublicEvent["images"] }) {
  if (images.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image) => (
          <div
            key={image.id}
            className="aspect-square overflow-hidden rounded-2xl bg-muted"
          >
            <img src={image.url} alt="" className="size-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
