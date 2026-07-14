import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ContractorSidebar from "./ContractorSidebar";
import { API_BASE_URL } from "../../services/api";

export default function MyLeadsPage() {
  const [leads, setLeads] = useState([]);

  // Refs for scroll-to behaviour
  const allRef      = useRef(null);
  const newRef      = useRef(null);
  const contactedRef = useRef(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(API_BASE_URL + "/contractor/my-leads", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLeads(res.data.leads);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLeads();
  }, []);

  // Track whether we've assigned each ref yet while rendering
  let newRefAssigned       = false;
  let contactedRefAssigned = false;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F4F6FB", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px);} to{opacity:1;transform:translateY(0);} }
        @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
        .lead-card:hover { transform:translateY(-4px) !important; box-shadow:0 18px 48px rgba(91,79,207,0.13) !important; border-color:#C4BEFF !important; }
        .stat-pill:hover { transform:translateY(-2px) !important; box-shadow:0 6px 20px rgba(91,79,207,0.13) !important; border-color:#C4BEFF !important; }
      `}</style>

      <ContractorSidebar />

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Top bar */}
        <div style={{ background: "#fff", borderBottom: "1px solid #EAECF4", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 10px rgba(91,79,207,0.05)", animation: "fadeIn 0.4s ease" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#1A1B3A", letterSpacing: "-0.3px" }}>My Leads</div>
            <div style={{ fontSize: 12, color: "#9095B0" }}>Customer enquiries matched to your profile</div>
          </div>
          <span style={{ fontSize: 12, background: "#F0EEFF", color: "#5B4FCF", border: "1px solid #C4BEFF", padding: "5px 16px", borderRadius: 20, fontWeight: 700 }}>
            {leads.length} Lead{leads.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div style={{ padding: "36px 40px" }}>

          {/* Heading */}
          <div style={{ animation: "fadeUp 0.5s ease forwards", opacity: 0, marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 6 }}>Opportunities</div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "#1A1B3A", margin: "0 0 8px", letterSpacing: "-0.5px" }}>My Leads</h1>
            <p style={{ fontSize: 13, color: "#6B7280", margin: 0, lineHeight: 1.7 }}>
              "Every lead is a family trusting you to build their dream. Make it count."
            </p>
          </div>

          {/* Clickable stat cards */}
          {leads.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, margin: "24px 0", animation: "fadeUp 0.5s ease 0.07s forwards", opacity: 0 }}>
              {[
                {
                  label: "Total Leads",
                  val: leads.length,
                  icon: "🎯",
                  color: "#5B4FCF",
                  bg: "#F0EEFF",
                  onClick: () => allRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
                },
                {
                  label: "New",
                  val: leads.filter(l => l.status === "new").length,
                  icon: "🔔",
                  color: "#0F6E56",
                  bg: "#E6F7F2",
                  onClick: () => newRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
                },
                {
                  label: "Contacted",
                  val: leads.filter(l => l.status !== "new").length,
                  icon: "📞",
                  color: "#B45309",
                  bg: "#FEF3E2",
                  onClick: () => contactedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
                },
              ].map(s => (
                <div
                  key={s.label}
                  className="stat-pill"
                  onClick={s.onClick}
                  style={{
                    background: "#fff", borderRadius: 16, padding: "18px 20px",
                    border: "1px solid #EAECF4", display: "flex", alignItems: "center", gap: 14,
                    boxShadow: "0 2px 10px rgba(91,79,207,0.05)",
                    cursor: "pointer", transition: "all 0.22s ease",
                    userSelect: "none",
                  }}
                >
                  <div style={{ width: 44, height: 44, background: s.bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: s.color, letterSpacing: "-0.8px" }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: "#9095B0", fontWeight: 600 }}>{s.label}</div>
                  </div>
                  <div style={{ marginLeft: "auto", fontSize: 14, color: "#C4BEFF" }}>↓</div>
                </div>
              ))}
            </div>
          )}

          {/* Lead cards */}
          <div ref={allRef} style={{ display: "grid", gap: 18 }}>
            {leads.map((lead, i) => {
              const isNew       = lead.status === "new";
              const isContacted = lead.status !== "new";

              // Assign scroll ref to first card of each group
              let cardRef = null;
              if (isNew && !newRefAssigned) {
                cardRef = newRef;
                newRefAssigned = true;
              } else if (isContacted && !contactedRefAssigned) {
                cardRef = contactedRef;
                contactedRefAssigned = true;
              }

              const sc = lead.status === "new"
                ? { text: "#0F6E56", bg: "#E6F7F2", border: "#9FE1CB" }
                : lead.status === "contacted"
                ? { text: "#5B4FCF", bg: "#F0EEFF", border: "#C4BEFF" }
                : { text: "#B45309", bg: "#FEF3E2", border: "#FAC775" };

              return (
                <div
                  key={lead._id}
                  ref={cardRef}
                  className="lead-card"
                  style={{
                    background: "#fff", borderRadius: 20, padding: "26px 28px",
                    border: "1px solid #EAECF4", boxShadow: "0 2px 16px rgba(91,79,207,0.07)",
                    transition: "all 0.3s ease",
                    animation: `fadeUp 0.5s ease ${i * 0.08 + 0.14}s forwards`, opacity: 0,
                  }}
                >
                  {/* Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                      <div style={{ width: 46, height: 46, borderRadius: "50%", background: "linear-gradient(135deg,#5B4FCF,#7B6FE8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 17, fontWeight: 900, flexShrink: 0 }}>
                        {(lead.customerName || "?")[0].toUpperCase()}
                      </div>
                      <div>
                        <h2 style={{ fontSize: 17, fontWeight: 900, color: "#1A1B3A", margin: "0 0 3px", letterSpacing: "-0.3px" }}>{lead.customerName}</h2>
                        <div style={{ fontSize: 12, color: "#9095B0" }}>📍 {lead.city}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 11, padding: "5px 13px", borderRadius: 20, fontWeight: 700, color: sc.text, background: sc.bg, border: `1px solid ${sc.border}`, textTransform: "capitalize", flexShrink: 0 }}>
                      {lead.status}
                    </span>
                  </div>

                  {/* Info grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
                    {[
                      { icon: "🏠", label: "Project Type", val: lead.projectType },
                      { icon: "💰", label: "Budget",       val: lead.budget },
                      { icon: "📐", label: "Plot Area",    val: lead.plotArea },
                    ].map(item => (
                      <div key={item.label} style={{ background: "#F8F9FC", borderRadius: 12, padding: "12px 14px" }}>
                        <div style={{ fontSize: 16, marginBottom: 5 }}>{item.icon}</div>
                        <div style={{ fontSize: 10, color: "#9095B0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{item.label}</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1B3A" }}>{item.val || "—"}</div>
                      </div>
                    ))}
                  </div>

                  {/* Message */}
                  {lead.message && (
                    <div style={{ background: "#F0EEFF", borderLeft: "3px solid #5B4FCF", borderRadius: "0 10px 10px 0", padding: "11px 14px", fontSize: 13, color: "#4A4F6A", lineHeight: 1.7, fontStyle: "italic" }}>
                      "{lead.message}"
                    </div>
                  )}
                </div>
              );
            })}

            {leads.length === 0 && (
              <div style={{ background: "#fff", borderRadius: 20, padding: "64px 40px", textAlign: "center", border: "1px dashed #D1D5E8", animation: "fadeUp 0.5s ease 0.15s forwards", opacity: 0 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎯</div>
                <div style={{ fontWeight: 800, fontSize: 17, color: "#1A1B3A", marginBottom: 8 }}>No leads yet</div>
                <div style={{ fontSize: 13, color: "#9095B0", lineHeight: 1.6 }}>New customer enquiries will appear here.<br />Complete your profile to get matched.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
