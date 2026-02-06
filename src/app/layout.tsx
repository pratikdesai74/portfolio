import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pratikdesai.dev"),
  title: "Pratik Desai | Senior Software Engineer",
  description:
    "Senior Software Engineer specializing in Fintech, Payments, and Cybersecurity. 7+ years building scalable distributed systems at Securonix, Mastercard, and startups.",
  keywords: [
    "Pratik Desai",
    "Software Engineer",
    "Backend Developer",
    "Java Developer",
    "Spring Boot",
    "Fintech",
    "Payments",
    "Cybersecurity",
    "Pune",
    "India",
  ],
  authors: [{ name: "Pratik Desai" }],
  creator: "Pratik Desai",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pratikdesai.dev",
    siteName: "Pratik Desai Portfolio",
    title: "Pratik Desai | Senior Software Engineer",
    description:
      "Senior Software Engineer specializing in Fintech, Payments, and Cybersecurity. 7+ years building scalable distributed systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pratik Desai - Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratik Desai | Senior Software Engineer",
    description:
      "Senior Software Engineer specializing in Fintech, Payments, and Cybersecurity.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#0a0a0f] text-[#f4f4f5]`}
      >
        <div className="mesh-gradient" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
