import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { API_BASE_URL } from "../../services/api";

const API_URL = API_BASE_URL + "/admin/activity-logs";

const inputStyle = {
  width: "100%",
  minWidth: 0,
  border: "1px solid #DDE1EF",
  borderRadius: 10,
  padding: "9px 11px",
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box",
};

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [filters, setFilters] = useState({
    search: "",
    adminId: "",
    module: "",
    action: "",
    dateFrom: "",
    dateTo: "",
  });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("accessToken");

  const fetchLogs = async (page = 1) => {
    try {
      const params = new URLSearchParams({
        page,
        limit: 10,
        ...Object.fromEntries(
          Object.entries(filters).filter(([, value]) => value)
        ),
      });

      const res = await axios.get(`${API_URL}?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLogs(res.data.logs || []);
      setAdmins(res.data.admins || []);
      setPagination(res.data.pagination || { page: 1, pages: 1 });
      setMessage("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load activity logs");
    }
  };

  useEffect(() => {
    fetchLogs(1);
  }, []);

  const updateFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AdminLayout>
      <style>{`
        .logs-filter-grid {
          display: grid;
          grid-template-columns: minmax(180px, 1.4fr) repeat(5, minmax(130px, 1fr)) auto;
          gap: 10px;
          align-items: center;
        }
        .logs-table-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .logs-table {
          width: 100%;
          min-width: 1080px;
          border-collapse: collapse;
          font-size: 13px;
        }
        .logs-table td,
        .logs-table th {
          vertical-align: top;
        }
        .logs-description {
          max-width: 320px;
          white-space: normal;
          line-height: 1.5;
        }
        .logs-pagination {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 10px;
          margin-top: 16px;
          flex-wrap: wrap;
        }
        @media (max-width: 1250px) {
          .logs-filter-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (max-width: 760px) {
          .logs-filter-grid {
            grid-template-columns: 1fr;
          }
          .logs-filter-grid button {
            width: 100%;
          }
          .logs-pagination {
            justify-content: stretch;
          }
          .logs-pagination button,
          .logs-pagination span {
            flex: 1;
            text-align: center;
          }
        }
      `}</style>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 6 }}>Super Admin</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#1A1B3A", margin: "0 0 6px" }}>Activity Logs</h1>
        <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>Track important admin actions across the platform.</p>
      </div>

      {message && (
        <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#B91C1C", borderRadius: 12, padding: "10px 14px", marginBottom: 18, fontSize: 13, fontWeight: 700 }}>
          {message}
        </div>
      )}

      <div style={{ background: "#fff", border: "1px solid #EAECF4", borderRadius: 18, padding: 16, marginBottom: 18, boxShadow: "0 2px 14px rgba(91,79,207,0.05)" }}>
        <div className="logs-filter-grid">
          <input placeholder="Search" value={filters.search} onChange={(e) => updateFilter("search", e.target.value)} style={inputStyle} />
          <select value={filters.adminId} onChange={(e) => updateFilter("adminId", e.target.value)} style={inputStyle}>
            <option value="">All admins</option>
            {admins.map((admin) => (
              <option key={admin._id} value={admin._id}>{admin.fullName || admin.email}</option>
            ))}
          </select>
          <input placeholder="Module" value={filters.module} onChange={(e) => updateFilter("module", e.target.value)} style={inputStyle} />
          <input placeholder="Action" value={filters.action} onChange={(e) => updateFilter("action", e.target.value)} style={inputStyle} />
          <input type="date" value={filters.dateFrom} onChange={(e) => updateFilter("dateFrom", e.target.value)} style={inputStyle} />
          <input type="date" value={filters.dateTo} onChange={(e) => updateFilter("dateTo", e.target.value)} style={inputStyle} />
          <button onClick={() => fetchLogs(1)} style={{ border: "none", background: "#5B4FCF", color: "#fff", borderRadius: 10, padding: "10px 16px", fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>Apply</button>
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #EAECF4", borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 14px rgba(91,79,207,0.05)" }}>
        <div className="logs-table-wrap">
          <table className="logs-table">
            <thead style={{ background: "#F8F7FF", color: "#5B4FCF", textAlign: "left" }}>
              <tr>
                <th style={{ padding: 14, width: 150 }}>When</th>
                <th style={{ padding: 14, width: 180 }}>Admin</th>
                <th style={{ padding: 14, width: 150 }}>Action</th>
                <th style={{ padding: 14, width: 150 }}>Module</th>
                <th style={{ padding: 14, width: 120 }}>Target</th>
                <th style={{ padding: 14 }}>Description</th>
                <th style={{ padding: 14, width: 140 }}>IP</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} style={{ borderTop: "1px solid #EAECF4" }}>
                  <td style={{ padding: 14, color: "#4B5563", lineHeight: 1.45 }}>{new Date(log.createdAt).toLocaleString()}</td>
                  <td style={{ padding: 14, color: "#1A1B3A", fontWeight: 800 }}>
                    {log.performedBy?.fullName || "System"}
                    <br />
                    <span style={{ color: "#9095B0", fontWeight: 600 }}>{log.role || "-"}</span>
                  </td>
                  <td style={{ padding: 14 }}>
                    <span style={{ display: "inline-flex", borderRadius: 999, padding: "5px 10px", background: "#F0EEFF", color: "#5B4FCF", border: "1px solid #C4BEFF", fontSize: 11, fontWeight: 800 }}>
                      {log.action}
                    </span>
                  </td>
                  <td style={{ padding: 14, color: "#4B5563" }}>{log.module}</td>
                  <td style={{ padding: 14, color: "#4B5563" }}>{log.targetType || "-"}</td>
                  <td style={{ padding: 14, color: "#4B5563" }}>
                    <div className="logs-description">{log.description || "-"}</div>
                  </td>
                  <td style={{ padding: 14, color: "#4B5563" }}>{log.ipAddress || "-"}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ padding: 28, textAlign: "center", color: "#6B7280" }}>No activity logs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="logs-pagination">
        <button disabled={pagination.page <= 1} onClick={() => fetchLogs(pagination.page - 1)} style={{ border: "1px solid #DDE1EF", background: "#fff", borderRadius: 10, padding: "9px 14px", fontWeight: 800, cursor: pagination.page <= 1 ? "not-allowed" : "pointer", opacity: pagination.page <= 1 ? 0.5 : 1 }}>Previous</button>
        <span style={{ fontSize: 13, color: "#6B7280", padding: "9px 4px" }}>Page {pagination.page} of {pagination.pages || 1}</span>
        <button disabled={pagination.page >= pagination.pages} onClick={() => fetchLogs(pagination.page + 1)} style={{ border: "1px solid #DDE1EF", background: "#fff", borderRadius: 10, padding: "9px 14px", fontWeight: 800, cursor: pagination.page >= pagination.pages ? "not-allowed" : "pointer", opacity: pagination.page >= pagination.pages ? 0.5 : 1 }}>Next</button>
      </div>
    </AdminLayout>
  );
}
