import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Yash Goel | Software Engineer Portfolio",
  description: "Developer portfolio of Yash Goel - Software Engineer specializing in scalable full-stack applications, algorithms, and web solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-dark-bg text-primary antialiased selection:bg-accent-teal selection:text-dark-bg`}
      >
        {children}
      </body>
    </html>
  );
}

