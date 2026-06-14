import { Geist } from "next/font/google";
import { listPublicPages } from "@/features/marketing/api/list-pages";
import { MarketingFooter } from "@/features/marketing/components/marketing-footer";
import { MarketingHeader } from "@/features/marketing/components/marketing-header";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"] });

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pages = await listPublicPages().catch(() => []);

  return (
    <div
      className={cn(
        geist.className,
        "flex min-h-svh flex-col bg-background text-foreground",
      )}
    >
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter pages={pages} />
    </div>
  );
}
