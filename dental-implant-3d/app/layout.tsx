import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

// Vazirmatn is an open-source Persian typeface (Google Fonts) used here for both
// display and body roles at different weights. To use a licensed face like Peyda
// or IRANSansX instead, drop the .woff2 files in /public/fonts and swap this
// block for next/font/local — the CSS variable names (--font-peyda / --font-vazir)
// are already wired through tailwind.config.ts, so no other file needs to change.
const vazirDisplay = Vazirmatn({
  subsets: ["arabic"],
  weight: ["600", "700", "800"],
  variable: "--font-peyda",
  display: "swap",
});

const vazirBody = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: "کلینیک ایمپلنت دندان آرکا | دقت، زیبایی، ماندگاری",
  description:
    "کلینیک تخصصی ایمپلنت دندان با رویکردی نوین و دقیق. مشاوره تخصصی، تصویربرداری سه‌بعدی و کاشت ایمپلنت با بالاترین استانداردهای بین‌المللی.",
  metadataBase: new URL("https://arca-dental.example.com"),
  openGraph: {
    title: "کلینیک ایمپلنت دندان آرکا",
    description: "ایمپلنت دندان با دقت، زیبایی و ماندگاری",
    locale: "fa_IR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirDisplay.variable} ${vazirBody.variable}`}>
      <body className="bg-clinic-bone text-clinic-navy font-body antialiased overflow-x-hidden selection:bg-clinic-teal/30 selection:text-clinic-navy">
        {children}
      </body>
    </html>
  );
}
