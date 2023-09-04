"use client";
import { useEffect } from "react";
import type { Metadata } from "next";
import { Lato, Nunito, Roboto } from "next/font/google";
import ReduxProvider from "@/components/Providers/ReduxProvider";
import "tw-elements/dist/css/tw-elements.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import GlobalLoading from "@/components/Modals/GlobalLoading";
import SSOProvider from "@/components/Providers/SSOProvider";
import AuthContextProvider from "@/contexts/AuthContextProvider";
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
        <SSOProvider>
          <ReduxProvider>
            <AuthContextProvider>
              {children}
              <GlobalLoading />
            </AuthContextProvider>
          </ReduxProvider>
        </SSOProvider>
      </body>
    </html>
  );
}
