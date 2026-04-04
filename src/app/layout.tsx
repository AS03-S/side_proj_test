import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Certa — Structured guidance for immigration procedures",
  description:
    "Upload official documents, identify key dates, and receive structured procedural guidance. Certa provides informational document guidance, not legal advice.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
