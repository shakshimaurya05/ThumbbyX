import { motion } from "framer-motion";
import {
  FaHome,
  FaDraftingCompass,
  FaPaintRoller,
  FaHammer,
  FaBuilding,
  FaClipboardCheck,
} from "react-icons/fa";

import servicesBg from "../../assets/service.png";

const services = [
  {
    icon: <FaHome />,
    title: "Home Construction",
    description:
      "End-to-end residential construction with verified professionals.",
  },
  {
    icon: <FaDraftingCompass />,
    title: "Architectural Design",
    description:
      "Modern floor plans and architectural solutions tailored to your needs.",
  },
  {
    icon: <FaPaintRoller />,
    title: "Interior Design",
    description:
      "Transform your house into a beautiful and functional living space.",
  },
  {
    icon: <FaHammer />,
    title: "Renovation & Remodeling",
    description:
      "Upgrade and modernize existing homes with expert guidance.",
  },
  {
    icon: <FaBuilding />,
    title: "Commercial Construction",
    description:
      "Professional construction solutions for offices and commercial projects.",
  },
  {
    icon: <FaClipboardCheck />,
    title: "Project Management",
    description:
      "Track progress, materials, documents, and payments in one place.",
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

const cardVariants = {
  hidden: { opacity: 0, scale: 1.2 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" },
  }),
};

const Services = () => {
  return (
    <section
      className="relative py-24 bg-cover bg-center bg-fixed overflow-hidden"
      style={{
        backgroundImage: `url(${servicesBg})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/82"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#211c58]/40 via-transparent to-[#4b35a4]/20"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">

          <motion.span
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="inline-block text-[#9b8ee0] font-bold uppercase tracking-[3px] text-lg bg-[#7c6fd0]/15 px-5 py-1.5 rounded-full border border-[#7c6fd0]/50"
          >
            Our Services
          </motion.span>

          <motion.h2
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="text-4xl md:text-5xl font-bold text-white mt-6 leading-tight"
          >
            Everything You Need To Build{" "}
            <span className="text-[#9b8ee0]">With Confidence</span>
          </motion.h2>

          <motion.p
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="text-gray-300 mt-5 max-w-2xl mx-auto text-lg"
          >
            From planning and design to construction and project management,
            ThumbbyX brings all essential services together under one trusted
            platform.
          </motion.p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="
                group
                bg-white/20
                backdrop-blur-xl
                border border-white/30
                rounded-[32px]
                p-8
                hover:bg-white/25
                hover:border-[#7c6fd0]/60
                hover:-translate-y-2
                hover:shadow-[0_0_30px_rgba(124,111,208,0.35)]
                transition-all
                duration-300
              "
            >
              <div className="text-5xl text-[#9b8ee0] mb-5 group-hover:scale-110 transition duration-300">
                {service.icon}
              </div>

              <div className="w-12 h-1 bg-[#7c6fd0] rounded-full mb-5"></div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h3>

              <p className="text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;