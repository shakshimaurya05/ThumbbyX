import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Phone, Mail, MapPin, Award, Building2, Ruler, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { API_BASE_URL } from "../services/api";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ContractorPublicProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contractor, setContractor] = useState(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    city: "",
    projectType: "",
    expectedStartTime: "",
    plotArea: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConnectClick = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      setShowLoginModal(true);
      return;
    }

    setShowConnectModal(true);
  };

  const goToAuthPage = (path) => {
    setShowLoginModal(false);
    navigate(path, { state: { from: `/contractors/${id}` } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_BASE_URL + "/leads", {
        contractorId: contractor._id,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail,
        city: formData.city,
        projectType: formData.projectType,
        expectedStartTime: formData.expectedStartTime,
        plotArea: formData.plotArea,
        budget: formData.budget,
        message: formData.message,
      });

      toast.success("Request submitted successfully!");
      setShowConnectModal(false);
      setFormData({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        city: "",
        projectType: "",
        expectedStartTime: "",
        plotArea: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit request");
    }
  };

  useEffect(() => {
    const fetchContractor = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/contractor/public/${id}`);
        setContractor(res.data.contractor);
      } catch (error) {
        console.log(error);
      }
    };
    fetchContractor();
  }, [id]);

  if (!contractor) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#4b35a4] border-t-transparent" />
            <p className="text-slate-400 font-medium">Loading contractor profile...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const stats = [
    { icon: Award,    label: "Years Experience", value: contractor.experienceYears || "—" },
    { icon: Building2, label: "Houses Completed", value: contractor.completedHouses || "—" },
    { icon: Ruler,    label: "Largest Project",  value: contractor.largestProjectSqFt ? `${contractor.largestProjectSqFt} Sq Ft` : "—" },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative h-[480px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop"
          alt="Construction site"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0a0a0c]/80" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#4b35a4]/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#4b35a4]/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#a78bfa]/30 bg-[#a78bfa]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#a78bfa]">
              <CheckCircle2 size={14} />
              Verified Contractor
            </span>

            <h1 className="mt-6 text-5xl font-bold text-white md:text-6xl">
              {contractor.userId?.fullName}
            </h1>

            <p className="mx-auto mt-4 flex items-center justify-center gap-2 text-lg text-slate-300">
              <MapPin size={18} className="text-[#a78bfa]" />
              {contractor.city}, {contractor.state}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative z-20 -mt-16">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="grid overflow-hidden rounded-[32px] md:grid-cols-3"
            style={{
              boxShadow: `
                0 4px 0 0 rgba(75,53,164,0.08),
                0 8px 0 0 rgba(75,53,164,0.05),
                0 25px 60px -10px rgba(33,28,88,0.25),
                0 50px 100px -20px rgba(75,53,164,0.2)
              `,
            }}
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`flex items-center gap-6 p-10 ${
                    i === 1 ? "bg-[#211c58] text-white" : "bg-white"
                  }`}
                >
                  <div
                    className={`flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full ${
                      i === 1 ? "bg-[#4b35a4]/40" : "bg-[#4b35a4]/10"
                    }`}
                  >
                    <Icon size={34} style={{ color: i === 1 ? "#a78bfa" : "#4b35a4" }} />
                  </div>
                  <div>
                    <h3 className={`text-3xl font-bold ${i === 1 ? "text-white" : "text-[#211c58]"}`}>
                      {stat.value}
                    </h3>
                    <p className={`mt-1 ${i === 1 ? "text-slate-300" : "text-slate-500"}`}>
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About + CTA */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">

            {/* About card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="rounded-[32px] bg-white p-10 border border-[#4b35a4]/10"
              style={{
                boxShadow: `
                  0 2px 0 0 rgba(75,53,164,0.06),
                  0 4px 0 0 rgba(75,53,164,0.04),
                  0 20px 40px -8px rgba(33,28,88,0.12),
                  0 40px 80px -16px rgba(75,53,164,0.1)
                `,
              }}
            >
              <span className="font-semibold uppercase tracking-wider text-[#4b35a4]">
                About This Contractor
              </span>
              <h2 className="mb-6 mt-4 text-4xl font-bold text-[#211c58]">
                Built On Trust & Experience
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#4b35a4]/10">
                    <Award className="text-[#4b35a4]" size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#211c58]">{contractor.experienceYears || "—"} Years of Experience</h4>
                    <p className="mt-1 text-sm text-slate-500">A proven track record in residential and commercial construction.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#4b35a4]/10">
                    <Building2 className="text-[#4b35a4]" size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#211c58]">{contractor.completedHouses || "—"} Houses Completed</h4>
                    <p className="mt-1 text-sm text-slate-500">Delivered with quality craftsmanship and on-time handovers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#4b35a4]/10">
                    <Ruler className="text-[#4b35a4]" size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#211c58]">
                      {contractor.largestProjectSqFt ? `${contractor.largestProjectSqFt} Sq Ft` : "—"} Largest Project
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">Capable of handling large-scale builds with precision.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2 rounded-xl border border-[#ece9ff] bg-[#f8f6ff] px-4 py-3">
                <Star className="text-[#4b35a4]" size={18} />
                <p className="text-sm font-medium text-[#211c58]">
                  Verified & approved by ThumbbyX quality standards
                </p>
              </div>
            </motion.div>

            {/* Right CTA panel */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="space-y-6"
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative overflow-hidden rounded-[32px] bg-[#211c58] p-8 text-white border border-[#4b35a4]/30"
                style={{
                  boxShadow: `
                    0 2px 0 0 rgba(75,53,164,0.2),
                    0 4px 0 0 rgba(75,53,164,0.15),
                    0 20px 40px -8px rgba(33,28,88,0.4),
                    0 40px 80px -16px rgba(75,53,164,0.3)
                  `,
                }}
              >
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#a78bfa]/20 blur-[60px] pointer-events-none" />

                <span className="relative font-semibold uppercase text-[#a78bfa] tracking-wider">
                  Get Started
                </span>
                <h3 className="relative mb-3 mt-2 text-3xl font-bold">
                  Ready To Build Together?
                </h3>
                <p className="relative mb-6 text-slate-300 leading-7">
                  Share your project details with us and ThumbbyX will help coordinate the next steps with{" "}
                  <span className="font-bold text-white">{contractor.userId?.fullName}</span>.
                </p>

                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConnectClick}
                  className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-brand-button-gradient px-8 py-4 font-semibold text-white shadow-[0_8px_25px_rgba(75,53,164,0.4)] hover:shadow-[0_12px_35px_rgba(75,53,164,0.55)] transition-all duration-300"
                >
                  Connect With Contractor
                  <ArrowRight size={18} />
                </motion.button>
              </motion.div>

              {/* Quick info card */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-[32px] bg-white p-7 border border-[#4b35a4]/10"
                style={{
                  boxShadow: `
                    0 2px 0 0 rgba(75,53,164,0.06),
                    0 20px 40px -8px rgba(33,28,88,0.1),
                    0 40px 80px -16px rgba(75,53,164,0.08)
                  `,
                }}
              >
                <div className="mb-3 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#4b35a4]/10 flex items-center justify-center">
                    <MapPin className="text-[#4b35a4]" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#211c58]">Service Location</h3>
                </div>
                <p className="text-slate-500">{contractor.city}, {contractor.state}</p>
                <p className="mt-3 text-sm text-slate-400 leading-6">
                  Available for projects in and around this region. ThumbbyX coordinates all communication.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Login required modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close login prompt"
            className="absolute inset-0 bg-[#100d2e]/70 backdrop-blur-md"
            onClick={() => setShowLoginModal(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="connect-login-title"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_40px_120px_rgba(8,8,32,0.45)] md:p-8"
          >
            <button
              type="button"
              aria-label="Close login prompt"
              onClick={() => setShowLoginModal(false)}
              className="absolute right-5 top-5 rounded-full bg-[#f6f4ff] p-2.5 text-[#211c58] transition hover:bg-[#4b35a4] hover:text-white"
            >
              <X size={17} />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#4b35a4]">
              Connect With A Contractor
            </span>
            <h3 id="connect-login-title" className="mt-3 pr-10 text-2xl font-black tracking-tight text-[#211c58]">
              Login to continue
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Please login to send your project requirements and connect with {contractor.userId?.fullName}.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="flex-1 rounded-xl border border-[#4b35a4] px-4 py-3 text-sm font-semibold text-[#4b35a4] transition hover:bg-[#f6f4ff]"
                onClick={() => goToAuthPage("/login")}
              >
                Login
              </button>
              <button
                type="button"
                className="flex-1 rounded-xl bg-brand-button-gradient px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(75,53,164,0.25)]"
                onClick={() => goToAuthPage("/signup/customer")}
              >
                Create Account
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Connect Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#100d2e]/80 px-4 py-8 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-[0_40px_120px_rgba(8,8,32,0.45)] md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#4b35a4]">
                  Connect Request
                </span>

                <h2 className="mt-2 text-2xl font-black tracking-tight text-[#211c58]">
                  Connect With {contractor.userId?.fullName}
                </h2>

                <p className="mt-2 text-[13px] font-medium leading-6 text-slate-400">
                  Fill your project requirements below. ThumbbyX will review your request and help you connect with this contractor.
                </p>
              </div>

              <button
                onClick={() => setShowConnectModal(false)}
                className="shrink-0 rounded-full bg-[#f6f4ff] p-2.5 text-[#211c58] transition hover:bg-[#4b35a4] hover:text-white"
              >
                <X size={17} />
              </button>
            </div>

            {/* Contractor Pill */}
            <div className="mt-5 rounded-xl border border-[#ece9ff] bg-[#f8f6ff] px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Selected Contractor
              </p>
              <p className="mt-0.5 text-[13px] font-bold text-[#211c58]">
                {contractor.userId?.fullName} · {contractor.city} · Verified Contractor
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 grid gap-4 md:grid-cols-2">
              <input
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                type="text"
                placeholder="Your Full Name"
                className="rounded-xl border border-[#ece9ff] bg-[#fbfaff] p-3.5 text-[14px] text-[#211c58] placeholder:text-slate-300 outline-none focus:border-[#4b35a4] focus:bg-white focus:ring-2 focus:ring-[#4b35a4]/10 transition"
              />

              <input
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                type="tel"
                placeholder="Phone Number"
                className="rounded-xl border border-[#ece9ff] bg-[#fbfaff] p-3.5 text-[14px] text-[#211c58] placeholder:text-slate-300 outline-none focus:border-[#4b35a4] focus:bg-white focus:ring-2 focus:ring-[#4b35a4]/10 transition"
              />

              <input
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                type="email"
                placeholder="Email Address"
                className="rounded-xl border border-[#ece9ff] bg-[#fbfaff] p-3.5 text-[14px] text-[#211c58] placeholder:text-slate-300 outline-none focus:border-[#4b35a4] focus:bg-white focus:ring-2 focus:ring-[#4b35a4]/10 transition"
              />

              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                type="text"
                placeholder="Project City / Location"
                className="rounded-xl border border-[#ece9ff] bg-[#fbfaff] p-3.5 text-[14px] text-[#211c58] placeholder:text-slate-300 outline-none focus:border-[#4b35a4] focus:bg-white focus:ring-2 focus:ring-[#4b35a4]/10 transition"
              />

              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="rounded-xl border border-[#ece9ff] bg-[#fbfaff] p-3.5 text-[14px] text-[#211c58] outline-none focus:border-[#4b35a4] focus:bg-white focus:ring-2 focus:ring-[#4b35a4]/10 transition"
              >
                <option value="">Project Type</option>
                <option value="New Home Construction">New Home Construction</option>
                <option value="Villa Construction">Villa Construction</option>
                <option value="Commercial Construction">Commercial Construction</option>
                <option value="Interior & Renovation">Interior & Renovation</option>
                <option value="Turnkey Project">Turnkey Project</option>
              </select>

              <select
                name="expectedStartTime"
                value={formData.expectedStartTime}
                onChange={handleChange}
                className="rounded-xl border border-[#ece9ff] bg-[#fbfaff] p-3.5 text-[14px] text-[#211c58] outline-none focus:border-[#4b35a4] focus:bg-white focus:ring-2 focus:ring-[#4b35a4]/10 transition"
              >
                <option value="">Expected Start Time</option>
                <option value="Immediately">Immediately</option>
                <option value="0-3 Months">0-3 Months</option>
                <option value="3-6 Months">3-6 Months</option>
                <option value="6-12 Months">6-12 Months</option>
              </select>

              <input
                name="plotArea"
                value={formData.plotArea}
                onChange={handleChange}
                type="number"
                placeholder="Approx Plot Area (Sq Ft)"
                className="rounded-xl border border-[#ece9ff] bg-[#fbfaff] p-3.5 text-[14px] text-[#211c58] placeholder:text-slate-300 outline-none focus:border-[#4b35a4] focus:bg-white focus:ring-2 focus:ring-[#4b35a4]/10 transition"
              />

              <input
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                type="text"
                placeholder="Estimated Budget"
                className="rounded-xl border border-[#ece9ff] bg-[#fbfaff] p-3.5 text-[14px] text-[#211c58] placeholder:text-slate-300 outline-none focus:border-[#4b35a4] focus:bg-white focus:ring-2 focus:ring-[#4b35a4]/10 transition"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us your project requirements"
                className="md:col-span-2 rounded-xl border border-[#ece9ff] bg-[#fbfaff] p-3.5 text-[14px] text-[#211c58] placeholder:text-slate-300 outline-none focus:border-[#4b35a4] focus:bg-white focus:ring-2 focus:ring-[#4b35a4]/10 transition resize-none"
              />

              <div className="md:col-span-2 rounded-xl border border-[#ece9ff] bg-[#f7f5ff] p-4 text-[13px] font-medium leading-6 text-[#4b35a4]">
                You are requesting to connect with{" "}
                <span className="font-black">{contractor.userId?.fullName}</span>. ThumbbyX will contact you and help coordinate the next steps with this contractor.
              </div>

              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="md:col-span-2 rounded-xl bg-brand-button-gradient py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_14px_32px_rgba(75,53,164,0.28)] transition"
              >
                Submit Connect Request
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </>
  );
}
