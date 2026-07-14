import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ContractorSidebar from "./contractor/ContractorSidebar";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  Target,
  Star,
  FileText,
  Wallet,
  BarChart3,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { API_BASE_URL } from "../services/api";

export default function ContractorDashboard() {
  const [profile, setProfile] = useState(null);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(API_BASE_URL + "/contractor/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.profile);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(API_BASE_URL + "/reviews/contractor/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviewCount(res.data.reviews?.length || 0);
      } catch (error) {
        console.log(error);
      }
    };
    loadReviews();
  }, []);

  if (!profile) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "#F4F6FB", fontFamily: "'Inter', sans-serif" }}>
        <ContractorSidebar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 44, height: 44, border: "3px solid #5B4FCF", borderTopColor: "transparent", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
            <div style={{ fontSize: 14, color: "#9095B0", fontWeight: 500 }}>Loading your dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  const verStatus = profile?.verificationStatus || "pending";
  const verStatusLower = verStatus.toLowerCase();
  const isApproved = verStatusLower === "approved" || verStatusLower === "verified";
  const isRejected = verStatusLower === "rejected";
  const verColor = isApproved
    ? { text: "#0F6E56", bg: "#E6F7F2", border: "#9FE1CB" }
    : isRejected
    ? { text: "#B91C1C", bg: "#FEE2E2", border: "#FCA5A5" }
    : { text: "#B45309", bg: "#FEF3E2", border: "#FAC775" };

  const VerIcon = isApproved ? CheckCircle2 : isRejected ? XCircle : Clock;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F4F6FB", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px);} to{opacity:1;transform:translateY(0);} }
        @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
        .hov-card:hover { transform:translateY(-2px) !important; box-shadow:0 10px 28px rgba(91,79,207,0.10) !important; border-color:#C4BEFF !important; }
        .hov-btn:hover { background:#4A3FBF !important; transform:translateY(-1px); }
        .qa-card { text-decoration: none; color: inherit; display: block; }
        .qa-card:hover .qa-arrow { opacity: 1 !important; transform: translate(2px,-2px); }
      `}</style>

      <ContractorSidebar />

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Top bar */}
        <div style={{ background: "#fff", borderBottom: "1px solid #EAECF4", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 10px rgba(91,79,207,0.05)", animation: "fadeIn 0.4s ease" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#1A1B3A", letterSpacing: "-0.3px" }}>Welcome back, {profile?.userId?.fullName || "Contractor"}</div>
            <div style={{ fontSize: 12, color: "#9095B0" }}>Here's your contractor overview for today</div>
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, padding: "5px 14px", borderRadius: 20, fontWeight: 700, color: verColor.text, background: verColor.bg, border: `1px solid ${verColor.border}`, textTransform: "capitalize" }}>
            <VerIcon size={13} strokeWidth={2.4} />
            {isApproved ? "Verified" : isRejected ? "Rejected" : verStatus}
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
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8 }}>Contractor Command Centre</div>
              <h1 style={{ fontSize: 21, fontWeight: 800, color: "#fff", margin: "0 0 6px", letterSpacing: "-0.3px", lineHeight: 1.25 }}>
                Build better, <span style={{ color: "#A78BFA" }}>track smarter</span>
              </h1>
              <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)", margin: "0 0 18px", maxWidth: 380, lineHeight: 1.65 }}>
                Manage your projects, update progress, and keep customers informed — all from one place.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <Link to="/contractor/my-projects" className="hov-btn" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "#5B4FCF", color: "#fff", textDecoration: "none",
                  padding: "9px 18px", borderRadius: 10, fontWeight: 700, fontSize: 12.5,
                  boxShadow: "0 4px 16px rgba(91,79,207,0.35)", transition: "all 0.2s ease",
                }}>
                  My Projects <ArrowRight size={13} />
                </Link>
                <Link to="/contractor/my-leads" className="hov-btn" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "rgba(255,255,255,0.08)", color: "#fff", textDecoration: "none",
                  padding: "9px 18px", borderRadius: 10, fontWeight: 700, fontSize: 12.5,
                  border: "1px solid rgba(255,255,255,0.16)", transition: "all 0.2s ease",
                }}>
                  View Leads <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            <div style={{
              flexShrink: 0, position: "relative", zIndex: 1, width: 60, height: 60,
              borderRadius: 14, background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Building2 size={28} color="#A78BFA" strokeWidth={1.8} />
            </div>
          </div>

          {/* Profile + Verification row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>

            {/* Welcome card */}
            <div className="hov-card" style={{ background: "#fff", borderRadius: 14, padding: "20px", border: "1px solid #EAECF4", boxShadow: "0 1px 8px rgba(91,79,207,0.05)", transition: "all 0.22s ease", animation: "fadeUp 0.5s ease 0.08s forwards", opacity: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#5B4FCF,#7B6FE8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 800, flexShrink: 0 }}>
                  {(profile?.userId?.fullName || "C")[0].toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#1A1B3A", letterSpacing: "-0.2px" }}>{profile?.userId?.fullName || "Contractor"}</div>
                  <div style={{ fontSize: 11.5, color: "#9095B0", marginTop: 2 }}>Contractor · ThumbbyX Partner</div>
                </div>
              </div>
              <div style={{ background: "#F8F9FC", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                <VerIcon size={15} color={verColor.text} strokeWidth={2.4} />
                <div>
                  <div style={{ fontSize: 10.5, color: "#9095B0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 2 }}>Account Status</div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: verColor.text }}>
                    {isApproved ? "Fully verified & active" : isRejected ? "Verification rejected" : "Verification pending"}
                  </div>
                </div>
              </div>
            </div>

            {/* Verification status card */}
            <div className="hov-card" style={{ background: "#fff", borderRadius: 14, padding: "20px", border: "1px solid #EAECF4", boxShadow: "0 1px 8px rgba(91,79,207,0.05)", transition: "all 0.22s ease", animation: "fadeUp 0.5s ease 0.12s forwards", opacity: 0 }}>
              <div style={{ fontSize: 10.5, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 12 }}>Verification Status</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: verColor.bg, border: `1px solid ${verColor.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <VerIcon size={18} color={verColor.text} strokeWidth={2.2} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: verColor.text, textTransform: "capitalize", letterSpacing: "-0.2px" }}>{profile?.verificationStatus}</div>
                  <div style={{ fontSize: 11.5, color: "#9095B0", marginTop: 2 }}>
                    {isApproved ? "You can receive and manage projects" : isRejected ? "Please contact support" : "Your documents are under review"}
                  </div>
                </div>
              </div>
              <div style={{ background: "#F8F9FC", borderRadius: 10, padding: "10px 14px", fontSize: 11.5, color: "#6B7280", lineHeight: 1.6 }}>
                {isApproved
                  ? "Your profile is active and visible to customers."
                  : isRejected
                  ? "Please re-submit your documents or reach out to our support team."
                  : "Verification usually takes 1–2 business days. We'll notify you once done."}
              </div>
            </div>
          </div>

          {/* Profile completion */}
        
         {(() => {
const checks = {
  "Basic Info":   !!(profile?.experienceYears > 0 && profile?.completedHouses > 0 && profile?.largestProjectSqFt > 0),
  "Documents":    !!(profile?.verification?.aadhaarDocument?.url && profile?.verification?.panDocument?.url && profile?.verification?.gstDocument?.url),
  "Banking":      !!(profile?.banking?.accountHolderName && profile?.banking?.accountNumber && profile?.banking?.ifscCode),
  "Verification": profile?.verificationStatus === "approved",
};
  const completed = Object.values(checks).filter(Boolean).length;
  const pct = Math.round((completed / 4) * 100);
  const allDone = pct === 100;

  return (
    <div className="hov-card" style={{ background: "#fff", borderRadius: 14, padding: "20px", border: "1px solid #EAECF4", boxShadow: "0 1px 8px rgba(91,79,207,0.05)", transition: "all 0.22s ease", marginBottom: 18, animation: "fadeUp 0.5s ease 0.16s forwards", opacity: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 10.5, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 4 }}>Profile Completion</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#1A1B3A", letterSpacing: "-0.2px" }}>
            {allDone ? "Your profile is fully set up" : `${completed} of 4 sections completed`}
          </div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: allDone ? "#0F6E56" : "#5B4FCF", letterSpacing: "-0.8px" }}>{pct}%</div>
      </div>
      <div style={{ background: "#EEF0F7", borderRadius: 10, height: 8, overflow: "hidden", marginBottom: 8 }}>
        <div style={{ height: 8, width: `${pct}%`, borderRadius: 10, background: allDone ? "linear-gradient(90deg,#1D9E75,#34D399)" : "linear-gradient(90deg,#5B4FCF,#7B6FE8)", transition: "width 1.2s ease" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 12 }}>
        {Object.entries(checks).map(([label, done]) => (
          <div key={label} style={{ background: done ? "#E6F7F2" : "#F4F6FB", borderRadius: 8, padding: "6px 10px", fontSize: 11, color: done ? "#0F6E56" : "#9095B0", fontWeight: 700, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, border: `1px solid ${done ? "#9FE1CB" : "#EAECF4"}` }}>
            <CheckCircle2 size={12} strokeWidth={2.5} />
            {label}
          </div>
        ))}
      </div>
      {!allDone && (
        <div style={{ marginTop: 12, fontSize: 12, color: "#9095B0" }}>
          {!checks["Basic Info"] && "→ Complete your basic info. "}
          {!checks["Documents"] && "→ Upload Aadhaar & PAN. "}
          {!checks["Skills"] && "→ Add completed projects. "}
          {!checks["Verification"] && checks["Documents"] && "→ Awaiting admin verification. "}
        </div>
      )}
    </div>
  );
})()}

          {/* Feature cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22, animation: "fadeUp 0.5s ease 0.2s forwards", opacity: 0 }}>
            {[
              { icon: Building2, label: "Active Projects", desc: "Post updates, track milestones, keep clients informed", color: "#5B4FCF", bg: "#F0EEFF", border: "#D9D4FD", to: "/contractor/my-projects" },
              { icon: Target,    label: "My Leads",         desc: "New customer enquiries matched to your skills", color: "#0F6E56", bg: "#E6F7F2", border: "#9FE1CB", to: "/contractor/my-leads" },
              { icon: Star,      label: "Reputation",       desc: "Build trust with verified reviews and quality work", color: "#B45309", bg: "#FEF3E2", border: "#FAC775" },
              { icon: FileText,  label: "Received Reviews",  desc:  "See the reviews", color: "#1D4ED8", bg: "#EFF6FF", border: "#BFDBFE", to: "/reviews"  },
            ].map((f) => {
              const Icon = f.icon;
              const content = (
                <>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ width: 40, height: 40, background: f.bg, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={19} color={f.color} strokeWidth={2} />
                    </div>
                    {f.to && (
                      <ArrowUpRight size={15} color="#9095B0" className="qa-arrow" style={{ opacity: 0, transition: "all 0.2s ease" }} />
                    )}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 13.5, color: "#1A1B3A", marginBottom: 4 }}>{f.label}</div>
                  <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>{f.desc}</div>
                </>
              );

              const cardStyle = {
                background: "#fff", borderRadius: 14, padding: "18px",
                border: `1px solid ${f.border}`, boxShadow: "0 1px 8px rgba(91,79,207,0.05)",
                transition: "all 0.22s ease",
              };

              return f.to ? (
                <Link key={f.label} to={f.to} className="qa-card hov-card" style={cardStyle}>
                  {content}
                </Link>
              ) : (
                <div key={f.label} className="hov-card" style={cardStyle}>
                  {content}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}