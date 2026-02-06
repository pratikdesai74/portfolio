import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Pratik Desai - Senior Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0f",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
        }}
      >
        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {/* Name */}
          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              backgroundClip: "text",
              color: "transparent",
              margin: 0,
              marginBottom: 16,
            }}
          >
            Pratik Desai
          </h1>

          {/* Title */}
          <p
            style={{
              fontSize: 36,
              color: "#a1a1aa",
              margin: 0,
              marginBottom: 24,
            }}
          >
            Senior Software Engineer
          </p>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 32,
            }}
          >
            {["Fintech", "Payments", "Cybersecurity", "Remote"].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "8px 20px",
                  borderRadius: 9999,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  color: "#60a5fa",
                  fontSize: 20,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: 48,
            }}
          >
            {[
              { value: "7+", label: "Years" },
              { value: "4", label: "Companies" },
              { value: "10M+", label: "Users Impacted" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 40,
                    fontWeight: 700,
                    color: "#3b82f6",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: 18,
                    color: "#71717a",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Domain */}
        <p
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 24,
            color: "#71717a",
          }}
        >
          pratikdesai.dev
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
