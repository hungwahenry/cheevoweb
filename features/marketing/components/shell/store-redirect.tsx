"use client";

import { useEffect } from "react";
import { STORE_LINKS } from "../../config/store-links";

/** On mobile, send /download straight to the right store; desktop stays on the page. */
export function StoreRedirect() {
  useEffect(() => {
    const ua = navigator.userAgent || "";
    const target = /android/i.test(ua)
      ? STORE_LINKS.google
      : /iphone|ipad|ipod/i.test(ua)
        ? STORE_LINKS.apple
        : "";
    if (target) window.location.replace(target);
  }, []);

  return null;
}
