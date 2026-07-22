import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminLayout from "../../components/admin/AdminLayout";
import { API_BASE_URL } from "../../services/api";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [selectedContractor, setSelectedContractor] = useState({});
  const [contractors, setContractors] = useState([]);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [convertLeadId, setConvertLeadId] = useState(null);
  const [convertData, setConvertData] = useState({
    projectName: "", budget: "", contractorId: "", expectedDuration: "", startDate: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const leadsRes = await axios.get(API_BASE_URL + "/admin/leads", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLeads(leadsRes.data.leads);
        const contractorRes = await axios.get(API_BASE_URL + "/contractor/public");
        setContractors(contractorRes.data.contractors);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const assignContractor = async (leadId, contractorId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        `${API_BASE_URL}/admin/assign-contractor/${leadId}`,
        { contractorId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Contractor Assigned");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const convertToProject = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        `${API_BASE_URL}/admin/convert-lead/${convertLeadId}`,
        convertData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Project created successfully");
      setShowConvertModal(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const iStyle = {
    width: "100%", background: "#F8F9FC", border: "1px solid #EAECF4",
    borderRadius: 10, padding: "12px 14px", color: "#1A1B3A", fontSize: 13,
    outline: "none", marginBottom: 12, boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif", transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <AdminLayout>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
        @keyframes modalIn { from{opacity:0;transform:scale(0.95);} to{opacity:1;transform:scale(1);} }
        .lead-card:hover { transform:translateY(-3px) !important; box-shadow:0 14px 40px rgba(91,79,207,0.11) !important; border-color:#C4BEFF !important; }
        input:focus, textarea:focus, select:focus { border-color:#5B4FCF !important; box-shadow:0 0 0 3px rgba(91,79,207,0.1) !important; background:#fff !important; outline:none; }
        input::placeholder { color:#B0B5C8; }
        input[type="date"]::-webkit-calendar-picker-indicator { opacity:0.4; cursor:pointer; }
      `}</style>

      {/* Page heading */}
      <div style={{ marginBottom: 24, animation: "fadeUp 0.4s ease forwards", opacity: 0 }}>
        <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 6 }}>Enquiries</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#1A1B3A", margin: "0 0 6px", letterSpacing: "-0.6px" }}>Leads</h1>
        <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>Assign contractors to leads and convert them into live projects.</p>
      </div>

      {/* Summary strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24, animation: "fadeUp 0.4s ease 0.06s forwards", opacity: 0 }}>
        {[
          { label: "Total Leads",      val: leads.length,                                          icon: "📋", color: "#5B4FCF", bg: "#F0EEFF", border: "#D9D4FD" },
          { label: "General Leads",    val: leads.filter(l => l.leadType === "general").length,             icon: "🟢", color: "#0F6E56", bg: "#E6F7F2", border: "#9FE1CB" },
          { label: "Contractor Leads", val: leads.filter(l => l.leadType === "contractor_specific").length,             icon: "🔵", color: "#1D4ED8", bg: "#EFF6FF", border: "#BFDBFE" },
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

      {/* Lead cards */}
      <div style={{ display: "grid", gap: 16 }}>
        {leads.map((lead, i) => (
          <div key={lead._id} className="lead-card" style={{
            background: "#fff", borderRadius: 20, padding: "24px 26px",
            border: "1px solid #EAECF4", boxShadow: "0 2px 14px rgba(91,79,207,0.06)",
            transition: "all 0.28s ease",
            animation: `fadeUp 0.5s ease ${i * 0.07 + 0.12}s forwards`, opacity: 0,
          }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 46, height: 46, borderRadius: "50%",
                  background: "linear-gradient(135deg,#5B4FCF,#7B6FE8)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 17, fontWeight: 900, flexShrink: 0,
                }}>
                  {(lead.customerName || "?")[0].toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: "#1A1B3A", letterSpacing: "-0.2px" }}>
                    {lead.customerName}
                  </div>
                  <div style={{ fontSize: 12, color: "#9095B0", marginTop: 2 }}>📍 {lead.city}</div>
                </div>
                <div style={{ fontSize: 12, color: "#9095B0", marginTop: 2 }}>
  📞 {lead.customerPhone} &nbsp;·&nbsp; 📧 {lead.customerEmail}
</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                {lead.leadType === "contractor_specific" ? (
                  <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, fontWeight: 700, color: "#1D4ED8", background: "#EFF6FF", border: "1px solid #BFDBFE" }}>
                    Contractor Lead
                  </span>
                ) : (
                  <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, fontWeight: 700, color: "#0F6E56", background: "#E6F7F2", border: "1px solid #9FE1CB" }}>
                    General Lead
                  </span>
                )}
                {lead.contractorName && (
                  <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, fontWeight: 700, color: "#5B4FCF", background: "#F0EEFF", border: "1px solid #C4BEFF" }}>
                    {lead.contractorName}
                  </span>
                )}
                <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, fontWeight: 700, color: "#6B7280", background: "#F4F6FB", border: "1px solid #EAECF4", textTransform: "capitalize" }}>
                  {lead.status}
                </span>
              </div>
            </div>

            {/* Info grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
              {[
                { icon: "👤", label: "Customer Name",  val: lead.customerName },
{ icon: "📞", label: "Phone",          val: lead.customerPhone },
{ icon: "📧", label: "Email",          val: lead.customerEmail },
{ icon: "🏠", label: "Project Type",   val: lead.projectType },
{ icon: "💰", label: "Budget",         val: lead.budget },
{ icon: "📍", label: "City",           val: lead.city },
{ icon: "📐", label: "Plot Area",      val: lead.plotArea ? `${lead.plotArea} sqft` : null },
{ icon: "⏱️", label: "Start Time",     val: lead.expectedStartTime },
{ icon: "📋", label: "Status",         val: lead.status },
              ].map(item => (
                <div key={item.label} style={{ background: "#F8F9FC", borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 15, marginBottom: 5 }}>{item.icon}</div>
                  <div style={{ fontSize: 10, color: "#9095B0", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1B3A" }}>{item.val || "—"}</div>
                </div>
              ))}
            </div>

            {lead.contractorName && (
              <div style={{ background: "#F0EEFF", borderLeft: "3px solid #5B4FCF", borderRadius: "0 10px 10px 0", padding: "9px 14px", fontSize: 13, color: "#4A4F6A", marginBottom: 14 }}>
                <strong>Requested Contractor:</strong> {lead.contractorName}
              </div>
            )}

            <div style={{ background: "#F8F9FC", borderLeft: "3px solid #5B4FCF", borderRadius: "0 10px 10px 0", padding: "12px 14px", fontSize: 13, color: "#4A4F6A", marginBottom: 14, lineHeight: 1.6 }}>
              <div style={{ fontSize: 10, color: "#5B4FCF", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 4 }}>
                Project Requirements
              </div>
              <div style={{ whiteSpace: "pre-wrap" }}>{lead.message || "No project requirements provided."}</div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              {lead.contractorId && lead.status !== "converted" && (
                <button
                  onClick={() => {
                    setConvertLeadId(lead._id);
                    setConvertData({
                      projectName: `${lead.customerName} Project`,
                      budget: lead.budget,
                      contractorId: lead.contractorId,
                      expectedDuration: "",
                      startDate: "",
                    });
                    setShowConvertModal(true);
                  }}
                  style={{
                    background: "#5B4FCF", color: "#fff", border: "none",
                    borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 13,
                    cursor: "pointer", boxShadow: "0 3px 14px rgba(91,79,207,0.28)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#4A3FBF"}
                  onMouseLeave={e => e.currentTarget.style.background = "#5B4FCF"}
                >
                  🔄 Convert To Project
                </button>
              )}

              {!lead.contractorId && (
                <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1 }}>
                  <select
                    style={{ ...iStyle, marginBottom: 0, flex: 1 }}
                    onChange={(e) => setSelectedContractor({ ...selectedContractor, [lead._id]: e.target.value })}
                  >
                    <option>Select Contractor</option>
                    {contractors.map((contractor) => (
                      <option key={contractor._id} value={contractor._id}>
                        {contractor.userId?.fullName}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => assignContractor(lead._id, selectedContractor[lead._id])}
                    style={{
                      background: "#0F6E56", color: "#fff", border: "none",
                      borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 13,
                      cursor: "pointer", whiteSpace: "nowrap",
                      boxShadow: "0 3px 14px rgba(15,110,86,0.28)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#0A5240"}
                    onMouseLeave={e => e.currentTarget.style.background = "#0F6E56"}
                  >
                    ✓ Assign
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {leads.length === 0 && (
          <div style={{ background: "#fff", borderRadius: 20, padding: "60px 40px", textAlign: "center", border: "1px dashed #D1D5E8" }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>📋</div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#1A1B3A", marginBottom: 6 }}>No leads yet</div>
            <div style={{ fontSize: 13, color: "#9095B0" }}>Customer enquiries will appear here once submitted.</div>
          </div>
        )}
      </div>

      {/* Convert to Project Modal */}
      {showConvertModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(26,27,58,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
          backdropFilter: "blur(4px)",
        }}>
          <div style={{
            background: "#fff", borderRadius: 20, padding: "32px", width: 500,
            boxShadow: "0 24px 80px rgba(26,27,58,0.25)",
            animation: "modalIn 0.25s ease forwards",
          }}>
            <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6 }}>New Project</div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#1A1B3A", margin: "0 0 6px", letterSpacing: "-0.4px" }}>Convert To Project</h2>
            <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 22px", lineHeight: 1.6 }}>Fill in the project details below to create a live project from this lead.</p>

            <input type="text" placeholder="Project Name" value={convertData.projectName}
              style={iStyle}
              onChange={(e) => setConvertData({ ...convertData, projectName: e.target.value })} />

            <input type="Number" placeholder="Budget in Rs (e.g. 5000000" value={convertData.budget}
              style={iStyle}
              onChange={(e) => setConvertData({ ...convertData, budget: e.target.value })} />

            <select value={convertData.contractorId} style={iStyle}
              onChange={(e) => setConvertData({ ...convertData, contractorId: e.target.value })}>
              <option value="">Select Contractor</option>
              {contractors.map((contractor) => (
                <option key={contractor._id} value={contractor._id}>
                  {contractor.userId?.fullName}
                </option>
              ))}
            </select>

            <input type="text" placeholder="Expected Duration (e.g. 6 months)" value={convertData.expectedDuration}
              style={iStyle}
              onChange={(e) => setConvertData({ ...convertData, expectedDuration: e.target.value })} />

            <input type="date" value={convertData.startDate}
              style={iStyle}
              onChange={(e) => setConvertData({ ...convertData, startDate: e.target.value })} />

            <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
              <button
                onClick={() => setShowConvertModal(false)}
                style={{
                  flex: 1, background: "#F4F6FB", color: "#6B7280", border: "1px solid #EAECF4",
                  borderRadius: 10, padding: "12px", fontWeight: 700, fontSize: 14, cursor: "pointer",
                  transition: "all 0.18s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#EAECF4"}
                onMouseLeave={e => e.currentTarget.style.background = "#F4F6FB"}
              >
                Cancel
              </button>
              <button
                onClick={convertToProject}
                style={{
                  flex: 2, background: "#5B4FCF", color: "#fff", border: "none",
                  borderRadius: 10, padding: "12px", fontWeight: 700, fontSize: 14, cursor: "pointer",
                  boxShadow: "0 4px 18px rgba(91,79,207,0.35)", transition: "all 0.18s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#4A3FBF"}
                onMouseLeave={e => e.currentTarget.style.background = "#5B4FCF"}
              >
                🚀 Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
