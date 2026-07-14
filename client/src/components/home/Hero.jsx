import { ArrowRight, Calculator, Cuboid, Plus, Wifi } from "lucide-react";
import heroVideo from "../../assets/hero.mp4";
import contractorOne from "../../assets/contractors/contractor1.jpg";
import contractorTwo from "../../assets/contractors/contractor2.jpg";
import contractorThree from "../../assets/contractors/contractor3.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const stats = [
  {
    icon: Cuboid,
    title: "Precise",
    text: "Visualize your project in stunning 3D detail.",
  },
  {
    icon: Wifi,
    title: "Real-Time",
    text: "Track progress with live camera feeds and data.",
  },
  {
    icon: Calculator,
    title: "Efficient",
    text: "Get accurate cost estimations instantly.",
  },
];

const avatars = [contractorOne, contractorTwo, contractorThree];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(100,80,220,0.12),transparent_28%),radial-gradient(circle_at_58%_48%,rgba(33,28,88,0.08),transparent_36%)]" />
      <div className="pointer-events-none absolute -right-28 top-12 h-[500px] w-[500px] rounded-full border-[60px] border-indigo-50/70" />

      <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-violet-50 px-5 py-1.5 text-[10px] font-semibold uppercase tracking-[1.2px] text-indigo-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              <span className="h-2 w-2 rounded-full bg-indigo-800" />
              Transforming Construction With Tech
            </div>

            <h1 className="max-w-3xl text-[36px] font-bold leading-[1.12] tracking-tight text-[#211c58] md:text-[46px] lg:text-[54px]">
              Your Dream Home,
              <span className="block pb-2 bg-gradient-to-r from-[#4b35a4] to-[#7b61ff] bg-clip-text text-transparent">
                Digitally Crafted.
              </span>
            </h1>

            <p className="mt-2 max-w-xl text-base font-medium leading-7 text-[#16165f]">
              Transforming Construction with Tech. Precise 3D visualization and
              real-time monitoring for your dream home.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-6">
              <Link
                to="/how-it-works"
                className="bg-brand-button-gradient inline-flex items-center gap-3 rounded-2xl px-6 py-2.5 text-[14px] font-semibold text-white no-underline shadow-[0_16px_30px_rgba(33,28,88,0.24)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_38px_rgba(33,28,88,0.28)]"
              >
                Explore Our Work
                <ArrowRight size={16} />
              </Link>

              <div className="flex items-center gap-2.5 rounded-full bg-white px-4 py-2 shadow-[0_12px_32px_rgba(33,28,88,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]">
                <div className="flex -space-x-3">
                  {avatars.map((avatar) => (
                    <img
                      key={avatar}
                      src={avatar}
                      alt=""
                      className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-md"
                    />
                  ))}
                  <span className="bg-brand-button-gradient flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-white shadow-md">
                    <Plus size={14} />
                  </span>
                </div>

                <div>
                  <p className="text-[13px] font-bold leading-tight text-[#211c58]">
                    500+ Happy Homeowners
                  </p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[1.8px] text-slate-400">
                    Joined The Revolution
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

         <motion.div
  className="relative"
  initial={{
    scale: 0.1,
    opacity: 0,
  }}
  animate={{
    scale: 1,
    opacity: 1,
  }}
  transition={{
    duration: 1.4,
    ease: "easeOut",
  }}
>
            <div className="absolute -inset-5 rounded-[34px] bg-indigo-100/60 blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/35 p-3 shadow-[0_28px_70px_rgba(33,28,88,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl">
              <video
                src={heroVideo}
                className="aspect-[16/9] w-full rounded-[22px] object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-13 grid gap-5 lg:grid-cols-3"
          initial={{
            y: 80,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.4,
          }}
        >
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-[22px] border border-white bg-violet-50/80 px-4 py-3 shadow-[0_14px_35px_rgba(33,28,88,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]"
              >
                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-[18px] bg-white text-indigo-700 shadow-[0_12px_28px_rgba(33,28,88,0.08)]">
                  <Icon size={25} strokeWidth={2.2} />
                </div>

                <div>
                  <h3 className="text-lg font-bold leading-tight text-[#211c58]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[13px] font-medium text-[#2f2a88]">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
