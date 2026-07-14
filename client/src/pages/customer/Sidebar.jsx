// Shared Sidebar component — import this in all 3 pages
import { Link, useLocation } from "react-router-dom";

const NAV = [
  { label: "Dashboard",   icon: "⊞",  to: "/customer/dashboard" },
  { label: "My Projects", icon: "🏗️", to: "/customer/my-projects" },
  { label: "Payments",    icon: "💳", to: "/customer/payments" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="portal-sidebar" style={{
      width: 232, minHeight: "100vh", background: "#fff",
      borderRight: "1px solid #EAECF4",
      display: "flex", flexDirection: "column", flexShrink: 0,
      boxShadow: "2px 0 24px rgba(91,79,207,0.06)",
      position: "sticky", top: 0, height: "100vh",
    }}>
      {/* Logo */}
      <div style={{ padding: "28px 22px 24px", borderBottom: "1px solid #EAECF4" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{
            width: 40, height: 40,
            background: "linear-gradient(135deg, #5B4FCF 0%, #7B6FE8 100%)",
            borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, color: "#fff", fontSize: 14, letterSpacing: "-0.5px",
            boxShadow: "0 4px 14px rgba(91,79,207,0.35)",
          }}>TX</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#1A1B3A", letterSpacing: "-0.2px" }}>ThumbbyX</div>
            <div style={{ fontSize: 11, color: "#9095B0", marginTop: 1 }}>Customer Portal</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
        <div style={{ fontSize: 10, color: "#B0B5C8", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", padding: "0 10px", marginBottom: 8 }}>Menu</div>
        {NAV.map((item) => {
          const isActive = item.to && (location.pathname === item.to || location.pathname.startsWith(item.to + "/") || (item.to === "/customer/my-projects" && location.pathname.startsWith("/customer/project")));
          return item.to ? (
            <Link key={item.label} to={item.to} style={{
              display: "flex", alignItems: "center", gap: 11, padding: "10px 12px",
              borderRadius: 10, marginBottom: 2, textDecoration: "none",
              background: isActive ? "linear-gradient(90deg, #F0EEFF, #F7F5FF)" : "transparent",
              borderLeft: isActive ? "3px solid #5B4FCF" : "3px solid transparent",
              transition: "all 0.18s ease",
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "#F8F8FF"; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{item.icon}</span>
              <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? "#5B4FCF" : "#4A4F6A" }}>{item.label}</span>
              {isActive && <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#5B4FCF" }} />}
            </Link>
          ) : (
            <div key={item.label} style={{
              display: "flex", alignItems: "center", gap: 11, padding: "10px 12px",
              borderRadius: 10, marginBottom: 2, cursor: "not-allowed", opacity: 0.5,
              borderLeft: "3px solid transparent",
            }}>
              <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{item.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#9095B0" }}>{item.label}</span>
              <span style={{ marginLeft: "auto", fontSize: 9, background: "#EEF0F7", color: "#9095B0", padding: "2px 7px", borderRadius: 20, fontWeight: 700, letterSpacing: "0.3px" }}>SOON</span>
            </div>
          );
        })}
      </div>
  <div style={{ padding: "12px", borderTop: "1px solid #EAECF4" }}>
        <Link to="/" style={{
          display: "flex", alignItems: "center", gap: 10, padding: "11px 14px",
          borderRadius: 10, textDecoration: "none",
          background: "linear-gradient(90deg,#1A1B3A,#2D2B6B)",
          transition: "opacity 0.18s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          <span style={{ fontSize: 16 }}>🏠</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Back to Home</span>
          <span style={{ marginLeft: "auto", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>→</span>
        </Link>
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid #EAECF4" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg, #5B4FCF, #7B6FE8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 13, fontWeight: 800, flexShrink: 0,
          }}>U</div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1A1B3A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>My Account</div>
            <div style={{ fontSize: 11, color: "#9095B0" }}>Homeowner</div>
          </div>
        </div>
      </div>
    </div>
  );
}
