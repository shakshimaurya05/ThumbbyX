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
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.94, rotate: -2 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const textReveal = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardHover = {
  y: -8,
  scale: 1.015,
  transition: { type: "spring", stiffness: 260, damping: 22 },
};

export default function About() {
  return (
    <>
      <Navbar />
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">

  <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

  <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl" />

  <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl" />

  <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 w-full relative z-10">

        <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="mb-24 text-center"
        >
          <span className="font-semibold uppercase tracking-[0.25em] text-orange-500">
            About ThumbbyX
          </span>

          <h2 className="mt-4 text-5xl font-bold text-slate-900 md:text-6xl">
            Building Trust In Every
            <span className="block text-orange-500">
              Construction Journey
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
            ThumbbyX is transforming the way homeowners and contractors connect
            through transparency, technology, and trust.
          </p>
        </motion.div>

        <div className="mb-28 grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="relative"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-orange-100"
            />

            <img
              src="/founder.jpg"
              alt="Founder"
              className="relative z-10 w-full rounded-[32px] object-cover shadow-2xl"
            />
          </motion.div>

          <motion.div
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <span className="font-semibold uppercase text-orange-500">
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

            <div className="mt-8 border-l-4 border-orange-500 pl-5">
              <h4 className="font-bold text-slate-900">Aditya Kumar Singh</h4>
              <p className="text-slate-500">Founder, ThumbbyX</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mb-28 grid gap-8 lg:grid-cols-2"
        >
          <motion.div
            variants={fadeUp}
            whileHover={cardHover}
            className="rounded-[32px] bg-slate-100 p-10"
          >
            <span className="font-semibold uppercase text-orange-500">
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
                  <CheckCircle2 className="text-orange-500" size={20} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            whileHover={cardHover}
            className="flex items-center rounded-[32px] bg-slate-900 p-10 text-white"
          >
            <div>
              <span className="font-semibold uppercase text-orange-400">
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

        <motion.div
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mb-28 grid gap-8 md:grid-cols-2"
        >
          <motion.div
            variants={fadeUp}
            whileHover={cardHover}
            className="rounded-[32px] border border-slate-200 p-10"
          >
            <Target className="mb-6 text-orange-500" size={40} />

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
            variants={fadeUp}
            whileHover={cardHover}
            className="rounded-[32px] bg-slate-100 p-10"
          >
            <Eye className="mb-6 text-orange-500" size={40} />

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

        <div className="mb-28">
          <div className="mb-14 text-center">
            <span className="font-semibold uppercase text-orange-500">
              Core Values
            </span>

            <h3 className="mt-4 text-4xl font-bold text-slate-900">
              What Drives ThumbbyX
            </h3>
          </div>

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
                  className="rounded-3xl bg-slate-50 p-8"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
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
            className="rounded-xl bg-orange-500 px-8 py-4 font-semibold transition hover:bg-orange-600"
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
