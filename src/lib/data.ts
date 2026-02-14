export const personalInfo = {
  name: "Pratik Desai",
  title: "Senior Software Engineer",
  tagline: "Building scalable systems at the intersection of Fintech, Payments & Cybersecurity",
  location: "Pune, India",
  email: "pratikvilasdesai@gmail.com",
  phone: "+91-7588113838",
  about: `From Mechanical Engineering to scaling payment systems processing millions of transactions - my journey has been anything but conventional. I thrive at the intersection of complex technical challenges and business impact.

Over 7+ years, I've evolved from a curious engineer to a founding team member at a startup, and now to building enterprise-grade security platforms. At TartanHq, I was there from day zero - turning ideas into a revenue-generating platform in just 3 months. At Mastercard, I architected solutions reaching 10M+ users across Africa.

Today at Securonix, I'm scaling SIEM infrastructure from 1M to 2M+ transactions per second. What drives me? The challenge of building systems that are not just technically elegant but create real business value.

Beyond code, I'm a National Level Taekwondo player who has won multiple gold medals and represented Maharashtra State. Music is my other passion - as a guitarist and vocalist, I've been part of an indie-rock band performing at venues like Hard Rock Cafe and Blue Frog. Whether it's sports, music, or software - I love finding new ideas and turning them into reality from scratch.`,
  social: {
    linkedin: "https://www.linkedin.com/in/pratikvdesai/",
    github: "https://github.com/pratikdesai74",
    leetcode: "https://leetcode.com/u/pratikvilasdesai/",
    medium: "https://medium.com/@pratikvilasdesai",
    geeksforgeeks: "https://auth.geeksforgeeks.org/user/pratikvilasdesai",
  },
};

export const experiences = [
  {
    id: 1,
    role: "Senior Software Engineer",
    company: "Securonix",
    companyDescription: "Cybersecurity | SIEM | UEBA Platform",
    period: "Jan 2026 - Present",
    location: "Remote",
    highlights: [
      "Scaling high-throughput SIEM platform from 1M to 2M+ TPS through system redesign and performance optimization",
      "Built a fully local, cloud-parity dev environment for distributed systems, reducing developer setup and testing time",
      "Designing next-gen alerting, tracing, and logging for large-scale security analytics",
    ],
    tech: ["Java", "Spring Boot", "Kafka", "Spark", "Hadoop", "HBase", "Redis", "AWS", "Kubernetes"],
  },
  {
    id: 2,
    role: "Product Engineer",
    company: "Mastercard",
    companyDescription: "Fintech | Digital Payments",
    period: "Mar 2024 - Dec 2025",
    location: "Pune, India",
    highlights: [
      "Engineered multi-region resiliency for instant clearing product, onboarding 5+ clients",
      "Architected contactless payment solution for Africa expansion targeting 10M+ users",
      "Designed event-driven library accelerating financial auth processing by 30%",
      "Implemented JUnit integration tests reducing database-related issues by 30%",
    ],
    tech: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "AWS", "PCF", "gRPC", "Splunk"],
  },
  {
    id: 3,
    role: "Founding Software Engineer",
    company: "TartanHq",
    companyDescription: "AI-Powered Enterprise APIs | B2B SaaS Startup",
    period: "Jul 2021 - Mar 2024",
    location: "Bangalore, India",
    highlights: [
      "Joined as founding engineer, playing day-0 role in product development",
      "Built Perks platform from ground up, acquiring real customers in 3 months",
      "Implemented HRMS Connect onboarding 30,000 users, generating $66,000/month revenue",
      "Led optimized cart feature development, reducing user dropout by 20%",
      "Achieved 50% AWS cost reduction through efficient resource management",
      "Migrated payment service from Monolithic to Microservice architecture",
    ],
    tech: ["Java", "Spring Boot", "Kafka", "Redis", "MySQL", "DynamoDB", "AWS", "Docker", "Kubernetes"],
  },
  {
    id: 4,
    role: "Software Engineer (Backend)",
    company: "Volante Technologies",
    companyDescription: "Enterprise Banking | Payment Infrastructure",
    period: "Feb 2019 - Jul 2021",
    location: "Pune, India",
    highlights: [
      "Engineered Direct Cover and bulk payment features for VolPay - recognized as top payment platform by IBS Intelligence Award",
      "Designed configurable approval process enhancing workflow efficiency and security",
      "Integrated advanced security protocols, reducing fraud incidents by 15%",
    ],
    tech: ["Java", "Spring Boot", "MySQL", "SQL Server", "Kafka", "React", "Docker", "AWS"],
  },
];

export const projects = [
  {
    id: 1,
    title: "Payment Wallet System",
    description: "Distributed multi-service payment wallet with real-time notifications and high-performance transactions.",
    longDescription: "Engineered a distributed Multi-Service Payment Wallet system using Java Spring Boot, Spring Security, Kafka, and Redis. Improved transaction processing efficiency by 20% (P95 latency: 200ms to 160ms) and reduced SMS notification latency by 30%.",
    github: "https://github.com/pratikdesai74/payment_wallet",
    tech: ["Java", "Spring Boot", "Kafka", "Redis", "Spring Security"],
    featured: true,
    metrics: [
      { label: "Latency Reduction", value: "20%" },
      { label: "P95 Latency", value: "160ms" },
    ],
  },
  {
    id: 2,
    title: "TalkToPDF",
    description: "RAG-based document interaction tool enabling natural language querying of PDF documents.",
    longDescription: "Built a RAG-based document interaction tool using LangChain, Claude AI/OpenAI, and vector databases. Implemented semantic search with context-aware retrieval for natural language PDF querying with multi-document support.",
    github: "https://github.com/pratikdesai74/talkToPDF",
    demo: "https://talktopdf-pofcgxwt5mlsevhylbuhj6.streamlit.app/",
    tech: ["Python", "LangChain", "Claude AI", "OpenAI", "Streamlit", "Vector DB"],
    featured: true,
    metrics: [
      { label: "Documents", value: "Multi" },
      { label: "OCR Support", value: "Yes" },
    ],
  },
  {
    id: 3,
    title: "Perks Benefits Platform",
    description: "Enterprise benefits platform built from ground up, generating significant monthly revenue.",
    longDescription: "Created Perks from the ground up at TartanHq, successfully bringing in real customers within just 3 months. Implemented HRMS Connect to onboard 30,000 concurrent users.",
    link: "https://www.perks.tech/",
    tech: ["Java", "Spring Boot", "Redis", "AWS", "Microservices"],
    featured: true,
    metrics: [
      { label: "Monthly Revenue", value: "$66K" },
      { label: "Users", value: "30K+" },
    ],
  },
  {
    id: 4,
    title: "Marvel - Class Management System",
    description: "Full-stack web application to manage private class operations with cost-optimized infrastructure.",
    longDescription: "Built a comprehensive class management platform handling attendance tracking, notes distribution, and video content delivery. Initially hosted on Raspberry Pi with GitHub Actions CI/CD, later migrated to on-premise server with Google Cloud reverse proxy. Maximized open-source tools to minimize costs while maintaining production-grade reliability.",
    github: "https://github.com/desaiclasses/marvel",
    tech: ["Java", "Spring Boot", "Docker", "Raspberry Pi", "GitHub Actions", "GCP", "Nginx"],
    featured: true,
    metrics: [
      { label: "Hosting Cost", value: "Minimal" },
      { label: "Infrastructure", value: "Self-Hosted" },
    ],
  },
];

export const skills = {
  languages: {
    title: "Languages",
    items: ["Java", "Python", "TypeScript", "JavaScript", "SQL", "Bash"],
  },
  backend: {
    title: "Backend & Frameworks",
    items: ["Spring Boot", "Spring Security", "Hibernate", "JUnit", "gRPC", "REST APIs"],
  },
  cloud: {
    title: "Cloud & DevOps",
    items: ["AWS", "GCP", "Docker", "Kubernetes", "Jenkins", "CI/CD", "GitHub Actions"],
  },
  databases: {
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "Redis", "MongoDB", "DynamoDB", "HBase"],
  },
  messaging: {
    title: "Messaging & Streaming",
    items: ["Apache Kafka", "Nats.io", "AWS SQS", "Event-Driven Architecture"],
  },
  tools: {
    title: "Tools & Monitoring",
    items: ["Git", "Splunk", "Dynatrace", "JIRA", "SonarQube", "Postman"],
  },
};

export const testimonials = [
  {
    id: 1,
    name: "Hiren Savalia",
    role: "Team Lead HoAT Delivery",
    company: "Bank of America | Mastercard | Oracle",
    quote: "Pratik is an exceptional backend engineer with deep expertise in Java, Spring, and building scalable, reliable systems. What stands out most about Pratik is not just his technical strength, but his positive attitude and willingness to go the extra mile for the team. He is someone you can always count on - whether it's solving a complex problem, supporting teammates, or ensuring delivery quality.",
    relationship: "Managed Pratik at TartanHQ",
  },
  {
    id: 2,
    name: "Manas Mallik",
    role: "CTO & Director of Engineering",
    company: "AI & Distributed Systems Leader | LLM Architect",
    quote: "Pratik has an innate ability to analyze complex systems and identify optimal solutions. His insightful contributions have significantly enhanced the efficiency and effectiveness of our projects. He possesses a keen eye for identifying potential bottlenecks and takes a proactive approach to optimize performance. Furthermore, Pratik is an excellent team player who fosters a positive and inclusive work environment.",
    relationship: "Senior to Pratik",
  },
  {
    id: 3,
    name: "Jatin Garg",
    role: "Senior Software Engineer",
    company: "Agoda",
    quote: "Pratik is a highly skilled developer who consistently exceeded expectations. They are a quick learner, highly motivated, and always willing to take on new challenges. Their work ethic and attention to detail are unmatched, and they consistently produced high-quality work. Pratik was responsible for designing and developing the Batik platform from scratch with excellent problem-solving skills.",
    relationship: "Worked with Pratik on the same team",
  },
  {
    id: 4,
    name: "Animesh Dhokare",
    role: "Senior SDE",
    company: "Qualys | Data Platform | Fintech | Payments",
    quote: "I highly recommend Pratik as a skilled and passionate software engineer. Having worked with him in the past, I can attest to his hardworking nature, passion, and excellent problem-solving skills. He has a strong understanding of Data Structures and Algorithms, as well as a dedicated work ethic. His ability to communicate complex ideas clearly and collaborate effectively make him a valuable asset.",
    relationship: "Senior to Pratik",
  },
  {
    id: 5,
    name: "Sai Kranthi",
    role: "CTO",
    company: "Upshot Global Inc.",
    quote: "Pratik is a productive and focused Engineer. I loved working with him and would recommend him to any team if you're looking for a team player, problem solver and practically wants to get things done.",
    relationship: "Worked with Pratik on the same team",
  },
];

export const education = [
  {
    institution: "Scaler",
    degree: "Specialized in Software Development & Problem Solving",
    year: "2022",
  },
  {
    institution: "CDAC ACTS, Pune",
    degree: "Post Graduate Diploma",
    year: "2019",
  },
  {
    institution: "Shivaji University, Kolhapur",
    degree: "BE/B.Tech/BS",
    year: "2014",
  },
];

export const achievements = [
  {
    title: "IBS Intelligence Award",
    description: "Received for Volpay product development for Goldman Sachs",
    year: "2021",
  },
];

export const stats = [
  { label: "Years Experience", value: "7+" },
  { label: "Companies", value: "4" },
  { label: "Revenue Generated", value: "$66K/mo" },
  { label: "Users Impacted", value: "10M+" },
];

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];
