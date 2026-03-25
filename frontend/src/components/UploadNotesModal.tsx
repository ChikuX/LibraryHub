import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface UploadNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadNotesModal = ({ isOpen, onClose }: UploadNotesModalProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  // Close when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Lock scroll 
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle animation out
  useEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`modal-overlay ${isOpen ? "open" : "closed"}`}
      onClick={onClose}
      onAnimationEnd={() => {
        if (!isOpen) setShouldRender(false);
      }}
    >
      <div 
        className={`modal-content ${isOpen ? "open" : "closed"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.25rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid var(--sand-3)"
        }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.4rem",
            color: "var(--teal)",
            margin: 0
          }}>
            Contribute Resources
          </h2>
          <button 
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          fontSize: ".9rem",
          color: "var(--ink-2)",
          lineHeight: 1.6
        }}>
          
          <div className="modal-section">
            <p style={{ margin: "0 0 .5rem" }}>
              For now, if you want to upload your <strong>Notes/PYQs</strong>:
            </p>
            <p style={{ margin: 0 }}>
              Go to {" "}
              <a 
                href="https://t.me/LibraryhandlerBot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="modal-link"
              >
                @LibraryhandlerBot
              </a>
            </p>
          </div>

          <div className="modal-section">
            <p style={{ margin: "0 0 .5rem" }}>Don't have Telegram?</p>
            <p style={{ margin: 0 }}>
              You can mail your Notes/PYQs at:{" "}
              <a href="mailto:itsankit1317@gmail.com" className="modal-link">
                itsankit1317@gmail.com
              </a>
            </p>
          </div>

          <div style={{
            background: "var(--teal-pale)",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid rgba(42,107,107,.1)"
          }}>
            <p style={{ 
              margin: "0 0 .75rem", 
              fontWeight: 500, 
              color: "var(--teal)" 
            }}>
              Please include the following details:
            </p>
            <ul style={{ 
              margin: 0, 
              paddingLeft: "1.2rem",
              display: "flex",
              flexDirection: "column",
              gap: ".35rem",
              fontSize: ".85rem"
            }}>
              <li><strong>Full Name</strong> (e.g., Ankit Kumar)</li>
              <li><strong>Roll No</strong> (e.g., 637281)</li>
              <li><strong>Course</strong> (e.g., BTECH)</li>
              <li><strong>Department</strong> (e.g., CSE / Leave blank if not applicable)</li>
              <li><strong>Semester</strong> (e.g., 4)</li>
              <li><strong>Session</strong> (e.g., 2024–28) → <em>for Notes</em></li>
              <li><strong>Year</strong> (e.g., 2023) → <em>ONLY for PYQs</em></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadNotesModal;
