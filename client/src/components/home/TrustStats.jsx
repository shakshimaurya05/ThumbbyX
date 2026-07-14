import { motion } from "framer-motion";
import {
  FaBuilding,
  FaUsers,
  FaLocationDot,
  FaAward,
  FaCity,
} from "react-icons/fa6";

const stats = [
  { number: "200+", label: "Projects Delivered", icon: FaBuilding },
  { number: "80+", label: "Verified Contractors", icon: FaUsers },
  { number: "17+", label: "Cities Served", icon: FaLocationDot },
  { number: "3", label: "Office Branches", icon: FaCity },
  { number: "95%", label: "Client Satisfaction", icon: FaAward },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const TrustStats = () => {
  return (
    <section className="relative z-20 -mt-16 lg:-mt-15">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_20px_60px_-10px_rgba(33,28,88,0.15),0_8px_20px_-5px_rgba(75,53,164,0.1)] overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-5">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  className={`
                    group
                    text-center
                    py-8
                    px-5
                    transition-all
                    duration-300
                    hover:bg-[#4b35a4]/5
                    hover:-translate-y-1
                    cursor-pointer
                    ${index !== stats.length - 1 ? "border-r border-gray-200" : ""}
                    ${index < stats.length - 3 ? "border-b lg:border-b-0 border-gray-100" : ""}
                  `}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-[#4b35a4]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#4b35a4]/20 group-hover:scale-110">
                      <Icon className="text-[#4b35a4] text-2xl" />
                    </div>
                  </div>

                  {/* Number */}
                  <h3 className="text-3xl lg:text-4xl font-bold text-[#211c58] mb-2">
                    {stat.number}
                  </h3>

                  {/* Label */}
                  <p className="text-base text-slate-500 font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStats;