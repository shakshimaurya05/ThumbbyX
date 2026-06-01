import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Home,
  Building2,
  IndianRupee,
  Sparkles,
  Clock3,
  MapPinned,
  Layers3,
  Hammer,
  PackageCheck,
  Users,
  Paintbrush,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const fieldClass =
  "h-16 w-full rounded-[22px] border border-white/60 bg-white/55 px-5 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_12px_35px_rgba(15,23,42,0.05)] outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-slate-400 focus:border-orange-300 focus:bg-white/75 focus:ring-4 focus:ring-orange-200/60";

const sectionEase = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: sectionEase },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function CostEstimator() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Patna",
    plotArea: "",
    floors: "1",
    constructionType: "Standard",
    ownLand: "Yes",
    startTime: "0-3 Months",
  });

  const [result, setResult] = useState(null);

  const rates = {
    Basic: 1800,
    Standard: 2200,
    Premium: 2800,
    Luxury: 3500,
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateCost = () => {
    const plotArea = Number(formData.plotArea);
    const floors = Number(formData.floors);

    if (!plotArea || plotArea <= 0) {
      alert("Please enter plot area");
      return;
    }

    const builtupArea = plotArea * floors;
    const rate = rates[formData.constructionType];

    const totalCost = builtupArea * rate;

    const civilWork = totalCost * 0.5;
    const materials = totalCost * 0.3;
    const labour = totalCost * 0.14;
    const finishing = totalCost * 0.06;

    setResult({
      builtupArea,
      rate,
      totalCost,
      civilWork,
      materials,
      labour,
      finishing,
    });
  };

  const breakdownItems = result
    ? [
        {
          label: "Civil Work",
          value: Math.round(result.civilWork).toLocaleString(),
          icon: Hammer,
          accent: "from-orange-400 to-amber-400",
        },
        {
          label: "Materials",
          value: Math.round(result.materials).toLocaleString(),
          icon: PackageCheck,
          accent: "from-blue-400 to-cyan-400",
        },
        {
          label: "Labour",
          value: Math.round(result.labour).toLocaleString(),
          icon: Users,
          accent: "from-purple-400 to-fuchsia-400",
        },
        {
          label: "Finishing",
          value: Math.round(result.finishing).toLocaleString(),
          icon: Paintbrush,
          accent: "from-emerald-400 to-teal-400",
        },
      ]
    : [];

  return (
    <>
      <Navbar />
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50 text-slate-950">
      <div className="pointer-events-none absolute -top-32 left-[-8%] h-96 w-96 rounded-full bg-orange-300/25 blur-3xl" />
      <div className="pointer-events-none absolute top-44 right-[-10%] h-[30rem] w-[30rem] rounded-full bg-blue-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 left-[18%] h-[28rem] w-[28rem] rounded-full bg-purple-300/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),transparent_70%)]" />

      {/* Hero */}
      <div className="relative px-6 pb-14 pt-24 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-6xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: sectionEase }}
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-orange-600 shadow-[0_12px_35px_rgba(249,115,22,0.12)] backdrop-blur-xl"
          >
            <Sparkles size={16} />
            Cost Estimator
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: sectionEase, delay: 0.08 }}
            className="mx-auto mt-7 max-w-5xl text-6xl font-semibold leading-[0.95] tracking-normal text-slate-950 md:text-7xl lg:text-8xl"
          >
            Calculate Your
            <span className="block bg-gradient-to-r from-orange-500 via-amber-500 to-blue-500 bg-clip-text text-transparent">
              Construction Cost
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: sectionEase, delay: 0.22 }}
            className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl"
          >
            Get an instant estimate for your dream home based on area, floors,
            and construction preferences.
          </motion.p>
        </div>
      </div>

      {/* Form */}
      <div className="relative mx-auto max-w-[90rem] px-5 pb-24 md:px-8 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 42, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: sectionEase, delay: 0.28 }}
          className="rounded-[40px] border border-white/50 bg-white/40 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.08)] backdrop-blur-2xl md:p-8 lg:p-10"
        >
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
                Project details
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 md:text-4xl">
                Tune your estimate
              </h2>
            </div>
            <div className="inline-flex items-center gap-3 self-start rounded-full border border-white/60 bg-white/50 px-5 py-3 text-sm font-medium text-slate-600 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl md:self-auto">
              <Clock3 size={18} className="text-orange-500" />
              Instant calculation
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={fieldClass}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={fieldClass}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={fieldClass}
            />

            <select
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className={fieldClass}
            >
              <option>0-3 Months</option>
              <option>3-6 Months</option>
              <option>6-12 Months</option>
            </select>

            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={fieldClass}
            >
              <option>Patna</option>
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Pune</option>
              <option>Bangalore</option>
              <option>Hyderabad</option>
            </select>

            <input
              type="number"
              name="plotArea"
              placeholder="Plot Area (Sq Ft)"
              value={formData.plotArea}
              onChange={handleChange}
              className={fieldClass}
            />

            <select
              name="floors"
              value={formData.floors}
              onChange={handleChange}
              className={fieldClass}
            >
              <option value="1">Ground Floor</option>
              <option value="2">G+1</option>
              <option value="3">G+2</option>
              <option value="4">G+3</option>
            </select>

            <select
              name="constructionType"
              value={formData.constructionType}
              onChange={handleChange}
              className={fieldClass}
            >
              <option>Basic</option>
              <option>Standard</option>
              <option>Premium</option>
              <option>Luxury</option>
            </select>
          </div>

          <div className="mt-8">
            <label className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Do you own a plot?
            </label>

            <div className="mt-4 flex flex-wrap gap-4">
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-[22px] border px-6 py-4 text-base font-semibold shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl transition-all duration-300 ${
                  formData.ownLand === "Yes"
                    ? "border-orange-300 bg-orange-50/80 text-orange-700 ring-4 ring-orange-100"
                    : "border-white/60 bg-white/50 text-slate-600 hover:bg-white/75"
                }`}
              >
                <input
                  type="radio"
                  name="ownLand"
                  value="Yes"
                  checked={formData.ownLand === "Yes"}
                  onChange={handleChange}
                  className="h-5 w-5 accent-orange-500"
                />
                Yes
              </label>

              <label
                className={`flex cursor-pointer items-center gap-3 rounded-[22px] border px-6 py-4 text-base font-semibold shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl transition-all duration-300 ${
                  formData.ownLand === "No"
                    ? "border-orange-300 bg-orange-50/80 text-orange-700 ring-4 ring-orange-100"
                    : "border-white/60 bg-white/50 text-slate-600 hover:bg-white/75"
                }`}
              >
                <input
                  type="radio"
                  name="ownLand"
                  value="No"
                  checked={formData.ownLand === "No"}
                  onChange={handleChange}
                  className="h-5 w-5 accent-orange-500"
                />
                No
              </label>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={calculateCost}
              className="group relative overflow-hidden rounded-[24px] bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 px-10 py-5 text-base font-bold text-white shadow-[0_18px_50px_rgba(249,115,22,0.35)] transition-all duration-300 hover:shadow-[0_24px_70px_rgba(249,115,22,0.45)]"
            >
              <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
              <span className="relative flex items-center gap-3">
                <Calculator size={20} />
                Calculate Cost
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: sectionEase }}
            className="mt-14 rounded-[40px] border border-white/50 bg-white/40 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.08)] backdrop-blur-2xl md:p-8 lg:p-10"
          >
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-[0_16px_35px_rgba(249,115,22,0.28)]">
                  <Calculator />
                </div>
                <h2 className="text-3xl font-semibold tracking-normal md:text-4xl">
                  Estimated Cost Breakdown
                </h2>
              </div>
              <div className="rounded-full border border-white/60 bg-white/50 px-5 py-3 text-sm font-semibold text-slate-500 backdrop-blur-xl">
                {formData.city} · {formData.startTime}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: sectionEase, delay: 0.1 }}
              className="relative mb-10 overflow-hidden rounded-[34px] border border-white/60 bg-white/55 p-8 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_20px_55px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:p-12"
            >
              <div className="pointer-events-none absolute -left-16 -top-24 h-56 w-56 rounded-full bg-orange-300/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 right-8 h-64 w-64 rounded-full bg-blue-300/25 blur-3xl" />

              <IndianRupee
                size={44}
                className="relative mx-auto text-orange-500"
              />

              <h3 className="relative mt-5 bg-gradient-to-r from-orange-500 via-amber-500 to-blue-600 bg-clip-text text-6xl font-semibold tracking-normal text-transparent md:text-7xl lg:text-8xl">
                ₹{result.totalCost.toLocaleString()}
              </h3>

              <p className="relative mt-4 text-base font-medium text-slate-500 md:text-lg">
                Estimated Construction Cost
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="mb-12 grid gap-5 md:grid-cols-4"
            >
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="rounded-[26px] border border-white/60 bg-white/50 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-colors hover:bg-white/70"
              >
                <Home className="mb-4 text-orange-500" />
                <p className="text-slate-500">Plot Area</p>
                <h4 className="mt-2 text-2xl font-semibold">
                  {formData.plotArea} Sq Ft
                </h4>
              </motion.div>

              <motion.div
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="rounded-[26px] border border-white/60 bg-white/50 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-colors hover:bg-white/70"
              >
                <Building2 className="mb-4 text-blue-500" />
                <p className="text-slate-500">Built-up Area</p>
                <h4 className="mt-2 text-2xl font-semibold">
                  {result.builtupArea} Sq Ft
                </h4>
              </motion.div>

              <motion.div
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="rounded-[26px] border border-white/60 bg-white/50 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-colors hover:bg-white/70"
              >
                <Layers3 className="mb-4 text-purple-500" />
                <p className="text-slate-500">Construction Type</p>
                <h4 className="mt-2 text-2xl font-semibold">
                  {formData.constructionType}
                </h4>
              </motion.div>

              <motion.div
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="rounded-[26px] border border-white/60 bg-white/50 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-colors hover:bg-white/70"
              >
                <MapPinned className="mb-4 text-emerald-500" />
                <p className="text-slate-500">Rate Used</p>
                <h4 className="mt-2 text-2xl font-semibold">
                  ₹{result.rate}/Sq Ft
                </h4>
              </motion.div>
            </motion.div>

            <h3 className="mb-6 text-2xl font-semibold tracking-normal">
              Cost Distribution
            </h3>

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="grid gap-5 md:grid-cols-2"
            >
              {breakdownItems.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    whileHover={{ y: -8, scale: 1.01 }}
                    className="group flex items-center justify-between gap-5 rounded-[28px] border border-white/60 bg-white/50 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-colors hover:bg-white/75"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ rotate: -6, scale: 1.08 }}
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-[0_14px_30px_rgba(15,23,42,0.12)]`}
                      >
                        <Icon size={22} />
                      </motion.div>
                      <span className="text-lg font-semibold text-slate-700">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-xl font-semibold text-slate-950 md:text-2xl">
                      ₹{item.value}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </div>
      </section>
      <Footer />
    </>
  );
}
