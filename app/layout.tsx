import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://groxstudio.in"),
  title: "GroxStudio | Full-Service Software Development & Branding Agency",
  description: "GroxStudio helps founders build MVPs, scale digital products, and craft premium brand identities. We are your dedicated partner for software development, UI/UX design, and strategic branding.",
  keywords: [
    "software development agency", 
    "branding for startups", 
    "MVP development services", 
    "custom web applications", 
    "UI/UX design agency", 
    "GroxStudio",
    "digital growth partner",
    "mobile app development"
  ],
  authors: [{ name: "GroxStudio Team" }],
  openGraph: {
    title: "GroxStudio | Transforming Ideas into Digital Reality",
    description: "Specializing in MVP development and high-end branding for ambitious startups and founders worldwide.",
    url: "https://groxstudio.in",
    siteName: "GroxStudio",
    images: [
      {
        url: "/logos/gwbe.png",
        width: 1200,
        height: 630,
        alt: "GroxStudio Branding",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GroxStudio | Software & Branding for the Next Generation",
    description: "Build your MVP and scale your brand with GroxStudio's expert team.",
    images: ["/logos/gwbe.png"],
  },
};

import WhatsAppButton from "./components/WhatsAppButton";
import SmoothScroll from "./components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable} antialiased`}
    >
      <body className="font-sans overflow-x-hidden">
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "w5cu6b5ls7");
          `}
        </Script>
        {children}
        <WhatsAppButton />
        <SmoothScroll />
      </body>
    </html>
  );
}
