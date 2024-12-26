import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { AppProvider } from "@/core/modules/app/context";

const manrope = Manrope({
  subsets: ["latin"], // Adjust subsets if needed
  weight: ["400", "500", "700"], // Include desired font weights
  variable: "--font-manrope", // Optional: CSS variable for font family
});

export const metadata: Metadata = {
  title: "Ilyas Bashirah",
  applicationName: "Ilyas Bashirah",
  authors: [
    {
      url: "https://ilyasbashirah.com",
      name: "Ilyas Bashirah",
    },
  ],
  description:
    "Crafting seamless digital experiences with React, Vue, Angular, Express—building the future, one framework at a time. 🚀💻 #SoftwareEngineer #Innovation",
  keywords: ["Ilyas Bashirah", "ilyas bashirah", "ilyasbashirah"],
  icons: "https://ilyasbashirah.com/logo/favicon-16x16.png",
  openGraph: {
    title: "Ilyas Bashirah",
    description:
      "Crafting seamless digital experiences with React, Vue, Angular, Express—building the future, one framework at a time. 🚀💻 #SoftwareEngineer #Innovation",
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
    canonical: "https://www.ilyasbashirah.com",
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
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
