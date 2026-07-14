import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { API_BASE_URL } from "../../services/api";

const API_URL = API_BASE_URL + "/admin/admins";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
};

const inputStyle = {
  width: "100%",
  minWidth: 0,
  border: "1px solid #DDE1EF",
  borderRadius: 10,
  padding: "10px 12px",
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box",
};

const actionButton = {
  border: "1px solid #DDE1EF",
  background: "#fff",
  borderRadius: 9,
  padding: "7px 10px",
  fontSize: 12,
  fontWeight: 800,
  cursor: "pointer",
  whiteSpace: "nowrap",
};

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("accessToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(API_URL, { headers });
      setAdmins(res.data.admins || []);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load admins");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const saveAdmin = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/${editingId}`,
          {
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
          },
          { headers }
        );
        setMessage("Admin updated");
      } else {
        await axios.post(API_URL, form, { headers });
        setMessage("Admin created");
      }

      resetForm();
      fetchAdmins();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to save admin");
    } finally {
      setSaving(false);
    }
  };

  const editAdmin = (admin) => {
    setEditingId(admin._id);
    setForm({
      fullName: admin.fullName || "",
      email: admin.email || "",
      phone: admin.phone || "",
      password: "",
    });
  };

  const updateStatus = async (admin, action) => {
    try {
      await axios.patch(`${API_URL}/${admin._id}/${action}`, {}, { headers });
      setMessage(`Admin ${action === "enable" ? "enabled" : "disabled"}`);
      fetchAdmins();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update admin");
    }
  };

  const resetPassword = async (admin) => {
    const password = window.prompt(`New password for ${admin.email}`);
    if (!password) return;

    try {
      await axios.patch(
        `${API_URL}/${admin._id}/reset-password`,
        { password },
        { headers }
      );
      setMessage("Password reset");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to reset password");
    }
  };

  const deleteAdmin = async (admin) => {
    if (!window.confirm(`Delete admin ${admin.email}?`)) return;

    try {
      await axios.delete(`${API_URL}/${admin._id}`, { headers });
      setMessage("Admin deleted");
      fetchAdmins();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete admin");
    }
  };

  return (
    <AdminLayout>
      <style>{`
        .admin-form-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }
        .admin-table-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .admin-table {
          width: 100%;
          min-width: 860px;
          border-collapse: collapse;
          font-size: 13px;
        }
        .admin-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 8px;
        }
        @media (max-width: 1100px) {
          .admin-form-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 640px) {
          .admin-form-grid {
            grid-template-columns: 1fr;
          }
          .admin-form-actions {
            justify-content: stretch !important;
            flex-direction: column;
          }
          .admin-form-actions button {
            width: 100%;
          }
        }
      `}</style>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 6 }}>Super Admin</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#1A1B3A", margin: "0 0 6px" }}>Admin Management</h1>
        <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>Create and manage admin accounts.</p>
      </div>

      {message && (
        <div style={{ background: "#F0EEFF", border: "1px solid #C4BEFF", color: "#5B4FCF", borderRadius: 12, padding: "10px 14px", marginBottom: 18, fontSize: 13, fontWeight: 700 }}>
          {message}
        </div>
      )}

      <form onSubmit={saveAdmin} style={{ background: "#fff", border: "1px solid #EAECF4", borderRadius: 18, padding: 22, marginBottom: 24, boxShadow: "0 2px 14px rgba(91,79,207,0.05)" }}>
        <h2 style={{ fontSize: 18, fontWeight: 900, margin: "0 0 16px", color: "#1A1B3A" }}>{editingId ? "Edit Admin" : "Create Admin"}</h2>
        <div className="admin-form-grid">
          <input required placeholder="Full name" value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} style={inputStyle} />
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => updateField("email", e.target.value)} style={inputStyle} />
          <input required placeholder="Phone" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} style={inputStyle} />
          <input required={!editingId} type="password" placeholder={editingId ? "Password unchanged" : "Password"} value={form.password} disabled={Boolean(editingId)} onChange={(e) => updateField("password", e.target.value)} style={{ ...inputStyle, background: editingId ? "#F8FAFC" : "#fff" }} />
        </div>
        <div className="admin-form-actions" style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
          {editingId && (
            <button type="button" onClick={resetForm} style={{ border: "1px solid #DDE1EF", background: "#fff", borderRadius: 10, padding: "9px 14px", fontWeight: 800, cursor: "pointer" }}>
              Cancel
            </button>
          )}
          <button type="submit" disabled={saving} style={{ border: "none", background: "#5B4FCF", color: "#fff", borderRadius: 10, padding: "9px 16px", fontWeight: 800, cursor: saving ? "not-allowed" : "pointer" }}>
            {saving ? "Saving..." : editingId ? "Update Admin" : "Create Admin"}
          </button>
        </div>
      </form>

      <div style={{ background: "#fff", border: "1px solid #EAECF4", borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 14px rgba(91,79,207,0.05)" }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead style={{ background: "#F8F7FF", color: "#5B4FCF", textAlign: "left" }}>
              <tr>
                <th style={{ padding: 14 }}>Name</th>
                <th style={{ padding: 14 }}>Email</th>
                <th style={{ padding: 14 }}>Phone</th>
                <th style={{ padding: 14 }}>Status</th>
                <th style={{ padding: 14, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id} style={{ borderTop: "1px solid #EAECF4" }}>
                  <td style={{ padding: 14, fontWeight: 800, color: "#1A1B3A" }}>{admin.fullName}</td>
                  <td style={{ padding: 14, color: "#4B5563" }}>{admin.email}</td>
                  <td style={{ padding: 14, color: "#4B5563" }}>{admin.phone}</td>
                  <td style={{ padding: 14 }}>
                    <span style={{ display: "inline-flex", borderRadius: 999, padding: "5px 10px", fontSize: 11, fontWeight: 800, color: admin.isActive ? "#0F6E56" : "#B91C1C", background: admin.isActive ? "#E6F7F2" : "#FEF2F2", border: `1px solid ${admin.isActive ? "#9FE1CB" : "#FCA5A5"}` }}>
                      {admin.isActive ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td style={{ padding: 14 }}>
                    <div className="admin-actions">
                      <button type="button" onClick={() => editAdmin(admin)} style={actionButton}>Edit</button>
                      <button type="button" onClick={() => updateStatus(admin, admin.isActive ? "disable" : "enable")} style={actionButton}>{admin.isActive ? "Disable" : "Enable"}</button>
                      <button type="button" onClick={() => resetPassword(admin)} style={actionButton}>Reset Password</button>
                      <button type="button" onClick={() => deleteAdmin(admin)} style={{ ...actionButton, color: "#B91C1C", borderColor: "#FCA5A5", background: "#FEF2F2" }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: 28, textAlign: "center", color: "#6B7280" }}>No admins found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
