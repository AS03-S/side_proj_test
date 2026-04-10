import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DOX — The system, translated.",
  description:
    "Upload your immigration documents. Understand what they mean, what's being asked of you, and what to do next.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">
        {children}
      </body>
    </html>
  );
}
