"use client";
import { useEffect } from "react";
import type { Metadata } from "next";
import { Lato, Nunito, Roboto } from "next/font/google";
import { Providers } from "@/redux-toolkit/Provider";
import AuthProvider from "@/provider/AuthProvider";
import "tw-elements/dist/css/tw-elements.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
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
  useEffect(() => {
    const use = async () => {
      (await import("tw-elements")).default;
    };
    use();
  }, []);
  return (
    <html lang="en">
      <body
        className={`${lato.variable} ${nunito.variable} ${roboto.className}`}
      >
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
