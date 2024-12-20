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
    url: "https://personal-website-psi-hazel-83.vercel.app",
    images: [
      {
        url: "https://personal-website-psi-hazel-83.vercel.app/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Og Image Alt",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://personal-website-psi-hazel-83.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
