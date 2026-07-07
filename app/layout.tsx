import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { Providers } from "@/components/providers/providers"
import { APPLE_APP_ID } from "@/features/public/shell/config/site"
import { cn } from "@/lib/utils"

const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const DESCRIPTION =
  "Discover events near you, RSVP or grab a ticket, and walk in with it in your pocket."

export const metadata: Metadata = {
  metadataBase: new URL("https://cheevo.events"),
  title: "Cheevo — Find what's on near you",
  description: DESCRIPTION,
  applicationName: "Cheevo",
  openGraph: {
    type: "website",
    siteName: "Cheevo",
    url: "https://cheevo.events",
    title: "Cheevo — Find what's on near you",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheevo — Find what's on near you",
    description: DESCRIPTION,
  },
  itunes: { appId: APPLE_APP_ID },
}

export const viewport: Viewport = {
  themeColor: "#f54900",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        fontSans.variable,
        "font-sans"
      )}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
