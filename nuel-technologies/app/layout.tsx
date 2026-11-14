import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });

const title = "Nuel Technologies | Software, content and streaming for growing businesses";
const description =
  "Nuel Technologies builds custom software, web and mobile apps, and pairs them with social media management, videography and video streaming services.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  keywords: ["software company", "web development", "mobile apps", "social media management", "videography", "video streaming", "tech services", "Nigeria"],
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: site.name, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#050505", viewportFit: "cover" };

// Runs before first paint so there is no flash of the wrong theme.
const themeScript = `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${inter.variable} ${grotesk.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-xl focus:bg-lime focus:px-4 focus:py-2 focus:text-onlime">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
