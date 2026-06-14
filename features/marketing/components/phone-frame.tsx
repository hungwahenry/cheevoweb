import { cn } from "@/lib/utils";

export function PhoneFrame({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19] w-[252px] shrink-0 rounded-[2.6rem] border-[11px] border-[#0e0e0e] bg-[#0e0e0e] shadow-2xl",
        className,
      )}
    >
      <div className="absolute left-1/2 top-1.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#0e0e0e]" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.7rem] bg-muted">
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
