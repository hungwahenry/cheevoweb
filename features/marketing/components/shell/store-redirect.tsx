"use client";

import { useEffect } from "react";
import { type AppTarget, STORE_LINKS } from "../../config/store-links";

/** On mobile, send /download straight to the right store; desktop stays on the page. */
export function StoreRedirect({ app = "attendee" }: { app?: AppTarget }) {
  useEffect(() => {
    const links = STORE_LINKS[app];
    const ua = navigator.userAgent || "";
    const target = /android/i.test(ua)
      ? links.google
      : /iphone|ipad|ipod/i.test(ua)
        ? links.apple
        : "";
    if (target) window.location.replace(target);
  }, [app]);

  return null;
}
