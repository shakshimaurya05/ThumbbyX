import { motion } from "framer-motion";
import {
  CheckCircle2,
  Eye,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import aboutVideo from "../assets/about.mp4";
import founderImage from "../assets/Founder.jpeg";
const values = [
  {
    icon: ShieldCheck,
    title: "Transparency",
    description:
      "Every update, document, and milestone is visible throughout the construction journey.",
  },
  {
    icon: HeartHandshake,
    title: "Trust",
    description:
      "We connect homeowners only with verified contractors who meet our standards.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Technology helps simplify planning, tracking, and communication.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Every feature is designed to improve the homeowner experience.",
  },
];

const problemPoints = [
  "Verified contractors only",
  "Transparent project updates",
  "Cost visibility & planning",
  "Organized documentation",
  "Better communication",
];


const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 2.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
  },
};
const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 2.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
  },
};

const staggerGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const cardHover = {
  y: -12,
  scale: 1.03,
  rotateX: 3,
  rotateY: -3,
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
  },
};

export default function About() {
  return (
    <>
      <Navbar />
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">

        {/* Background blobs */}
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 w-full relative z-10">
          <div className="mx-auto max-w-7xl px-6">

            {/* ── Hero: text LEFT, video RIGHT ── */}
            <div className="mb-24 grid items-center gap-16 lg:grid-cols-2">
              {/* Left – text */}
              <motion.div
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                <span className="font-semibold uppercase tracking-[0.25em] text-blue-800">
                  About ThumbbyX
                </span>

                <h2 className="mt-4 text-5xl font-bold text-slate-900 md:text-6xl">
                  Building Trust In Every
                  <span className="block text-blue-900">
                    Construction Journey
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-lg text-slate-600">
                  ThumbbyX is transforming the way homeowners and contractors connect
                  through transparency, technology, and trust.
                </p>
              </motion.div>

              {/* Right – video */}
              <motion.div
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                className="relative"
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-blue-100"
                />
                <video
                  src={aboutVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="relative z-10 w-full rounded-[32px] object-cover shadow-2xl h-[380px]"
                />
              </motion.div>
            </div>

            {/* ── Our Story── */}
            <div className="mb-28 grid items-center gap-16 lg:grid-cols-2">
              {/*left */}
              <motion.div
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                className="relative"
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-orange-100"
                />
                {/* Decorative ring */}
                <div className="absolute -bottom-4 -left-4 h-full w-full rounded-[32px] border-2 border-blue-200 z-0" />
                <img
                  src={founderImage}
                  alt="Founder"
                 className="relative z-10 w-full max-w-[380px] mx-auto rounded-[32px] object-cover object-top shadow-2xl aspect-[3/4]"
                />
                {/* Floating name badge */}
                <div className="absolute bottom-6 left-6 z-20 rounded-2xl bg-white/90 backdrop-blur-sm px-5 py-3 shadow-xl">
                  <p className="font-bold text-slate-900 text-sm">Aditya Kumar Singh</p>
                  <p className="text-xs text-blue-700 font-medium">Founder, ThumbbyX</p>
                </div>
              </motion.div>
              {/* right */}
              <motion.div
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                <span className="font-semibold uppercase text-blue-900">
                  Our Story
                </span>

                <h3 className="mb-6 mt-4 text-4xl font-bold text-slate-900">
                  Why ThumbbyX Was Created
                </h3>

                <p className="mb-5 leading-relaxed text-slate-600">
                  Building a home is one of the biggest investments a family will
                  ever make, yet many homeowners face unreliable contractors,
                  unclear pricing, delays, and poor communication.
                </p>

                <p className="mb-5 leading-relaxed text-slate-600">
                  We believed there had to be a better way. ThumbbyX was built to
                  bring verified professionals, transparent processes, and
                  technology together on one platform.
                </p>

                <p className="leading-relaxed text-slate-600">
                  We&apos;re on a mission to make home construction simple,
                  transparent, and stress-free for every homeowner.
                </p>

                <div className="mt-8 border-l-4 border-blue-900 pl-5">
                  <h4 className="font-bold text-slate-900">Aditya Kumar Singh</h4>
                  <p className="text-slate-500">Founder, ThumbbyX</p>
                </div>
              </motion.div>

              
            </div>

            {/* ── Why We Started + Quote ── */}
            <motion.div
              variants={staggerGroup}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="mb-28 grid gap-8 lg:grid-cols-2"
            >
              <motion.div
                variants={fadeLeft}
                whileHover={cardHover}
                className="group rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_25px_80px_rgba(15,23,42,0.15)] bg-slate-100 p-10"
              >
                <span className="font-semibold uppercase text-blue-900">
                  Why We Started
                </span>

                <h3 className="mb-5 mt-4 text-3xl font-bold text-slate-900">
                  Solving Real Problems
                </h3>

                <p className="mb-6 text-slate-600">
                  Homeowners deserve complete visibility and control over their
                  construction projects.
                </p>

                <ul className="space-y-4 text-slate-700">
                  {problemPoints.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <CheckCircle2 className="text-blue-950" size={20} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                variants={fadeRight}
                whileHover={cardHover}
                className="flex items-center group rounded-[32px] bg-slate-900 p-10 text-white backdrop-blur-xl border border-white/40 shadow-[0_25px_80px_rgba(15,23,42,0.15)]"
              >
                <div>
                  <span className="font-semibold uppercase text-blue-300">
                    Founder Quote
                  </span>

                  <h3 className="mt-6 text-3xl font-bold leading-relaxed">
                    &quot;Building a home should be one of life&apos;s most exciting
                    journeys - not one of its most stressful.&quot;
                  </h3>

                  <p className="mt-8 text-slate-300">- Aditya Kumar Singh</p>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Mission & Vision ── */}
            <motion.div
              variants={staggerGroup}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="mb-28 grid gap-8 md:grid-cols-2"
            >
              <motion.div
                variants={fadeLeft}
                whileHover={cardHover}
                className="group rounded-[32px] bg-white/80 backdrop-blur-xl shadow-[0_25px_80px_rgba(15,23,42,0.15)] border border-slate-200 p-10"
              >
                <Target className="mb-6 text-blue-950" size={40} />

                <h3 className="mb-4 text-3xl font-bold text-slate-900">
                  Our Mission
                </h3>

                <p className="leading-relaxed text-slate-600">
                  To simplify home construction by connecting homeowners with
                  trusted contractors while delivering transparency, accountability,
                  and peace of mind.
                </p>
              </motion.div>

              <motion.div
                variants={fadeRight}
                whileHover={cardHover}
                className="group rounded-[32px] backdrop-blur-xl border border-white/40 shadow-[0_25px_80px_rgba(15,23,42,0.15)] bg-slate-100 p-10"
              >
                <Eye className="mb-6 text-blue-950" size={40} />

                <h3 className="mb-4 text-3xl font-bold text-slate-900">
                  Our Vision
                </h3>

                <p className="leading-relaxed text-slate-600">
                  To become India&apos;s most trusted construction ecosystem, where
                  homeowners and contractors build through transparency, trust, and
                  technology.
                </p>
              </motion.div>
            </motion.div>

            {/* ── Core Values ── */}
            <div className="mb-28">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                className="mb-14 text-center"
              >
                <span className="font-semibold uppercase text-blue-800">
                  Core Values
                </span>

                <h3 className="mt-4 text-4xl font-bold text-slate-900">
                  What Drives ThumbbyX
                </h3>
              </motion.div>

              <motion.div
                variants={staggerGroup}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
              >
                {values.map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      variants={fadeUp}
                      whileHover={cardHover}
                      className="group rounded-3xl bg-slate-50 p-8 backdrop-blur-xl border border-white/40 shadow-[0_25px_80px_rgba(15,23,42,0.15)]"
                    >
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-button-gradient text-white">
                        <Icon size={28} />
                      </div>

                      <h4 className="mb-3 text-xl font-bold">{item.title}</h4>

                      <p className="text-sm leading-relaxed text-slate-600">
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* ── CTA ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="rounded-[40px] bg-gradient-to-r from-slate-900 to-slate-800 p-14 text-center text-white"
            >
              <h3 className="mb-5 text-4xl font-bold">
                Ready To Build With Confidence?
              </h3>

              <p className="mx-auto mb-8 max-w-2xl text-slate-300">
                Connect with verified contractors, track every milestone, and bring
                your dream home to life with complete transparency.
              </p>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-xl bg-brand-button-gradient px-8 py-4 font-semibold transition hover:bg-blue-950"
              >
                Start Your Project
              </motion.button>
            </motion.div>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
