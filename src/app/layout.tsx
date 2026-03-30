import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
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

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pratikdesai.dev"),
  title: {
    default: "Pratik Desai | Founding Senior Backend Engineer — Distributed Systems & AI Platforms",
    template: "%s | Pratik Desai",
  },
  description:
    "Founding Senior Backend Engineer (he/him) with 7+ years building distributed systems, event-driven platforms & AI-powered tools. Expert in Java, Spring Boot, Kafka, LLM/RAG pipelines, Multi-Agent Architecture & Platform Engineering. Built at Mastercard, TartanHQ, Securonix, Volante.",
  keywords: [
    "Pratik Desai",
    "Founding Senior Backend Engineer",
    "Senior Backend Engineer",
    "Distributed Systems",
    "Event-Driven Architecture",
    "Platform Engineering",
    "Java Engineer",
    "Spring Boot",
    "Apache Kafka",
    "AI Engineer",
    "LLM Engineer",
    "RAG Systems",
    "Multi-Agent Architecture",
    "Remote Backend Developer",
    "Microservices",
    "AWS Developer",
    "Fintech Engineer",
    "Payments Engineer",
    "Pune",
    "India",
    "Mastercard",
    "Securonix",
    "TartanHQ",
  ],
  authors: [{ name: "Pratik Desai" }],
  creator: "Pratik Desai",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pratikdesai.dev",
    siteName: "Pratik Desai Portfolio",
    title: "Pratik Desai | Founding Senior Backend Engineer — Distributed Systems & AI Platforms",
    description:
      "Founding Senior Backend Engineer building distributed systems, event-driven platforms & AI-powered tools. Java, Spring Boot, Kafka, LLM/RAG & Multi-Agent Architecture.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratik Desai | Founding Senior Backend Engineer",
    description:
      "Building distributed systems & AI-powered platforms. Java, Spring Boot, Kafka, LLM/RAG & Multi-Agent Architecture.",
    creator: "@pratikdesai",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pratik Desai",
  url: "https://pratikdesai.dev",
  image: "https://pratikdesai.dev/pratik-photo.jpg",
  jobTitle: "Founding Senior Backend Engineer",
  description:
    "Founding Senior Backend Engineer with 7+ years building distributed systems, event-driven platforms & AI-powered tools using Java, Spring Boot, Kafka, LLM and RAG pipelines.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressCountry: "India",
  },
  email: "pratikvilasdesai@gmail.com",
  sameAs: [
    "https://www.linkedin.com/in/pratikvdesai/",
    "https://github.com/pratikdesai74",
    "https://leetcode.com/u/pratikvilasdesai/",
    "https://medium.com/@pratikvilasdesai",
  ],
  knowsAbout: [
    "Java",
    "Spring Boot",
    "Apache Kafka",
    "Distributed Systems",
    "Event-Driven Architecture",
    "Platform Engineering",
    "LLM",
    "RAG Systems",
    "Multi-Agent Architecture",
    "Microservices",
    "AWS",
    "Payment Systems",
  ],
  alumniOf: [
    { "@type": "EducationalOrganization", name: "CDAC ACTS Pune" },
    { "@type": "EducationalOrganization", name: "Shivaji University" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased bg-[#0a0f1e] text-[#e2e8f0]`}
      >
        <div className="mesh-gradient" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
