import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import { API_BASE_URL } from "../../services/api";

// Animated SVG circular progress ring
function CircleProgress({ pct, size = 130, stroke = 11 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEF0F7" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="url(#ring)"
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.4s ease" }}
      />
      <defs>
        <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5B4FCF" />
          <stop offset="100%" stopColor="#7B6FE8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [projectReview, setProjectReview] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, review: "" });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [updatesLimit, setUpdatesLimit] = useState(6);
  const [timelineLimit, setTimelineLimit] = useState(6);
  const [appReview, setAppReview] = useState(null);
  const [appReviewForm, setAppReviewForm] = useState({ rating: 5, review: "" });

  // ── NEW: refs for scrollable timeline
  const timelineScrollRef = useRef(null);
  const activeStepRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const projectRes = await axios.get(`${API_BASE_URL}/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProject(projectRes.data.project);

        const updatesRes = await axios.get(`${API_BASE_URL}/projects/${id}/updates`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUpdates(updatesRes.data.updates);

        const reviewRes = await axios.get(`${API_BASE_URL}/reviews/project/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjectReview(reviewRes.data.review || null);
        const appReviewRes = await axios.get(`${API_BASE_URL}/reviews/app/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppReview(appReviewRes.data.review || null);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  // ── NEW: auto-scroll to active step showing ~2 previous steps above it
  useEffect(() => {
    if (activeStepRef.current && timelineScrollRef.current) {
      const container = timelineScrollRef.current;
      const activeEl = activeStepRef.current;
      const nudgeUp = 160; // approx height of 2 timeline steps
      container.scrollTop = Math.max(0, activeEl.offsetTop - nudgeUp);
    }
  }, [project, updates]);

  const submitReviews = async () => {
    setIsSubmittingReview(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!projectReview) {
        await axios.post(`${API_BASE_URL}/reviews/project/${id}`, reviewForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      if (!appReview) {
        await axios.post(`${API_BASE_URL}/reviews/app/${id}`, appReviewForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      alert("Thank you for your feedback!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to submit review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (!project) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "#F4F6FB", fontFamily: "'Inter', sans-serif" }}>
        <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 44, height: 44, border: "3px solid #5B4FCF", borderTopColor: "transparent", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
            <div style={{ fontSize: 14, color: "#9095B0", fontWeight: 500 }}>Loading your project...</div>
          </div>
        </div>
      </div>
    );
  }

  const pct = project.progressPercentage || 0;

  // Build tracker from real contractor updates
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
    <div style={{ display: "flex", minHeight: "100vh", background: "#F4F6FB", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px);} to{opacity:1;transform:translateY(0);} }
        @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(91,79,207,0.35);} 50%{box-shadow:0 0 0 8px rgba(91,79,207,0);} }
        @keyframes spin { to{transform:rotate(360deg);} }
        .info-row:hover { background:#F0EEFF !important; border-radius:8px; }
        .upd-card:hover { transform:translateY(-3px) !important; box-shadow:0 14px 40px rgba(91,79,207,0.11) !important; border-color:#C4BEFF !important; }
        .upd-grid { display:grid; grid-template-columns:1fr; gap:18px; }
        @media (min-width:640px) { .upd-grid { grid-template-columns:repeat(2,1fr); } }
        @media (min-width:1024px) { .upd-grid { grid-template-columns:repeat(3,1fr); } }
        .upd-card { display:flex; flex-direction:column; }
        .upd-card .upd-body { flex:1 1 auto; }
        .upd-card .upd-footer { margin-top:12px; }
        .timeline-scroll::-webkit-scrollbar { width: 4px; }
        .timeline-scroll::-webkit-scrollbar-track { background: #F4F6FB; border-radius: 4px; }
        .timeline-scroll::-webkit-scrollbar-thumb { background: #C4BEFF; border-radius: 4px; }
        .timeline-scroll::-webkit-scrollbar-thumb:hover { background: #5B4FCF; }
      `}</style>

      <Sidebar />

      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* Sticky top bar */}
        <div style={{ background: "#fff", borderBottom: "1px solid #EAECF4", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 10px rgba(91,79,207,0.05)", position: "sticky", top: 0, zIndex: 10, animation: "fadeIn 0.4s ease" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#1A1B3A", letterSpacing: "-0.2px" }}>{project.projectName}</div>
            <div style={{ fontSize: 11, color: "#9095B0" }}>Project Details · ThumbbyX Global</div>
          </div>
          <span style={{ fontSize: 11, padding: "5px 14px", borderRadius: 20, fontWeight: 700, color: sc.text, background: sc.bg, border: `1px solid ${sc.border}`, textTransform: "capitalize" }}>{project.status}</span>
        </div>

        <div style={{ padding: "32px 40px" }}>

          {/* Hero banner with circular ring */}
          <div style={{
            background: "linear-gradient(120deg,#1A1B3A 0%,#2D2B6B 55%,#3D2B8B 100%)",
            borderRadius: 22, padding: "36px 44px", marginBottom: 28,
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32,
            boxShadow: "0 12px 48px rgba(26,27,58,0.22)",
            animation: "fadeUp 0.5s ease forwards", opacity: 0,
            overflow: "hidden", position: "relative",
          }}>
            <div style={{ position: "absolute", right: 220, top: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(123,111,232,0.1)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 60, bottom: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(91,79,207,0.08)", pointerEvents: "none" }} />

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 10 }}>Your Build · Live Tracking</div>
              <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.5px", lineHeight: 1.25 }}>{project.projectName}</h1>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 20px", lineHeight: 1.7, maxWidth: 380 }}>
                "Every brick laid is a promise kept. Your dream home is coming to life — milestone by milestone."
              </p>
              <div style={{ display: "flex", gap: 20 }}>
                {[
                  { label: "Customer", val: project.customerName },
                  { label: "City", val: project.city },
                  { label: "Budget", val: project.budget },
                ].map(item => (
                  <div key={item.label} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px 16px" }}>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{item.val || "—"}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Big circular ring */}
            <div style={{ flexShrink: 0, position: "relative" }}>
              <CircleProgress pct={pct} size={140} stroke={12} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}>{pct}%</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>Overall</div>
              </div>
            </div>
          </div>

          {pct === 100 && (!projectReview || !appReview) && (
            <div style={{
              background: "linear-gradient(120deg,#5B4FCF,#7B6FE8)",
              borderRadius: 22, padding: "32px 36px", marginBottom: 28,
              boxShadow: "0 12px 40px rgba(91,79,207,0.25)",
              animation: "fadeUp 0.5s ease 0.05s forwards", opacity: 0,
            }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 8 }}>🎉 Project Completed</div>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: "0 0 6px" }}>Leave a Review</h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginBottom: 22, lineHeight: 1.6 }}>
                Your project is complete! Share your experience to help future homeowners.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {!projectReview && (
                  <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 14, padding: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 10 }}>
                      Rate {project.contractorName || "your contractor"}
                    </div>
                    <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span key={n} onClick={() => setReviewForm({ ...reviewForm, rating: n })}
                          style={{ fontSize: 24, cursor: "pointer", color: n <= reviewForm.rating ? "#FFD700" : "rgba(255,255,255,0.3)" }}>★</span>
                      ))}
                    </div>
                    <textarea rows={3} value={reviewForm.review}
                      onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                      placeholder="How was your experience with the contractor?"
                      style={{ width: "100%", borderRadius: 10, border: "none", padding: 12, fontSize: 13, resize: "vertical", outline: "none", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" }} />
                  </div>
                )}

                {!appReview && (
                  <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 14, padding: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 10 }}>Rate ThumbbyX</div>
                    <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span key={n} onClick={() => setAppReviewForm({ ...appReviewForm, rating: n })}
                          style={{ fontSize: 24, cursor: "pointer", color: n <= appReviewForm.rating ? "#FFD700" : "rgba(255,255,255,0.3)" }}>★</span>
                      ))}
                    </div>
                    <textarea rows={3} value={appReviewForm.review}
                      onChange={(e) => setAppReviewForm({ ...appReviewForm, review: e.target.value })}
                      placeholder="How was your experience using ThumbbyX?"
                      style={{ width: "100%", borderRadius: 10, border: "none", padding: 12, fontSize: 13, resize: "vertical", outline: "none", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" }} />
                  </div>
                )}
              </div>

              <button onClick={submitReviews} disabled={isSubmittingReview}
                style={{ marginTop: 20, background: "#fff", color: "#5B4FCF", border: "none", borderRadius: 12, padding: "12px 28px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                {isSubmittingReview ? "Submitting..." : "Submit Review →"}
              </button>
            </div>
          )}

          {pct === 100 && projectReview && appReview && (
            <div style={{ background: "#E6F7F2", border: "1px solid #9FE1CB", borderRadius: 18, padding: "20px 26px", marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>✅</span>
              <div>
                <div style={{ fontWeight: 800, color: "#0F6E56", fontSize: 14 }}>Thanks for your feedback!</div>
                <div style={{ fontSize: 12, color: "#0F6E56", opacity: 0.8 }}>You've already reviewed this project.</div>
              </div>
            </div>
          )}

          {/* Two-col: details + tracker */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 22, marginBottom: 28 }}>

            {/* Project details card */}
            <div style={{ background: "#fff", borderRadius: 18, padding: "26px", border: "1px solid #EAECF4", boxShadow: "0 2px 16px rgba(91,79,207,0.06)", animation: "fadeUp 0.5s ease 0.1s forwards", opacity: 0 }}>
              <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 18 }}>Project Details</div>
              {[
                { k: "Customer", v: project.customerName },
                { k: "Customer Phone", v: project.customerPhone },
                { k: "Contractor", v: project.contractorName },
                { k: "Contractor Phone", v: project.contractorPhone },
                { k: "City", v: project.city },
                { k: "Budget", v: project.budget },
                { k: "Progress", v: `${pct}%` },
                { k: "Status", v: project.status },
              ].map(({ k, v }) => (
                <div key={k} className="info-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 8px", borderBottom: "1px solid #F4F6FB", transition: "background 0.18s", cursor: "default" }}>
                  <span style={{ fontSize: 12, color: "#9095B0", fontWeight: 500 }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1B3A", textAlign: "right", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v || "—"}</span>
                </div>
              ))}
            </div>

            {/* Progress tracker card */}
            <div style={{ background: "#fff", borderRadius: 18, padding: "26px", border: "1px solid #EAECF4", boxShadow: "0 2px 16px rgba(91,79,207,0.06)", animation: "fadeUp 0.5s ease 0.17s forwards", opacity: 0, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase" }}>Site Progress Tracker</div>
                <span style={{ fontSize: 11, background: "#F0EEFF", color: "#5B4FCF", border: "1px solid #C4BEFF", padding: "3px 11px", borderRadius: 20, fontWeight: 700 }}>{timelineSteps.filter(s => s.status === "done").length} done</span>
              </div>

              {timelineSteps.length === 0 ? (
                <div style={{ textAlign: "center", padding: "36px 0", color: "#C0C4D8" }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>📋</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#9095B0" }}>No updates from contractor yet</div>
                  <div style={{ fontSize: 12, color: "#B0B5C8", marginTop: 4 }}>Updates will appear here as work progresses</div>
                </div>
              ) : (
                /* ── CHANGED: fixed-height scrollable area, renders all steps */
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
                            transition: "all 0.3s", flexShrink: 0,
                          }}>
                            {isDone ? "✓" : isActive ? <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#5B4FCF" }} /> : ""}
                          </div>
                          {!isLast && <div style={{ width: 2, flex: 1, minHeight: 18, marginTop: 3, background: isDone ? "#9FE1CB" : "#EEF0F7" }} />}
                        </div>
                        <div style={{ paddingBottom: isLast ? 0 : 20, paddingTop: 2, flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: isDone ? "#0F6E56" : isActive ? "#5B4FCF" : "#C0C4D8", marginBottom: 3 }}>{step.label}</div>
                          <div style={{ fontSize: 12, color: isDone ? "#6B7280" : isActive ? "#7B6FE8" : "#C0C4D8", lineHeight: 1.55, marginBottom: 2 }}>{step.description}</div>
                          <div style={{ fontSize: 10, color: "#B0B5C8" }}>{step.date}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Updates section */}
          <div style={{ animation: "fadeUp 0.5s ease 0.24s forwards", opacity: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 4 }}>Contractor Reports</div>
                <h2 style={{ fontSize: 22, fontWeight: 900, color: "#1A1B3A", margin: 0, letterSpacing: "-0.4px" }}>Project Updates</h2>
              </div>
              <span style={{ fontSize: 12, color: "#9095B0", background: "#EEF0F7", padding: "5px 14px", borderRadius: 20, fontWeight: 600 }}>{updates.length} update{updates.length !== 1 ? "s" : ""}</span>
            </div>

            {updates.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: 18, padding: "52px 40px", textAlign: "center", border: "1px dashed #D1D5E8" }}>
                <div style={{ fontSize: 40, marginBottom: 14 }}>📋</div>
                <div style={{ fontWeight: 800, fontSize: 16, color: "#1A1B3A", marginBottom: 6 }}>No updates yet</div>
                <div style={{ fontSize: 13, color: "#9095B0" }}>Your contractor will post updates here as work progresses.</div>
              </div>
            ) : (
              <>
                <div className="upd-grid">
                  {updates.slice(0, updatesLimit).map((update, idx) => (
                    <div key={update._id} className="upd-card" style={{
                      background: "#fff", borderRadius: 18, padding: "26px 28px",
                      border: "1px solid #EAECF4", boxShadow: "0 2px 14px rgba(91,79,207,0.06)",
                      transition: "all 0.3s ease",
                      animation: `fadeUp 0.5s ease ${0.28 + idx * 0.07}s forwards`, opacity: 0,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 38, height: 38, borderRadius: 10, background: "#F0EEFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>📌</div>
                          <div>
                            <h3 style={{ fontSize: 16, fontWeight: 900, color: "#1A1B3A", margin: 0, letterSpacing: "-0.2px" }}>{update.title}</h3>
                            <div style={{ fontSize: 11, color: "#9095B0", marginTop: 2 }}>{new Date(update.createdAt).toLocaleString()}</div>
                          </div>
                        </div>
                        {update.progressPercentage != null && (
                          <span style={{ background: "#F0EEFF", color: "#5B4FCF", fontSize: 13, padding: "5px 14px", borderRadius: 20, border: "1px solid #C4BEFF", fontWeight: 800, flexShrink: 0 }}>
                            {update.progressPercentage}%
                          </span>
                        )}
                      </div>

                      <div className="upd-body" style={{ paddingLeft: 48 }}>
                        <div style={{ fontSize: 14, color: "#4A4F6A", lineHeight: 1.8 }}>{update.description}</div>

                        {update.photos?.length > 0 && (
                          <img src={update.photos[0]} alt="Site Progress" style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 14, marginBottom: 18, display: "block", marginTop: 12 }} />
                        )}

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                          <div style={{ background: "#F8F9FC", borderRadius: 12, padding: "12px 16px" }}>
                            <div style={{ fontSize: 10, color: "#9095B0", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 5, fontWeight: 700 }}>Next Task</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1B3A" }}>{update.nextTask || "—"}</div>
                          </div>
                          <div style={{ background: "#F8F9FC", borderRadius: 12, padding: "12px 16px" }}>
                            <div style={{ fontSize: 10, color: "#9095B0", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 5, fontWeight: 700 }}>Expected Completion</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1B3A" }}>
                              {update.expectedCompletionDate ? new Date(update.expectedCompletionDate).toLocaleDateString() : "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="upd-footer" style={{ fontSize: 11, color: "#B0B5C8", paddingTop: 12, borderTop: "1px solid #EEF0F7" }}>
                        Posted · {new Date(update.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {updates.length > updatesLimit && (
                  <div style={{ textAlign: "center", marginTop: 16 }}>
                    <button onClick={() => setUpdatesLimit((l) => l + 6)} style={{ padding: "10px 18px", borderRadius: 10, background: "#5B4FCF", color: "#fff", fontWeight: 700 }}>Load more updates</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
