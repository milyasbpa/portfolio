import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const manrope = Manrope({
  subsets: ["latin"], // Adjust subsets if needed
  weight: ["400", "500", "700"], // Include desired font weights
  variable: "--font-manrope", // Optional: CSS variable for font family
});

export const metadata: Metadata = {
  title: "Ilyas Arya",
  description:
    "Ilyas Arya is a software engineer who builds accessible, inclusive products and digital experiences for the web, application.",
  keywords: ["ilyas arya", "ilyas bashirah", "portfolio", "software engineer"],
  openGraph: {
    title: "Ilyas Arya",
    description:
      "Ilyas Arya is a software engineer who builds accessible, inclusive products and digital experiences for the web, application.",
    url: "https://ilyasbashirah.com",
    images: [
      {
        url: "https://ilyasbashirah.com/logo/favicon-16x16.png",
        width: 800,
        height: 600,
        alt: "Og Image Alt",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://ilyasbashirah.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="uwORxZ-BvNAIP6w5l2sPy-GTSXeLDK9hF3q1LpUnyqM"
      />

      <body
        className={clsx(
          `${manrope.variable} antialiased`,
          "bg-white dark:bg-[#171717]"
        )}
      >
        {children}
      </body>
    </html>
  );
}
