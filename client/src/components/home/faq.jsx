import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus, FaQuestionCircle } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa6";

const faqs = [
  {
    question: "How does ThumbbyX verify contractors?",
    answer:
      "Every contractor goes through a rigorous multi-step verification process including Aadhaar, PAN, GST, bank account, and project history verification before being listed on the platform. We also conduct background checks and review past project quality to ensure only the best professionals are available to you.",
  },
  {
    question: "Can I track my construction project online?",
    answer:
      "Yes. ThumbbyX provides a comprehensive project tracking dashboard with real-time progress updates, document management, milestone tracking, photo uploads from the site, and complete visibility throughout every phase of construction — all from your phone or computer.",
  },
  {
    question: "How are payments managed?",
    answer:
      "Payments on ThumbbyX are milestone-based, meaning funds are only released when a verified stage of construction is completed and approved by you. This ensures complete transparency, accountability, and protection of your investment throughout the entire construction process.",
  },
  {
    question: "Which cities does ThumbbyX currently serve?",
    answer:
      "We currently serve multiple cities across India including Delhi NCR, Lucknow, Kanpur, Bengaluru, Ahmedabad, Surat, Ranchi, Dhanbad, and many more. We are rapidly expanding to new cities every quarter. Contact us to check availability in your specific location.",
  },
  {
    question: "Can I compare multiple contractors?",
    answer:
      "Absolutely. You can review and compare detailed contractor profiles including their completed projects, client ratings, years of experience, specializations, and pricing estimates — all before making any commitment. Our platform is designed to give you full confidence in your choice.",
  },
  {
    question: "Can I get real-time tracking of my construction layout?",
    answer:
      "Yes. ThumbbyX integrates site monitoring tools that allow your assigned project manager to upload daily progress photos, update milestone statuses, and flag any issues in real time. You get notified instantly so you're always in the loop no matter where you are.",
  },
];

const textVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const Faq = () => {
  const [active, setActive] = useState(null);

  const toggleFaq = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <motion.span
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="inline-block text-[#4b35a4] font-bold uppercase tracking-[3px] text-lg"
          >
            Frequently Asked Questions
          </motion.span>

          <motion.h2
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="text-4xl md:text-5xl font-bold text-[#211c58] mt-4 leading-tight"
          >
            Got Questions?{" "}
            <span className="text-[#4b35a4]">We've Got Answers.</span>
          </motion.h2>

          <motion.p
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="text-slate-500 mt-4 text-lg"
          >
            Everything you need to know before starting your construction journey.
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textVariants}
              className={`
                rounded-[24px]
                overflow-hidden
                border
                transition-all duration-300
                ${active === index
                  ? "bg-white border-[#4b35a4]/30 shadow-[0_8px_30px_rgba(75,53,164,0.15)]"
                  : "bg-white border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:border-[#4b35a4]/20 hover:shadow-[0_8px_25px_rgba(75,53,164,0.1)]"
                }
              `}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-6 text-left gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300
                    ${active === index ? "bg-[#4b35a4] text-white" : "bg-[#4b35a4]/10 text-[#4b35a4]"}
                  `}>
                    <FaQuestionCircle className="text-sm" />
                  </div>
                  <span className={`font-semibold text-lg transition-colors duration-300 ${active === index ? "text-[#211c58]" : "text-slate-700"}`}>
                    {faq.question}
                  </span>
                </div>

                <div className={`
                  w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300
                  ${active === index ? "bg-[#4b35a4] text-white rotate-180" : "bg-slate-100 text-[#4b35a4]"}
                `}>
                  {active === index ? <FaMinus className="text-xs" /> : <FaPlus className="text-xs" />}
                </div>
              </button>

              <AnimatePresence>
                {active === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <div className="px-6 pb-6 pl-[76px] text-slate-600 leading-relaxed text-base">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions card */}
<motion.div
  custom={7}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={textVariants}
  className="mt-10 rounded-[20px] overflow-hidden relative bg-white border border-[#4b35a4]/30 px-10 py-10 text-center shadow-[0_8px_30px_rgba(75,53,164,0.12)]"
>
  <h3 className="text-xl font-bold text-[#211c58]">
    Still have more questions?
  </h3>

  <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">
    Can't find the answer you're looking for? Please chat to our friendly team.
  </p>

  <button className="
    mt-6
    px-8 py-3
    bg-[#4b35a4]
    text-white
    font-bold
    text-sm
    rounded-full
    hover:bg-[#5c44c0]
    transition-all duration-300
    hover:-translate-y-0.5
    shadow-[0_4px_15px_rgba(75,53,164,0.3)]
  ">
    Get in Touch
  </button>
</motion.div>

      </div>
    </section>
  );
};

export default Faq;