import "./globals.css";
import type { Metadata } from "next";
import { Lato, Nunito } from "next/font/google";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

const nunito = Nunito({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Zeraverse",
  description: "Zeraverse with Nextjs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${nunito.variable}`}>{children}</body>
    </html>
  );
}
