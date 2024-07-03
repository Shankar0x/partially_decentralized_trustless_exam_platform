import type { Metadata } from "next";
import { Trispace } from "next/font/google";
import "react-toastify/dist/ReactToastify.min.css";
import "./globals.css";

const trispace = Trispace({weight: ["400"], subsets: ["latin"]});

export const metadata: Metadata = {
  title: "ZeroTrust",
  description: "Partially Decentralized Trustless Exam Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={trispace.className}>{children}</body>
    </html>
  );
}
