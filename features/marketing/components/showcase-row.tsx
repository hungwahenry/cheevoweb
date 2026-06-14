import { cn } from "@/lib/utils";
import { PhoneFrame } from "./phone-frame";

export function ShowcaseRow({
  eyebrow,
  title,
  body,
  src,
  alt,
  reverse,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  src: string;
  alt: string;
  reverse?: boolean;
}) {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 py-14 md:flex-row md:gap-16 md:py-20">
      <div className={cn("flex flex-1 flex-col", reverse && "md:order-2")}>
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-md text-foreground/65 md:text-lg">{body}</p>
      </div>
      <div className={cn("flex flex-1 justify-center", reverse && "md:order-1")}>
        <PhoneFrame src={src} alt={alt} />
      </div>
    </section>
  );
}
