import {
  FaBuilding,
  FaUsers,
  FaLocationDot,
  FaAward,
  FaCity,
} from "react-icons/fa6";

const stats = [
  {
    number: "200+",
    label: "Projects Delivered",
    icon: FaBuilding,
  },
  {
    number: "80+",
    label: "Verified Contractors",
    icon: FaUsers,
  },
  {
    number: "17+",
    label: "Cities Served",
    icon: FaLocationDot,
  },
  {
    number: "3",
    label: "Office Branches",
    icon: FaCity,
  },
  {
    number: "95%",
    label: "Client Satisfaction",
    icon: FaAward,
  },
];

const TrustStats = () => {
  return (
    <section className="relative z-20 -mt-16 lg:-mt-15">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-5">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={index}
                  className={`
                    group
                    text-center
                    py-8
                    px-5
                    transition-all
                    duration-300
                    hover:bg-slate-50
                    hover:-translate-y-1
                    cursor-pointer
                    ${
                      index !== stats.length - 1
                        ? "border-r border-gray-400"
                        : ""
                    }
                    ${
                      index < stats.length - 3
                        ? "border-b lg:border-b-0 border-gray-100"
                        : ""
                    }
                  `}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center transition-all duration-300 group-hover:bg-orange-100 group-hover:scale-110">
                      <Icon className="text-orange-500 text-2xl" />
                    </div>
                  </div>

                  {/* Number */}
                  <h3 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-2">
                    {stat.number}
                  </h3>

                  {/* Label */}
                  <p className="text-base text-gray-600 font-medium">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStats;