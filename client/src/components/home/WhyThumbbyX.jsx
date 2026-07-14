import { motion } from "framer-motion";
import why1 from "../../assets/why.png";
import why2 from "../../assets/why2.png";
import why3 from "../../assets/why3.png";
import why4 from "../../assets/why4.png";
import why5 from "../../assets/why5.png";
import why6 from "../../assets/why6.png";

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

const features = [
  {
    title: "Verified Contractors",
    description:
      " Connect with thoroughly verified contractors who are selected based on quality,reliability, and proven project experience. Build with     complete confidence." ,
    image: why1,
    className: "lg:col-span-6 lg:row-span-2 h-[450px]",
  },
  {
    title: "Project Tracking",
    description:
      "Stay informed with real-time progress updates, milestone tracking, and complete visibility throughout every phase of construction.",
    image: why3,
    className: "lg:col-span-3 h-[215px]",
  },
  {
    title: "Transparent Pricing",
    description:
      "Access detailed cost breakdowns and project estimates so you always know where your budget is being invested",
    image: why4,
    className: "lg:col-span-3 h-[215px]",
  },
  {
    title: "Material Monitoring",
    description:
      "Monitor material quality, deliveries, and usage to ensure every component meets the highest construction standards..",
    image: why6,
    className: "lg:col-span-3 h-[215px]",
  },
  {
    title: "Expert Support",
    description:
      "Get dedicated guidance from experienced professionals who help you make informed decisions at every stage of the project.",
    image: why5,
    className: "lg:col-span-3 h-[215px]",
  },
];

const WhyThumbbyX = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="max-w-4xl mb-16">
          <motion.span
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="text-[#4b35a4] font-extrabold uppercase tracking-[1px] text-xl"
          >
            Why ThumbbyX
          </motion.span>

          <motion.h2
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="mt-4 text-4xl md:text-5xl font-bold text-[#211c58] leading-tight"
          >
            Building <span className="text-indigo-800 font-bold uppercase tracking-wider">
              Your Dream Home
            </span> Shouldn't Be Stressful.
          </motion.h2>

          <motion.p
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="mt-5 text-lg text-slate-600"
          >
            ThumbbyX simplifies the entire construction journey through
            verified contractors, transparent pricing, real-time tracking,
            secure payments and expert support.
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="grid lg:grid-cols-[2fr_1fr_1fr] gap-5">

          {/* BIG CARD */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="relative h-[450px] overflow-hidden rounded-[32px] group cursor-pointer shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)] hover:shadow-[0_30px_80px_-10px_rgba(0,0,0,0.6)] transition-shadow duration-500"
          >
            <img
              src={why1}
              alt="Verified Contractors"
              className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 transition-all duration-500 group-hover:from-black/100 group-hover:via-black/80 group-hover:to-black/40" />
            <div className="absolute bottom-0 left-0 w-full px-7 pb-8 text-white">
              <div className="transition duration-500 group-hover:-translate-y-2">
                <h3 className="text-3xl font-bold leading-none mb-3">
                  Verified Contractors
                </h3>
                <p className="text-white/90 opacity-0 max-h-0 transition-all duration-500 group-hover:opacity-100 group-hover:max-h-40">
                  Connect with thoroughly verified contractors who are selected based on quality,
                  reliability, and proven project experience. Build with complete confidence.
                </p>
              </div>
            </div>
          </motion.div>

          {/* COLUMN 2 */}
          <div className="flex flex-col gap-5">

            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="relative h-[215px] overflow-hidden rounded-[32px] group cursor-pointer shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)] hover:shadow-[0_30px_80px_-10px_rgba(0,0,0,0.6)] transition-shadow duration-500"
            >
              <img src={why3} alt="" className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 transition-all duration-500 group-hover:from-black/100 group-hover:via-black/80 group-hover:to-black/40" />
              <div className="absolute bottom-0 left-0 p-5 text-white w-full">
                <div className="transition duration-500 group-hover:-translate-y-2">
                  <h3 className="text-xl font-bold mb-2">Project Tracking</h3>
                  <p className="text-sm text-white/90 opacity-0 max-h-0 transition-all duration-500 group-hover:opacity-100 group-hover:max-h-28">
                    Stay informed with real-time progress updates, milestone tracking, and complete
                    visibility throughout every phase of construction.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="relative h-[215px] overflow-hidden rounded-[32px] group cursor-pointer shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)] hover:shadow-[0_30px_80px_-10px_rgba(0,0,0,0.6)] transition-shadow duration-500"
            >
              <img src={why4} alt="" className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 transition-all duration-500 group-hover:from-black/100 group-hover:via-black/80 group-hover:to-black/40" />
              <div className="absolute bottom-0 left-0 p-5 text-white w-full">
                <div className="transition duration-500 group-hover:-translate-y-2">
                  <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
                  <p className="text-sm text-white/90 opacity-0 max-h-0 transition-all duration-500 group-hover:opacity-100 group-hover:max-h-28">
                    Access detailed cost breakdowns and project estimates so you always know where
                    your budget is being invested.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* COLUMN 3 */}
          <div className="flex flex-col gap-5">

            <motion.div
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="relative h-[215px] overflow-hidden rounded-[32px] group cursor-pointer shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)] hover:shadow-[0_30px_80px_-10px_rgba(0,0,0,0.6)] transition-shadow duration-500"
            >
              <img src={why6} alt="" className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 transition-all duration-500 group-hover:from-black/100 group-hover:via-black/80 group-hover:to-black/40" />
              <div className="absolute bottom-0 left-0 p-5 text-white w-full">
                <div className="transition duration-500 group-hover:-translate-y-2">
                  <h3 className="text-xl font-bold mb-2">Material Monitoring</h3>
                  <p className="text-sm text-white/90 opacity-0 max-h-0 transition-all duration-500 group-hover:opacity-100 group-hover:max-h-28">
                    Monitor material quality, deliveries, and usage to ensure every component
                    meets the highest construction standards.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="relative h-[215px] overflow-hidden rounded-[32px] group cursor-pointer shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)] hover:shadow-[0_30px_80px_-10px_rgba(0,0,0,0.6)] transition-shadow duration-500"
            >
              <img src={why5} alt="" className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 transition-all duration-500 group-hover:from-black/100 group-hover:via-black/80 group-hover:to-black/40" />
              <div className="absolute bottom-0 left-0 p-5 text-white w-full">
                <div className="transition duration-500 group-hover:-translate-y-2">
                  <h3 className="text-xl font-bold mb-2">Expert Support</h3>
                  <p className="text-sm text-white/90 opacity-0 max-h-0 transition-all duration-500 group-hover:opacity-100 group-hover:max-h-28">
                    Get dedicated guidance from experienced professionals who help you make informed
                    decisions at every stage of the project.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyThumbbyX;