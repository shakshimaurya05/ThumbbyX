import dreamHome from "../../assets/dream.png";
import familyImage from "../../assets/happy-family.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const DreamHomeShowcase = () => {
  return (
    <section className="py-13 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <span className="text-indigo-800 font-semibold uppercase tracking-wider">
              Your Dream Home
            </span>

            <h2 className="text-5xl font-bold text-gray-900 mt-4 leading-tight">
              More Than Just A House.
              <br />
              A Place Where Life Happens.
            </h2>

            <p className="text-gray-600 text-lg mt-6 leading-relaxed">
              Every family deserves a home built with care, quality,
              and trust. ThumbbyX connects you with verified professionals
              and gives you complete visibility throughout the construction journey.
            </p>

            <Link
              to="/talk-to-expert"
              className="mt-10 inline-flex bg-brand-button-gradient text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Start Your Journey
            </Link>
          </motion.div>

          {/* Right Images */}
          <motion.div
            className="relative"
             style={{
    perspective: "1800px",
  }}
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          >
            <div
  className="
    absolute
    inset-0
    translate-x-8
    translate-y-8
    rounded-[32px]
    bg-gradient-to-br
    from-indigo-200/30
    via-violet-200/20
    to-transparent
    blur-2xl
  "
/>

            <motion.img
              src={dreamHome}
              alt="Dream Home"
              className="
    relative
    z-10
    w-full
    rounded-[32px]
    border
    border-white/30
    shadow-[0_30px_80px_rgba(33,28,88,0.18)]
  "
              initial={{
                x: 120,
                opacity: 0,
                rotateY: 20,
                scale: 0.92,
              }}
              whileInView={{
                x: 0,
                opacity: 1,
                rotateY: 0,
                scale: 1,
              }}
              whileHover={{
                y: -15,
                scale: 1.03,
                rotateY: -6,
                rotateX: 3,
              }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            />

            <motion.div
              className="absolute -bottom-12 -left-12 z-15 bg-white/80
backdrop-blur-xl
border border-white/40
rounded-3xl
shadow-[0_20px_50px_rgba(33,28,88,0.15)] p-3 w-48" whileHover={{
  y: -8,
  scale: 1.05,
}}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.4,
                duration: 0.8,
              }}
            >
              <img
                src={familyImage}
                alt="Happy Family"
                className="rounded-xl"
              />

              <p className="text-sm font-medium text-center mt-2">
                Building Memories That Last A Lifetime
              </p>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default DreamHomeShowcase;
