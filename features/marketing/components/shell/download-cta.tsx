"use client";

import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";
import { SITE_URL } from "../../config/site";
import type { AppTarget } from "../../config/store-links";
import { StoreButton } from "./store-button";

export function DownloadCta({
  app = "attendee",
  className,
}: {
  app?: AppTarget;
  className?: string;
}) {
  const downloadUrl =
    app === "organizer"
      ? `${SITE_URL}/download?app=organizer`
      : `${SITE_URL}/download`;
  const appName = app === "organizer" ? "cheevo Organizer" : "cheevo";

  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      <div className="hidden items-center gap-4 md:flex">
        <div className="rounded-2xl bg-white p-2.5 shadow-sm">
          <QRCodeSVG value={downloadUrl} size={92} bgColor="#ffffff" fgColor="#0a0a0a" />
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold tracking-tight">Scan to download</p>
          <p className="mt-0.5 max-w-[14rem] text-sm text-foreground/60">
            Point your camera here to get the {appName} app.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 md:hidden">
        <StoreButton store="apple" app={app} />
        <StoreButton store="google" app={app} />
      </div>
    </div>
  );
}
