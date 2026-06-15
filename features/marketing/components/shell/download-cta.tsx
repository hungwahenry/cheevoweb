"use client";

import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";
import { SITE_URL } from "../../config/site";
import { StoreButton } from "./store-button";

const DOWNLOAD_URL = `${SITE_URL}/download`;

export function DownloadCta({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      <div className="hidden items-center gap-4 md:flex">
        <div className="rounded-2xl bg-white p-2.5 shadow-sm">
          <QRCodeSVG value={DOWNLOAD_URL} size={92} bgColor="#ffffff" fgColor="#0a0a0a" />
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold tracking-tight">Scan to download</p>
          <p className="mt-0.5 max-w-[14rem] text-sm text-foreground/60">
            Point your camera here to get the cheevo app.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 md:hidden">
        <StoreButton store="apple" />
        <StoreButton store="google" />
      </div>
    </div>
  );
}
