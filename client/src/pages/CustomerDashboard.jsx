import { Link } from "react-router-dom";
import Sidebar from "./customer/Sidebar";
import {
  Home,
  Cpu,
  ShieldCheck,
  Users,
  Clock,
  Radio,
  Search,
  CreditCard,
  Package,
  FileText,
  ArrowRight,
  BarChart3,
} from "lucide-react";

export default function CustomerDashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F4F6FB", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px);} to{opacity:1;transform:translateY(0);} }
        @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
        .hov-card:hover { transform:translateY(-2px) !important; box-shadow:0 10px 28px rgba(91,79,207,0.10) !important; border-color:#C4BEFF !important; }
        .hov-btn:hover { background:#4A3FBF !important; transform:translateY(-1px); }
        .qa-card { text-decoration:none; color:inherit; display:block; }
      `}</style>

      <Sidebar />

      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* Top bar */}
        <div style={{ background: "#fff", borderBottom: "1px solid #EAECF4", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 10px rgba(91,79,207,0.05)", animation: "fadeIn 0.4s ease" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#1A1B3A", letterSpacing: "-0.3px" }}>Welcome back 👋</div>
            <div style={{ fontSize: 12, color: "#9095B0" }}>Here's what's happening with your builds today</div>
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, padding: "5px 14px", borderRadius: 20, fontWeight: 700, color: "#5B4FCF", background: "#F0EEFF", border: "1px solid #C4BEFF" }}>
            <Users size={12} strokeWidth={2.4} />
            500+ Happy Homeowners
          </span>
        </div>

        <div style={{ padding: "28px 40px" }}>

          {/* Hero banner */}
          <div style={{
            background: "linear-gradient(120deg,#1A1B3A 0%,#2D2B6B 55%,#3D2B8B 100%)",
            borderRadius: 16, padding: "26px 32px", marginBottom: 22,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            boxShadow: "0 8px 32px rgba(26,27,58,0.18)",
            animation: "fadeUp 0.5s ease forwards", opacity: 0,
            overflow: "hidden", position: "relative",
          }}>
            <div style={{ position: "absolute", right: 140, top: -30, width: 150, height: 150, borderRadius: "50%", background: "rgba(123,111,232,0.08)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 30, bottom: -50, width: 190, height: 190, borderRadius: "50%", background: "rgba(91,79,207,0.06)", pointerEvents: "none" }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8 }}>Your Build Command Centre</div>
              <h1 style={{ fontSize: 21, fontWeight: 800, color: "#fff", margin: "0 0 6px", letterSpacing: "-0.3px", lineHeight: 1.25 }}>
                Your dream home,{" "}
                <span style={{ color: "#A78BFA" }}>digitally crafted.</span>
              </h1>
              <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)", margin: "0 0 18px", maxWidth: 380, lineHeight: 1.65 }}>
                Real-time tracking, milestone updates, and full transparency — every brick, every update, tracked for you.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <Link to="/customer/my-projects" className="hov-btn" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "#5B4FCF", color: "#fff", textDecoration: "none",
                  padding: "9px 18px", borderRadius: 10, fontWeight: 700, fontSize: 12.5,
                  boxShadow: "0 4px 16px rgba(91,79,207,0.35)", transition: "all 0.2s ease",
                }}>
                  My Projects <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            <div style={{
              flexShrink: 0, position: "relative", zIndex: 1, width: 60, height: 60,
              borderRadius: 14, background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Home size={28} color="#A78BFA" strokeWidth={1.8} />
            </div>
          </div>

          {/* Feature cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 18, animation: "fadeUp 0.5s ease 0.08s forwards", opacity: 0 }}>
            {[
              { Icon: Cpu,        label: "Precise 3D",       desc: "Visualize every corner of your project before it's built",          color: "#5B4FCF", bg: "#F0EEFF", border: "#D9D4FD" },
              { Icon: Radio,      label: "Real-time tracking", desc: "Live updates from your contractor, straight to your dashboard",     color: "#0F6E56", bg: "#E6F7F2", border: "#9FE1CB" },
              { Icon: ShieldCheck,label: "Assured quality",   desc: "Every milestone verified — no surprises, only progress",            color: "#B45309", bg: "#FEF3E2", border: "#FAC775" },
            ].map(({ Icon, label, desc, color, bg, border }) => (
              <div key={label} className="hov-card" style={{ background: "#fff", borderRadius: 14, padding: "18px", border: `1px solid ${border}`, boxShadow: "0 1px 8px rgba(91,79,207,0.05)", transition: "all 0.22s ease" }}>
                <div style={{ width: 40, height: 40, background: bg, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <Icon size={19} color={color} strokeWidth={2} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 13.5, color: "#1A1B3A", marginBottom: 4, letterSpacing: "-0.2px" }}>{label}</div>
                <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>

          {/* Stats strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 18, animation: "fadeUp 0.5s ease 0.14s forwards", opacity: 0 }}>
            {[
              { val: "500+",  label: "Happy homeowners", Icon: Users       },
              { val: "98%",   label: "On-time delivery",  Icon: Clock       },
              { val: "24/7",  label: "Live monitoring",   Icon: Radio       },
              { val: "100%",  label: "Transparent builds", Icon: Search     },
            ].map(({ val, label, Icon }) => (
              <div key={label} style={{ background: "#fff", borderRadius: 14, padding: "16px 14px", border: "1px solid #EAECF4", boxShadow: "0 1px 8px rgba(91,79,207,0.05)", textAlign: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F0EEFF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                  <Icon size={17} color="#5B4FCF" strokeWidth={2} />
                </div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#5B4FCF", letterSpacing: "-0.8px", marginBottom: 3 }}>{val}</div>
                <div style={{ fontSize: 11, color: "#9095B0", fontWeight: 600 }}>{label}</div>
              </div>
            ))}
          </div>

        

        </div>
      </div>
    </div>
  );
}
