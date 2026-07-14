import AdminLayout from "../components/admin/AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  Building2,
  ClipboardList,
  HardHat,
  ArrowUpRight,
} from "lucide-react";
import { API_BASE_URL } from "../services/api";

export default function AdminDashboard() {
  const [contractors, setContractors] = useState([]);

  const pendingCount  = contractors.filter((c) => c.verificationStatus === "under_review").length;
  const approvedCount = contractors.filter((c) => c.verificationStatus === "approved").length;
  const rejectedCount = contractors.filter((c) => c.verificationStatus === "rejected").length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(API_BASE_URL + "/admin/contractors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContractors(res.data.contractors);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px);} to{opacity:1;transform:translateY(0);} }
        .hov-card:hover { transform:translateY(-2px) !important; box-shadow:0 10px 28px rgba(91,79,207,0.10) !important; border-color:#C4BEFF !important; }
        .qa-card { text-decoration: none; color: inherit; display: block; }
        .qa-card:hover .qa-arrow { opacity: 1 !important; transform: translate(2px,-2px); }
      `}</style>

      {/* Page heading */}
      <div style={{ marginBottom: 22, animation: "fadeUp 0.4s ease forwards", opacity: 0 }}>
        <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 5 }}>Overview</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1A1B3A", margin: "0 0 4px", letterSpacing: "-0.4px" }}>Admin Dashboard</h1>
        <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>Monitor contractors, leads, and projects from one place.</p>
      </div>

      {/* Hero banner */}
      <div style={{
        background: "linear-gradient(120deg,#1A1B3A 0%,#2D2B6B 55%,#3D2B8B 100%)",
        borderRadius: 16, padding: "26px 32px", marginBottom: 22,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 8px 32px rgba(26,27,58,0.18)",
        animation: "fadeUp 0.5s ease 0.05s forwards", opacity: 0,
        overflow: "hidden", position: "relative",
      }}>
        <div style={{ position: "absolute", right: 140, top: -30, width: 140, height: 140, borderRadius: "50%", background: "rgba(123,111,232,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 30, bottom: -50, width: 180, height: 180, borderRadius: "50%", background: "rgba(91,79,207,0.06)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8 }}>ThumbbyX · Admin Control</div>
          <h2 style={{ fontSize: 21, fontWeight: 800, color: "#fff", margin: "0 0 6px", letterSpacing: "-0.3px", lineHeight: 1.25 }}>
            Build better, <span style={{ color: "#A78BFA" }}>manage smarter</span>
          </h2>
          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)", margin: 0, maxWidth: 360, lineHeight: 1.65 }}>
            Full visibility over contractors, leads, and live projects — all in one place.
          </p>
        </div>

        <div style={{
          flexShrink: 0, position: "relative", zIndex: 1, width: 56, height: 56,
          borderRadius: 14, background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Building2 size={26} color="#A78BFA" strokeWidth={1.8} />
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 22 }}>
        {[
          { label: "Pending Contractors",  val: pendingCount,  icon: Clock,        color: "#B45309", bg: "#FEF3E2", border: "#FAC775", delay: "0.10s" },
          { label: "Approved Contractors", val: approvedCount, icon: CheckCircle2, color: "#0F6E56", bg: "#E6F7F2", border: "#9FE1CB", delay: "0.14s" },
          { label: "Rejected Contractors", val: rejectedCount, icon: XCircle,      color: "#B91C1C", bg: "#FEE2E2", border: "#FCA5A5", delay: "0.18s" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="hov-card" style={{
              background: "#fff", borderRadius: 14, padding: "18px 20px",
              border: `1px solid ${s.border}`, boxShadow: "0 1px 8px rgba(91,79,207,0.05)",
              transition: "all 0.22s ease",
              animation: `fadeUp 0.5s ease ${s.delay} forwards`, opacity: 0,
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{ width: 44, height: 44, background: s.bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={20} color={s.color} strokeWidth={2} />
              </div>
              <div>
                <div style={{ fontSize: 26, fontWeight: 800, color: s.color, letterSpacing: "-1px", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600, marginTop: 3 }}>{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total + breakdown */}
      <div className="hov-card" style={{
        background: "#fff", borderRadius: 14, padding: "16px 22px",
        border: "1px solid #EAECF4", boxShadow: "0 1px 8px rgba(91,79,207,0.05)",
        transition: "all 0.22s ease", marginBottom: 22,
        animation: "fadeUp 0.5s ease 0.22s forwards", opacity: 0,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 44, background: "#F0EEFF", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Users size={20} color="#5B4FCF" strokeWidth={2} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#9095B0", fontWeight: 600, marginBottom: 2 }}>Total Contractors</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#5B4FCF", letterSpacing: "-0.8px", lineHeight: 1 }}>{contractors.length}</div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "#9095B0", marginBottom: 6 }}>Verification breakdown</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { label: "Pending",  val: pendingCount,  color: "#B45309", bg: "#FEF3E2" },
              { label: "Approved", val: approvedCount, color: "#0F6E56", bg: "#E6F7F2" },
              { label: "Rejected", val: rejectedCount, color: "#B91C1C", bg: "#FEE2E2" },
            ].map(b => (
              <div key={b.label} style={{ background: b.bg, borderRadius: 8, padding: "6px 12px", textAlign: "center", minWidth: 56 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: b.color }}>{b.val}</div>
                <div style={{ fontSize: 9.5, color: b.color, fontWeight: 700, letterSpacing: "0.3px" }}>{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div style={{ animation: "fadeUp 0.5s ease 0.26s forwards", opacity: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: "#9095B0", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase" }}>Quick Access</div>
          <div style={{ flex: 1, height: 1, background: "#EAECF4" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {[
            { icon: ClipboardList, label: "Manage Leads",    desc: "Assign contractors and convert leads to live projects", color: "#5B4FCF", bg: "#F0EEFF", border: "#D9D4FD", to: "/admin/leads" },
            { icon: Building2,     label: "All Projects",    desc: "Monitor progress, updates and milestone completion",    color: "#0F6E56", bg: "#E6F7F2", border: "#9FE1CB", to: "/admin/projects" },
            { icon: HardHat,       label: "All Contractors", desc: "Verify, approve or reject contractor applications",     color: "#B45309", bg: "#FEF3E2", border: "#FAC775", to: "/admin/contractors" },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <Link key={f.label} to={f.to} className="qa-card hov-card" style={{
                background: "#fff", borderRadius: 14, padding: "18px",
                border: `1px solid ${f.border}`, boxShadow: "0 1px 8px rgba(91,79,207,0.05)",
                transition: "all 0.22s ease",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, background: f.bg, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={19} color={f.color} strokeWidth={2} />
                  </div>
                  <ArrowUpRight
                    size={15}
                    color="#9095B0"
                    className="qa-arrow"
                    style={{ opacity: 0, transition: "all 0.2s ease" }}
                  />
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1A1B3A", marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontSize: 12.5, color: "#6B7280", lineHeight: 1.6 }}>{f.desc}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}