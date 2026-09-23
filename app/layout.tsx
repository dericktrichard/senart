import type { Metadata } from "next";
import { Nunito, Philosopher } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const philosopher = Philosopher({
  variable: "--font-philosopher",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Senart",
  description: "Get work done. Do work. Get paid.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${philosopher.variable}`}>
        {children}
      </body>
    </html>
  );
}