import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ContractorSidebar from "./ContractorSidebar";
import { API_BASE_URL } from "../../services/api";

function CircleProgress({ pct, size = 130, stroke = 11 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#cring)" strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.4s ease" }} />
      <defs>
        <linearGradient id="cring" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A78BFA" /><stop offset="100%" stopColor="#7B6FE8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function ContractorProjectDetailsPage() {
  const [updates, setUpdates] = useState([]);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "", description: "", progressPercentage: 0,
    nextTask: "", expectedCompletionDate: "", photos: "",
  });
  const [project, setProject] = useState(null);
const [projectReview, setProjectReview] = useState(null);
const [appReview, setAppReview] = useState(null);
const [reviewForm, setReviewForm] = useState({ rating: 5, review: "" });
const [appReviewForm, setAppReviewForm] = useState({ rating: 5, review: "" });
const [isUploading, setIsUploading] = useState(false);
const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false);
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_BASE_URL}/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProject(res.data.project);
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
    fetchProject();
  }, [id]);

 const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const imageData = new FormData();
      imageData.append("photo", file);
      const res = await axios.post(`${API_BASE_URL}/projects/${id}/upload-photo`, imageData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData(prev => ({ ...prev, photos: res.data.url }));
      alert("Image uploaded successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

const submitUpdate = async () => {
    if (isSubmittingUpdate) return;
    setIsSubmittingUpdate(true);
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${API_BASE_URL}/projects/${id}/update`,
        { ...formData, photos: formData.photos ? [formData.photos] : [] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Update Added Successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to submit update");
    } finally {
      setIsSubmittingUpdate(false);
    }
  };
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
        <ContractorSidebar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 44, height: 44, border: "3px solid #5B4FCF", borderTopColor: "transparent", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
            <div style={{ fontSize: 14, color: "#9095B0", fontWeight: 500 }}>Loading project...</div>
          </div>
        </div>
      </div>
    );
  }

  const pct = project.progressPercentage || 0;
  const iStyle = {
    width: "100%", background: "#F8F9FC", border: "1px solid #EAECF4",
    borderRadius: 12, padding: "13px 16px", color: "#1A1B3A", fontSize: 14,
    outline: "none", marginBottom: 12, boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s", fontFamily: "'Inter', sans-serif",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F4F6FB", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px);} to{opacity:1;transform:translateY(0);} }
        @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
        @keyframes spin { to{transform:rotate(360deg);} }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(91,79,207,0.3);} 50%{box-shadow:0 0 0 8px rgba(91,79,207,0);} }
        input:focus, textarea:focus { border-color:#5B4FCF !important; box-shadow:0 0 0 3px rgba(91,79,207,0.1) !important; background:#fff !important; }
        input::placeholder, textarea::placeholder { color:#B0B5C8; }
        input[type="date"]::-webkit-calendar-picker-indicator { opacity:0.4; cursor:pointer; }
        .upd-card:hover { transform:translateY(-3px) !important; box-shadow:0 14px 40px rgba(91,79,207,0.11) !important; border-color:#C4BEFF !important; }
        .submit-btn:hover { background:#4A3FBF !important; transform:translateY(-2px); box-shadow:0 8px 28px rgba(91,79,207,0.45) !important; }
      `}</style>

      <ContractorSidebar />

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Sticky top bar */}
        <div style={{ background: "#fff", borderBottom: "1px solid #EAECF4", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 10px rgba(91,79,207,0.05)", position: "sticky", top: 0, zIndex: 10, animation: "fadeIn 0.4s ease" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#1A1B3A", letterSpacing: "-0.2px" }}>{project.projectName}</div>
            <div style={{ fontSize: 11, color: "#9095B0" }}>Contractor View · ThumbbyX</div>
          </div>
          <span style={{ fontSize: 11, padding: "5px 14px", borderRadius: 20, fontWeight: 700, background: "#F0EEFF", color: "#5B4FCF", border: "1px solid #C4BEFF", textTransform: "capitalize" }}>{project.status}</span>
        </div>

        <div style={{ padding: "32px 40px" }}>

          {/* Hero banner with ring */}
          <div style={{
            background: "linear-gradient(120deg,#1A1B3A 0%,#2D2B6B 55%,#3D2B8B 100%)",
            borderRadius: 22, padding: "36px 44px", marginBottom: 28,
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32,
            boxShadow: "0 12px 48px rgba(26,27,58,0.22)",
            animation: "fadeUp 0.5s ease forwards", opacity: 0,
            overflow: "hidden", position: "relative",
          }}>
            <div style={{ position: "absolute", right: 220, top: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(123,111,232,0.10)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 60, bottom: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(91,79,207,0.08)", pointerEvents: "none" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 10 }}>Contractor · Post Update</div>
              <h1 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.5px", lineHeight: 1.25 }}>{project.projectName}</h1>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 20px", lineHeight: 1.7, maxWidth: 380 }}>
                "Post accurate updates. Every milestone you mark keeps your customer's trust — and your reputation — strong."
              </p>
              <div style={{ display: "flex", gap: 16 }}>
                {[
                  { label: "Customer",  val: project.customerName },
                  { label: "Phone",     val: project.customerPhone },
                  { label: "Progress",  val: `${pct}%` },
                ].map(item => (
                  <div key={item.label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 16px" }}>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{item.val || "—"}</div>
                  </div>
                ))}
              </div>
            </div>
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
      Project complete! Share your experience working with this customer and using ThumbbyX.
    </p>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      {!projectReview && (
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 14, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 10 }}>
            Rate {project.customerName || "your customer"}
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} onClick={() => setReviewForm({ ...reviewForm, rating: n })}
                style={{ fontSize: 24, cursor: "pointer", color: n <= reviewForm.rating ? "#FFD700" : "rgba(255,255,255,0.3)" }}>★</span>
            ))}
          </div>
          <textarea rows={3} value={reviewForm.review}
            onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
            placeholder="How was your experience working with this customer?"
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
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 24, marginBottom: 28 }}>

            {/* Add update form */}
            <div style={{ background: "#fff", borderRadius: 18, padding: "28px", border: "1px solid #EAECF4", boxShadow: "0 2px 16px rgba(91,79,207,0.06)", animation: "fadeUp 0.5s ease 0.1s forwards", opacity: 0 }}>
              <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6 }}>Post Update</div>
              <h2 style={{ fontSize: 18, fontWeight: 900, color: "#1A1B3A", margin: "0 0 6px", letterSpacing: "-0.3px" }}>Add Progress Update</h2>
              <p style={{ fontSize: 12, color: "#9095B0", margin: "0 0 22px", lineHeight: 1.6 }}>Your update title becomes a completed milestone in the customer's tracker.</p>

              <input type="text" placeholder="Update Title  (e.g. Foundation Complete)" style={iStyle}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

              <textarea placeholder="Description — what was done, observations, materials used..." rows={4}
                style={{ ...iStyle, resize: "vertical" }}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input type="number" placeholder="Progress % (e.g. 45)" style={iStyle}
                  onChange={(e) => setFormData({ ...formData, progressPercentage: e.target.value })} />
                <input type="text" placeholder="Next Task (e.g. Plastering)" style={iStyle}
                  onChange={(e) => setFormData({ ...formData, nextTask: e.target.value })} />
              </div>

              <input type="date" style={iStyle}
                onChange={(e) => setFormData({ ...formData, expectedCompletionDate: e.target.value })} />

              {/* Photo upload */}
             <label style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: isUploading ? "#FEF3E2" : "#F8F9FC", border: `1.5px dashed ${isUploading ? "#FAC775" : formData.photos ? "#1D9E75" : "#C4BEFF"}`, borderRadius: 12, padding: "16px", cursor: isUploading ? "not-allowed" : "pointer", marginBottom: 6, transition: "all 0.2s", opacity: isUploading ? 0.8 : 1 }}>
                <span style={{ fontSize: 20 }}>{isUploading ? "⏳" : formData.photos ? "✅" : "📷"}</span>
                <span style={{ fontSize: 13, color: isUploading ? "#B45309" : formData.photos ? "#0F6E56" : "#6B7280", fontWeight: 500 }}>
                  {isUploading ? "Uploading..." : formData.photos ? "Photo uploaded" : "Upload site photo"}
                </span>
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={uploadImage} disabled={isUploading} />
              </label>
              {formData.photos && (
                <p style={{ fontSize: 11, color: "#0F6E56", fontWeight: 600, marginBottom: 8, paddingLeft: 4 }}>✅ Photo ready to submit</p>
              )}

              {formData.photos && (
                <img src={formData.photos} alt="Preview"
                  style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 12, marginBottom: 14, display: "block" }} />
              )}
<button
                className={isSubmittingUpdate ? "" : "submit-btn"}
                onClick={submitUpdate}
                disabled={isSubmittingUpdate || isUploading}
                style={{
                  width: "100%", background: isSubmittingUpdate ? "#9095B0" : "#5B4FCF", color: "#fff", border: "none",
                  borderRadius: 12, padding: "14px", fontWeight: 800, fontSize: 15,
                  cursor: isSubmittingUpdate || isUploading ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 20px rgba(91,79,207,0.35)", transition: "all 0.22s ease",
                  letterSpacing: "-0.1px", animation: isSubmittingUpdate ? "none" : "pulse 2.5s infinite",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                {isSubmittingUpdate ? (
                  <>
                    <svg style={{ animation: "spin 0.8s linear infinite", width: 16, height: 16 }} viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Submitting...
                  </>
                ) : "Submit Update →"}
              </button>
              {isUploading && (
                <p style={{ fontSize: 11, color: "#B45309", fontWeight: 600, textAlign: "center", marginTop: 8 }}>
                  ⚠️ Please wait — image is still uploading
                </p>
              )}
            </div>

            {/* Project info */}
            <div style={{ background: "#fff", borderRadius: 18, padding: "28px", border: "1px solid #EAECF4", boxShadow: "0 2px 16px rgba(91,79,207,0.06)", animation: "fadeUp 0.5s ease 0.17s forwards", opacity: 0 }}>
              <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 18 }}>Project Info</div>
              {[
                { k: "Customer",        v: project.customerName },
                { k: "Progress",        v: `${pct}%` },
                { k: "Status",          v: project.status },
              ].map(({ k, v }) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 10px", borderBottom: "1px solid #F4F6FB" }}>
                  <span style={{ fontSize: 12, color: "#9095B0", fontWeight: 500 }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1B3A" }}>{v || "—"}</span>
                </div>
              ))}

              {/* Tips */}
              <div style={{ marginTop: 22 }}>
                <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 12 }}>Tips for Great Updates</div>
                <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 12, marginTop: 22 }}>Payment Milestone Guide</div>
{[
  { range: "0–15%",   name: "Booking + Foundation",           tip: "Post at 15% when excavation, footing & plinth are done." },
  { range: "15–45%",  name: "Ground Floor Structure",         tip: "Update as you go — 25% for columns, 45% when RCC & brickwork complete." },
  { range: "45–70%",  name: "First Floor + Roof Slab",        tip: "Post 55–60% when first floor is partial, 70% once slab casting is done." },
  { range: "70–88%",  name: "Plaster, Electrical & Plumbing", tip: "Post 80% for plaster done, 88% when wiring & pipes are complete." },
  { range: "88–100%", name: "Final Finishing + Handover",     tip: "Post 95% for flooring & paint, 100% only at full handover." },
].map((m, i) => (
  <div key={i} style={{ marginBottom: 10, padding: "10px 12px", background: "#F8F9FC", borderRadius: 10, border: "1px solid #EAECF4" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
      <span style={{ fontSize: 11, fontWeight: 800, color: "#5B4FCF", background: "#F0EEFF", padding: "2px 8px", borderRadius: 6, whiteSpace: "nowrap" }}>{m.range}</span>
      <span style={{ fontSize: 12, fontWeight: 700, color: "#1A1B3A" }}>{m.name}</span>
    </div>
    <div style={{ fontSize: 11, color: "#9095B0", lineHeight: 1.6, paddingLeft: 2 }}>💡 {m.tip}</div>
  </div>
))}
                {[
                  { icon: "📸", text: "Add site photos with every update — customers love seeing progress" },
                  { icon: "📋", text: "Keep the Next Task clear so the customer knows what's coming" },
                  { icon: "📅", text: "Update the expected completion date if there are changes" },
                  { icon: "✍️", text: "Descriptive titles build trust — e.g. 'Ground Floor Slab Poured'" },
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, padding: "10px 12px", background: "#F8F9FC", borderRadius: 10 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{t.icon}</span>
                    <span style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Previous updates */}
          <div style={{ animation: "fadeUp 0.5s ease 0.24s forwards", opacity: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 4 }}>History</div>
                <h2 style={{ fontSize: 22, fontWeight: 900, color: "#1A1B3A", margin: 0, letterSpacing: "-0.4px" }}>Previous Updates</h2>
              </div>
              <span style={{ fontSize: 12, color: "#9095B0", background: "#EEF0F7", padding: "5px 14px", borderRadius: 20, fontWeight: 600 }}>
                {updates.length} update{updates.length !== 1 ? "s" : ""}
              </span>
            </div>

            {updates.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: 18, padding: "52px 40px", textAlign: "center", border: "1px dashed #D1D5E8" }}>
                <div style={{ fontSize: 40, marginBottom: 14 }}>📋</div>
                <div style={{ fontWeight: 800, fontSize: 16, color: "#1A1B3A", marginBottom: 6 }}>No updates yet</div>
                <div style={{ fontSize: 13, color: "#9095B0" }}>Post your first update above to get started.</div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
                {updates.map((update, idx) => (
                  <div key={update._id} className="upd-card" style={{
                    background: "#fff", borderRadius: 18, padding: "20px 22px",
                    border: "1px solid #EAECF4", boxShadow: "0 2px 14px rgba(91,79,207,0.06)",
                    transition: "all 0.3s ease", display: "flex", flexDirection: "column",
                    animation: `fadeUp 0.5s ease ${0.28 + idx * 0.06}s forwards`, opacity: 0,
                  }}>
                    {/* Card header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F0EEFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>📌</div>
                      <span style={{ background: "#F0EEFF", color: "#5B4FCF", fontSize: 12, padding: "3px 10px", borderRadius: 20, border: "1px solid #C4BEFF", fontWeight: 800 }}>
                        {update.progressPercentage}%
                      </span>
                    </div>

                    <h3 style={{ fontSize: 14, fontWeight: 900, color: "#1A1B3A", margin: "0 0 4px", letterSpacing: "-0.2px", lineHeight: 1.3 }}>{update.title}</h3>
                    <div style={{ fontSize: 10, color: "#9095B0", marginBottom: 10 }}>{new Date(update.createdAt || Date.now()).toLocaleString()}</div>

                    <p style={{ fontSize: 12, color: "#4A4F6A", lineHeight: 1.7, margin: "0 0 12px", flex: 1 }}>{update.description}</p>

                    {update.photos?.length > 0 && (
                      <img src={update.photos[0]} alt="progress"
                        style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 10, marginBottom: 12, display: "block" }} />
                    )}

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                      <div style={{ background: "#F8F9FC", borderRadius: 10, padding: "8px 10px" }}>
                        <div style={{ fontSize: 9, color: "#9095B0", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 3, fontWeight: 700 }}>Next Task</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#1A1B3A" }}>{update.nextTask || "—"}</div>
                      </div>
                      <div style={{ background: "#F8F9FC", borderRadius: 10, padding: "8px 10px" }}>
                        <div style={{ fontSize: 9, color: "#9095B0", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 3, fontWeight: 700 }}>Completion</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#1A1B3A" }}>
                          {update.expectedCompletionDate ? new Date(update.expectedCompletionDate).toLocaleDateString() : "N/A"}
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: 10, color: "#B0B5C8", paddingTop: 10, borderTop: "1px solid #EEF0F7" }}>
                      Posted · {new Date(update.createdAt || Date.now()).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
