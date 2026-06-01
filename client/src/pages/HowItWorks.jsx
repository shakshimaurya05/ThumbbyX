import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Calculator,
  ClipboardList,
  FileCheck,
  Handshake,
  HardHat,
  Home,
  Rocket,
  Search,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";

const homeownerSteps = [
  {
    icon: ClipboardList,
    title: "Share Your Requirements",
    description:
      "Tell us about your plot, location, budget, design preferences, and dream home vision.",
  },
  {
    icon: Calculator,
    title: "Get Cost Estimate",
    description:
      "Receive transparent construction estimates, timelines, and project recommendations.",
  },
  {
    icon: Users,
    title: "Connect With Verified Contractors",
    description:
      "Get matched with trusted and verified contractors based on your requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Compare & Select",
    description:
      "Review profiles, experience, ratings, and choose the contractor that fits best.",
  },
  {
    icon: BarChart3,
    title: "Track Construction",
    description:
      "Monitor project progress, updates, milestones, photos, and documents.",
  },
  {
    icon: Home,
    title: "Move Into Your Dream Home",
    description:
      "Receive your completed home with quality checks and project handover.",
  },
];

const contractorSteps = [
  {
    icon: Search,
    title: "Browse Contractors",
    description:
      "Explore verified professionals across multiple construction categories.",
  },
  {
    icon: UserCheck,
    title: "View Profiles & Ratings",
    description: "Check portfolios, reviews, completed projects, and expertise.",
  },
  {
    icon: Users,
    title: "Request Connection",
    description: "Choose a contractor and send your project requirements.",
  },
  {
    icon: ClipboardList,
    title: "Discuss Your Project",
    description: "Finalize scope, timelines, budget, and expectations.",
  },
  {
    icon: Home,
    title: "Start Construction",
    description:
      "Begin your project with complete transparency and confidence.",
  },
];

const joinSteps = [
  {
    icon: ClipboardList,
    title: "Submit Application",
    description:
      "Fill out the contractor onboarding form with your business details.",
  },
  {
    icon: FileCheck,
    title: "Upload Documents",
    description:
      "Submit required licenses, IDs, certifications, and project history.",
  },
  {
    icon: ShieldCheck,
    title: "Verification Process",
    description: "ThumbbyX verifies your credentials and quality standards.",
  },
  {
    icon: UserCheck,
    title: "Get Approved",
    description: "Become part of the ThumbbyX verified contractor network.",
  },
  {
    icon: Briefcase,
    title: "Receive Quality Leads",
    description:
      "Get connected with homeowners actively looking for contractors.",
  },
  {
    icon: ArrowRight,
    title: "Grow Your Business",
    description:
      "Complete projects and pay only 3% commission on successful projects.",
  },
];

const featureCards = [
  {
    icon: Home,
    title: "For Homeowners",
    description:
      "Find verified contractors, compare options, track progress, and build with confidence.",
  },
  {
    icon: HardHat,
    title: "For Contractors",
    description:
      "Receive quality leads, showcase your work, and grow your construction business.",
  },
  {
    icon: BarChart3,
    title: "Complete Transparency",
    description:
      "Estimates, milestones, updates, documents, and communication in one platform.",
  },
];

const tabs = {
  homeowner: {
    label: "Build My Home",
    icon: Home,
    steps: homeownerSteps,
  },
  contractor: {
    label: "Hire Contractor",
    icon: HardHat,
    steps: contractorSteps,
  },
  join: {
    label: "Join As Contractor",
    icon: Handshake,
    steps: joinSteps,
  },
};

const completionContent = {
  homeowner: {
    icon: Home,
    title: "Dream Home Delivered",
    description:
      "Enjoy a transparent construction journey from planning to possession.",
  },
  contractor: {
    icon: HardHat,
    title: "Project Successfully Started",
    description:
      "Connect with trusted professionals and begin your project with confidence.",
  },
  join: {
    icon: Rocket,
    title: "Grow With ThumbbyX",
    description:
      "Join our growing contractor network and receive quality project opportunities.",
  },
};

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("homeowner");
  const activeSteps = tabs[activeTab].steps;
  const CompletionIcon = completionContent[activeTab].icon;

  return (
    <>
     <Navbar />
    <section className="relative overflow-hidden bg-slate-950 py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.12),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >

          <h2 className="mt-4 text-5xl font-bold md:text-6xl">
            One Platform.
            <span className="block text-orange-500">
              Three Powerful Journeys.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
            Whether you&apos;re building your dream home, hiring a contractor,
            or growing your construction business, ThumbbyX makes every step
            simple, transparent, and reliable.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {featureCards.map((card) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                whileHover={{ y: -8 }}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-8"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30">
                  <Icon size={28} />
                </div>
                <h3 className="mb-3 text-xl font-bold">{card.title}</h3>
                <p className="text-slate-400">{card.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {Object.entries(tabs).map(([key, tab]) => {
            const Icon = tab.icon;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 rounded-full px-6 py-3 transition-all duration-300 ${
                  activeTab === key
                    ? "bg-orange-500 text-white"
                    : "border border-slate-800 bg-slate-900 text-slate-300"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="relative mt-20"
          >
            <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 md:block">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="h-full w-full rounded-full bg-gradient-to-b from-orange-400 via-orange-500 to-orange-700"
              />
            </div>

            <div className="space-y-20">
              {activeSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.title}
                    initial={{
                      opacity: 0,
                      x: index % 2 === 0 ? -80 : 80,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                    }}
                    className={`flex flex-col items-center ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="w-full md:w-5/12">
                      <motion.div
                        whileHover={{
                          y: -10,
                          scale: 1.02,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 250,
                        }}
                        className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur-xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-400/5 opacity-0 transition duration-500 group-hover:opacity-100" />

                        <div className="relative z-10">
                          <div className="mb-5 flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-500/30">
                              <Icon size={28} />
                            </div>
                          </div>

                          <h3 className="mb-3 text-2xl font-bold">
                            {step.title}
                          </h3>

                          <p className="leading-relaxed text-slate-400">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    <div className="relative hidden w-2/12 justify-center md:flex">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 250,
                          delay: index * 0.1,
                        }}
                        className="relative"
                      >
                        <div className="absolute inset-0 animate-pulse rounded-full bg-orange-500 opacity-60 blur-xl" />

                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-[6px] border-slate-950 bg-orange-500 text-lg font-bold shadow-[0_0_35px_rgba(249,115,22,0.7)]">
                          {index + 1}
                        </div>
                      </motion.div>
                    </div>

                    <div className="hidden w-5/12 md:block" />
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-20"
              >
                <div className="mx-auto max-w-3xl">
                  <div className="relative overflow-hidden rounded-[32px] border border-orange-500/30 bg-gradient-to-br from-orange-500/20 via-slate-900 to-slate-950 p-10 text-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15),transparent_70%)]" />

                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                      className="relative z-10"
                    >
                      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-500 text-white shadow-lg shadow-orange-500/30">
                        <CompletionIcon size={38} />
                      </div>

                      <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                        {completionContent[activeTab].title}
                      </h3>

                      <p className="mx-auto max-w-xl text-slate-300">
                        {completionContent[activeTab].description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
    <Footer />
    </>
  );
}
