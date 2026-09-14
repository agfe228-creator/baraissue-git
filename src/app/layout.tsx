import type { Metadata } from "next";
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
    default: `${SITE_NAME} - 전국 축제 방문 가이드`,
    template: `%s | ${SITE_NAME}`
  },
  description: "전국 축제 일정과 가족 나들이, 교통, 주차, 우천 대처, 공식 출처 확인 방법을 정리하는 축제 방문 가이드입니다.",
  alternates: { canonical: "/" },
  other: {
    "google-adsense-account": "ca-pub-4558482087323814"
  },
  openGraph: {
    title: SITE_NAME,
    description: "전국 축제 일정과 방문 전 확인할 교통, 주차, 요금, 우천 운영 정보를 정리합니다.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "전국 축제 방문 가이드"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4558482087323814" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4558482087323814"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <MobileTabBar />
      </body>
    </html>
  );
}
