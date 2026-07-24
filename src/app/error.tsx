"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // ChunkLoadError = stale deployment: browser has old HTML, server has new chunks.
    // Auto-reload once to fetch the fresh page + new chunk URLs.
    const isChunkError =
      error?.name === "ChunkLoadError" ||
      error?.message?.includes("ChunkLoadError") ||
      error?.message?.includes("Failed to load chunk") ||
      error?.message?.includes("Loading chunk") ||
      error?.message?.includes("dynamically imported module");

    if (isChunkError) {
      // Guard against infinite reload loops
      const reloadKey = "cwa_chunk_reload";
      const lastReload = Number(sessionStorage.getItem(reloadKey) || 0);
      const now = Date.now();

      if (now - lastReload > 10_000) {
        sessionStorage.setItem(reloadKey, String(now));
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAF9F6",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 480,
            textAlign: "center",
            padding: "3rem 2rem",
            background: "#fff",
            borderRadius: "2rem",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          {/* Logo */}
          <img
            src="/images/logo-transparent.png"
            alt="Craftswoman Alley"
            style={{ height: 48, marginBottom: "1.5rem", objectFit: "contain" }}
          />

          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "2rem",
              letterSpacing: "-0.03em",
              color: "#262626",
              margin: "0 0 0.75rem",
            }}
          >
            Something went astray.
          </h1>

          <p
            style={{
              color: "#9a9a8a",
              fontSize: "0.9rem",
              lineHeight: 1.6,
              marginBottom: "2rem",
            }}
          >
            We encountered an unexpected hiccup. This is usually fixed by
            refreshing the page.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: "#53A87D",
                color: "#fff",
                border: "none",
                borderRadius: "0.75rem",
                padding: "0.85rem 1.75rem",
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Refresh Page
            </button>

            <button
              onClick={reset}
              style={{
                background: "transparent",
                color: "#262626",
                border: "1.5px solid rgba(0,0,0,0.12)",
                borderRadius: "0.75rem",
                padding: "0.85rem 1.75rem",
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>

          <p style={{ marginTop: "1.5rem", fontSize: "0.7rem", color: "#c0bdb5" }}>
            If this keeps happening, please{" "}
            <a href="/contact" style={{ color: "#53A87D" }}>
              contact us
            </a>
            .
          </p>
        </div>
      </body>
    </html>
  );
}
