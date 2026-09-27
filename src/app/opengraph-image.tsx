import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Pratik Desai — Founding Senior Backend Engineer, Distributed Systems & AI Platforms";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(family: string, weight: number, text: string) {
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`
    )
  ).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
  if (match) {
    const res = await fetch(match[1]);
    if (res.ok) return res.arrayBuffer();
  }
  throw new Error(`Failed to load font: ${family}`);
}

export default async function Image() {
  const name = "Pratik Desai";
  const role = "Founding Senior Backend Engineer";
  const tagline = "Distributed Systems · AI Agents · RAG & Multi-Agent Architecture";
  const stats = ["10M+ users", "2M+ TPS", "7.5+ yrs"];

  const [spaceGrotesk, inter] = await Promise.all([
    loadGoogleFont("Space+Grotesk", 700, name),
    loadGoogleFont("Inter", 500, role + tagline + stats.join("")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0f1e",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(34,211,238,0.20), transparent 45%), radial-gradient(circle at 90% 85%, rgba(99,102,241,0.22), transparent 50%)",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#22d3ee",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: "#22d3ee",
              display: "flex",
            }}
          />
          founding_engineer · he/him
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Space Grotesk",
            fontSize: 96,
            fontWeight: 700,
            color: "#f1f5f9",
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 38,
            color: "#94a3b8",
            marginTop: 18,
            marginBottom: 34,
          }}
        >
          {role}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#64748b",
            marginBottom: 46,
          }}
        >
          {tagline}
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {stats.map((stat) => (
            <div
              key={stat}
              style={{
                display: "flex",
                padding: "14px 28px",
                borderRadius: 999,
                border: "1px solid rgba(34,211,238,0.35)",
                backgroundColor: "rgba(34,211,238,0.08)",
                color: "#22d3ee",
                fontSize: 24,
                fontWeight: 500,
              }}
            >
              {stat}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: spaceGrotesk, weight: 700, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    }
  );
}
