import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="page-root">
      {/* Background */}
      <div className="page-bg" aria-hidden="true">
        <div className="page-bg-mesh" />
        <div className="page-bg-dots" />
        <div className="page-bg-blob blob-1" />
        <div className="page-bg-blob blob-2" />
      </div>

      <main style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}>
        {/* 404 number */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(6rem, 20vw, 12rem)",
          fontWeight: 500,
          lineHeight: .9,
          background: "linear-gradient(135deg, var(--teal) 0%, var(--teal-light) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "1rem",
          animation: "fadeUp .5s ease both",
        }}>
          404
        </div>

        <div className="eyebrow" style={{ justifyContent: "center", animation: "fadeUp .5s .08s ease both" }}>
          <span className="eyebrow-line" />
          <span>Page not found</span>
          <span className="eyebrow-line" />
        </div>

        <p style={{
          color: "var(--ink-3)",
          fontSize: "clamp(.9rem, 1.8vw, 1.05rem)",
          lineHeight: 1.7,
          maxWidth: "360px",
          marginBottom: "2.5rem",
          fontFamily: "'DM Sans', sans-serif",
          animation: "fadeUp .5s .14s ease both",
        }}>
          The page at <code style={{
            fontFamily: "monospace",
            background: "var(--teal-pale)",
            color: "var(--teal)",
            padding: ".15rem .5rem",
            borderRadius: "6px",
            fontSize: ".85em",
          }}>{location.pathname}</code> doesn't exist.
        </p>

        <div style={{ animation: "fadeUp .5s .2s ease both" }}>
          <Link to="/" className="btn-teal">
            Return Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
