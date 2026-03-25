/**
 * Loading spinner — teal accent matching design system.
 */
const LoadingSpinner = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "5rem 1rem",
      gap: "1rem",
    }}>
      <div style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "3px solid var(--teal-pale)",
        borderTopColor: "var(--teal)",
        animation: "spinTeal .75s linear infinite",
      }} />
      <p style={{
        fontSize: ".8rem",
        letterSpacing: ".12em",
        textTransform: "uppercase",
        color: "var(--stone-dark)",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
      }}>Loading…</p>
    </div>
  );
};

export default LoadingSpinner;
