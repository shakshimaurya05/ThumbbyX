import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Target, HardHat, Building2, CreditCard, Video, MessageSquare, Home, ArrowRight, FolderPlus, ShieldCheck, ClipboardList } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { isSuperAdmin } from "../../utils/roles";

const NAV = [
  { label: "Dashboard",    icon: LayoutDashboard, to: "/admin/dashboard" },
  { label: "Leads",        icon: Target,          to: "/admin/leads" },
  { label: "Contractors",  icon: HardHat,         to: "/admin/contractors" },
  { label: "Projects",     icon: Building2,       to: "/admin/projects" },
  { label: "Add Projects", icon: FolderPlus,      to: "/admin/add-projects" },
  { label: "Payments",     icon: CreditCard,      to: "/admin/payments" },
  { label: "Video Reviews",icon: Video,           to: "/admin/video-reviews" },
  { label: "Enquiries",    icon: MessageSquare,   to: "/admin/inquiries" },
];

const SUPER_ADMIN_NAV = [
  { label: "Admin Management", icon: ShieldCheck, to: "/admin/admin-management" },
  { label: "Activity Logs",    icon: ClipboardList, to: "/admin/activity-logs" },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const { user } = useAuth();
  const navItems = isSuperAdmin(user?.role)
    ? [...NAV, ...SUPER_ADMIN_NAV]
    : NAV;

  return (
    <div className="portal-shell" style={{ display: "flex", minHeight: "100vh", background: "#F4F6FB", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
        .adm-link:hover { background: rgba(255,255,255,0.08) !important; transform: translateX(3px); }
      `}</style>

      {/* Sidebar */}
      <div className="portal-sidebar portal-sidebar-dark" style={{
        width: 232, minHeight: "100vh", flexShrink: 0,
        background: "linear-gradient(180deg, #1A1B3A 0%, #2D2B6B 100%)",
        display: "flex", flexDirection: "column",
        position: "sticky", top: 0, height: "100vh",
        boxShadow: "4px 0 24px rgba(26,27,58,0.18)",
      }}>
        {/* Logo */}
        <div style={{ padding: "28px 22px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div style={{
              width: 40, height: 40,
              background: "linear-gradient(135deg,#5B4FCF,#7B6FE8)",
              borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, color: "#fff", fontSize: 14,
              boxShadow: "0 4px 14px rgba(91,79,207,0.5)",
            }}>TX</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 14, color: "#fff", letterSpacing: "-0.2px" }}>ThumbbyX</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", padding: "0 10px", marginBottom: 8 }}>Menu</div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to ||
              (item.to !== "/admin/dashboard" && location.pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link key={item.label} to={item.to} className="adm-link" style={{
                display: "flex", alignItems: "center", gap: 11, padding: "10px 12px",
                borderRadius: 10, marginBottom: 2, textDecoration: "none",
                background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                borderLeft: isActive ? "3px solid #A78BFA" : "3px solid transparent",
                transition: "all 0.18s ease",
              }}>
                <Icon size={16} color={isActive ? "#fff" : "rgba(255,255,255,0.6)"} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? "#fff" : "rgba(255,255,255,0.6)" }}>{item.label}</span>
                {isActive && <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#A78BFA" }} />}
              </Link>
            );
          })}
        </div>

        {/* Home button */}
        <div style={{ padding: "12px" }}>
          <Link to="/" style={{
            display: "flex", alignItems: "center", gap: 10, padding: "11px 14px",
            borderRadius: 10, textDecoration: "none",
            background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)",
            transition: "opacity 0.18s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            <Home size={16} color="rgba(255,255,255,0.7)" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>Back to Home</span>
            <ArrowRight size={14} color="rgba(255,255,255,0.3)" style={{ marginLeft: "auto" }} />
          </Link>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "linear-gradient(135deg,#5B4FCF,#7B6FE8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 13, fontWeight: 800, flexShrink: 0,
            }}>A</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>Admin</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{isSuperAdmin(user?.role) ? "Super Admin" : "Admin"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: "auto", animation: "fadeIn 0.4s ease" }}>
        {/* Top bar */}
        <div style={{
          background: "#fff", borderBottom: "1px solid #EAECF4",
          padding: "0 40px", height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: "0 1px 10px rgba(91,79,207,0.05)",
          position: "sticky", top: 0, zIndex: 10,
        }}>
          <div style={{ fontSize: 13, color: "#9095B0" }}>
            ThumbbyX Global Pvt. Ltd. &nbsp;·&nbsp;
            <span style={{ color: "#5B4FCF", fontWeight: 600 }}>Admin Console</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 11, background: "#F0EEFF", color: "#5B4FCF", border: "1px solid #C4BEFF", padding: "5px 14px", borderRadius: 20, fontWeight: 700 }}>{isSuperAdmin(user?.role) ? "Super Admin" : "Admin"}</div>
          </div>
        </div>

        {/* Page content */}
        <div style={{ padding: "36px 40px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
