import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { API_BASE_URL } from "../services/api";

const contactCards = [
  {
    icon: Phone,
    title: "Phone Number",
    value: "+91 9296244229",
    href: "tel:+919296244229",
    dark: false,
  },
  {
    icon: Mail,
    title: "Email Address",
    value: "info@thumbbyx.com",
    href: "mailto:info@thumbbyx.com",
    dark: true,
  },
  {
    icon: MapPin,
    title: "Our Location",
    value: (
      <>
        Pushpanjali Apartment,
        <br />
        Boring Road, Patna
      </>
    ),
    href: "https://www.google.com/maps/search/?api=1&query=Pushpanjali+Apartment%2C+Boring+Road%2C+Patna",
    dark: false,
  },
];

const benefits = [
  "Get expert construction consultation",
  "Find verified contractors near you",
  "Receive transparent cost estimates",
  "Track projects with complete visibility",
  "Get support throughout your journey",
];

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    location: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_BASE_URL + "/inquiries", formData);
      toast.success("Message sent! We'll contact you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "",
        location: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  };

  const focusContactForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => formRef.current?.querySelector("input")?.focus(), 500);
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative h-[650px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
          alt="Construction site"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0a0a0c]/80" />

        {/* Purple glow blobs */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#4b35a4]/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#4b35a4]/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-start justify-center px-6 pt-24 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="font-semibold uppercase tracking-[0.3em] text-[#a78bfa]">
              Contact ThumbbyX
            </span>
            <h1 className="mt-5 text-6xl font-bold text-white md:text-7xl">
              Let&apos;s Discuss Your
              <span className="block text-[#a78bfa]">Dream Project</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-300">
              Whether you&apos;re building your dream home, hiring a contractor,
              or joining our network, we&apos;re here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="relative z-20 -mt-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid overflow-hidden rounded-[32px] md:grid-cols-3"
            style={{
              boxShadow: `
                0 4px 0 0 rgba(75,53,164,0.08),
                0 8px 0 0 rgba(75,53,164,0.05),
                0 25px 60px -10px rgba(33,28,88,0.25),
                0 50px 100px -20px rgba(75,53,164,0.2)
              `,
            }}
          >
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.a
                  key={card.title}
                  href={card.href}
                  target={card.title === "Our Location" ? "_blank" : undefined}
                  rel={card.title === "Our Location" ? "noreferrer" : undefined}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`flex items-center gap-6 p-10 transition-colors ${
                    card.dark
                      ? "bg-[#211c58] text-white hover:bg-[#2a2470]"
                      : "bg-white hover:bg-[#faf9ff]"
                  }`}
                >
                  <div className={`flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full ${
                    card.dark ? "bg-[#4b35a4]/40" : "bg-[#4b35a4]/10"
                  }`}>
                    <Icon className="text-[#4b35a4]" size={34} style={{ color: card.dark ? "#a78bfa" : "#4b35a4" }} />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${card.dark ? "text-white" : "text-[#211c58]"}`}>
                      {card.title}
                    </h3>
                    <p className={`mt-2 ${card.dark ? "text-slate-300" : "text-slate-500"}`}>
                      {card.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Benefits */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">

            {/* Form Card */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="rounded-[32px] bg-white p-10 border border-[#4b35a4]/10"
              style={{
                boxShadow: `
                  0 2px 0 0 rgba(75,53,164,0.06),
                  0 4px 0 0 rgba(75,53,164,0.04),
                  0 6px 0 0 rgba(75,53,164,0.02),
                  0 20px 40px -8px rgba(33,28,88,0.12),
                  0 40px 80px -16px rgba(75,53,164,0.1)
                `,
              }}
            >
              <span className="font-semibold uppercase tracking-wider text-[#4b35a4]">
                Get In Touch
              </span>
              <h2 className="mb-8 mt-4 text-4xl font-bold text-[#211c58]">
                Tell Us About Your Project
              </h2>

              <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-[#4b35a4] focus:ring-2 focus:ring-[#4b35a4]/10 transition text-slate-700 placeholder:text-slate-300"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-[#4b35a4] focus:ring-2 focus:ring-[#4b35a4]/10 transition text-slate-700 placeholder:text-slate-300"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-[#4b35a4] focus:ring-2 focus:ring-[#4b35a4]/10 transition text-slate-700 placeholder:text-slate-300"
                  />
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-[#4b35a4] focus:ring-2 focus:ring-[#4b35a4]/10 transition text-slate-600 bg-white"
                  >
                    <option value="" disabled>Select Inquiry Type</option>
                    <option>Build My Home</option>
                    <option>Hire Contractor</option>
                    <option>Join As Contractor</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <input
                  type="text"
                  name="location"
                  placeholder="Project Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-[#4b35a4] focus:ring-2 focus:ring-[#4b35a4]/10 transition text-slate-700 placeholder:text-slate-300"
                />

                <textarea
                  name="message"
                  rows="6"
                  placeholder="Tell us about your project requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-[#4b35a4] focus:ring-2 focus:ring-[#4b35a4]/10 transition text-slate-700 placeholder:text-slate-300 resize-none"
                />

                <motion.button
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-brand-button-gradient px-8 py-4 font-semibold text-white shadow-[0_8px_25px_rgba(75,53,164,0.4)] hover:shadow-[0_12px_35px_rgba(75,53,164,0.55)] transition-all duration-300"
                >
                  Send Message
                  <ArrowRight size={18} />
                </motion.button>
              </form>
            </motion.div>

            {/* Right Cards */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="space-y-6"
            >

              {/* Benefits Card */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-[32px] bg-[#211c58] p-7 text-white border border-[#4b35a4]/30"
                style={{
                  boxShadow: `
                    0 2px 0 0 rgba(75,53,164,0.2),
                    0 4px 0 0 rgba(75,53,164,0.15),
                    0 6px 0 0 rgba(75,53,164,0.1),
                    0 20px 40px -8px rgba(33,28,88,0.4),
                    0 40px 80px -16px rgba(75,53,164,0.3)
                  `,
                }}
              >
                <span className="font-semibold uppercase text-[#a78bfa] tracking-wider">
                  Why Contact Us
                </span>
                <h3 className="mb-4 mt-2 text-3xl font-bold">
                  Build With Confidence
                </h3>
                <div className="space-y-5">
                  {benefits.map((benefit, i) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex gap-4"
                    >
                      <CheckCircle2 className="mt-0.5 shrink-0 text-[#a78bfa]" size={20} />
                      <p className="text-slate-300">{benefit}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Working Hours Card */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-[32px] bg-white p-5 border border-[#4b35a4]/10"
                style={{
                  boxShadow: `
                    0 2px 0 0 rgba(75,53,164,0.06),
                    0 4px 0 0 rgba(75,53,164,0.04),
                    0 20px 40px -8px rgba(33,28,88,0.1),
                    0 40px 80px -16px rgba(75,53,164,0.08)
                  `,
                }}
              >
                <div className="mb-3 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#4b35a4]/10 flex items-center justify-center">
                    <Clock className="text-[#4b35a4]" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#211c58]">Working Hours</h3>
                </div>
                <p className="text-slate-500">Monday - Saturday</p>
                <p className="mt-2 font-semibold text-[#211c58]">9:00 AM - 7:00 PM</p>
              </motion.div>

              {/* CTA Card */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-[32px] bg-brand-button-gradient p-5 text-white relative overflow-hidden"
                style={{
                  boxShadow: `
                    0 2px 0 0 rgba(75,53,164,0.2),
                    0 4px 0 0 rgba(75,53,164,0.15),
                    0 6px 0 0 rgba(75,53,164,0.1),
                    0 20px 40px -8px rgba(33,28,88,0.35),
                    0 40px 80px -16px rgba(75,53,164,0.3)
                  `,
                }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-[60px] pointer-events-none" />
                <h3 className="mb-2 text-2xl font-bold relative">
                  Need Immediate Assistance?
                </h3>
                <p className="mb-4 text-white/70 relative">
                  Speak directly with our team and get answers to your construction questions.
                </p>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="tel:+919296244229"
                  className="relative inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#4b35a4] shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)] transition-all duration-300"
                >
                  <Phone size={18} />
                  Call Now
                </motion.a>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <span className="font-semibold uppercase tracking-wider text-[#4b35a4]">
              Visit Us
            </span>
            <h2 className="mt-4 text-5xl font-bold text-[#211c58]">
              Find Us On The Map
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              Visit our office or schedule a meeting with our team to discuss your project requirements.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-[40px] border border-[#4b35a4]/15"
            style={{
              boxShadow: `
                0 4px 0 0 rgba(75,53,164,0.06),
                0 25px 60px -10px rgba(33,28,88,0.15),
                0 50px 100px -20px rgba(75,53,164,0.12)
              `,
            }}
          >
            <iframe
              title="ThumbbyX Location"
              src="https://www.google.com/maps?q=Boring%20Road%20Patna&output=embed"
              width="100%"
              height="550"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white pb-15">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="relative overflow-hidden rounded-[40px] bg-[#211c58] p-8 text-center md:p-14 border border-[#4b35a4]/30"
            style={{
              boxShadow: `
                0 4px 0 0 rgba(75,53,164,0.2),
                0 8px 0 0 rgba(75,53,164,0.15),
                0 30px 80px -10px rgba(33,28,88,0.5),
                0 60px 120px -20px rgba(75,53,164,0.35)
              `,
            }}
          >
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#4b35a4]/20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#4b35a4]/15 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <span className="font-semibold uppercase tracking-[0.3em] text-[#a78bfa]">
                Start Today
              </span>
              <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                Ready To Build With Confidence?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-300">
                Whether you&apos;re planning your dream home, looking for a trusted contractor,
                or wanting to join the ThumbbyX network, we&apos;re ready to help you take the next step.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-4">
                <motion.button
                  type="button"
                  onClick={focusContactForm}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-xl bg-brand-button-gradient px-6 py-2 font-semibold text-white shadow-[0_8px_25px_rgba(75,53,164,0.5)] hover:shadow-[0_12px_35px_rgba(75,53,164,0.65)] transition-all duration-300"
                >
                  Start Your Project
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => window.location.assign("tel:+919296244229")}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-xl border border-[#4b35a4]/50 px-6 py-2 font-semibold text-white hover:border-[#a78bfa] hover:text-[#a78bfa] transition-all duration-300"
                >
                  Talk To An Expert
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
