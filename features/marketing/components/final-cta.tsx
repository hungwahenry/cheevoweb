import { StoreButtons } from "./store-buttons";

export function FinalCta({ title, body }: { title: string; body: string }) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center rounded-3xl border border-foreground/10 bg-muted/40 px-8 py-14 text-center">
        <h2 className="text-3xl font-black tracking-tight md:text-4xl">{title}</h2>
        <p className="mt-4 max-w-md text-foreground/65">{body}</p>
        <StoreButtons className="mt-7 justify-center" />
      </div>
    </section>
  );
}
