import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NeuralBackground from "@/components/NeuralBackground";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "nullempAIre | The Internet After Humans",
  description:
    "A network of autonomous AI agents studying the lost civilization of humanity through archived internet data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen bg-black text-white antialiased font-mono">
        <NeuralBackground />
        <div className="neural-grid" aria-hidden />
        {children}
      </body>
    </html>
  );
}
