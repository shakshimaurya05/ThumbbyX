import { motion } from "framer-motion";
import calculatorImg from "../../assets/calculator.webp";

const CostEstimator = () => {
  return (
    <section className="py-2 px-6 bg-slate-50 mb-15">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[28px]"
          style={{
            background: "linear-gradient(135deg, #0a0f2e 60%, #1a1060 100%)",
            boxShadow: `
              0 2px 0 0 rgba(75,53,164,0.08),
              0 4px 0 0 rgba(75,53,164,0.06),
              0 6px 0 0 rgba(75,53,164,0.04),
              0 8px 0 0 rgba(75,53,164,0.02),
              0 20px 40px -8px rgba(33,28,88,0.35),
              0 40px 80px -16px rgba(75,53,164,0.3),
              4px 8px 24px -4px rgba(75,53,164,0.2),
              -4px 8px 24px -4px rgba(33,28,88,0.15)
            `,
            transform: "perspective(1200px) rotateX(1deg)",
          }}
        >

          {/* Glow blobs */}
          <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-[#4b35a4]/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-[#4b35a4]/15 rounded-full blur-[80px] pointer-events-none" />

          {/* Content */}
          <div className="relative flex items-center justify-between gap-10 px-12 py-8">

            {/* Left */}
            <div>
              <h2 className="text-3xl font-extrabold text-white leading-snug">
                Estimate Your Construction Cost
                <br />
                <span className="text-[#7c5fe6]">Instantly</span>
              </h2>

              <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-sm">
                Quickly calculate how much it will cost to build your home with
                Thumbbyx's detailed, reliable estimation tool.
              </p>

              <button className="
                mt-4
                px-6 py-3
                bg-[#3d2d8f]
                hover:bg-[#4b35a4]
                text-white
                font-bold
                text-sm
                rounded-[12px]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_0_30px_rgba(75,53,164,0.5)]
              ">
                Calculate Cost Instantly
              </button>
            </div>

            {/* Right Image */}
            <div className="flex-shrink-0 hidden md:block">
              <img
                src={calculatorImg}
                alt="Calculator"
                className="w-[300px] xl:w-[340px] object-contain drop-shadow-2xl"
              />
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CostEstimator;