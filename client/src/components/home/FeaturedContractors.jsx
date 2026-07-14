import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import contractorBg from "../../assets/contractors-bg.png";
import { API_BASE_URL } from "../../services/api";

const textVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const FeaturedContractors = () => {
  const [contractors, setContractors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const res = await fetch(API_BASE_URL + "/contractor/public");
        const data = await res.json();
        setContractors((data.contractors || []).slice(0, 4));
      } catch (error) {
        console.log(error);
        setContractors([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContractors();
  }, []);

  return (
    <section
      className="relative py-15 bg-cover bg-center bg-fixed overflow-hidden"
      style={{ backgroundImage: `url(${contractorBg})` }}
    >
      <div className="absolute inset-0 bg-slate-950/80" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#211c58]/50 via-transparent to-[#4b35a4]/20" />

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#4b35a4]/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#211c58]/30 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="inline-block text-[#9b8ee0] font-bold uppercase tracking-[3px] text-lg bg-[#7c6fd0]/15 px-5 py-1.5 rounded-full border border-[#7c6fd0]/40"
          >
            Featured Contractors
          </motion.span>

          <motion.h2
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="text-4xl md:text-5xl font-bold text-white mt-6 leading-tight"
          >
            Trusted Professionals For{" "}
            <span className="text-[#9b8ee0]">Your Dream Home</span>
          </motion.h2>

          <motion.p
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="text-gray-400 mt-5 max-w-2xl mx-auto text-lg"
          >
            Connect with experienced and verified contractors who have
            successfully delivered high-quality residential and commercial
            projects.
          </motion.p>
        </div>

        {contractors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contractors.map((contractor, index) => (
              <motion.div
                key={contractor._id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="
                  group
                  relative
                  rounded-[32px]
                  overflow-hidden
                  bg-gradient-to-b from-[#1a1630] to-[#0d0b1f]
                  border border-white/10
                  shadow-[0_25px_60px_-10px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)]
                  hover:shadow-[0_35px_80px_-10px_rgba(75,53,164,0.45),0_0_0_1px_rgba(155,142,224,0.2)]
                  hover:-translate-y-3
                  transition-all
                  duration-500
                  ease-out
                  cursor-pointer
                "
              >
                <div className="relative h-52 overflow-hidden bg-[#211c58]">
                  {contractor.profilePhoto?.url ? (
                    <img
                      src={contractor.profilePhoto.url}
                      alt={contractor.companyName || contractor.userId?.fullName || "Contractor"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#211c58] via-[#4b35a4] to-[#7c6fd0] text-5xl font-black text-white/80">
                      {(contractor.companyName || contractor.userId?.fullName || "C").charAt(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b1f] via-[#0d0b1f]/20 to-transparent" />

                  <div className="absolute top-3 left-3 bg-[#4b35a4]/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-[#7c6fd0]/40">
                    {contractor.experienceYears || 0} Years
                  </div>

                  <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-yellow-300 text-xs font-bold px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                    Verified
                  </div>
                </div>

                <div className="p-5">
                  <div className="w-8 h-[3px] bg-[#7c6fd0] rounded-full mb-3 transition-all duration-500 group-hover:w-16" />

                  <h3 className="text-lg font-bold text-white transition duration-300 group-hover:text-[#c4b8f0]">
                    {contractor.companyName || contractor.userId?.fullName || "Verified Contractor"}
                  </h3>

                  <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
                    <MapPin size={14} className="text-[#9b8ee0]" />
                    {[contractor.city, contractor.state].filter(Boolean).join(", ") || "Location not added"}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-xs text-gray-500">Projects</p>
                      <p className="font-semibold text-white text-sm">{contractor.completedHouses || 0} Completed</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Largest</p>
                      <p className="font-semibold text-[#9b8ee0] text-sm">{contractor.largestProjectSqFt || 0} Sq Ft</p>
                    </div>
                  </div>

                  <Link
                    to={`/contractors/${contractor._id}`}
                    className="
                      mt-5 w-full
                      py-2.5
                      rounded-[16px]
                      font-semibold
                      text-white
                      text-sm
                      bg-brand-button-gradient
                      hover:from-[#5c44c0] hover:to-[#7c62d8]
                      border border-[#7c6fd0]/30
                      shadow-[0_0_20px_rgba(75,53,164,0.3)]
                      hover:shadow-[0_0_30px_rgba(75,53,164,0.6)]
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      inline-flex
                      items-center
                      justify-center
                      no-underline
                    "
                  >
                    Connect →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-[32px] border border-white/10 bg-white/10 px-6 py-14 text-center backdrop-blur">
            <p className="text-[#9b8ee0] font-bold uppercase tracking-[3px] text-sm">
              {isLoading ? "Loading Contractors" : "No Contractors Yet"}
            </p>
            <h3 className="mt-3 text-2xl font-bold text-white">
              {isLoading ? "Fetching verified contractors..." : "Become the first verified contractor on ThumbbyX."}
            </h3>
          </div>
        )}

        <motion.div
          custom={5}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          className="text-center mt-14"
        >
          <Link to="/contractors" className="
            px-10 py-4
            inline-flex
            rounded-full
            font-semibold
            text-white
            bg-brand-button-gradient
            hover:from-[#5c44c0] hover:to-[#7c62d8]
            border border-[#7c6fd0]/40
            shadow-[0_0_30px_rgba(75,53,164,0.4)]
            hover:shadow-[0_0_50px_rgba(75,53,164,0.7)]
            transition-all
            duration-300
            hover:-translate-y-1
          ">
            View All Contractors →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedContractors;
