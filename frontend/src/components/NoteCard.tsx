import { FileText, Download, Eye } from "lucide-react";
import type { Note, PYQ } from "@/types/api";

/**
 * Individual item card — styled to match Courses page design system.
 */
const NoteCard = ({ item, itemType = "notes" }: { item: Note | PYQ; itemType?: "notes" | "pyqs" }) => {
  const isPYQ = itemType === "pyqs";
  const sessionStr = isPYQ ? (item as PYQ).year?.toString() : (item as Note).display_session;

  const uploaderInfo = [
    item.display_name,
    item.display_course,
    item.display_department,
    `Sem ${item.display_semester}`,
    sessionStr,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      borderRadius: "14px",
      border: "1px solid rgba(255,255,255,.5)",
      background: "rgba(255,255,255,.65)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      padding: "clamp(1rem, 2.5vw, 1.375rem)",
      boxShadow: "0 2px 12px rgba(42,107,107,.06), 0 1px 3px rgba(0,0,0,.04)",
      transition: "transform .25s ease, box-shadow .25s ease",
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 30px rgba(42,107,107,.12), 0 2px 8px rgba(0,0,0,.04)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(42,107,107,.06), 0 1px 3px rgba(0,0,0,.04)";
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", flex: 1 }}>
        {/* Icon */}
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "var(--teal-pale)",
          border: "1px solid rgba(42,107,107,.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: "2px",
        }}>
          <FileText size={18} style={{ color: "var(--teal)" }} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: "clamp(.9rem, 1.8vw, 1rem)",
            fontWeight: 500,
            color: "var(--ink)",
            margin: 0,
            lineHeight: 1.4,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {item.subject}
          </p>
          {uploaderInfo && (
            <p style={{
              marginTop: "4px",
              fontSize: ".78rem",
              color: "var(--ink-3)",
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.5,
            }}>
              Uploaded by {uploaderInfo}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      {item.file_url && (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <a
            href={item.file_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 16px",
              borderRadius: "100px",
              border: "1px solid var(--sand-3)",
              background: "rgba(255,255,255,.8)",
              fontSize: ".78rem",
              fontWeight: 500,
              color: "var(--ink-2)",
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all .2s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--stone)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--sand-3)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            <Eye size={14} />
            View
          </a>
          <a
            href={item.file_url}
            download
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 18px",
              borderRadius: "100px",
              border: "1px solid var(--teal)",
              background: "var(--teal)",
              fontSize: ".78rem",
              fontWeight: 500,
              color: "#fff",
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all .2s ease",
              boxShadow: "0 2px 8px rgba(42,107,107,.2)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--teal-light)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--teal-light)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--teal)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--teal)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            <Download size={14} />
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
