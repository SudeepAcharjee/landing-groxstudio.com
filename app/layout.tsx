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
  metadataBase: new URL("https://groxstudio.com"),
  title: "GroxStudio | Software Development, Branding & Design Agency",
  description: "GroxStudio is a creative agency specializing in digital transformation, high-end branding, and innovative design solutions for ambitious brands.",
  keywords: ["digital agency", "branding", "web design", "marketing strategy", "GroxStudio"],
  authors: [{ name: "GroxStudio Team" }],
  openGraph: {
    title: "GroxStudio | Software Development, Branding & Design Agency",
    description: "Transforming Ideas into Reality - Crafting the Digital Future, One Design at a Time.",
    url: "https://groxstudio.com",
    siteName: "GroxStudio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GroxStudio | Software Development, Branding & Design Agency",
    description: "GroxStudio is a creative agency specializing in digital transformation.",
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
