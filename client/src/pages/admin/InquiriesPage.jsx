import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { MessageSquare, Sparkles, Phone, User, Mail, Building2, MapPin, Calendar } from "lucide-react";
import { API_BASE_URL } from "../../services/api";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(API_BASE_URL + "/inquiries", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInquiries(res.data.inquiries);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return { bg: "#EFF6FF", border: "#BFDBFE", color: "#1D4ED8", icon: <Sparkles size={13} /> };
      case "contacted":
        return { bg: "#F0EEFF", border: "#D9D4FD", color: "#5B4FCF", icon: <Phone size={13} /> };
      case "closed":
        return { bg: "#E6F7F2", border: "#9FE1CB", color: "#0F6E56", icon: "✓" };
      default:
        return { bg: "#F4F6FB", border: "#EAECF4", color: "#6B7280", icon: "—" };
    }
  };

  const statusFlow = {
    new: { next: "contacted", label: "Mark as Contacted" },
    contacted: { next: "closed", label: "Mark as Closed" },
    closed: { next: "new", label: "Reopen as New" },
  };

  const handleStatusChange = async (id, currentStatus) => {
    const nextStatus = statusFlow[currentStatus]?.next || "new";
    setUpdatingId(id);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.patch(
        `${API_BASE_URL}/inquiries/${id}/status`,
        { status: nextStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setInquiries((prev) =>
          prev.map((inq) => (inq._id === id ? { ...inq, status: nextStatus } : inq))
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AdminLayout>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
        .inquiry-card:hover { transform:translateY(-3px) !important; box-shadow:0 14px 40px rgba(91,79,207,0.11) !important; border-color:#C4BEFF !important; }
      `}</style>

      {/* Page heading */}
      <div style={{ marginBottom: 24, animation: "fadeUp 0.4s ease forwards", opacity: 0 }}>
        <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 6 }}>Enquiries</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#1A1B3A", margin: "0 0 6px", letterSpacing: "-0.6px" }}>Enquiries</h1>
        <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>View and manage customer enquiries from the contact form.</p>
      </div>

      {/* Summary strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24, animation: "fadeUp 0.4s ease 0.06s forwards", opacity: 0 }}>
        {[
          { label: "Total Inquiries", val: inquiries.length,                                    icon: <MessageSquare size={18} color="#5B4FCF" />, color: "#5B4FCF", bg: "#F0EEFF", border: "#D9D4FD" },
          { label: "New",             val: inquiries.filter(i => i.status === "new").length,       icon: <Sparkles size={18} color="#1D4ED8" />,      color: "#1D4ED8", bg: "#EFF6FF", border: "#BFDBFE" },
          { label: "Contacted",       val: inquiries.filter(i => i.status === "contacted").length, icon: <Phone size={18} color="#0F6E56" />,          color: "#0F6E56", bg: "#E6F7F2", border: "#9FE1CB" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#fff", borderRadius: 14, padding: "16px 20px",
            border: `1px solid ${s.border}`, display: "flex", alignItems: "center", gap: 14,
            boxShadow: "0 2px 10px rgba(91,79,207,0.05)",
          }}>
            <div style={{ width: 42, height: 42, background: s.bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: s.color, letterSpacing: "-0.8px" }}>{s.val}</div>
              <div style={{ fontSize: 11, color: "#9095B0", fontWeight: 600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Inquiry cards */}
      <div style={{ display: "grid", gap: 16 }}>
        {inquiries.map((inquiry, i) => {
          const statusInfo = getStatusColor(inquiry.status);
          return (
            <div key={inquiry._id} className="inquiry-card" style={{
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
                    {(inquiry.name || "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: "#1A1B3A", letterSpacing: "-0.2px" }}>
                      {inquiry.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#9095B0", marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                      <Mail size={12} /> {inquiry.email}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {inquiry.inquiryType && (
                    <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, fontWeight: 700, color: "#5B4FCF", background: "#F0EEFF", border: "1px solid #C4BEFF" }}>
                      {inquiry.inquiryType}
                    </span>
                  )}
                  <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, fontWeight: 700, color: statusInfo.color, background: statusInfo.bg, border: `1px solid ${statusInfo.border}`, textTransform: "capitalize", display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {statusInfo.icon} {inquiry.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(inquiry._id, inquiry.status)}
                    disabled={updatingId === inquiry._id}
                    style={{
                      fontSize: 11, padding: "4px 12px", borderRadius: 20, fontWeight: 700,
                      color: "#fff", background: updatingId === inquiry._id ? "#A5B4FC" : "#5B4FCF",
                      border: "none", cursor: updatingId === inquiry._id ? "default" : "pointer",
                      transition: "background 0.2s ease",
                    }}
                  >
                    {updatingId === inquiry._id ? "Updating..." : statusFlow[inquiry.status]?.label || "Update Status"}
                  </button>
                </div>
              </div>

              {/* Info grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
                {[
                  { icon: <User size={15} color="#5B4FCF" />,     label: "Name",         val: inquiry.name },
                  { icon: <Mail size={15} color="#5B4FCF" />,     label: "Email",        val: inquiry.email },
                  { icon: <Phone size={15} color="#5B4FCF" />,    label: "Phone",        val: inquiry.phone },
                  { icon: <Building2 size={15} color="#5B4FCF" />,label: "Inquiry Type", val: inquiry.inquiryType },
                  { icon: <MapPin size={15} color="#5B4FCF" />,   label: "Location",     val: inquiry.location },
                  { icon: <Calendar size={15} color="#5B4FCF" />, label: "Date",         val: formatDate(inquiry.createdAt) },
                ].map(item => (
                  <div key={item.label} style={{ background: "#F8F9FC", borderRadius: 10, padding: "10px 12px" }}>
                    <div style={{ marginBottom: 5 }}>{item.icon}</div>
                    <div style={{ fontSize: 10, color: "#9095B0", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1B3A", wordBreak: "break-word" }}>{item.val || "—"}</div>
                  </div>
                ))}
              </div>

              {/* Message */}
              {inquiry.message && (
                <div style={{ background: "#F8F9FC", borderLeft: "3px solid #5B4FCF", borderRadius: "0 10px 10px 0", padding: "12px 14px", fontSize: 13, color: "#4A4F6A", lineHeight: 1.6 }}>
                  <strong>Message:</strong> {inquiry.message}
                </div>
              )}
            </div>
          );
        })}

        {inquiries.length === 0 && !loading && (
          <div style={{ background: "#fff", borderRadius: 20, padding: "60px 40px", textAlign: "center", border: "1px dashed #D1D5E8" }}>
            <div style={{ marginBottom: 14, display: "flex", justifyContent: "center" }}><MessageSquare size={44} color="#D1D5E8" /></div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#1A1B3A", marginBottom: 6 }}>No inquiries yet</div>
            <div style={{ fontSize: 13, color: "#9095B0" }}>Customer inquiries will appear here once submitted.</div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}