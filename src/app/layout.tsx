import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "migraDOCS — Immigration document intelligence",
  description:
    "Upload your immigration documents. Understand what they mean, what is being asked of you, and what to do next. Organised, plain-language guidance for every step.",
  openGraph: {
    title: "migraDOCS — Immigration document intelligence",
    description:
      "Upload your immigration documents. Understand what they mean, what is being asked of you, and what to do next.",
    siteName: "migraDOCS",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full antialiased">
        {children}
      </body>
    </html>
  );
}
