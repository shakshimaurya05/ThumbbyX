import { motion } from "framer-motion";
import expertImage from "../../assets/service.png";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../services/api";

const textVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const TalkToExpert = () => {
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

  const handleSubmit = async () => {
    try {
      await axios.post(API_BASE_URL + "/leads", {
        contractorId: null,
        leadType: "general",
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

      toast.success("Your request has been submitted successfully!");

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

  return (
    <section className="relative py-10 bg-slate-50 overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#4b35a4]/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#211c58]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-stretch">

          {/* Left Side */}
          {/* ✅ FIX 1: Changed justify-between → justify-start + gap-6 */}
          <div className="flex flex-col justify-start gap-6">

            <div>
              <motion.span
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textVariants}
                className="inline-block text-[#4b35a4] font-bold uppercase tracking-[3px] text-sm"
              >
                Get In Touch
              </motion.span>

              <motion.h2
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textVariants}
                className="text-3xl md:text-4xl font-bold text-[#211c58] mt-2 leading-tight"
              >
                Ready to Start Your{" "}
                <span className="text-[#4b35a4]">Construction</span> Journey?
              </motion.h2>

              <motion.p
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textVariants}
                className="text-slate-500 text-sm mt-4 leading-relaxed max-w-md"
              >
                Whether it's a dream home or a landmark commercial project, our
                experts are here to guide you through every milestone.
              </motion.p>

              {/* Checklist */}
              <motion.div
                custom={4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textVariants}
                className="mt-5 space-y-2"
              >
                {[
                  "Free Initial Consultation",
                  "Expert Construction Guidance",
                  "Transparent Planning",
                  "Trusted Contractor Recommendations",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#4b35a4]/15 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#4b35a4] text-xs font-bold">✓</span>
                    </div>
                    <span className="text-slate-600 font-medium">{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ✅ FIX 2: Removed mt-8, image now flows naturally after checklist */}
            <motion.div
              custom={5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textVariants}
            >
              {/* ✅ FIX 3: Added loading="eager" and fetchpriority="high" */}
              <img
                src={expertImage}
                alt="Construction Expert"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                className="rounded-[32px] w-full object-cover"
                style={{
                  boxShadow: `
                    0 2px 0 0 rgba(75,53,164,0.08),
                    0 4px 0 0 rgba(75,53,164,0.06),
                    0 6px 0 0 rgba(75,53,164,0.04),
                    0 8px 0 0 rgba(75,53,164,0.02),
                    0 20px 40px -8px rgba(33,28,88,0.18),
                    0 40px 80px -16px rgba(75,53,164,0.15),
                    4px 8px 24px -4px rgba(75,53,164,0.12),
                    -4px 8px 24px -4px rgba(33,28,88,0.08)
                  `,
                  transform: "perspective(1000px) rotateX(1deg)",
                }}
              />
            </motion.div>
          </div>

          {/* Right Side — Form */}
          <motion.div
            custom={2}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              background: "white",
              borderRadius: "25px",
              padding: "30px",
              border: "1px solid rgba(75,53,164,0.12)",
              boxShadow: `
                0 2px 0 0 rgba(75,53,164,0.08),
                0 4px 0 0 rgba(75,53,164,0.06),
                0 6px 0 0 rgba(75,53,164,0.04),
                0 8px 0 0 rgba(75,53,164,0.02),
                0 20px 40px -8px rgba(33,28,88,0.18),
                0 40px 80px -16px rgba(75,53,164,0.15),
                4px 8px 24px -4px rgba(75,53,164,0.12),
                -4px 8px 24px -4px rgba(33,28,88,0.08)
              `,
              transform: "perspective(1000px) rotateX(1deg)",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <div className="mb-5">
              <h3 className="text-3xl font-bold text-[#211c58]">
                Expert Consultation
              </h3>
              <p className="text-slate-500 mt-2">
                Fill in your details and our team will contact you shortly.
              </p>
              <div className="w-10 h-1 bg-[#4b35a4] rounded-full mt-4" />
            </div>

            <div className="space-y-3">
              <input
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Your Full Name"
                className="w-full border border-gray-200 rounded-[16px] px-4 py-3.5 outline-none focus:border-[#4b35a4]"
              />

              <input
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border border-gray-200 rounded-[16px] px-4 py-3.5 outline-none focus:border-[#4b35a4]"
              />

              <input
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border border-gray-200 rounded-[16px] px-4 py-3.5 outline-none focus:border-[#4b35a4]"
              />

              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Project City / Location"
                className="w-full border border-gray-200 rounded-[16px] px-4 py-3.5 outline-none focus:border-[#4b35a4]"
              />

              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-[16px] px-4 py-3.5 outline-none focus:border-[#4b35a4]"
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
                className="w-full border border-gray-200 rounded-[16px] px-4 py-3.5 outline-none focus:border-[#4b35a4]"
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
                placeholder="Approx Plot Area (Sq Ft)"
                className="w-full border border-gray-200 rounded-[16px] px-4 py-3.5 outline-none focus:border-[#4b35a4]"
              />

              <input
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Estimated Budget"
                className="w-full border border-gray-200 rounded-[16px] px-4 py-3.5 outline-none focus:border-[#4b35a4]"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us about your project requirements"
                className="w-full border border-gray-200 rounded-[16px] px-4 py-3.5 outline-none focus:border-[#4b35a4] resize-none"
              />

              <button
                onClick={handleSubmit}
                type="button"
                className="w-full py-4 rounded-[16px] font-bold text-white bg-gradient-to-r from-[#4b35a4] to-[#6b52c8]"
              >
                Request Call Back →
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TalkToExpert;