import { useEffect, useState } from "react";
import { Download, ExternalLink, Trash2 } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";

const statuses = ["New", "Shortlisted", "Interview Scheduled", "Selected", "Rejected"];

export default function JobApplicantsPage() {
  const [applicants, setApplicants] = useState([]);
  const [pendingDelete, setPendingDelete] = useState(null);

  const load = () => api.get("/admin/applicants")
    .then((response) => setApplicants(response.data.applicants || []))
    .catch(() => alert("Failed to load applicants"));

  useEffect(() => { load(); }, []);

  const changeStatus = async (id, status) => {
    try {
      await api.patch(`/admin/applicants/${id}/status`, { status });
      setApplicants((current) => current.map((applicant) => applicant._id === id ? { ...applicant, status } : applicant));
    } catch { alert("Failed to update status"); }
  };

  const deleteApplicant = async () => {
    if (!pendingDelete) return;
    try {
      await api.delete(`/admin/applicants/${pendingDelete._id}`);
      setApplicants((current) => current.filter((applicant) => applicant._id !== pendingDelete._id));
      setPendingDelete(null);
      alert("Applicant and resume deleted");
    } catch { alert("Failed to delete applicant"); }
  };

  return <AdminLayout>
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 6 }}>Careers</div>
      <h1 style={{ fontSize: 28, fontWeight: 900, color: "#1A1B3A", margin: "0 0 6px" }}>Job Applicants</h1>
      <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>Review applications and permanently remove records when no longer needed.</p>
    </div>
    <div style={{ background: "#fff", border: "1px solid #EAECF4", borderRadius: 18, overflowX: "auto", boxShadow: "0 2px 14px rgba(91,79,207,.06)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900, fontSize: 13 }}>
        <thead><tr style={{ background: "#F8F9FD", textAlign: "left", color: "#6B7280", fontSize: 11, textTransform: "uppercase", letterSpacing: ".06em" }}>{["Applicant", "Applied Position", "Date Applied", "Resume", "Status", "Actions"].map((label) => <th key={label} style={{ padding: "14px 16px" }}>{label}</th>)}</tr></thead>
        <tbody>{applicants.map((applicant) => <tr key={applicant._id} style={{ borderTop: "1px solid #EAECF4" }}>
          <td style={{ padding: 16 }}><b style={{ color: "#1A1B3A" }}>{applicant.fullName}</b><div style={{ color: "#6B7280", fontSize: 12, marginTop: 3 }}>{applicant.email}<br />{applicant.phone}</div></td>
          <td style={{ padding: 16, color: "#4B5563" }}>{applicant.career?.title || "Deleted hiring post"}</td>
          <td style={{ padding: 16, color: "#6B7280" }}>{new Date(applicant.createdAt).toLocaleDateString()}</td>
          <td style={{ padding: 16 }}><a href={applicant.resumeUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "#5B4FCF", fontWeight: 700, textDecoration: "none" }}><ExternalLink size={14} /> View</a><a href={applicant.resumeUrl} download={applicant.resumeName} target="_blank" rel="noreferrer" style={{ display: "inline-flex", marginLeft: 10, color: "#5B4FCF" }}><Download size={15} /></a></td>
          <td style={{ padding: 16 }}><select value={applicant.status} onChange={(event) => changeStatus(applicant._id, event.target.value)} style={{ border: "1px solid #DDE1EF", borderRadius: 8, padding: "7px 8px", fontSize: 12 }}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></td>
          <td style={{ padding: 16 }}><button onClick={() => setPendingDelete(applicant)} title="Delete applicant" style={{ border: "1px solid #FCA5A5", background: "#FEF2F2", color: "#B91C1C", borderRadius: 8, padding: 8, cursor: "pointer" }}><Trash2 size={15} /></button></td>
        </tr>)}{!applicants.length && <tr><td colSpan="6" style={{ padding: 42, textAlign: "center", color: "#9095B0" }}>No job applications received yet.</td></tr>}</tbody>
      </table>
    </div>
    {pendingDelete && <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "rgba(15,23,42,.56)" }}>
      <div style={{ width: "min(100%, 430px)", borderRadius: 18, background: "#fff", padding: 26, boxShadow: "0 24px 60px rgba(15,23,42,.25)" }}>
        <h2 style={{ margin: 0, color: "#1A1B3A", fontSize: 20, fontWeight: 900 }}>Delete applicant?</h2>
        <p style={{ margin: "10px 0 22px", color: "#6B7280", fontSize: 13, lineHeight: 1.6 }}>This permanently removes <b>{pendingDelete.fullName}</b> and their uploaded resume. This action cannot be undone.</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}><button onClick={() => setPendingDelete(null)} style={{ border: "1px solid #DDE1EF", background: "#fff", borderRadius: 10, padding: "10px 15px", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>Cancel</button><button onClick={deleteApplicant} style={{ border: 0, background: "#B91C1C", color: "#fff", borderRadius: 10, padding: "10px 15px", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>Yes, delete</button></div>
      </div>
    </div>}
  </AdminLayout>;
}
