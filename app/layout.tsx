import type { Metadata } from "next";
import { Noto_Serif, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "700"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tra Cứu Tử Vi",
  description: "Website tra cứu tử vi trọn đời, an sao và luận giải chi tiết",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${notoSerif.variable} ${beVietnamPro.variable}`}>
      <body className="min-h-full flex flex-col font-sans antialiased text-foreground bg-background">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
