import AdminLayout from "../../components/admin/AdminLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { API_BASE_URL } from "../../services/api";

const TABS = [
  { key: "pending",  label: "Pending",  status: "under_review", color: "#B45309", bg: "#FEF3E2", border: "#FAC775", icon: <Clock size={18} color="#B45309" />,      iconSm: <Clock size={13} color="#B45309" /> },
  { key: "approved", label: "Approved", status: "approved",     color: "#0F6E56", bg: "#E6F7F2", border: "#9FE1CB", icon: <CheckCircle size={18} color="#0F6E56" />, iconSm: <CheckCircle size={13} color="#0F6E56" /> },
  { key: "rejected", label: "Rejected", status: "rejected",     color: "#B91C1C", bg: "#FEE2E2", border: "#FCA5A5", icon: <XCircle size={18} color="#B91C1C" />,    iconSm: <XCircle size={13} color="#B91C1C" /> },
];

export default function ContractorsPage() {
  const navigate = useNavigate();
  const [contractors, setContractors] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    const fetchContractors = async () => {
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
    fetchContractors();
  }, []);

  const filteredContractors = contractors.filter((contractor) => {
    if (activeTab === "pending")  return contractor.verificationStatus === "under_review";
    if (activeTab === "approved") return contractor.verificationStatus === "approved";
    return contractor.verificationStatus === "rejected";
  });

  const activeTabData = TABS.find(t => t.key === activeTab);

  return (
    <AdminLayout>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
        .con-card:hover { transform:translateY(-4px) !important; box-shadow:0 16px 44px rgba(91,79,207,0.12) !important; border-color:#C4BEFF !important; }
        .tab-btn:hover { background: #F0EEFF !important; color: #5B4FCF !important; }
        .view-btn:hover { background:#4A3FBF !important; transform:translateX(2px); }
      `}</style>

      {/* Page heading */}
      <div style={{ marginBottom: 24, animation: "fadeUp 0.4s ease forwards", opacity: 0 }}>
        <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 6 }}>Verification</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#1A1B3A", margin: "0 0 6px", letterSpacing: "-0.6px" }}>Contractors</h1>
        <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>Review, verify and manage all contractor applications.</p>
      </div>

      {/* Count cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24, animation: "fadeUp 0.4s ease 0.06s forwards", opacity: 0 }}>
        {TABS.map(t => (
          <div
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            style={{
              background: activeTab === t.key ? t.bg : "#fff",
              borderRadius: 14, padding: "16px 20px",
              border: `1px solid ${activeTab === t.key ? t.border : "#EAECF4"}`,
              display: "flex", alignItems: "center", gap: 14,
              boxShadow: "0 2px 10px rgba(91,79,207,0.05)",
              cursor: "pointer", transition: "all 0.22s ease",
            }}
          >
            <div style={{ width: 42, height: 42, background: t.bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${t.border}` }}>{t.icon}</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: t.color, letterSpacing: "-0.8px" }}>
                {contractors.filter(c => c.verificationStatus === t.status).length}
              </div>
              <div style={{ fontSize: 11, color: "#9095B0", fontWeight: 600 }}>{t.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 22, animation: "fadeUp 0.4s ease 0.10s forwards", opacity: 0 }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} className="tab-btn" style={{
            padding: "9px 20px", borderRadius: 10, border: "1px solid #EAECF4",
            fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.18s ease",
            background: activeTab === t.key ? activeTabData.bg : "#fff",
            color: activeTab === t.key ? activeTabData.color : "#6B7280",
            borderColor: activeTab === t.key ? activeTabData.border : "#EAECF4",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            {t.iconSm} {t.label}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 12, color: "#9095B0", background: "#EEF0F7", padding: "8px 16px", borderRadius: 10, fontWeight: 600, alignSelf: "center" }}>
          {filteredContractors.length} contractor{filteredContractors.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Contractor cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
        {filteredContractors.map((contractor, i) => (
          <div key={contractor._id} className="con-card" style={{
            background: "#fff", borderRadius: 18, padding: "22px 24px",
            border: "1px solid #EAECF4", boxShadow: "0 2px 14px rgba(91,79,207,0.06)",
            transition: "all 0.28s ease",
            animation: `fadeUp 0.5s ease ${i * 0.07 + 0.14}s forwards`, opacity: 0,
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 46, height: 46, borderRadius: "50%",
                  background: "linear-gradient(135deg,#5B4FCF,#7B6FE8)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 17, fontWeight: 900, flexShrink: 0,
                }}>
                  {(contractor.userId?.fullName || "C")[0].toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#1A1B3A", letterSpacing: "-0.2px" }}>{contractor.userId?.fullName}</div>
                  <div style={{ fontSize: 12, color: "#9095B0", marginTop: 2 }}>{contractor.userId?.email}</div>
                </div>
              </div>
              <span style={{
                fontSize: 11, padding: "4px 12px", borderRadius: 20, fontWeight: 700, flexShrink: 0,
                color: activeTabData.color, background: activeTabData.bg, border: `1px solid ${activeTabData.border}`,
                display: "inline-flex", alignItems: "center", gap: 5,
              }}>
                {activeTabData.iconSm} {activeTab}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
              <div style={{ background: "#F8F9FC", borderRadius: 10, padding: "9px 12px" }}>
                <div style={{ fontSize: 10, color: "#9095B0", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 3, fontWeight: 700 }}>City</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1B3A" }}>{contractor.city || "—"}</div>
              </div>
              <div style={{ background: "#F8F9FC", borderRadius: 10, padding: "9px 12px" }}>
                <div style={{ fontSize: 10, color: "#9095B0", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 3, fontWeight: 700 }}>State</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1B3A" }}>{contractor.state || "—"}</div>
              </div>
            </div>

            <button
              onClick={() => navigate(`/admin/contractors/${contractor._id}`)}
              className="view-btn"
              style={{
                width: "100%", background: "#5B4FCF", color: "#fff", border: "none",
                borderRadius: 10, padding: "10px", fontWeight: 700, fontSize: 13, cursor: "pointer",
                boxShadow: "0 3px 14px rgba(91,79,207,0.28)", transition: "all 0.2s ease",
              }}
            >
              View Details →
            </button>
          </div>
        ))}

        {filteredContractors.length === 0 && (
          <div style={{ gridColumn: "1/-1", background: "#fff", borderRadius: 18, padding: "56px 40px", textAlign: "center", border: "1px dashed #D1D5E8" }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#1A1B3A", marginBottom: 6 }}>No {activeTab} contractors</div>
            <div style={{ fontSize: 13, color: "#9095B0" }}>Contractor applications will appear here once submitted.</div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}