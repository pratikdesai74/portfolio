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
  title: {
    default: "Pratik Desai | Senior Software Engineer - Fintech & Payments Expert",
    template: "%s | Pratik Desai",
  },
  description:
    "Senior Software Engineer available for remote opportunities. 7+ years in Fintech, Payments & Cybersecurity. Built systems at Securonix, Mastercard, TartanHq processing millions of transactions. Java, Spring Boot, Kafka, AWS expert. Open to remote roles worldwide.",
  keywords: [
    "Pratik Desai",
    "Software Engineer",
    "Senior Software Engineer",
    "Remote Software Engineer",
    "Remote Backend Developer",
    "Remote Java Developer",
    "Hire Remote Developer",
    "Backend Developer",
    "Java Developer",
    "Spring Boot Developer",
    "Fintech Engineer",
    "Payments Engineer",
    "Cybersecurity Engineer",
    "Kafka Developer",
    "AWS Developer",
    "Microservices",
    "Distributed Systems",
    "Remote Work",
    "Work From Home Developer",
    "Freelance Java Developer",
    "Contract Developer",
    "Pune",
    "India",
    "Mastercard",
    "Securonix",
    "TartanHq",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pratik Desai",
  url: "https://pratikdesai.dev",
  image: "https://pratikdesai.dev/pratik-photo.jpg",
  jobTitle: "Senior Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Securonix",
  },
  description:
    "Senior Software Engineer with 7+ years experience specializing in Fintech, Payments, and Cybersecurity.",
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
    "AWS",
    "Microservices",
    "Distributed Systems",
    "Fintech",
    "Payment Systems",
    "Cybersecurity",
  ],
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "CDAC ACTS Pune",
    },
    {
      "@type": "EducationalOrganization",
      name: "Shivaji University",
    },
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#0a0a0f] text-[#f4f4f5]`}
      >
        <div className="mesh-gradient" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
