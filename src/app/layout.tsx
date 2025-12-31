import { pageSEO } from "@/serverApi/game";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import React from "react";
import "./globals.css";
import ProviderWrapper from "./ProviderWrapper";
import { SeonProvider } from "./SeonProvider";
import TopLoader from "./TopLoader";
const metadata: Metadata = {
  title: "Sweepstake",
  description: "Sweepstake - Online Gaming Platform",
  icons: {
    icon: "/assets/images/logo.png",
  },
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const SITE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await pageSEO();
    const seoData = response;

    return {
      title: seoData?.data?.site_name || metadata.title,
      description: seoData?.data?.site_description || metadata.description,
      openGraph: {
        title: seoData?.data?.site_name || seoData?.data?.site_name || metadata.title,
        description: seoData?.data?.site_description || seoData?.data?.site_description || metadata.description,
        images: seoData?.data?.logo ? ["/firekirini-og.jpg"] : ["/assets/images/logo.png"],
      },
      icons: seoData?.data?.favicon || metadata.icons,
      alternates: {
        canonical: SITE_URL.replace(/\/$/, ""),
      },
    };
  } catch (error) {
    console.error("SEO metadata fetch failed:", error);
    return metadata;
  }
}
const inter = Inter({
  subsets: ['latin'],
  fallback: ['sans-serif'],
  weight: ['300', '400', '500', '700'],
  adjustFontFallback: false
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {GTM_ID && (
          <Script
            id="gtm-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}
      </head>
      {/* className="dark" */}
      <body className={`${inter.className} scroll-smooth`} cz-shortcut-listen="true">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <SeonProvider>
          <ProviderWrapper>
            <React.Suspense fallback={<div />}>
              <TopLoader />

            </React.Suspense>

            {children}
          </ProviderWrapper>
        </SeonProvider>
      </body>
    </html>
  );
}
