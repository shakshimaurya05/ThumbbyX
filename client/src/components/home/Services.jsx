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

const Services = () => {
  return (
    <section
      className="relative py-24 bg-cover bg-center bg-fixed overflow-hidden"
      style={{
        backgroundImage: `url(${servicesBg})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/75"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/50 via-transparent to-orange-950/30"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-orange-400 font-semibold uppercase tracking-[3px]">
            Our Services
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Everything You Need To Build
            <span className="text-orange-400"> With Confidence</span>
          </h2>

          <p className="text-gray-300 mt-5 max-w-2xl mx-auto text-lg">
            From planning and design to construction and project management,
            ThumbbyX brings all essential services together under one trusted
            platform.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="
                group
                bg-white/10
                backdrop-blur-xl
                border border-white/20
                rounded-3xl
                p-8
                hover:bg-white/15
                hover:border-orange-400/40
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              <div className="text-5xl text-orange-400 mb-5 group-hover:scale-110 transition duration-300">
                {service.icon}
              </div>

              <div className="w-12 h-1 bg-orange-400 rounded-full mb-5"></div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h3>

              <p className="text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
};

export default Services;