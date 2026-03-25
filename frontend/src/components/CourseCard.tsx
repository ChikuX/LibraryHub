import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import type { Course } from "@/types/api";

/**
 * Displays a single course as a clickable card — matches Courses design system.
 */
const CourseCard = ({ course }: { course: Course }) => {
  const target = `/course/${course.key}/notes`;
  return (
    <Link
      to={target}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,.5)",
        background: "rgba(255,255,255,.65)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 1.5rem)",
        textDecoration: "none",
        boxShadow: "0 2px 12px rgba(42,107,107,.06), 0 1px 3px rgba(0,0,0,.04)",
        transition: "transform .25s cubic-bezier(.34,1.2,.64,1), box-shadow .25s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(42,107,107,.14), 0 2px 8px rgba(0,0,0,.05)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 12px rgba(42,107,107,.06), 0 1px 3px rgba(0,0,0,.04)";
      }}
    >
      {/* Icon */}
      <div style={{
        width: "56px",
        height: "56px",
        borderRadius: "14px",
        background: "var(--teal-pale)",
        border: "1px solid rgba(42,107,107,.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all .25s ease",
        flexShrink: 0,
      }}
        className="course-card-icon"
      >
        <GraduationCap size={26} style={{ color: "var(--teal)" }} />
      </div>

      {/* Label */}
      <div style={{ textAlign: "center" }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.3rem, 2.5vw, 1.6rem)",
          fontWeight: 500,
          color: "var(--ink)",
          margin: "0 0 4px",
          letterSpacing: "-.01em",
        }}>
          {course.key}
        </h3>
        <p style={{
          fontSize: ".78rem",
          color: "var(--ink-3)",
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.5,
          margin: 0,
        }}>
          {course.name}
        </p>
      </div>

      <style>{`
        a:hover .course-card-icon {
          background: var(--teal);
          border-color: var(--teal);
        }
        a:hover .course-card-icon svg {
          color: #fff !important;
        }
      `}</style>
    </Link>
  );
};

export default CourseCard;
