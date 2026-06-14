import Link from "next/link";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="cheevo"
      className={cn(
        "text-xl font-black lowercase tracking-tight text-foreground",
        className,
      )}
    >
      cheevo
    </Link>
  );
}
