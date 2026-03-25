import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  to?: string;
}

/**
 * Breadcrumb trail — styled to match Courses page design system.
 */
const Breadcrumbs = ({ items }: { items: Crumb[] }) => {
  return (
    <nav aria-label="Breadcrumb" style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "6px",
      fontSize: ".78rem",
      fontFamily: "'DM Sans', sans-serif",
      marginBottom: "clamp(2rem, 4vw, 3rem)",
      animation: "fadeUp .5s ease both",
    }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {i > 0 && (
              <ChevronRight
                size={13}
                style={{ color: "var(--stone)", flexShrink: 0 }}
              />
            )}
            {isLast || !item.to ? (
              <span style={isLast ? {
                fontWeight: 500,
                color: "var(--teal)",
                background: "var(--teal-pale)",
                border: "1px solid rgba(42,107,107,.12)",
                padding: ".3rem .875rem",
                borderRadius: "100px",
                fontSize: ".72rem",
                letterSpacing: ".04em",
              } : { color: "var(--stone-dark)" }}>
                {item.label}
              </span>
            ) : (
              <Link
                to={item.to}
                style={{
                  color: "var(--stone-dark)",
                  textDecoration: "none",
                  transition: "color .2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--teal)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--stone-dark)")}
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
