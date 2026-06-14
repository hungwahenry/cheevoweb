import { Fragment } from "react";
import { PhoneFrame } from "./phone-frame";
import { StoreButtons } from "./store-buttons";

export function Hero({
  titleLines,
  body,
  screenshot,
  alt,
}: {
  titleLines: string[];
  body: string;
  screenshot: string;
  alt: string;
}) {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 px-6 pb-8 pt-6 md:flex-row md:gap-16 md:pb-16 md:pt-10">
      <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
        <h1 className="text-[clamp(2.5rem,6.5vw,4.25rem)] font-black leading-[1.02] tracking-[-0.035em]">
          {titleLines.map((line, index) => (
            <Fragment key={line}>
              {line}
              {index < titleLines.length - 1 ? <br /> : null}
            </Fragment>
          ))}
        </h1>
        <p className="mt-5 max-w-md text-base text-foreground/65 md:text-lg">
          {body}
        </p>
        <StoreButtons className="mt-7 justify-center md:justify-start" />
      </div>
      <div className="flex flex-1 justify-center">
        <PhoneFrame src={screenshot} alt={alt} className="md:scale-110" />
      </div>
    </section>
  );
}
