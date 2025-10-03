import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sutharsika Kumar",
  description: "Personal portfolio and selected works",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}