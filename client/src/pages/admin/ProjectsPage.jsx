import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { API_BASE_URL } from "../../services/api";

function CircleProgress({ pct, size = 72, stroke = 7 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#EEF0F7" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#ppg)" strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.2s ease" }} />
      <defs>
        <linearGradient id="ppg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5B4FCF" /><stop offset="100%" stopColor="#7B6FE8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [markingId, setMarkingId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(API_BASE_URL + "/admin/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data.projects);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);

  const markAsCompleted = async (projectId) => {
    setMarkingId(projectId);
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        `${API_BASE_URL}/admin/projects/${projectId}/complete`,
        { status: "completed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProjects(prev =>
        prev.map(p => p._id === projectId ? { ...p, status: "completed" } : p)
      );
    } catch (error) {
      console.log(error);
      alert("Failed to mark project as completed");
    } finally {
      setMarkingId(null);
    }
  };

  return (
    <AdminLayout>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(15,110,86,0.35);} 50%{box-shadow:0 0 0 7px rgba(15,110,86,0);} }
        .proj-card:hover { transform:translateY(-4px) !important; box-shadow:0 16px 44px rgba(91,79,207,0.12) !important; border-color:#C4BEFF !important; }
        .view-btn:hover { background:#4A3FBF !important; transform:translateX(2px); }
        .complete-btn:hover { background:#0A5C47 !important; transform:translateX(2px); }
      `}</style>

      {/* Page heading */}
      <div style={{ marginBottom: 24, animation: "fadeUp 0.4s ease forwards", opacity: 0 }}>
        <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 6 }}>Live Builds</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#1A1B3A", margin: "0 0 6px", letterSpacing: "-0.6px" }}>Projects</h1>
        <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>Monitor all active and completed construction projects.</p>
      </div>

      {/* Stats */}
      {projects.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24, animation: "fadeUp 0.4s ease 0.06s forwards", opacity: 0 }}>
          {[
            { label: "Total Projects", val: projects.length,                                         icon: "🏗️", color: "#5B4FCF", bg: "#F0EEFF", border: "#D9D4FD" },
            { label: "In Progress",    val: projects.filter(p => p.status !== "completed").length,   icon: "⚡",  color: "#0F6E56", bg: "#E6F7F2", border: "#9FE1CB" },
            { label: "Completed",      val: projects.filter(p => p.status === "completed").length,   icon: "✅",  color: "#1D4ED8", bg: "#EFF6FF", border: "#BFDBFE" },
          ].map(s => (
            <div key={s.label} style={{
              background: "#fff", borderRadius: 14, padding: "16px 20px",
              border: `1px solid ${s.border}`, display: "flex", alignItems: "center", gap: 14,
              boxShadow: "0 2px 10px rgba(91,79,207,0.05)",
            }}>
              <div style={{ width: 42, height: 42, background: s.bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: s.color, letterSpacing: "-0.8px" }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "#9095B0", fontWeight: 600 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project cards */}
      <div style={{ display: "grid", gap: 16 }}>
        {projects.map((project, i) => {
          const pct = project.progressPercentage || 0;
          const isCompleted = project.status === "completed";
          const readyToComplete = pct === 100 && !isCompleted;
          const isMarking = markingId === project._id;

          const sc = isCompleted
            ? { text: "#0F6E56", bg: "#E6F7F2", border: "#9FE1CB" }
            : project.status === "planning"
            ? { text: "#B45309", bg: "#FEF3E2", border: "#FAC775" }
            : { text: "#5B4FCF", bg: "#F0EEFF", border: "#C4BEFF" };

          return (
            <div key={project._id} className="proj-card" style={{
              background: "#fff", borderRadius: 20, padding: "22px 26px",
              border: readyToComplete ? "1px solid #9FE1CB" : "1px solid #EAECF4",
              boxShadow: readyToComplete ? "0 2px 14px rgba(15,110,86,0.08)" : "0 2px 14px rgba(91,79,207,0.06)",
              transition: "all 0.28s ease", display: "flex", alignItems: "center", gap: 22,
              animation: `fadeUp 0.5s ease ${i * 0.07 + 0.12}s forwards`, opacity: 0,
            }}>
              {/* Ring */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <CircleProgress pct={pct} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 900, color: "#5B4FCF", letterSpacing: "-0.5px", lineHeight: 1 }}>{pct}%</div>
                  <div style={{ fontSize: 8, color: "#9095B0", fontWeight: 600, marginTop: 1 }}>Done</div>
                </div>
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: "#1A1B3A", marginBottom: 3, letterSpacing: "-0.2px" }}>{project.customerName}</div>
                    <div style={{ fontSize: 12, color: "#9095B0" }}>📍 {project.city} &nbsp;·&nbsp; {project.projectType} &nbsp;·&nbsp; 💰 {project.budget}</div>
                  </div>
                  <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, fontWeight: 700, color: sc.text, background: sc.bg, border: `1px solid ${sc.border}`, textTransform: "capitalize", flexShrink: 0, marginLeft: 12 }}>
                    {project.status}
                  </span>
                </div>

                <div style={{ background: "#EEF0F7", borderRadius: 8, height: 6, overflow: "hidden", marginBottom: 14 }}>
                  <div style={{ height: 6, borderRadius: 8, background: pct === 100 ? "linear-gradient(90deg,#1D9E75,#34D399)" : "linear-gradient(90deg,#5B4FCF,#7B6FE8)", width: `${pct}%`, transition: "width 1.2s ease" }} />
                </div>

                {/* "Ready to complete" banner */}
                {readyToComplete && (
                  <div style={{ background: "#E6F7F2", border: "1px solid #9FE1CB", borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                     
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: "#0F6E56" }}>Build complete — 100% progress</div>
                        <div style={{ fontSize: 11, color: "#0F6E56", opacity: 0.75 }}>Mark this project as completed to move it to the completed list.</div>
                      </div>
                    </div>
                    <button
                      className="complete-btn"
                      onClick={() => markAsCompleted(project._id)}
                      disabled={isMarking}
                      style={{
                        background: "#0F6E56", color: "#fff", border: "none",
                        padding: "8px 16px", borderRadius: 10, fontWeight: 700, fontSize: 12,
                        cursor: isMarking ? "not-allowed" : "pointer",
                        boxShadow: "0 3px 12px rgba(15,110,86,0.28)", transition: "all 0.2s ease",
                        display: "inline-flex", alignItems: "center", gap: 5, flexShrink: 0,
                        opacity: isMarking ? 0.7 : 1,
                        animation: isMarking ? "none" : "pulse 2s infinite",
                      }}
                    >
                      {isMarking ? "Saving..." : "Mark Completed ✓"}
                    </button>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Link to={`/admin/projects/${project._id}`} className="view-btn" style={{
                    background: "#5B4FCF", color: "#fff", textDecoration: "none",
                    padding: "8px 18px", borderRadius: 10, fontWeight: 700, fontSize: 12,
                    boxShadow: "0 3px 14px rgba(91,79,207,0.28)", transition: "all 0.2s ease",
                    display: "inline-flex", alignItems: "center", gap: 5,
                  }}>
                    View Project →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {projects.length === 0 && (
          <div style={{ background: "#fff", borderRadius: 20, padding: "60px 40px", textAlign: "center", border: "1px dashed #D1D5E8" }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>🏗️</div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#1A1B3A", marginBottom: 6 }}>No projects yet</div>
            <div style={{ fontSize: 13, color: "#9095B0" }}>Converted leads will appear here as live projects.</div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
