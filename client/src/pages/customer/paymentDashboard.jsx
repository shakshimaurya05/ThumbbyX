import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, CheckCircle2, Lock, ArrowRight,
  ShieldCheck, X, HelpCircle, Clock, TrendingUp,
  LayoutDashboard, Users, FolderKanban, Wallet,
  Settings, ChevronRight, QrCode, Landmark,
  Menu, Bell, Search
} from "lucide-react";
import { API_BASE_URL } from "../../services/api";
import Sidebar from "./Sidebar";


const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",  key: "dashboard" },
  { icon: FolderKanban,    label: "Projects",   key: "projects"  },
  { icon: Users,           label: "Leads",      key: "leads"     },
  { icon: Wallet,          label: "Payments",   key: "payments"  },
  { icon: Settings,        label: "Settings",   key: "settings"  },
];

const fmt = (n) => "₹" + n.toLocaleString("en-IN");

/* ── Circular Progress ── */
function CircularProgress({ pct, size = 120, stroke = 10, color = "#3b82f6" }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);

  useEffect(() => {
    const t = setTimeout(() => setOffset(circ - (pct / 100) * circ), 300);
    return () => clearTimeout(t);
  }, [pct, circ]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-xl font-bold text-slate-800">{pct}%</span>
        <span className="text-[10px] text-slate-400 font-medium">Paid</span>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function PaymentDashboard() {
  const [active, setActive]     = useState("payments");
  const [sideOpen, setSideOpen] = useState(true);
  const [modal, setModal]       = useState(false);
  const [method, setMethod]     = useState("upi");
  const [utr, setUtr]           = useState("");
  const [submitted, setSubmitted] = useState(false);
 const { id } = useParams();
  const [project, setProject] = useState(null);
  const openModal = (m) => { setMethod(m); setModal(true); setSubmitted(false); setUtr(""); };
  const closeModal = () => setModal(false);
  const handleSubmit = async () => {
  if (!dueMilestone?._id) { alert("There is no payment due right now."); return; }
  if (!utr.trim()) { alert("Please enter UTR / Transaction Reference No."); return; }
  try {
    const token = localStorage.getItem("accessToken");
    await axios.post(`${API_BASE_URL}/projects/${id}/submit-utr`, {
      milestoneId: dueMilestone?._id,
      utr,
    }, { headers: { Authorization: `Bearer ${token}` } });
    setSubmitted(true);
  } catch (err) {
    alert("Failed to submit. Please try again.");
  }
};

  const fadeUp  = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };
  const stagger = { show: { transition: { staggerChildren: 0.09 } } };
useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_BASE_URL}/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProject(res.data.project);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
  }, [id]);

  const projectName  = project?.projectName         || "Your Project";
 const customerName = project?.customerName || "";
 const TOTAL = parseInt(project?.budget) || 0;
 const milestones_scaled = (project?.milestones || [])
  .map(m => ({ ...m, amount: Math.round((m.pct / 100) * TOTAL) }));

const dueMilestone = milestones_scaled.find(m => m.status === "due");
  const totalPaid = milestones_scaled.filter(m => m.status === "paid").reduce((s, m) => s + m.amount, 0);
  const totalDue  = milestones_scaled.filter(m => m.status === "due").reduce((s, m) => s + m.amount, 0);
  const remaining = TOTAL - totalPaid;
 const paidPct   = TOTAL > 0 ? Math.round((totalPaid / TOTAL) * 100) : 0;
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">

      {/* ══ SIDEBAR ══ */}
      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className={`${sideOpen ? "w-56" : "w-16"} flex-shrink-0 bg-[#0f172a] flex flex-col transition-all duration-300 z-20`}
      >
       <Sidebar />
      </motion.aside>

      {/* ══ MAIN CONTENT ══ */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between flex-shrink-0"
        >
          <div>
            <h1 className="text-base font-semibold text-slate-800">Payment Milestones</h1>
           <p className="text-xs text-slate-400">{customerName} · {projectName}</p>
          </div>
        </motion.header>

        {/* Scrollable page */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* ── Summary Cards ── */}
          <motion.div
            variants={stagger} initial="hidden" animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6"
          >
            {/* Circular progress card */}
            <motion.div variants={fadeUp}
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col items-center justify-center"
            >
              <CircularProgress pct={paidPct} size={110} stroke={10} color="#3b82f6" />
              <p className="text-xs text-slate-400 mt-2 font-medium">Overall Progress</p>
            </motion.div>

            {/* Total */}
            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">Total Cost</p>
                <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center">
                  <Building2 size={16} className="text-blue-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-800">{fmt(TOTAL)}</p>
              <p className="text-xs text-green-500 mt-1">Includes GST & Taxes</p>
            </motion.div>

            {/* Paid */}
            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">Amount Paid</p>
                <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-green-500" />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-800">{fmt(totalPaid)}</p>
              <div className="mt-2">
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${paidPct}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                    className="h-full bg-green-500 rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Remaining */}
            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">Remaining</p>
                <div className="w-9 h-9 bg-orange-50 rounded-full flex items-center justify-center">
                  <TrendingUp size={16} className="text-orange-500" />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-800">{fmt(remaining)}</p>
              <p className="text-xs text-orange-500 mt-1 flex items-center gap-1">
                <Clock size={11} /> Due 
              </p>
            </motion.div>
          </motion.div>

          {/* ── Body ── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 200, damping: 22 }}
              className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-slate-800">Installment Schedule</h2>
                <button className="text-xs text-blue-600 flex items-center gap-1 hover:underline">
                  View Full Breakdown <ArrowRight size={12} />
                </button>
              </div>

              <div className="flex flex-col">
                {milestones_scaled.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center">
                    <Clock size={22} className="mx-auto mb-3 text-slate-400" />
                    <p className="text-sm font-medium text-slate-700">No payment milestones yet</p>
                    <p className="mt-1 text-xs text-slate-400">Milestones will appear after the contractor posts the first progress update.</p>
                  </div>
                ) : milestones_scaled.map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 * i + 0.3, type: "spring", stiffness: 220, damping: 24 }}
                    className="flex gap-3"
                  >
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ delay: 0.12 * i + 0.4, type: "spring", stiffness: 300 }}
                        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10
                          ${m.status === "paid"     ? "bg-green-500 text-white" :
                            m.status === "due"      ? "bg-blue-600 text-white"  :
                                                      "bg-slate-200 text-slate-400"}`}
                      >
                        {m.status === "paid"
                          ? <CheckCircle2 size={14} />
                          : m.status === "due"
                          ? <div className="w-2.5 h-2.5 rounded-full bg-white" />
                          : <Lock size={12} />}
                      </motion.div>
                      {i < milestones_scaled.length - 1 && (
                        <motion.div
                          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                          transition={{ delay: 0.12 * i + 0.5, duration: 0.4 }}
                          className="w-0.5 bg-slate-100 flex-1 my-1 origin-top"
                        />
                      )}
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.01, x: 2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`flex-1 mb-3 rounded-xl border px-4 py-3 cursor-pointer transition-colors
                        ${m.status === "due"
                          ? "border-blue-300 bg-blue-50"
                          : "border-slate-100 bg-white hover:border-slate-200"}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-medium ${m.status === "upcoming" ? "text-slate-400" : "text-slate-800"}`}>
                          {m.name}
                        </span>
                        {m.status === "paid" && <span className="text-xs font-semibold text-green-500">PAID</span>}
                        {m.status === "due"  && (
                          <span className="text-xs font-semibold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full border border-orange-200">
                            DUE NOW
                          </span>
                        )}
                        {m.status === "upcoming" && <span className="text-xs text-slate-400">UPCOMING</span>}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">{m.date}</span>
                        <span className={`text-sm font-semibold ${m.status === "upcoming" ? "text-slate-400" : "text-slate-700"}`}>
                          {fmt(m.amount)}
                          <span className="text-xs font-normal text-slate-400 ml-1">({m.pct}%)</span>
                        </span>
                      </div>
                      {m.utr && <p className="text-xs text-slate-400 mt-1">Ref: {m.utr}</p>}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right col */}
            <div className="flex flex-col gap-4">

              {/* Pay panel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 22 }}
                className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"
              >
                <h3 className="text-sm font-semibold text-slate-800 mb-4">Pay Pending Amount</h3>
                <p className="text-xs text-slate-400 mb-1">Total Due Now</p>
                <p className="text-2xl font-bold text-slate-800 mb-4">{fmt(totalDue)}.00</p>
                <p className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase mb-3">Choose Payment Method</p>

                {[
                  { label: "UPI / QR Code (Soon)", icon: <QrCode size={15} className="text-green-600" />, bg: "bg-green-50", key: "upi" },
                  { label: "Bank Transfer",   icon: <Landmark size={15} className="text-blue-600" />,  bg: "bg-blue-50",   key: "bank" },
                ].map((pm, i) => (
                  <motion.button
                    key={pm.key}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal(pm.key)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-slate-50 transition-all mb-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${pm.bg}`}>{pm.icon}</div>
                      <span className="text-sm font-medium text-slate-700">{pm.label}</span>
                    </div>
                    <ArrowRight size={14} className="text-slate-400" />
                  </motion.button>
                ))}

                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => openModal("bank")}
                  disabled={!dueMilestone}
                  className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  Pay Now
                </motion.button>
                <div className="flex items-center justify-center gap-4 mt-3">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1"><ShieldCheck size={11} /> SSL Secured</span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1"><CheckCircle2 size={11} /> Verified</span>
                </div>
              </motion.div>

              {/* Mini circular for due */}
              <motion.div
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 }}
                className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex items-center gap-4"
              >
                <CircularProgress pct={Math.round((totalDue / TOTAL) * 100)} size={72} stroke={7} color="#f97316" />
                <div>
                  <p className="text-xs text-slate-400 mb-1">Currently Due</p>
                  <p className="text-lg font-bold text-slate-800">{fmt(totalDue)}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ MODAL ══ */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{   opacity: 0, scale: 0.92, y: 24  }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-semibold text-slate-800">
                  {method === "upi" ? "UPI / QR Code" : "Bank Transfer"}
                </h3>
                <motion.button whileTap={{ scale: 0.9 }} onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={18} />
                </motion.button>
              </div>
              <p className="text-xs text-slate-400 mb-4">{dueMilestone?.name || "Payment milestone"} · Amount: {fmt(totalDue)}</p>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {method === "upi" && (
                      <div className="bg-slate-50 rounded-xl p-4 text-center mb-4">
                        <div className="w-28 h-28 bg-white border border-slate-200 rounded-xl mx-auto mb-3 flex items-center justify-center">
                          <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
                            <rect width="90" height="90" fill="white"/>
                            <rect x="5" y="5" width="28" height="28" rx="3" fill="#1e40af"/>
                            <rect x="9" y="9" width="20" height="20" rx="1" fill="white"/>
                            <rect x="12" y="12" width="14" height="14" fill="#1e40af"/>
                            <rect x="57" y="5" width="28" height="28" rx="3" fill="#1e40af"/>
                            <rect x="61" y="9" width="20" height="20" rx="1" fill="white"/>
                            <rect x="64" y="12" width="14" height="14" fill="#1e40af"/>
                            <rect x="5" y="57" width="28" height="28" rx="3" fill="#1e40af"/>
                            <rect x="9" y="61" width="20" height="20" rx="1" fill="white"/>
                            <rect x="12" y="64" width="14" height="14" fill="#1e40af"/>
                            <rect x="38" y="5"  width="10" height="10" fill="#1e40af"/>
                            <rect x="38" y="19" width="10" height="10" fill="#1e40af"/>
                            <rect x="57" y="38" width="10" height="10" fill="#1e40af"/>
                            <rect x="71" y="38" width="10" height="10" fill="#1e40af"/>
                            <rect x="38" y="57" width="10" height="10" fill="#1e40af"/>
                            <rect x="57" y="71" width="10" height="10" fill="#1e40af"/>
                            <rect x="71" y="57" width="10" height="10" fill="#1e40af"/>
                            <rect x="38" y="71" width="10" height="10" fill="#1e40af"/>
                          </svg>
                        </div>
                        <p className="text-sm font-semibold text-slate-700 mb-1">UPI payments coming soon</p>
                        <p className="text-xs text-slate-500 leading-relaxed">Please use bank transfer for now.</p>
                        <button
                          type="button"
                          onClick={() => setMethod("bank")}
                          className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
                        >
                          View bank details
                        </button>
                      </div>
                    )}
                    {method === "bank" && (
                      <div className="bg-slate-50 rounded-xl p-4 mb-4 space-y-2">
                        {[["Account Name","Aditya Kumar Singh"],["Account No.","52529810017964"],["IFSC Code","BARB0MAHBHO"],["Bank","Bank of Baroda"],["Branch"," Mahavir Tola Arrah branch"]].map(([k,v]) => (
                          <div key={k} className="flex justify-between text-xs">
                            <span className="text-slate-400">{k}</span>
                            <span className="font-medium text-slate-700">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {method === "bank" && <>
                    <input
                      type="text" value={utr} onChange={(e) => setUtr(e.target.value)}
                      placeholder="Enter UTR / Transaction Reference No."
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-3"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={handleSubmit}
                      className="w-full py-3 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                      I've Paid — Notify Admin
                    </motion.button>
                    </>}
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                      className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3"
                    >
                      <CheckCircle2 size={28} className="text-green-500" />
                    </motion.div>
                    <p className="text-sm font-semibold text-slate-800 mb-1">Payment Reference Submitted!</p>
                    <p className="text-xs text-slate-400">Admin will verify and update your milestone status shortly.</p>
                    <p className="text-xs text-slate-500 mt-2 font-medium">Ref: {utr}</p>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={closeModal}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Done
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
