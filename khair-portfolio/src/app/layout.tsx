import type { Metadata, Viewport } from "next";
import { portfolio } from "@/data/portfolio";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.siteUrl),
  title: `${portfolio.fullName} | AI Chatbots & Automation`,
  description: portfolio.description,
  authors: [{ name: portfolio.fullName, url: portfolio.github }],
  alternates: { canonical: "/" },
  openGraph: { title: `${portfolio.name} — AI chatbots, voice agents & automation`, description: portfolio.description, type: "website", url: "/", locale: "en_US", siteName: portfolio.fullName, images: [{ url: "/og-image.png", width: 1200, height: 630, alt: portfolio.title }] },
  twitter: { card: "summary_large_image", title: `${portfolio.name} | AI Chatbots & Automation`, description: portfolio.description, images: ["/og-image.png"] },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#08090e" }, { media: "(prefers-color-scheme: light)", color: "#f7f7fb" }] };

const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem('kb-theme')==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = { "@context": "https://schema.org", "@type": "Person", name: portfolio.fullName, jobTitle: portfolio.title, url: portfolio.siteUrl, image: `${portfolio.siteUrl}${portfolio.photo}`, email: portfolio.email, sameAs: [portfolio.github, portfolio.linkedin], address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" }, alumniOf: { "@type": "CollegeOrUniversity", name: "SZABIST University" } };
  return <html lang="en" data-theme="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /><link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /><link rel="preload" href="/fonts/space-grotesk.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} /></body></html>;
}
