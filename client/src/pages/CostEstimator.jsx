import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Calculator,
  Home,
  Building2,
  IndianRupee,
  Sparkles,
  MapPinned,
  Layers3,
  Hammer,
  PackageCheck,
  Users,
  Paintbrush,
} from "lucide-react";
import { API_BASE_URL } from "../services/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const fieldClass =
  "h-16 w-full rounded-[22px] border border-white/60 bg-white/90 px-5 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_12px_35px_rgba(15,23,42,0.05)] outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white/75 focus:ring-4 focus:ring-indigo-200/60";

const sectionEase = [0.22, 1, 0.36, 1];

const featureHighlights = [
  {
    title: "Zero Hidden Costs",
    description:
      "What you see is what you pay, with clear pricing and no surprise markups.",
  },
  {
    title: "Premium Materials",
    description:
      "Estimates are based on trusted IS-certified materials and vetted brand partners.",
  },
  {
    title: "End-to-End Service",
    description:
      "From design planning to handover, we coordinate every phase under one roof.",
  },
];

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
  const [errors, setErrors] = useState({});

  const cityRates = {
    // Delhi NCR
    "Delhi":          { Basic: 1750, Standard: 2200, Premium: 3200 },
    "Gurugram":       { Basic: 1900, Standard: 2400, Premium: 3500 },
    "Noida":          { Basic: 1850, Standard: 2300, Premium: 3300 },
    "Ghaziabad":      { Basic: 1750, Standard: 2200, Premium: 3200 },
    "Faridabad":      { Basic: 1700, Standard: 2100, Premium: 3000 },
    // Bihar
    "Patna":          { Basic: 1500, Standard: 1900, Premium: 2700 },
    "Gaya":           { Basic: 1400, Standard: 1800, Premium: 2600 },
    "Muzaffarpur":    { Basic: 1400, Standard: 1800, Premium: 2600 },
    "Bhagalpur":      { Basic: 1400, Standard: 1750, Premium: 2500 },
    "Darbhanga":      { Basic: 1350, Standard: 1750, Premium: 2500 },
    "Purnia":         { Basic: 1350, Standard: 1700, Premium: 2450 },
    "Arrah":          { Basic: 1350, Standard: 1700, Premium: 2450 },
    "Begusarai":      { Basic: 1350, Standard: 1700, Premium: 2450 },
    "Katihar":        { Basic: 1350, Standard: 1700, Premium: 2450 },
    "Munger":         { Basic: 1350, Standard: 1700, Premium: 2450 },
    "Chapra":         { Basic: 1350, Standard: 1700, Premium: 2450 },
    // Jharkhand
    "Ranchi":         { Basic: 1500, Standard: 1900, Premium: 2700 },
    "Dhanbad":        { Basic: 1450, Standard: 1850, Premium: 2650 },
    "Bokaro":         { Basic: 1450, Standard: 1850, Premium: 2650 },
    "Hazaribagh":     { Basic: 1400, Standard: 1800, Premium: 2600 },
    "Jamshedpur":     { Basic: 1500, Standard: 1900, Premium: 2700 },
    // West Bengal
    "Kolkata":        { Basic: 1700, Standard: 2150, Premium: 3100 },
    "Howrah":         { Basic: 1600, Standard: 2050, Premium: 2950 },
    "Siliguri":       { Basic: 1500, Standard: 1900, Premium: 2750 },
    // Odisha
    "Bhubaneswar":    { Basic: 1500, Standard: 1900, Premium: 2750 },
    "Cuttack":        { Basic: 1450, Standard: 1850, Premium: 2650 },
    // Uttar Pradesh
    "Lucknow":        { Basic: 1600, Standard: 2000, Premium: 2900 },
    "Kanpur":         { Basic: 1500, Standard: 1900, Premium: 2750 },
    "Varanasi":       { Basic: 1500, Standard: 1900, Premium: 2750 },
    "Agra":           { Basic: 1550, Standard: 1950, Premium: 2800 },
    "Aligarh":        { Basic: 1450, Standard: 1850, Premium: 2650 },
    // Rajasthan
    "Jaipur":         { Basic: 1500, Standard: 1900, Premium: 2750 },
    "Jodhpur":        { Basic: 1450, Standard: 1850, Premium: 2650 },
    "Udaipur":        { Basic: 1500, Standard: 1900, Premium: 2750 },
    // Punjab
    "Chandigarh":     { Basic: 1900, Standard: 2400, Premium: 3450 },
    "Ludhiana":       { Basic: 1700, Standard: 2150, Premium: 3100 },
    "Amritsar":       { Basic: 1650, Standard: 2100, Premium: 3000 },
    // Madhya Pradesh
    "Bhopal":         { Basic: 1500, Standard: 1900, Premium: 2750 },
    "Indore":         { Basic: 1500, Standard: 1900, Premium: 2750 },
    "Jabalpur":       { Basic: 1450, Standard: 1850, Premium: 2650 },
    // Chhattisgarh
    "Raipur":         { Basic: 1500, Standard: 1900, Premium: 2750 },
    "Bhilai":         { Basic: 1450, Standard: 1850, Premium: 2650 },
    // Assam
    "Guwahati":       { Basic: 1650, Standard: 2100, Premium: 3000 },
    "Dibrugarh":      { Basic: 1550, Standard: 1950, Premium: 2800 },
    "Silchar":        { Basic: 1500, Standard: 1900, Premium: 2750 },
    // Maharashtra
    "Mumbai":         { Basic: 2500, Standard: 3200, Premium: 4600 },
    "Pune":           { Basic: 2200, Standard: 2800, Premium: 4000 },
    "Nagpur":         { Basic: 1600, Standard: 2000, Premium: 2900 },
    "Nashik":         { Basic: 1750, Standard: 2200, Premium: 3200 },
    // Gujarat
    "Ahmedabad":      { Basic: 1700, Standard: 2150, Premium: 3100 },
    "Surat":          { Basic: 1650, Standard: 2100, Premium: 3000 },
    "Vadodara":       { Basic: 1650, Standard: 2100, Premium: 3000 },
    "Rajkot":         { Basic: 1600, Standard: 2000, Premium: 2900 },
    // Goa
    "Panaji":         { Basic: 2000, Standard: 2550, Premium: 3650 },
    // Karnataka
    "Bangalore":      { Basic: 2000, Standard: 2500, Premium: 3600 },
    "Mysore":         { Basic: 1700, Standard: 2150, Premium: 3100 },
    "Hubli":          { Basic: 1600, Standard: 2000, Premium: 2900 },
    // Telangana
    "Hyderabad":      { Basic: 1800, Standard: 2300, Premium: 3300 },
    "Warangal":       { Basic: 1550, Standard: 1950, Premium: 2800 },
    // Andhra Pradesh
    "Vijayawada":     { Basic: 1650, Standard: 2100, Premium: 3000 },
    "Visakhapatnam":  { Basic: 1700, Standard: 2150, Premium: 3100 },
    // Tamil Nadu
    "Chennai":        { Basic: 1900, Standard: 2400, Premium: 3450 },
    "Coimbatore":     { Basic: 1650, Standard: 2100, Premium: 3000 },
    "Madurai":        { Basic: 1550, Standard: 1950, Premium: 2800 },
    // Kerala
    "Kochi":          { Basic: 1800, Standard: 2300, Premium: 3300 },
    "Thiruvananthapuram": { Basic: 1750, Standard: 2200, Premium: 3200 },
    // Haryana
    "Panchkula":      { Basic: 1750, Standard: 2200, Premium: 3200 },
    "Hisar":          { Basic: 1500, Standard: 1900, Premium: 2750 },
    // Himachal Pradesh
    "Shimla":         { Basic: 1850, Standard: 2350, Premium: 3400 },
    "Dharamshala":    { Basic: 1700, Standard: 2150, Premium: 3100 },
    // Uttarakhand
    "Dehradun":       { Basic: 1700, Standard: 2150, Premium: 2900 },
    "Haridwar":       { Basic: 1600, Standard: 2050, Premium: 2950 },
    "Haldwani":       { Basic: 1500, Standard: 1900, Premium: 2750 },
    // J&K
    "Jammu":          { Basic: 1300, Standard: 1650, Premium: 2400 },
    "Srinagar":       { Basic: 1450, Standard: 1850, Premium: 2650 },
    // North East
    "Gangtok":        { Basic: 1900, Standard: 2400, Premium: 3450 },
    "Shillong":       { Basic: 1750, Standard: 2200, Premium: 3200 },
    "Agartala":       { Basic: 1550, Standard: 1950, Premium: 2800 },
    "Imphal":         { Basic: 1600, Standard: 2000, Premium: 2900 },
    "Aizawl":         { Basic: 1800, Standard: 2300, Premium: 3300 },
    "Kohima":         { Basic: 1750, Standard: 2200, Premium: 3200 },
    "Itanagar":       { Basic: 1850, Standard: 2350, Premium: 3400 },
    // Union Territories
    "Puducherry":     { Basic: 1700, Standard: 2150, Premium: 3100 },
    "Port Blair":     { Basic: 2100, Standard: 2700, Premium: 3900 },
    "Daman":          { Basic: 1750, Standard: 2200, Premium: 3200 },
    "Silvassa":       { Basic: 1700, Standard: 2150, Premium: 3100 },
    "Kavaratti":      { Basic: 2300, Standard: 2950, Premium: 4250 },
    "Leh":            { Basic: 2200, Standard: 2800, Premium: 4050 },
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // clear individual field error on change
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const calculateCost = async () => {
    const plotArea = Number(formData.plotArea);
    const floors = Number(formData.floors);

    // validate required fields
    const newErrors = {};
    if (!formData.name || !formData.name.trim()) newErrors.name = "Please enter your full name.";
    if (!formData.phone || !formData.phone.trim()) newErrors.phone = "Please enter your phone number.";
    else if (formData.phone.replace(/\D/g, '').length < 10) newErrors.phone = "Please enter a valid phone number.";
    if (!formData.email || !formData.email.trim()) newErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    if (!plotArea || plotArea <= 0) newErrors.plotArea = "Please enter a valid plot area.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const fields = Object.keys(newErrors).map((f) => f.charAt(0).toUpperCase() + f.slice(1)).join(', ');
      toast.error(`Please fill required fields: ${fields}`);
      return;
    }

   const builtupArea = plotArea * floors;
    const cityRate = cityRates[formData.city] || { Basic: 1500, Standard: 1900, Premium: 2700 };
    const rate = cityRate[formData.constructionType] || cityRate.Standard;
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

    // ── Submit lead to backend ──────────────────────────────────────────────
    try {
      await axios.post(API_BASE_URL + "/leads/cost-estimator", {
        name:             formData.name,
        phone:            formData.phone,
        email:            formData.email,
        city:             formData.city,
        plotArea:         plotArea,
        floors:           floors,
        constructionType: formData.constructionType,
        ownLand:          formData.ownLand,
        startTime:        formData.startTime,
        builtupArea:      builtupArea,
        estimatedCost:    totalCost,
        rate:             rate,
      });
      toast.success("Estimate calculated successfully! Please scroll down to see the breakdown.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to calculate estimate. Please try again later.");
    }
   
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
      <section className="relative min-h-screen overflow-hidden bg-slate-100 text-slate-950">
      <div className="pointer-events-none absolute -top-32 left-[-8%] h-96 w-96 rounded-full bg-slate-300/30 blur-3xl" />
      <div className="pointer-events-none absolute top-44 right-[-10%] h-[30rem] w-[30rem] rounded-full bg-slate-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 left-[18%] h-[28rem] w-[28rem] rounded-full bg-slate-300/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(248,250,252,0.95),transparent_70%)]" />

      {/* Hero + Estimator */}
      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 md:px-8 lg:pb-28 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] xl:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: sectionEase }}
            className="space-y-10"
          >
            <div className="max-w-3xl">
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: sectionEase }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300/40 bg-slate-100/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700"
              >
                <Sparkles size={14} className="text-cyan-600" />
                Smart estimator
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: sectionEase, delay: 0.08 }}
                className="mt-5 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
              >
                Calculate your
                <span className="block text-indigo-900">dream home cost instantly.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: sectionEase, delay: 0.16 }}
                className="mt-5 max-w-2xl text-lg leading-8 text-slate-600"
              >
                Enter your plot details to get a fast baseline estimate with a cleaner breakdown, consistent pricing language, and the same premium experience as the rest of the landing flow.
              </motion.p>
            </div>

            <div className="space-y-3">
              {featureHighlights.map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: sectionEase, delay: 0.08 }}
                  className="rounded-[15px] bg-white p-3 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                >
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Calculator size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </motion.div>
              ))}
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: sectionEase, delay: 0.14 }}
            className="relative overflow-hidden rounded-[40px] border border-slate-200/70 bg-white p-0 shadow-[0_45px_90px_rgba(15,23,42,0.12)] md:mx-auto md:w-full md:max-w-xl"
          >
            <div className="bg-[#211c58] px-10 py-4 text-white sm:px-10">
              <h2 className="text-3xl font-bold text-center tracking-tight">
                PROJECT DETAILS
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-100">
                Fill in the essentials and unlock a personalized construction estimate in seconds.
              </p>
            </div>
            <div className="px-8 py-6 sm:px-10">
              <div className="mt-10 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`${fieldClass} ${errors.name ? 'border-red-500 ring-2 ring-red-100' : ''}`}
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`${fieldClass} ${errors.phone ? 'border-red-500 ring-2 ring-red-100' : ''}`}
                  />
                  {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                </div>
              </div>

              <div className="mt-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${fieldClass} ${errors.email ? 'border-red-500 ring-2 ring-red-100' : ''}`}
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>
<div className="mt-4 grid gap-4 md:grid-cols-2">
                <select
                  name="constructionType"
                  value={formData.constructionType}
                  onChange={handleChange}
                  className={fieldClass}
                >
                  <option value="Basic">Basic — Economy finish</option>
                  <option value="Standard">Standard — Mid-range finish</option>
                  <option value="Premium">Premium — High-end finish</option>
                </select>
                <select
                  name="floors"
                  value={formData.floors}
                  onChange={handleChange}
                  className={fieldClass}
                >
                  <option value="1">Ground Floor (G)</option>
                  <option value="2">G + 1 Floor</option>
                  <option value="3">G + 2 Floors</option>
                  <option value="4">G + 3 Floors</option>
                </select>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={fieldClass}
                >
                 <optgroup label="Bihar">
                    <option>Patna</option><option>Gaya</option><option>Muzaffarpur</option>
                    <option>Bhagalpur</option><option>Darbhanga</option><option>Purnia</option>
                    <option>Arrah</option><option>Begusarai</option><option>Katihar</option>
                    <option>Munger</option><option>Chapra</option>
                  </optgroup>
                  <optgroup label="Delhi NCR">
                    <option>Delhi</option><option>Gurugram</option><option>Noida</option>
                    <option>Ghaziabad</option><option>Faridabad</option>
                  </optgroup>
                  <optgroup label="Maharashtra">
                    <option>Mumbai</option><option>Pune</option><option>Nagpur</option><option>Nashik</option>
                  </optgroup>
                  <optgroup label="Karnataka">
                    <option>Bangalore</option><option>Mysore</option><option>Hubli</option>
                  </optgroup>
                  <optgroup label="Telangana">
                    <option>Hyderabad</option><option>Warangal</option>
                  </optgroup>
                  <optgroup label="Tamil Nadu">
                    <option>Chennai</option><option>Coimbatore</option><option>Madurai</option>
                  </optgroup>
                  <optgroup label="Kerala">
                    <option>Kochi</option><option>Thiruvananthapuram</option>
                  </optgroup>
                  <optgroup label="Gujarat">
                    <option>Ahmedabad</option><option>Surat</option><option>Vadodara</option><option>Rajkot</option>
                  </optgroup>
                  <optgroup label="Uttar Pradesh">
                    <option>Lucknow</option><option>Kanpur</option><option>Varanasi</option>
                    <option>Agra</option><option>Aligarh</option>
                  </optgroup>
                  <optgroup label="Rajasthan">
                    <option>Jaipur</option><option>Jodhpur</option><option>Udaipur</option>
                  </optgroup>
                  <optgroup label="Punjab">
                    <option>Chandigarh</option><option>Ludhiana</option><option>Amritsar</option>
                  </optgroup>
                  <optgroup label="West Bengal">
                    <option>Kolkata</option><option>Howrah</option><option>Siliguri</option>
                  </optgroup>
                  <optgroup label="Jharkhand">
                    <option>Ranchi</option><option>Dhanbad</option><option>Bokaro</option>
                    <option>Hazaribagh</option><option>Jamshedpur</option>
                  </optgroup>
                  <optgroup label="Madhya Pradesh">
                    <option>Bhopal</option><option>Indore</option><option>Jabalpur</option>
                  </optgroup>
                  <optgroup label="Andhra Pradesh">
                    <option>Vijayawada</option><option>Visakhapatnam</option>
                  </optgroup>
                  <optgroup label="Odisha">
                    <option>Bhubaneswar</option><option>Cuttack</option>
                  </optgroup>
                  <optgroup label="Assam">
                    <option>Guwahati</option><option>Dibrugarh</option><option>Silchar</option>
                  </optgroup>
                  <optgroup label="Chhattisgarh">
                    <option>Raipur</option><option>Bhilai</option>
                  </optgroup>
                  <optgroup label="Haryana">
                    <option>Panchkula</option><option>Hisar</option>
                  </optgroup>
                  <optgroup label="Himachal Pradesh">
                    <option>Shimla</option><option>Dharamshala</option>
                  </optgroup>
                  <optgroup label="Uttarakhand">
                    <option>Dehradun</option><option>Haridwar</option><option>Haldwani</option>
                  </optgroup>
                  <optgroup label="Jammu & Kashmir">
                    <option>Jammu</option><option>Srinagar</option>
                  </optgroup>
                  <optgroup label="Goa">
                    <option>Panaji</option>
                  </optgroup>
                  <optgroup label="North East">
                    <option>Gangtok</option><option>Shillong</option><option>Agartala</option>
                    <option>Imphal</option><option>Aizawl</option><option>Kohima</option><option>Itanagar</option>
                  </optgroup>
                  <optgroup label="Union Territories">
                    <option>Puducherry</option><option>Port Blair</option><option>Daman</option>
                    <option>Silvassa</option><option>Kavaratti</option><option>Leh</option>
                  </optgroup>
                </select>
                <div>
                  <input
                    type="number"
                    name="plotArea"
                    placeholder="Plot Area (Sq Ft)"
                    value={formData.plotArea}
                    onChange={handleChange}
                    className={`${fieldClass} ${errors.plotArea ? 'border-red-500 ring-2 ring-red-100' : ''}`}
                  />
                  {errors.plotArea && <p className="mt-2 text-sm text-red-600">{errors.plotArea}</p>}
                </div>
              </div>

              <div className="mt-5 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={calculateCost}
                  className="group relative overflow-hidden rounded-[24px] bg-gradient-to-r from-violet-600 via-indigo-600 to-slate-900 px-10 py-5 text-base font-semibold text-white shadow-[0_18px_50px_rgba(15,23,42,0.35)] transition-all duration-300 hover:shadow-[0_24px_70px_rgba(15,23,42,0.45)]"
                >
                  <span className="absolute inset-0 bg-brand-button-gradient " />
                  <span className="relative flex items-center gap-3">
                    <Calculator size={20} />
                    Generate Estimate
                  </span>
                </motion.button>
              </div>

              <div className="mt-8 rounded-[24px] bg-slate-50 p-5 text-slate-700 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-slate-900">Steps :</h3>
                <ol className="space-y-3 text-sm leading-6">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#211c58] text-[0.7rem] font-bold text-white">1</span>
                    Fill in your details and plot information.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#211c58] text-[0.7rem] font-bold text-white">2</span>
                    Click Generate Estimate to create your personalized quote.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#211c58] text-[0.7rem] font-bold text-white">3</span>
                    Scroll down to see a detailed expenditure breakdown.
                  </li>
                </ol>
              </div>
            </div>
          </div>
          </motion.div>
        </div>
      </div>

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
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#211c58] text-white shadow-[0_16px_35px_rgba(249,115,22,0.28)]">
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
              <div className="pointer-events-none absolute -left-16 -top-24 h-56 w-56 rounded-full bg-[#211c58] blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 right-8 h-64 w-64 rounded-full bg-[#211c58] blur-3xl" />

              <IndianRupee
                size={44}
                className="relative mx-auto text-indigo-900"
              />

              <h3 className="relative mt-5 bg-brand-button-gradient bg-clip-text text-6xl font-semibold tracking-normal text-transparent md:text-7xl lg:text-8xl">
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
                <Home className="mb-4 text-indigo-900" />
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
                <Building2 className="mb-4 text-indigo-900" />
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
                <Layers3 className="mb-4 text-indigo-900" />
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
                <MapPinned className="mb-4 text-indigo-900" />
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
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-button-gradient ${item.accent} text-white shadow-[0_14px_30px_rgba(15,23,42,0.12)]`}
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
      </section>
      <Footer />
    </>
  );
}
