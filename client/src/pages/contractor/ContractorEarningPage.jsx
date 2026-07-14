import { useEffect, useState } from "react";
import axios from "axios";
import ContractorSidebar from "./ContractorSidebar";
import { API_BASE_URL } from "../../services/api";

const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

export default function ContractorEarningsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(API_BASE_URL + "/projects/my-projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data.projects);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const totalEarned = projects.reduce((s, p) =>
    s + (p.contractorEarnings || [])
      .filter(e => e.status === "paid")
      .reduce((a, e) => a + (e.payableAmt || e.amount), 0), 0);

  const totalProcessing = projects.reduce((s, p) =>
    s + (p.contractorEarnings || [])
      .filter(e => e.status === "processing")
      .reduce((a, e) => a + e.amount, 0), 0);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F4F6FB", fontFamily: "'Inter', sans-serif" }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}`}</style>
      <ContractorSidebar />

      <div style={{ flex: 1, padding: "32px 40px" }}>
        {/* Heading */}
        <div style={{ marginBottom: 24, animation: "fadeUp 0.4s ease forwards", opacity: 0 }}>
          <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 6 }}>Finance</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: "#1A1B3A", margin: "0 0 4px" }}>My Earnings</h1>
          <p style={{ fontSize: 13, color: "#6B7280" }}>Track your payments project wise. Payments are made within 2 days of customer verification.</p>
        </div>

        {/* Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14, marginBottom: 28, animation: "fadeUp 0.4s ease 0.06s forwards", opacity: 0 }}>
          {[
            { label: "Total Earned",        val: fmt(totalEarned),      icon: "✅", color: "#0F6E56", bg: "#E6F7F2", border: "#9FE1CB" },
            { label: "Processing", val: fmt(totalProcessing),  icon: "⏳", color: "#B45309", bg: "#FEF3E2", border: "#FAC775" },
          ].map(s => (
            <div key={s.label} style={{
              background: "#fff", borderRadius: 14, padding: "18px 22px",
              border: `1px solid ${s.border}`, display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{ width: 44, height: 44, background: s.bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "#9095B0", fontWeight: 600 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Project wise earnings */}
        <div style={{ display: "grid", gap: 18 }}>
          {projects.map((project, i) => {
            const earnings = project.contractorEarnings || [];
            if (earnings.length === 0) return null;

            return (
              <div key={project._id} style={{
                background: "#fff", borderRadius: 20, padding: "24px 28px",
                border: "1px solid #EAECF4", boxShadow: "0 2px 14px rgba(91,79,207,0.06)",
                animation: `fadeUp 0.5s ease ${i * 0.07}s forwards`, opacity: 0,
              }}>
                {/* Project header */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: "#1A1B3A", marginBottom: 3 }}>{project.projectName}</div>
                  <div style={{ fontSize: 12, color: "#9095B0" }}>👤 {project.customerName} &nbsp;·&nbsp; 📍 {project.city}</div>
                </div>

                {/* Earnings table */}
                <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #EAECF4" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", background: "#F8F9FC", padding: "10px 16px", fontSize: 10, fontWeight: 700, color: "#9095B0", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    <span>Milestone</span>
                    <span>You Receive</span>
                    <span>Status</span>
                    <span>Details</span>
                  </div>
                  {earnings.map((e, ei) => (
                    <div key={ei} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "13px 16px", borderTop: "1px solid #F4F6FB", alignItems: "center" }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1B3A" }}>{e.milestoneName}</span>

                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1B3A" }}>
                          {e.status === "paid" ? fmt(e.payableAmt || e.amount) : fmt(e.amount)}
                        </div>
                        {/* Show the deduction line if commission was cut */}
                        {e.status === "paid" && e.commissionAmt > 0 && (
                          <div style={{ fontSize: 10, color: "#B45309", marginTop: 2 }}>
                            −{fmt(e.commissionAmt)} deducted
                          </div>
                        )}
                      </div>

                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block",
                        ...(e.status === "paid"
                          ? { color: "#0F6E56", background: "#E6F7F2", border: "1px solid #9FE1CB" }
                          : { color: "#B45309", background: "#FEF3E2", border: "1px solid #FAC775" })
                      }}>
                        {e.status === "paid" ? "✅ Paid" : "⏳ Processing"}
                      </span>

                      <span style={{ fontSize: 11, color: "#9095B0", lineHeight: 1.8 }}>
                        {e.status === "paid" ? (
                          <>
                            Paid on {e.contractorPaidDate}<br />
                            UTR: {e.contractorUtr}<br />
                            {e.commissionAmt > 0 && (
                              <span style={{ color: "#B45309" }}>
                                {e.commissionPct}% cut (−{fmt(e.commissionAmt)})
                              </span>
                            )}
                            {e.adminNote && (
                              <>
                                <br />
                                <span style={{ color: "#5B4FCF", fontStyle: "italic" }}>
                                  📝 "{e.adminNote}"
                                </span>
                              </>
                            )}
                          </>
                        ) : (
                          <>Customer paid {e.customerPaidDate}<br />Will be paid within 2 days</>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {projects.every(p => (p.contractorEarnings || []).length === 0) && (
            <div style={{ background: "#fff", borderRadius: 20, padding: "60px 40px", textAlign: "center", border: "1px dashed #D1D5E8" }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>💰</div>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#1A1B3A", marginBottom: 6 }}>No earnings yet</div>
              <div style={{ fontSize: 13, color: "#9095B0" }}>Earnings will appear here once customer payments are verified.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}