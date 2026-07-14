import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { Building2, CheckCircle, Clock, User, MapPin, Wallet, Lock, CreditCard } from "lucide-react";
import { API_BASE_URL } from "../../services/api";

function PayContractorForm({ projectId, earningId, grossAmount }) {
  const [utr, setUtr] = useState("");
  const [note, setNote] = useState("");
  const [payableAmt, setPayableAmt] = useState("");
  const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

  const commissionAmt = grossAmount - (Number(payableAmt) || 0);
  const commissionPct = grossAmount > 0
    ? ((commissionAmt / grossAmount) * 100).toFixed(1)
    : 0;

  const pay = async () => {
    if (!utr.trim()) { alert("Please enter UTR number"); return; }
    if (!payableAmt || Number(payableAmt) <= 0) { alert("Please enter payable amount"); return; }
    if (Number(payableAmt) > grossAmount) { alert("Payable amount can't exceed gross amount"); return; }

    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${API_BASE_URL}/projects/${projectId}/pay-contractor`,
        {
          earningId,
          utr,
          note,
          payableAmt: Number(payableAmt),
          commissionAmt,
          commissionPct: Number(commissionPct),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Contractor paid successfully!");
      window.location.reload();
    } catch (err) {
      alert("Failed to process payment");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {/* Live commission preview */}
      <div style={{ fontSize: 11, background: "#FEF3E2", border: "1px solid #FAC775", borderRadius: 8, padding: "6px 10px", color: "#B45309" }}>
        Gross: <strong>{fmt(grossAmount)}</strong>
        {payableAmt && (
          <> · Deduction: <strong>−{fmt(commissionAmt)}</strong> ({commissionPct}%) · Payable: <strong style={{ color: "#0F6E56" }}>{fmt(Number(payableAmt))}</strong></>
        )}
      </div>

      {/* Payable amount input */}
      <input
        type="number"
        value={payableAmt}
        onChange={e => setPayableAmt(e.target.value)}
        placeholder={`Exact amount to pay contractor (max ₹${grossAmount.toLocaleString("en-IN")})`}
        style={{ fontSize: 11, padding: "6px 10px", border: "1px solid #EAECF4", borderRadius: 8, outline: "none", width: "100%", boxSizing: "border-box" }}
      />

      {/* Admin note */}
      <input
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Note (e.g. 8% deducted for early stage, dispute hold etc.)"
        style={{ fontSize: 11, padding: "6px 10px", border: "1px solid #EAECF4", borderRadius: 8, outline: "none", width: "100%", boxSizing: "border-box" }}
      />

      {/* UTR + Pay button */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={utr}
          onChange={e => setUtr(e.target.value)}
          placeholder="Enter UTR"
          style={{ fontSize: 11, padding: "6px 10px", border: "1px solid #EAECF4", borderRadius: 8, outline: "none", flex: 1 }}
        />
        <button
          onClick={pay}
          style={{ fontSize: 11, fontWeight: 700, background: "#5B4FCF", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", cursor: "pointer", whiteSpace: "nowrap" }}
        >
          Pay {payableAmt ? fmt(Number(payableAmt)) : "—"} ✓
        </button>
      </div>
    </div>
  );
}

export default function AdminPaymentsPage() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(API_BASE_URL + "/admin/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data.projects);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProjects();
  }, []);

  const confirmPayment = async (projectId, milestoneId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(`${API_BASE_URL}/projects/${projectId}/confirm-milestone`,
        { milestoneId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Payment confirmed!");
      window.location.reload();
    } catch (err) {
      alert("Failed to confirm payment");
    }
  };

  const totalStats = projects.reduce((acc, p) => {
    const budget = parseInt(p.budget) || 0;
    const paid = (p.milestones || [])
      .filter(m => m.status === "paid")
      .reduce((s, m) => s + Math.round((m.pct / 100) * budget), 0);
    const due = (p.milestones || [])
      .filter(m => m.status === "due")
      .reduce((s, m) => s + Math.round((m.pct / 100) * budget), 0);
    return { total: acc.total + budget, paid: acc.paid + paid, due: acc.due + due };
  }, { total: 0, paid: 0, due: 0 });

  const fmt = (n) => "₹" + n.toLocaleString("en-IN");

  return (
    <AdminLayout>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
        .proj-card:hover { transform:translateY(-2px) !important; box-shadow:0 14px 40px rgba(91,79,207,0.11) !important; border-color:#C4BEFF !important; }
      `}</style>

      {/* Heading */}
      <div style={{ marginBottom: 24, animation: "fadeUp 0.4s ease forwards", opacity: 0 }}>
        <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 6 }}>Finance</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#1A1B3A", margin: "0 0 6px", letterSpacing: "-0.6px" }}>Payments</h1>
        <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>Track all project payments, confirm UTR submissions, and view totals.</p>
      </div>

      {/* Summary strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 28, animation: "fadeUp 0.4s ease 0.06s forwards", opacity: 0 }}>
        {[
          { label: "Total Budget", val: fmt(totalStats.total), icon: <Building2 size={20} color="#5B4FCF" />, color: "#5B4FCF", bg: "#F0EEFF", border: "#C4BEFF" },
          { label: "Total Paid",   val: fmt(totalStats.paid),  icon: <CheckCircle size={20} color="#0F6E56" />, color: "#0F6E56", bg: "#E6F7F2", border: "#9FE1CB" },
          { label: "Total Due",    val: fmt(totalStats.due),   icon: <Clock size={20} color="#B45309" />,       color: "#B45309", bg: "#FEF3E2", border: "#FAC775" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#fff", borderRadius: 14, padding: "18px 22px",
            border: `1px solid ${s.border}`, display: "flex", alignItems: "center", gap: 14,
            boxShadow: "0 2px 10px rgba(91,79,207,0.05)",
          }}>
            <div style={{ width: 44, height: 44, background: s.bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: s.color, letterSpacing: "-0.8px" }}>{s.val}</div>
              <div style={{ fontSize: 11, color: "#9095B0", fontWeight: 600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Project cards */}
      <div style={{ display: "grid", gap: 18 }}>
        {projects.map((project, i) => {
          const budget = parseInt(project.budget) || 0;
          const milestones = project.milestones || [];
          const paidAmt = milestones.filter(m => m.status === "paid").reduce((s, m) => s + Math.round((m.pct / 100) * budget), 0);
          const dueAmt  = milestones.filter(m => m.status === "due").reduce((s, m) => s + Math.round((m.pct / 100) * budget), 0);
          const pendingUtr = milestones.filter(m => m.status === "due" && m.submittedUtr);

          return (
            <div key={project._id} className="proj-card" style={{
              background: "#fff", borderRadius: 20, padding: "24px 28px",
              border: "1px solid #EAECF4", boxShadow: "0 2px 14px rgba(91,79,207,0.06)",
              transition: "all 0.25s ease",
              animation: `fadeUp 0.5s ease ${i * 0.07}s forwards`, opacity: 0,
            }}>
              {/* Project header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: "#1A1B3A", marginBottom: 4 }}>{project.projectName}</div>
                  <div style={{ fontSize: 12, color: "#9095B0", display: "flex", alignItems: "center", gap: 6 }}>
                    <User size={12} />{project.customerName}
                    <span>&nbsp;·&nbsp;</span>
                    <MapPin size={12} />{project.city}
                    <span>&nbsp;·&nbsp;</span>
                    <Wallet size={12} /> Budget: {fmt(budget)}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ textAlign: "center", background: "#E6F7F2", borderRadius: 10, padding: "8px 14px", border: "1px solid #9FE1CB" }}>
                    <div style={{ fontSize: 15, fontWeight: 900, color: "#0F6E56" }}>{fmt(paidAmt)}</div>
                    <div style={{ fontSize: 10, color: "#0F6E56", fontWeight: 600 }}>Paid</div>
                  </div>
                  <div style={{ textAlign: "center", background: "#FEF3E2", borderRadius: 10, padding: "8px 14px", border: "1px solid #FAC775" }}>
                    <div style={{ fontSize: 15, fontWeight: 900, color: "#B45309" }}>{fmt(dueAmt)}</div>
                    <div style={{ fontSize: 10, color: "#B45309", fontWeight: 600 }}>Due</div>
                  </div>
                </div>
              </div>

              {/* Milestones table */}
              {milestones.length > 0 ? (
                <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #EAECF4" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1.5fr", background: "#F8F9FC", padding: "10px 16px", fontSize: 10, fontWeight: 700, color: "#9095B0", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    <span>Milestone</span>
                    <span>%</span>
                    <span>Amount</span>
                    <span>Status</span>
                    <span>Action</span>
                  </div>
                  {milestones.map((m, mi) => {
                    const amount = Math.round((m.pct / 100) * budget);
                    return (
                      <div key={mi} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1.5fr", padding: "12px 16px", borderTop: "1px solid #F4F6FB", alignItems: "center" }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1B3A" }}>{m.name}</span>
                        <span style={{ fontSize: 13, color: "#6B7280" }}>{m.pct}%</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1B3A" }}>{fmt(amount)}</span>
                        <span style={{
                          fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block",
                          ...(m.status === "paid"     ? { color: "#0F6E56", background: "#E6F7F2", border: "1px solid #9FE1CB" } :
                              m.status === "due"      ? { color: "#B45309", background: "#FEF3E2", border: "1px solid #FAC775" } :
                                                        { color: "#9095B0", background: "#F4F6FB", border: "1px solid #EAECF4" })
                        }}>
                          {m.status === "paid"
                            ? <span style={{ display: "flex", alignItems: "center", gap: 4 }}><CheckCircle size={11} /> Paid</span>
                            : m.status === "due"
                            ? <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> Due</span>
                            : <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Lock size={11} /> Upcoming</span>
                          }
                        </span>
                        <span>
                          {m.status === "due" && m.submittedUtr ? (
                            <div>
                              <div style={{ fontSize: 11, color: "#5B4FCF", marginBottom: 5 }}>UTR: <strong>{m.submittedUtr}</strong></div>
                              <button
                                onClick={() => confirmPayment(project._id, m._id)}
                                style={{ fontSize: 11, fontWeight: 700, background: "#0F6E56", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", cursor: "pointer" }}
                              >
                                ✓ Confirm Payment
                              </button>
                            </div>
                          ) : m.status === "due" ? (
                            <span style={{ fontSize: 11, color: "#B45309" }}>Awaiting UTR from customer</span>
                          ) : m.status === "paid" ? (
                            <span style={{ fontSize: 11, color: "#9095B0" }}>Ref: {m.utr || "—"}</span>
                          ) : (
                            <span style={{ fontSize: 11, color: "#C0C4D8" }}>—</span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ fontSize: 13, color: "#9095B0", padding: "16px 0" }}>No milestones yet — contractor needs to post first update.</div>
              )}

              {/* Contractor Earnings */}
              {(project.contractorEarnings || []).length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 10 }}>Contractor Payouts</div>
                  <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #EAECF4" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr", background: "#F8F9FC", padding: "10px 16px", fontSize: 10, fontWeight: 700, color: "#9095B0", textTransform: "uppercase" }}>
                      <span>Milestone</span><span>Amount</span><span>Status</span><span>Action</span>
                    </div>
                    {project.contractorEarnings.map((e, ei) => (
                      <div key={ei} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr", padding: "12px 16px", borderTop: "1px solid #F4F6FB", alignItems: "center" }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1B3A" }}>{e.milestoneName}</span>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>{fmt(e.amount)}</span>
                        <span style={{
                          fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block",
                          ...(e.status === "paid"
                            ? { color: "#0F6E56", background: "#E6F7F2", border: "1px solid #9FE1CB" }
                            : { color: "#B45309", background: "#FEF3E2", border: "1px solid #FAC775" })
                        }}>
                          {e.status === "paid"
                            ? <span style={{ display: "flex", alignItems: "center", gap: 4 }}><CheckCircle size={11} /> Paid</span>
                            : <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> Processing</span>
                          }
                        </span>
                        <span>
                          {e.status === "processing" ? (
                            <PayContractorForm projectId={project._id} earningId={e._id} grossAmount={e.amount} />
                          ) : (
                            <span style={{ fontSize: 11, color: "#9095B0" }}>UTR: {e.contractorUtr} · {e.contractorPaidDate}</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {projects.length === 0 && (
          <div style={{ background: "#fff", borderRadius: 20, padding: "60px 40px", textAlign: "center", border: "1px dashed #D1D5E8" }}>
            <div style={{ marginBottom: 14, display: "flex", justifyContent: "center" }}><CreditCard size={44} color="#D1D5E8" /></div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#1A1B3A", marginBottom: 6 }}>No projects yet</div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}