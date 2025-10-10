import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import AnimatedBackground from "@/components/ui/animated-background";
import Spotlight from "@/components/ui/spotlight";
import Meteors from "@/components/ui/meteors";
import { QueryProvider } from "@/lib/providers/query-provider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Võ Đình Quân - TypeScript Developer",
  description:
    "Portfolio of Võ Đình Quân, a passionate Fullstack TypeScript Developer specializing in React, Next.js, and modern web technologies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${jetbrainsMono.variable} font-mono bg-[#0A0A0A] text-[#F0F0F0]`}
      >
        <QueryProvider>
          <AnimatedBackground />
          <Spotlight />
          <Meteors number={15} />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
