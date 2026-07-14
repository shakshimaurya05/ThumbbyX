import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AdminLayout from "../../components/admin/AdminLayout";
import { CheckCircle, XCircle, Clock, CreditCard, FileText, Receipt, Factory, Shield, CheckCheck, X, Info, IdCard } from "lucide-react";
import { API_BASE_URL } from "../../services/api";

export default function ContractorDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contractor, setContractor] = useState(null);

  useEffect(() => {
    const fetchContractor = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_BASE_URL}/admin/contractors/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContractor(res.data.contractor);
      } catch (error) {
        console.log(error);
      }
    };
    fetchContractor();
  }, [id]);

  const handleApprove = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(`${API_BASE_URL}/admin/approve-contractor/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Contractor Approved");
      navigate("/admin/contractors");
    } catch (error) {
      console.log(error);
      toast.error("Failed to approve");
    }
  };

  const handleReject = async () => {
    try {
      const reason = prompt("Reason for rejection?");
      const token = localStorage.getItem("accessToken");
      await axios.patch(`${API_BASE_URL}/admin/reject-contractor/${id}`, { reason }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Contractor Rejected");
      navigate("/admin/contractors");
    } catch (error) {
      console.log(error);
      toast.error("Failed to reject");
    }
  };

  if (!contractor) {
    return (
      <AdminLayout>
        <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
        <div style={{ display: "flex", minHeight: "60vh", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 44, height: 44, border: "3px solid #5B4FCF", borderTopColor: "transparent", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
            <div style={{ fontSize: 14, color: "#9095B0", fontWeight: 500 }}>Loading contractor details...</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const verStatus = contractor.verificationStatus || "under_review";
  const verStatusLower = verStatus.toLowerCase();
  const isApproved = verStatusLower === "approved" || verStatusLower === "verified";
  const isRejected = verStatusLower === "rejected";
  const sc = isApproved
    ? { text: "#0F6E56", bg: "#E6F7F2", border: "#9FE1CB", icon: <CheckCircle size={13} />, label: "Approved" }
    : isRejected
    ? { text: "#B91C1C", bg: "#FEE2E2", border: "#FCA5A5", icon: <XCircle size={13} />, label: "Rejected" }
    : { text: "#B45309", bg: "#FEF3E2", border: "#FAC775", icon: <Clock size={13} />, label: "Under Review" };

  const docs = [
    { label: "Aadhaar",             url: contractor.verification?.aadhaarDocument?.url,            icon: <IdCard size={18} color="#5B4FCF" /> },
    { label: "PAN",                 url: contractor.verification?.panDocument?.url,                icon: <FileText size={18} color="#5B4FCF" /> },
    { label: "GST",                 url: contractor.verification?.gstDocument?.url,                icon: <Receipt size={18} color="#5B4FCF" /> },
    { label: "Udyam",               url: contractor.verification?.udyamDocument?.url,              icon: <Factory size={18} color="#5B4FCF" /> },
    { label: "Police Verification", url: contractor.verification?.policeVerificationDocument?.url, icon: <Shield size={18} color="#5B4FCF" /> },
  ];

  return (
    <AdminLayout>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
        @keyframes float  { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }
        .info-row:hover { background:#F0EEFF !important; border-radius:8px; }
        .doc-row:hover  { border-color:#C4BEFF !important; background:#F8F7FF !important; }
        .approve-btn:hover { background:#0A5240 !important; transform:translateY(-1px); box-shadow:0 8px 24px rgba(15,110,86,0.4) !important; }
        .reject-btn:hover  { background:#991B1B !important; transform:translateY(-1px); box-shadow:0 8px 24px rgba(185,28,28,0.4) !important; }
      `}</style>

      {/* Page heading */}
      <div style={{ marginBottom: 24, animation: "fadeUp 0.4s ease forwards", opacity: 0 }}>
        <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 6 }}>Verification</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#1A1B3A", margin: "0 0 6px", letterSpacing: "-0.6px" }}>Contractor Details</h1>
        <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>Review profile, documents and take verification action.</p>
      </div>

      {/* Hero banner */}
      <div style={{
        background: "linear-gradient(120deg,#1A1B3A 0%,#2D2B6B 55%,#3D2B8B 100%)",
        borderRadius: 20, padding: "32px 40px", marginBottom: 24,
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
        boxShadow: "0 12px 48px rgba(26,27,58,0.20)",
        animation: "fadeUp 0.5s ease 0.05s forwards", opacity: 0,
        overflow: "hidden", position: "relative",
      }}>
        <div style={{ position: "absolute", right: 160, top: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(123,111,232,0.10)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 40, bottom: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(91,79,207,0.08)", pointerEvents: "none" }} />

        {/* Avatar + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "linear-gradient(135deg,#5B4FCF,#7B6FE8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 28, fontWeight: 900, flexShrink: 0,
            boxShadow: "0 4px 18px rgba(91,79,207,0.4)",
            animation: "float 3s ease-in-out infinite",
          }}>
            {(contractor.userId?.fullName || "C")[0].toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", marginBottom: 4 }}>
              {contractor.userId?.fullName}
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>
              {contractor.userId?.email}
            </div>
            <span style={{
              fontSize: 12, padding: "5px 14px", borderRadius: 20, fontWeight: 700,
              color: sc.text, background: sc.bg, border: `1px solid ${sc.border}`,
              display: "inline-flex", alignItems: "center", gap: 5,
            }}>
              {sc.icon} {sc.label}
            </span>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: "flex", gap: 14, flexShrink: 0 }}>
          {[
            { label: "Experience",      val: `${contractor.experienceYears || "—"} yrs` },
            { label: "Houses Built",    val: contractor.completedHouses || "—" },
            { label: "Largest Project", val: contractor.largestProjectSqFt ? `${contractor.largestProjectSqFt} sqft` : "—" },
          ].map(s => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 18px", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>{s.val}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 3, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3-col info grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginBottom: 22 }}>

        {/* Personal info */}
        <div style={{ background: "#fff", borderRadius: 18, padding: "22px 24px", border: "1px solid #EAECF4", boxShadow: "0 2px 14px rgba(91,79,207,0.06)", animation: "fadeUp 0.5s ease 0.10s forwards", opacity: 0 }}>
          <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 16 }}>Personal Info</div>
          {[
            { k: "Full Name", v: contractor.userId?.fullName },
            { k: "Email",     v: contractor.userId?.email },
            { k: "Phone",     v: contractor.userId?.phone },
            { k: "City",      v: contractor.city },
            { k: "State",     v: contractor.state },
          ].map(({ k, v }) => (
            <div key={k} className="info-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 8px", borderBottom: "1px solid #F4F6FB", transition: "background 0.18s", cursor: "default" }}>
              <span style={{ fontSize: 12, color: "#9095B0", fontWeight: 500 }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1B3A", textAlign: "right", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v || "—"}</span>
            </div>
          ))}
        </div>

        {/* Experience */}
        <div style={{ background: "#fff", borderRadius: 18, padding: "22px 24px", border: "1px solid #EAECF4", boxShadow: "0 2px 14px rgba(91,79,207,0.06)", animation: "fadeUp 0.5s ease 0.16s forwards", opacity: 0 }}>
          <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 16 }}>Experience</div>
          {[
            { k: "Years of Experience", v: contractor.experienceYears ? `${contractor.experienceYears} years` : "—" },
            { k: "Houses Completed",    v: contractor.completedHouses || "—" },
            { k: "Largest Project",     v: contractor.largestProjectSqFt ? `${contractor.largestProjectSqFt} sq ft` : "—" },
          ].map(({ k, v }) => (
            <div key={k} className="info-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 8px", borderBottom: "1px solid #F4F6FB", transition: "background 0.18s", cursor: "default" }}>
              <span style={{ fontSize: 12, color: "#9095B0", fontWeight: 500 }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1B3A" }}>{v}</span>
            </div>
          ))}

          <div style={{ marginTop: 18 }}>
            <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 14 }}>Banking</div>
            {[
              { k: "Account Holder", v: contractor.banking?.accountHolderName },
              { k: "Account No.",    v: contractor.banking?.accountNumber },
              { k: "IFSC Code",      v: contractor.banking?.ifscCode },
            ].map(({ k, v }) => (
              <div key={k} className="info-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 8px", borderBottom: "1px solid #F4F6FB", transition: "background 0.18s", cursor: "default" }}>
                <span style={{ fontSize: 12, color: "#9095B0", fontWeight: 500 }}>{k}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1B3A" }}>{v || "—"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div style={{ background: "#fff", borderRadius: 18, padding: "22px 24px", border: "1px solid #EAECF4", boxShadow: "0 2px 14px rgba(91,79,207,0.06)", animation: "fadeUp 0.5s ease 0.22s forwards", opacity: 0 }}>
          <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 16 }}>Documents</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {docs.map((doc) => (
              <div key={doc.label} className="doc-row" style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px", borderRadius: 10, border: "1px solid #EAECF4",
                background: "#F8F9FC", transition: "all 0.18s ease",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {doc.icon}
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1B3A" }}>{doc.label}</span>
                </div>
                {doc.url ? (
                  <a href={doc.url} target="_blank" rel="noreferrer" style={{
                    fontSize: 12, fontWeight: 700, color: "#5B4FCF",
                    textDecoration: "none", background: "#F0EEFF",
                    border: "1px solid #C4BEFF", padding: "4px 12px", borderRadius: 20,
                    transition: "all 0.15s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#5B4FCF"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#F0EEFF"; e.currentTarget.style.color = "#5B4FCF"; }}
                  >
                    View ↗
                  </a>
                ) : (
                  <span style={{ fontSize: 11, color: "#B0B5C8", fontWeight: 600, background: "#F4F6FB", padding: "4px 10px", borderRadius: 20 }}>Not Uploaded</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 14, animation: "fadeUp 0.5s ease 0.28s forwards", opacity: 0 }}>
        <button
          onClick={handleApprove}
          className="approve-btn"
          style={{
            background: "#0F6E56", color: "#fff", border: "none",
            borderRadius: 12, padding: "14px 32px", fontWeight: 800, fontSize: 15, cursor: "pointer",
            boxShadow: "0 4px 18px rgba(15,110,86,0.30)", transition: "all 0.22s ease",
            display: "flex", alignItems: "center", gap: 8,
          }}
        >
          <CheckCheck size={16} /> Approve Contractor
        </button>
        <button
          onClick={handleReject}
          className="reject-btn"
          style={{
            background: "#B91C1C", color: "#fff", border: "none",
            borderRadius: 12, padding: "14px 32px", fontWeight: 800, fontSize: 15, cursor: "pointer",
            boxShadow: "0 4px 18px rgba(185,28,28,0.28)", transition: "all 0.22s ease",
            display: "flex", alignItems: "center", gap: 8,
          }}
        >
          <X size={16} /> Reject Contractor
        </button>
        <div style={{ marginLeft: "auto", background: "#F8F9FC", border: "1px solid #EAECF4", borderRadius: 12, padding: "14px 20px", fontSize: 13, color: "#6B7280", display: "flex", alignItems: "center", gap: 8 }}>
          <Info size={16} color="#9095B0" />
          Contractor will be notified via email upon action.
        </div>
      </div>
    </AdminLayout>
  );
}