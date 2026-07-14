import { useEffect, useState, useRef } from "react";
import { getCurrentUser } from "../services/authService";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  ShieldCheck, CheckCircle, Upload, Sparkles, ArrowUpRight,
  Building2, Users, Trophy, Star, Zap, BadgeCheck,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { submitApplication, uploadDocuments }
from "../services/authService";
import { useNavigate } from "react-router-dom";
 
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};
const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const perks = [
  { icon: Users,    title: "10,000+ Homeowners",   desc: "Access a massive pool of verified homeowners actively seeking contractors." },
  { icon: Trophy,   title: "Verified Badge",        desc: "Stand out with ThumbbyX's trust badge displayed on your profile." },
  { icon: Zap,      title: "Instant Lead Alerts",   desc: "Get real-time project leads matching your specialization and city." },
  { icon: Building2,title: "Project Management",    desc: "Use our tools to track, quote, and manage all your projects in one place." },
];

const requirements = [
  { label: "GST Registration Required",        icon: BadgeCheck },
  { label: "Aadhaar Verification Required",    icon: BadgeCheck },
  { label: "Police Verification Certificate",  icon: BadgeCheck },
  { label: "Active Current Account",           icon: BadgeCheck },
  { label: "Minimum 5 Completed Houses",       icon: BadgeCheck },
  { label: "Experience In 2000+ Sq Ft Projects", icon: BadgeCheck },
];

const steps = [
  { n: "01", label: "Submit Application",     desc: "Fill out your contractor profile and upload required documents." },
  { n: "02", label: "Document Verification",  desc: "Our team reviews your GST, Aadhaar, and Police verification." },
  { n: "03", label: "Background Check",       desc: "We run a thorough background and reference check." },
  { n: "04", label: "Quality Assessment",     desc: "Portfolio review and past project quality is assessed." },
  { n: "05", label: "Approval",               desc: "You receive your ThumbbyX Verified Contractor badge." },
  { n: "06", label: "Start Receiving Leads",  desc: "Leads start flowing in from homeowners in your city." },
];

const uploads = [
  "GST Certificate", "Police Verification", "Aadhaar", "PAN", "Udyam Aadhaar", "Your Photo",
];

const stats = [
  { value: "4,200+", label: "Active Contractors" },
  { value: "36+",    label: "Cities Covered" },
  { value: "98%",    label: "Approval Rate" },
  { value: "4.9★",   label: "Avg Contractor Rating" },
];

export default function JoinUs() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [modalShownOnce, setModalShownOnce] = useState(false);
  const formRef = useRef(null);
  const observerRef = useRef(null);
  useEffect(() => {
  const checkUser = async () => {
    try {
      const res =
        await getCurrentUser();

      const user =
        res.data.user;

      setCurrentUser(user);
      if (
        user.role ===
          "contractor" &&
        user.onboardingCompleted
      ) {
        navigate(
          "/contractor/dashboard"
        );
      }
    } catch (error) {
      // not logged in or failed to fetch
      setCurrentUser(null);
      console.log(error);
    }
  };

  checkUser();
}, []);

// load saved draft if present
useEffect(() => {
  loadDraft();
  // autosave periodic
  const id = setInterval(() => saveDraft(), 10000);
  return () => clearInterval(id);
}, []);

// show modal when user scrolls to the application form and is not logged in
useEffect(() => {
  if (observerRef.current) observerRef.current.disconnect();

  observerRef.current = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          currentUser === null &&
          !modalShownOnce
        ) {
          setShowModal(true);
          setModalShownOnce(true);
        }
      });
    },
    { root: null, rootMargin: "-20%", threshold: 0.1 }
  );

  if (formRef.current) observerRef.current.observe(formRef.current);

  return () => {
    if (observerRef.current) observerRef.current.disconnect();
  };
}, [currentUser, modalShownOnce]);
const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState({});
  const [draftFilesNames, setDraftFilesNames] = useState({});
const [formData, setFormData] =
  useState({
    companyName: "",

    experienceYears: "",

    completedHouses: "",

    largestProjectSqFt: "",

    gstNumber: "",

    accountHolderName: "",

    accountNumber: "",

    ifscCode: "",
  });
 const handleFile = (doc, e) => {
  const file = e.target.files[0];

  if (!file) return;

  setFiles((prev) => ({
    ...prev,
    [doc]: file,
  }));
  // if user attaches a file, remove draft filename placeholder
  setDraftFilesNames((prev) => ({ ...prev, [doc]: undefined }));
};
const handleChange = (e) => {
  setFormData({
    ...formData,

    [e.target.name]:
      e.target.value,
  });
};
const handleSubmit = async () => {
  if (isSubmitting) return;
  setIsSubmitting(true);
  // if user is not logged in, prompt to login/signup and do not submit
  if (currentUser === null) {
    saveDraft();
    setShowModal(true);
    setModalShownOnce(true);
    toast.error("Please login or sign up to apply for verification.");
    return;
  }

  // if user info estill loading, ask them to wait
  if (typeof currentUser === 'undefined') {
    toast.info("Checking authentication — please wait a moment.");
    return;
  }
  if (!formData.experienceYears) {
      toast.error("Experience is required");
    return;
  }

  if (!formData.gstNumber) {
      toast.error("GST Number is required");
    return;
  }

  if (!formData.accountHolderName) {
      toast.error("Account Holder Name is required");
    return;
  }

  if (!formData.accountNumber) {
      toast.error("Account Number is required");
    return;
  }

  if (!formData.ifscCode) {
      toast.error("IFSC Code is required");
    return;

  }

  if (!files["GST Certificate"]) {
      toast.error("Upload GST Certificate");
  return;
}

if (!files["Police Verification"]) {
      toast.error("Upload Police Verification");
  return;
}

if (!files["Aadhaar"]) {
      toast.error("Upload Aadhaar");
  return;
}

if (!files["PAN"]) {
      toast.error("Upload PAN");
  return;
}
const documentForm =
  new FormData();

if (files["GST Certificate"]) {
  documentForm.append(
    "gstDocument",
    files["GST Certificate"]
  );
}

if (files["Aadhaar"]) {
  documentForm.append(
    "aadhaarDocument",
    files["Aadhaar"]
  );
}

if (files["PAN"]) {
  documentForm.append(
    "panDocument",
    files["PAN"]
  );
}

if (files["Police Verification"]) {
  documentForm.append(
    "policeVerificationDocument",
    files["Police Verification"]
  );
}
if (files["Udyam Aadhaar"]) {
  documentForm.append(
    "udyamDocument",
    files["Udyam Aadhaar"]
  );
}
if (files["Your Photo"]) {
  documentForm.append(
    "profilePhoto",
    files["Your Photo"]
  );
}
 try {
  console.log(formData);

await uploadDocuments(
  documentForm
);
  const response =
    await submitApplication(
      formData
    );

  toast.success(
    response.data.message
  );

 clearDraft();
  navigate("/contractor/dashboard");
  } catch (error) {
  toast.error(
    error.response?.data
      ?.message ||
      "Something went wrong"
  );
  } finally {
    setIsSubmitting(false);
  }
};

// Persist draft helpers
const DRAFT_KEY = "joinUsDraft";
const saveDraft = () => {
  try {
    const payload = {
      formData,
      files: Object.fromEntries(
        Object.entries(files).map(([k, v]) => [k, v?.name || draftFilesNames[k]])
      ),
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
  } catch (e) {
    console.log("Failed to save draft", e);
  }
};

const loadDraft = () => {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed.formData) setFormData((prev) => ({ ...prev, ...parsed.formData }));
    if (parsed.files) setDraftFilesNames(parsed.files);
  } catch (e) {
    console.log("Failed to load draft", e);
  }
};

const clearDraft = () => {
  try {
    localStorage.removeItem(DRAFT_KEY);
    setDraftFilesNames({});
  } catch (e) {
    console.log("Failed to clear draft", e);
  }
};
  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-[#fbfaff] text-[#211c58]">
        <section className="relative min-h-[92vh] grid lg:grid-cols-[1fr_1fr]">

          {/* Left dark panel */}
          <div className="relative flex flex-col justify-center overflow-hidden bg-[#100d2e] px-10 py-24 lg:px-16">
            {/* glow blobs */}
            <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#4b35a4]/30 blur-[90px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#f7a500]/15 blur-[80px]" />

            <motion.div variants={fadeLeft} initial="hidden" animate="visible" custom={0}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#c4b8ff] backdrop-blur">
                <Sparkles size={11} />
                Join ThumbbyX Network
              </span>

              <h1 className="mt-7 text-4xl font-black leading-[1.04] tracking-tight text-white md:text-6xl">
                Grow Your
                <span className="mt-1 block bg-gradient-to-r from-[#a78bfa] via-[#8a74ff] to-[#f7a500] bg-clip-text text-transparent">
                  Construction
                </span>
                Business
              </h1>

              <p className="mt-6 max-w-md text-[14px] font-medium leading-7 text-white/55">
                Become part of ThumbbyX's verified contractor network and connect
                with homeowners actively looking for trusted construction professionals.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/10 bg-white/6 px-5 py-4 backdrop-blur">
                    <p className="text-2xl font-black text-white">{s.value}</p>
                    <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="relative flex flex-col justify-center bg-[#fbfaff] px-10 py-20 lg:px-14"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#4b35a4]/8 blur-[80px]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#4b35a4]">Why Join Us</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Benefits of Joining</h2>
            <p className="mt-3 text-[14px] font-medium text-slate-400 leading-6">
              Everything you need to scale your construction business — under one roof.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {perks.map((perk, i) => {
                const Icon = perk.icon;
                return (
                  <motion.div
                    key={perk.title}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.18 + i * 0.07}
                    className="group rounded-2xl border border-[#ece9ff] bg-white p-5 shadow-[0_8px_28px_rgba(33,28,88,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(75,53,164,0.13)]"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-button-gradient text-white shadow-[0_8px_18px_rgba(75,53,164,0.28)]">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-4 text-[14px] font-black text-[#211c58]">{perk.title}</h3>
                    <p className="mt-1.5 text-[12px] font-medium leading-5 text-slate-400">{perk.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

       
        <section className="relative overflow-hidden bg-[#100d2e] py-20 px-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(75,53,164,0.25),transparent_50%),radial-gradient(circle_at_75%_30%,rgba(247,165,0,0.1),transparent_40%)]" />

          <div className="relative mx-auto max-w-7xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8a74ff]">How It Works</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">
                6-Step Verification Process
              </h2>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.07}
                  className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10"
                >
                  {/* big faded step number */}
                  <span className="absolute -right-3 -top-4 text-[72px] font-black text-white/5 select-none">
                    {step.n}
                  </span>
                  <div className="bg-brand-button-gradient mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white shadow-[0_8px_20px_rgba(75,53,164,0.35)]">
                    {step.n}
                  </div>
                  <h3 className="text-[14px] font-black text-white">{step.label}</h3>
                  <p className="mt-2 text-[12px] font-medium leading-5 text-white/45">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

  
        <section className="relative px-6 py-20">
          <div className="pointer-events-none absolute left-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#4b35a4]/8 blur-[90px]" />

          <div className="relative mx-auto max-w-7xl grid gap-12 lg:grid-cols-[1fr_1fr] items-center">

            {/* Left */}
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#4b35a4]">Requirements</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                Are You Eligible<br />to Join?
              </h2>
              <p className="mt-4 text-[14px] font-medium leading-7 text-slate-500">
                ThumbbyX maintains strict quality standards. Every contractor
                goes through our multi-step verification to ensure homeowners
                always get the best professionals.
              </p>

              {/*  card */}
              <div className="mt-8 rounded-2xl bg-[#100d2e] p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-brand-button-gradient flex h-10 w-10 items-center justify-center rounded-xl text-white">
                    <Star size={18} />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">Average</p>
                    <p className="text-[15px] font-black text-white">Contractor Rating: 4.9 / 5</p>
                  </div>
                </div>
                <p className="text-[12px] font-medium text-white/40 leading-5">
                  Our rigorous screening keeps quality high and homeowners happy.
                </p>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-3"
            >
              {requirements.map((req, i) => (
                <motion.div
                  key={req.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.06}
                  className="flex items-center gap-4 rounded-2xl border border-[#ece9ff] bg-white px-5 py-4 shadow-[0_4px_18px_rgba(33,28,88,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(75,53,164,0.1)]"
                >
                  <CheckCircle className="shrink-0 text-emerald-500" size={20} />
                  <span className="text-[14px] font-bold text-[#211c58]">{req.label}</span>
                  <span className="ml-auto text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-500 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">Required</span>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

     
     
        <section className="relative px-6 pb-24">
          <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#f7a500]/8 blur-[100px]" />

          <div className="relative mx-auto max-w-5xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-8 text-center"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#4b35a4]">Apply Now</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                Contractor Verification Application
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[14px] font-medium text-slate-400 leading-6">
                Fill the form below and our team will reach out within 48 hours.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.05}
              className="rounded-3xl border border-[#211c58]/8 bg-white shadow-[0_24px_80px_rgba(33,28,88,0.1)] overflow-hidden"
              ref={formRef}
            >
              {/* Form header strip */}
              <div className="bg-brand-button-gradient px-8 py-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">Step 1 of 2</p>
                  <h3 className="mt-1 text-lg font-black text-white">Personal & Business Info</h3>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white">
                  <ShieldCheck size={22} />
                </span>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {[
  {
    name: "experienceYears",
    type: "number",
    placeholder: "Years Of Experience",
  },
  {
    name: "gstNumber",
    type: "text",
    placeholder: "GST Number",
  },
  {
    name: "accountHolderName",
    type: "text",
    placeholder: "Account Holder Name",
  },
  {
    name: "accountNumber",
    type: "text",
    placeholder: "Account Number",
  },
  {
    name: "ifscCode",
    type: "text",
    placeholder: "IFSC Code",
  },
].map((f) => (
  <input
    key={f.name}
    name={f.name}
    value={formData[f.name]}
    onChange={handleChange}
    type={f.type}
    placeholder={f.placeholder}
    className="rounded-xl border border-[#ece9ff] bg-[#fbfaff] p-3.5 text-[14px] text-[#211c58] placeholder:text-slate-300 outline-none focus:border-[#4b35a4] focus:bg-white transition"
  />
))}

                  <select 
                   name="completedHouses"
  value={formData.completedHouses}
  onChange={handleChange}
                  className="rounded-xl border border-[#ece9ff] bg-[#fbfaff] p-3.5 text-[14px] text-[#211c58] outline-none focus:border-[#4b35a4] focus:bg-white transition">
                   <option value="">Houses Completed</option>
<option value="5">5-10</option>
<option value="10">10-25</option>
<option value="25">25-50</option>
<option value="50">50+</option>
                  </select>

                  <select 
                   name="largestProjectSqFt"
  value={formData.largestProjectSqFt}
  onChange={handleChange}
                  className="rounded-xl border border-[#ece9ff] bg-[#fbfaff] p-3.5 text-[14px] text-[#211c58] outline-none focus:border-[#4b35a4] focus:bg-white transition">
                   <option value="">
  Largest Project Completed
</option>

<option value="1000">
  Under 1000 Sq Ft
</option>

<option value="2000">
  1000–2000 Sq Ft
</option>

<option value="3000">
  2000–3000 Sq Ft
</option>

<option value="4000">
  3000+ Sq Ft
</option>
                  </select>

                </div>
              </div>

              {/* Step 2 header */}
              <div className="mx-8 mb-6 rounded-2xl border border-[#ece9ff] bg-[#f8f6ff] px-6 py-4 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-button-gradient text-white text-[12px] font-black shrink-0">2</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Step 2 of 2</p>
                  <p className="text-[14px] font-black text-[#211c58]">Upload Required Documents</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 px-8 pb-8">
                {uploads.map((doc) => (
                  <label
                    key={doc}
                    className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#d8d2f8] bg-[#f8f6ff] p-6 text-center cursor-pointer transition hover:border-[#4b35a4] hover:bg-[#f0edff]"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#ece9ff] bg-white shadow-sm group-hover:bg-brand-button-gradient group-hover:border-transparent transition duration-300">
                      <Upload className="text-[#4b35a4] group-hover:text-white transition" size={20} />
                    </span>
                    <div>
                      <p className="text-[13px] font-bold text-[#211c58]">{doc}</p>
                      {files[doc]
                        ? (<p className="mt-1 text-[10px] text-emerald-500 font-semibold truncate max-w-[120px]">{files[doc].name}</p>)
                        : draftFilesNames[doc]
                        ? (<p className="mt-1 text-[10px] text-amber-600 font-semibold truncate max-w-[120px]">Previously attached: {draftFilesNames[doc]}</p>)
                        : <p className="mt-1 text-[11px] text-slate-400">Click to browse</p>
                      }
                    </div>
                    {files[doc] && (
                      <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                        <CheckCircle size={12} />
                      </span>
                    )}
                    {!files[doc] && draftFilesNames[doc] && (
                      <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-white text-[10px]">✓</span>
                    )}
                    <input type="file" className="hidden" onChange={(e) => handleFile(doc, e)} />
                  </label>
                ))}
              </div>

              <div className="mx-8 mb-8 rounded-xl bg-[#f8f6ff] border border-[#ece9ff] p-5">
                <p className="text-[12px] font-medium text-slate-500 leading-6">
                  By submitting this application, you confirm that all information provided is accurate.
                  ThumbbyX reserves the right to verify all submitted documents before approval.
                </p>
              </div>

              <div className="px-8 pb-8">
              <button
  type="button"
  onClick={handleSubmit}
  disabled={isSubmitting}
  className="bg-brand-button-gradient w-full inline-flex items-center justify-center gap-2 rounded-xl py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_14px_36px_rgba(75,53,164,0.3)] transition hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
>
  {isSubmitting ? (
    <>
      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
      Submitting...
    </>
  ) : (
    <>
      Apply For Verification
      <ArrowUpRight size={16} />
    </>
  )}
</button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
          <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-[#211c58]">Login to Join Us</h3>
            <p className="mt-2 text-sm text-slate-600">Please login to apply or create an account to become a verified contractor and start receiving leads.</p>
            <div className="mt-6 flex gap-3">
              <button
                className="flex-1 rounded-md border border-[#4b35a4] px-4 py-2 text-sm font-semibold text-[#4b35a4]"
                onClick={() => { saveDraft(); setShowModal(false); navigate('/login'); }}
              >
                Login
              </button>
              <button
                className="flex-1 rounded-md bg-brand-button-gradient px-4 py-2 text-sm font-semibold text-white"
                onClick={() => { saveDraft(); setShowModal(false); navigate('/signup/contractor'); }}
              >
                Become a Verified Contractor
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
