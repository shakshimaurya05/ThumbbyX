import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import { API_BASE_URL } from "../../services/api";

const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

export default function PaymentProjects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(API_BASE_URL + "/projects/customer/my-projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data.projects);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const totalPaid = projects.reduce((s, p) => {
    const budget = parseInt(p.budget) || 0;
    return s + (p.milestones || []).filter(m => m.status === "paid").reduce((a, m) => a + Math.round((m.pct / 100) * budget), 0);
  }, 0);

  const totalDue = projects.reduce((s, p) => {
    const budget = parseInt(p.budget) || 0;
    return s + (p.milestones || []).filter(m => m.status === "due").reduce((a, m) => a + Math.round((m.pct / 100) * budget), 0);
  }, 0);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F4F6FB", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px);} to{opacity:1;transform:translateY(0);} }
        .proj-card:hover { border-color: #C4BEFF !important; transform: translateY(-2px) !important; }
      `}</style>
      <Sidebar />

      <div style={{ flex: 1, padding: "36px 44px" }}>

        {/* Heading */}
        <div style={{ marginBottom: 28, animation: "fadeUp 0.4s ease forwards", opacity: 0 }}>
          <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 6 }}>Payments</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#1A1B3A", margin: "0 0 4px", letterSpacing: "-0.5px" }}>Your Projects</h1>
          <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>Select a project to view its full payment dashboard.</p>
        </div>

        {/* Summary strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 28, animation: "fadeUp 0.4s ease 0.06s forwards", opacity: 0 }}>
          {[
            { label: "Total projects",  val: projects.length,  color: "#5B4FCF", bg: "#F0EEFF", border: "#C4BEFF", icon: "🏗️" },
            { label: "Total paid",      val: fmt(totalPaid),   color: "#0F6E56", bg: "#E6F7F2", border: "#9FE1CB", icon: "✅" },
            { label: "Due now",         val: fmt(totalDue),    color: "#B45309", bg: "#FEF3E2", border: "#FAC775", icon: "⏳" },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "16px 20px", border: `1px solid ${s.border}`, display: "flex", alignItems: "center", gap: 12, boxShadow: "0 2px 10px rgba(91,79,207,0.05)" }}>
              <div style={{ width: 40, height: 40, background: s.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 900, color: s.color, letterSpacing: "-0.5px" }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "#9095B0", fontWeight: 600 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Project cards */}
        <div style={{ display: "grid", gap: 12 }}>
          {projects.map((p, i) => {
            const budget = parseInt(p.budget) || 0;
            const paid = (p.milestones || []).filter(m => m.status === "paid").reduce((a, m) => a + Math.round((m.pct / 100) * budget), 0);
            const due  = (p.milestones || []).filter(m => m.status === "due").reduce((a, m) => a + Math.round((m.pct / 100) * budget), 0);
            const hasMilestones = (p.milestones || []).length > 0;

            return (
              <div key={p._id} className="proj-card"
                onClick={() => navigate(`/customer/paymentDashboard/${p._id}`)}
                style={{
                  background: "#fff", borderRadius: 16, padding: "20px 24px",
                  border: "1px solid #EAECF4", cursor: "pointer",
                  boxShadow: "0 2px 14px rgba(91,79,207,0.06)",
                  transition: "all 0.2s ease", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                  animation: `fadeUp 0.5s ease ${i * 0.07 + 0.1}s forwards`, opacity: 0,
                }}
              >
                {/* Left */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 0 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#5B4FCF,#7B6FE8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 800, flexShrink: 0 }}>
                    {(p.projectName || "P")[0].toUpperCase()}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#1A1B3A", marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.projectName}</div>
                    <div style={{ fontSize: 12, color: "#9095B0" }}>Budget: {fmt(budget)} &nbsp;·&nbsp; {p.city}</div>
                  </div>
                </div>

                {/* Right */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  {hasMilestones ? (
                    <>
                      <div style={{ textAlign: "center", background: "#E6F7F2", border: "1px solid #9FE1CB", borderRadius: 10, padding: "7px 14px" }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: "#0F6E56" }}>{fmt(paid)}</div>
                        <div style={{ fontSize: 10, color: "#0F6E56", fontWeight: 600 }}>Paid</div>
                      </div>
                      {due > 0 && (
                        <div style={{ textAlign: "center", background: "#FEF3E2", border: "1px solid #FAC775", borderRadius: 10, padding: "7px 14px" }}>
                          <div style={{ fontSize: 13, fontWeight: 800, color: "#B45309" }}>{fmt(due)}</div>
                          <div style={{ fontSize: 10, color: "#B45309", fontWeight: 600 }}>Due</div>
                        </div>
                      )}
                    </>
                  ) : (
                    <span style={{ fontSize: 11, color: "#9095B0", background: "#F4F6FB", border: "1px solid #EAECF4", borderRadius: 20, padding: "4px 12px", fontWeight: 600 }}>No milestones yet</span>
                  )}
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#5B4FCF", display: "flex", alignItems: "center", gap: 4, paddingLeft: 4 }}>
                    View →
                  </div>
                </div>
              </div>
            );
          })}

          {projects.length === 0 && (
            <div style={{ background: "#fff", borderRadius: 16, padding: "60px 40px", textAlign: "center", border: "1px dashed #D1D5E8" }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>💳</div>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#1A1B3A", marginBottom: 6 }}>No projects yet</div>
              <div style={{ fontSize: 13, color: "#9095B0" }}>Your projects will appear here once created.</div>
            </div>
          )}
        </div>

        {/* Info note */}
        <div style={{ marginTop: 20, padding: "12px 16px", background: "#F0EEFF", borderRadius: 10, border: "1px solid #C4BEFF", fontSize: 12, color: "#5B4FCF", display: "flex", alignItems: "center", gap: 8 }}>
          ℹ️ Payments are processed within 2 business days of milestone verification.
        </div>
      </div>
    </div>
  );
}