import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { API_BASE_URL } from "../../services/api";

function CircleProgress({ pct, size = 130, stroke = 11 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#aring)" strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.4s ease" }} />
      <defs>
        <linearGradient id="aring" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A78BFA" /><stop offset="100%" stopColor="#7B6FE8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [updatesLimit, setUpdatesLimit] = useState(6);
  const [timelineLimit, setTimelineLimit] = useState(6);

  // ── NEW: ref to the scrollable timeline container & the active step node
  const timelineScrollRef = useRef(null);
  const activeStepRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const projectRes = await axios.get(`${API_BASE_URL}/admin/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProject(projectRes.data.project);
        const updatesRes = await axios.get(`${API_BASE_URL}/projects/${id}/updates`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUpdates(updatesRes.data.updates);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  // ── NEW: after timeline renders, scroll so active step is visible with 2 done steps above
  useEffect(() => {
    if (activeStepRef.current && timelineScrollRef.current) {
      const container = timelineScrollRef.current;
      const activeEl = activeStepRef.current;
      // scroll the active element into view, then nudge up a bit to show ~2 previous steps
      const offsetTop = activeEl.offsetTop;
      const nudgeUp = 160; // approx height of 2 timeline steps
      container.scrollTop = Math.max(0, offsetTop - nudgeUp);
    }
  }, [project, updates]);

  if (!project) {
    return (
      <AdminLayout>
        <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
        <div style={{ display: "flex", minHeight: "60vh", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 44, height: 44, border: "3px solid #5B4FCF", borderTopColor: "transparent", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
            <div style={{ fontSize: 14, color: "#9095B0", fontWeight: 500 }}>Loading project...</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const pct = project.progressPercentage || 0;

  const sorted = [...updates].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const timelineSteps = [];
  sorted.forEach((u, i) => {
    timelineSteps.push({
      label: u.title,
      description: u.description,
      date: new Date(u.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      status: "done",
    });
    if (u.nextTask) {
      const isLast = i === sorted.length - 1;
      timelineSteps.push({
        label: u.nextTask,
        description: isLast ? "Currently in progress" : "Completed and moved forward",
        date: isLast ? "In progress" : sorted[i + 1] ? new Date(sorted[i + 1].createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "",
        status: isLast ? "active" : "done",
      });
    }
  });

  const sc = project.status === "completed"
    ? { text: "#0F6E56", bg: "#E6F7F2", border: "#9FE1CB" }
    : project.status === "planning"
    ? { text: "#B45309", bg: "#FEF3E2", border: "#FAC775" }
    : { text: "#5B4FCF", bg: "#F0EEFF", border: "#C4BEFF" };

  return (
    <AdminLayout>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
        @keyframes pulse  { 0%,100%{box-shadow:0 0 0 0 rgba(91,79,207,0.35);} 50%{box-shadow:0 0 0 8px rgba(91,79,207,0);} }
        .info-row:hover { background:#F0EEFF !important; border-radius:8px; }
        .upd-card:hover { transform:translateY(-3px) !important; box-shadow:0 14px 40px rgba(91,79,207,0.11) !important; border-color:#C4BEFF !important; }
        .timeline-scroll::-webkit-scrollbar { width: 4px; }
        .timeline-scroll::-webkit-scrollbar-track { background: #F4F6FB; border-radius: 4px; }
        .timeline-scroll::-webkit-scrollbar-thumb { background: #C4BEFF; border-radius: 4px; }
        .timeline-scroll::-webkit-scrollbar-thumb:hover { background: #5B4FCF; }
      `}</style>

      {/* Hero banner with ring */}
      <div style={{
        background: "linear-gradient(120deg,#1A1B3A 0%,#2D2B6B 55%,#3D2B8B 100%)",
        borderRadius: 20, padding: "34px 40px", marginBottom: 26,
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28,
        boxShadow: "0 12px 48px rgba(26,27,58,0.20)",
        animation: "fadeUp 0.5s ease forwards", opacity: 0,
        overflow: "hidden", position: "relative",
      }}>
        <div style={{ position: "absolute", right: 200, top: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(123,111,232,0.10)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 50, bottom: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(91,79,207,0.08)", pointerEvents: "none" }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 8 }}>Admin · Project Overview</div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.5px" }}>{project.projectName}</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 18px", lineHeight: 1.7, maxWidth: 400 }}>
            "Full visibility into every milestone, update, and contractor report — in real time."
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "Customer",   val: project.customerName },
              { label: "Contractor", val: project.contractorName },
              { label: "City",       val: project.city },
            ].map(item => (
              <div key={item.label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "8px 14px" }}>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{item.val || "—"}</div>
              </div>
            ))}
            <span style={{ fontSize: 11, padding: "8px 14px", borderRadius: 10, fontWeight: 700, color: sc.text, background: sc.bg, border: `1px solid ${sc.border}`, textTransform: "capitalize", alignSelf: "center" }}>
              {project.status}
            </span>
          </div>
        </div>
        <div style={{ flexShrink: 0, position: "relative" }}>
          <CircleProgress pct={pct} size={130} stroke={11} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}>{pct}%</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>Overall</div>
          </div>
        </div>
      </div>

      {/* Two col: details + tracker */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 20, marginBottom: 26 }}>

        {/* Project details */}
        <div style={{ background: "#fff", borderRadius: 18, padding: "22px 24px", border: "1px solid #EAECF4", boxShadow: "0 2px 14px rgba(91,79,207,0.06)", animation: "fadeUp 0.5s ease 0.08s forwards", opacity: 0 }}>
          <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 16 }}>Project Details</div>
          {[
            { k: "Customer",         v: project.customerName },
            { k: "Customer Phone",   v: project.customerPhone },
            { k: "Contractor",       v: project.contractorName },
            { k: "Contractor Phone", v: project.contractorPhone },
            { k: "City",             v: project.city },
            { k: "Budget",           v: project.budget },
            { k: "Progress",         v: `${pct}%` },
            { k: "Status",           v: project.status },
          ].map(({ k, v }) => (
            <div key={k} className="info-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 8px", borderBottom: "1px solid #F4F6FB", transition: "background 0.18s", cursor: "default" }}>
              <span style={{ fontSize: 12, color: "#9095B0", fontWeight: 500 }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1B3A", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "right" }}>{v || "—"}</span>
            </div>
          ))}
        </div>

        {/* Timeline tracker */}
        <div style={{ background: "#fff", borderRadius: 18, padding: "22px 24px", border: "1px solid #EAECF4", boxShadow: "0 2px 14px rgba(91,79,207,0.06)", animation: "fadeUp 0.5s ease 0.14s forwards", opacity: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexShrink: 0 }}>
            <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase" }}>Site Progress Tracker</div>
            <span style={{ fontSize: 11, background: "#F0EEFF", color: "#5B4FCF", border: "1px solid #C4BEFF", padding: "3px 10px", borderRadius: 20, fontWeight: 700 }}>
              {timelineSteps.filter(s => s.status === "done").length} done
            </span>
          </div>

          {timelineSteps.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0", color: "#C0C4D8" }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>📋</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#9095B0" }}>No updates from contractor yet</div>
            </div>
          ) : (
            /* ── CHANGED: fixed-height scrollable area, no Load more button */
            <div
              ref={timelineScrollRef}
              className="timeline-scroll"
              style={{ overflowY: "auto", flex: 1, maxHeight: 360, paddingRight: 4 }}
            >
              {timelineSteps.map((step, i) => {
                const isLast = i === timelineSteps.length - 1;
                const isDone = step.status === "done";
                const isActive = step.status === "active";
                return (
                  <div
                    key={i}
                    ref={isActive ? activeStepRef : null}
                    style={{ display: "flex", gap: 14 }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 28, flexShrink: 0 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: isDone ? "#E6F7F2" : isActive ? "#F0EEFF" : "#F4F6FB",
                        border: `2px solid ${isDone ? "#1D9E75" : isActive ? "#5B4FCF" : "#D1D5E8"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 13, color: isDone ? "#1D9E75" : "#5B4FCF",
                        animation: isActive ? "pulse 2s infinite" : "none",
                        flexShrink: 0,
                      }}>
                        {isDone ? "✓" : isActive ? <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#5B4FCF" }} /> : ""}
                      </div>
                      {!isLast && <div style={{ width: 2, flex: 1, minHeight: 14, marginTop: 3, background: isDone ? "#9FE1CB" : "#EEF0F7" }} />}
                    </div>
                    <div style={{ paddingBottom: isLast ? 0 : 18, paddingTop: 2, flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: isDone ? "#0F6E56" : isActive ? "#5B4FCF" : "#C0C4D8", marginBottom: 3 }}>{step.label}</div>
                      <div style={{ fontSize: 12, color: isDone ? "#6B7280" : isActive ? "#7B6FE8" : "#C0C4D8", lineHeight: 1.5, marginBottom: 2 }}>{step.description}</div>
                      <div style={{ fontSize: 10, color: "#B0B5C8" }}>{step.date}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Updates grid */}
      <div style={{ animation: "fadeUp 0.5s ease 0.20s forwards", opacity: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 4 }}>Contractor Reports</div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#1A1B3A", margin: 0, letterSpacing: "-0.4px" }}>Project Updates</h2>
          </div>
          <span style={{ fontSize: 12, color: "#9095B0", background: "#EEF0F7", padding: "5px 14px", borderRadius: 20, fontWeight: 600 }}>
            {updates.length} update{updates.length !== 1 ? "s" : ""}
          </span>
        </div>

        {updates.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 18, padding: "52px 40px", textAlign: "center", border: "1px dashed #D1D5E8" }}>
            <div style={{ fontSize: 40, marginBottom: 14 }}>📋</div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#1A1B3A", marginBottom: 6 }}>No updates yet</div>
            <div style={{ fontSize: 13, color: "#9095B0" }}>Contractor will post updates here as work progresses.</div>
          </div>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {updates.slice(0, updatesLimit).map((update, idx) => (
                <div key={update._id} className="upd-card" style={{
                  background: "#fff", borderRadius: 18, padding: "20px 22px",
                  border: "1px solid #EAECF4", boxShadow: "0 2px 10px rgba(91,79,207,0.06)",
                  transition: "all 0.28s ease", display: "flex", flexDirection: "column",
                  animation: `fadeUp 0.5s ease ${0.22 + idx * 0.06}s forwards`, opacity: 0,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F0EEFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>📌</div>
                    {update.progressPercentage != null && (
                      <span style={{ background: "#F0EEFF", color: "#5B4FCF", fontSize: 12, padding: "3px 10px", borderRadius: 20, border: "1px solid #C4BEFF", fontWeight: 800 }}>
                        {update.progressPercentage}%
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: 14, fontWeight: 900, color: "#1A1B3A", marginBottom: 4, letterSpacing: "-0.2px" }}>{update.title}</div>
                  <div style={{ fontSize: 11, color: "#9095B0", marginBottom: 10 }}>{new Date(update.createdAt).toLocaleString()}</div>

                  <div style={{ fontSize: 13, color: "#4A4F6A", lineHeight: 1.7, marginBottom: 12, flex: 1 }}>{update.description}</div>

                  {update.photos?.length > 0 && (
                    <img src={update.photos[0]} alt="Site Progress"
                      style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 10, marginBottom: 12, display: "block" }} />
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                    <div style={{ background: "#F8F9FC", borderRadius: 9, padding: "8px 10px" }}>
                      <div style={{ fontSize: 9, color: "#9095B0", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 3, fontWeight: 700 }}>Next Task</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#1A1B3A" }}>{update.nextTask || "—"}</div>
                    </div>
                    <div style={{ background: "#F8F9FC", borderRadius: 9, padding: "8px 10px" }}>
                      <div style={{ fontSize: 9, color: "#9095B0", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 3, fontWeight: 700 }}>Completion</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#1A1B3A" }}>
                        {update.expectedCompletionDate ? new Date(update.expectedCompletionDate).toLocaleDateString() : "N/A"}
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: 10, color: "#B0B5C8", paddingTop: 10, borderTop: "1px solid #EEF0F7" }}>
                    Posted · {new Date(update.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {updates.length > updatesLimit && (
              <div style={{ textAlign: "center", marginTop: 18 }}>
                <button onClick={() => setUpdatesLimit(l => l + 6)} style={{
                  padding: "11px 28px", borderRadius: 12, background: "#5B4FCF", color: "#fff",
                  fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer",
                  boxShadow: "0 3px 14px rgba(91,79,207,0.3)",
                }}>
                  Load more updates ↓
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
