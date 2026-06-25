import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileTabBar } from "@/components/MobileTabBar";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import type { ReactNode } from "react";
import "./globals.css";

export const runtime = "edge";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - 전국 축제·박람회·전시회·공연 포털`,
    template: `%s | ${SITE_NAME}`
  },
  description: "전국 축제, 박람회, 전시회, 공연 일정을 한눈에 검색하고 확인하는 정보 포털입니다.",
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_NAME,
    description: "이번 주 가볼 만한 전국 행사를 축제바라에서 확인하세요.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "전국 행사 정보 포털"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4558482087323814"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Header />
        {children}
        <Footer />
        <MobileTabBar />
      </body>
    </html>
  );
}
