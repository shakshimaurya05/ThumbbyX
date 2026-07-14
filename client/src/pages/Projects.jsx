import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPin,
  Maximize2,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { API_BASE_URL } from "../services/api";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const stats = [
  { label: "Curated Builds", value: "36+" },
  { label: "Cities Served", value: "12" },
  { label: "Avg. Rating", value: "4.9" },
];

const fadeLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 48 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, rotateX: 12, scale: 0.96 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0, rotateX: 0, scale: 1,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const statusStyles = {
  Completed:
    "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "In Progress":
    "bg-violet-50 text-[#4b35a4] border border-violet-200",
  "Near Completion":
    "bg-amber-50 text-amber-700 border border-amber-200",
};

function ProjectVisual({ project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${project.tone || "from-[#211c58] via-[#312884] to-[#f7a500]"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.28),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(33,28,88,0.52))]" />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-[70%] w-[56%] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative h-full w-full rotate-[-4deg] transform-gpu">
          <div className="absolute bottom-0 left-[18%] h-[68%] w-[44%] skew-y-[-8deg] rounded-t-lg border border-white/20 bg-white/14 shadow-[22px_28px_50px_rgba(6,8,35,0.3)] backdrop-blur-sm" />
          <div className="absolute bottom-[3%] left-[45%] h-[80%] w-[33%] skew-y-[10deg] rounded-t-lg border border-white/12 bg-white/10 shadow-[14px_22px_40px_rgba(6,8,35,0.25)] backdrop-blur-sm" />
          {[...Array(5)].map((_, row) =>
            [...Array(3)].map((__, col) => (
              <span
                key={`${row}-${col}`}
                className="absolute h-3 w-7 rounded-sm bg-white/50 shadow-[0_0_14px_rgba(255,255,255,0.3)]"
                style={{ left: `${28 + col * 12}%`, bottom: `${18 + row * 10}%` }}
              />
            ))
          )}
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#211c58]/70 to-transparent" />
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#100d2e]/80 px-4 py-8 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} project details`}
        className="relative grid max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-[0_40px_120px_rgba(8,8,32,0.45)] lg:grid-cols-[0.85fr_1.15fr]"
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#211c58] shadow-md transition hover:bg-[#f6f4ff]"
          aria-label="Close project details"
        >
          <X size={16} />
        </button>

        {/* Left: Image Panel */}
        <div className="relative min-h-[300px] overflow-hidden lg:min-h-[620px]">
          <ProjectVisual project={project} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17133f]/95 via-[#211c58]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/25 bg-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                {project.status}
              </span>
              <span className="rounded-full border border-white/25 bg-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                {project.type}
              </span>
            </div>
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">
              <MapPin size={12} />
              {project.location}
            </p>
            <h2 className="max-w-sm text-2xl font-bold leading-snug tracking-tight md:text-3xl">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Right: Details Panel */}
        <div className="overflow-y-auto px-6 py-7 md:px-8 lg:px-10">
          {/* Stats */}
          <div className="grid gap-3 pt-6 sm:grid-cols-3 lg:pt-1">
            {[
              { icon: CalendarDays, label: "Year", value: project.year },
              { icon: UserRound, label: "Client", value: project.client },
              { icon: Maximize2, label: "Area", value: project.area },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-xl border border-[#ece9ff] bg-[#f8f6ff] p-3.5">
                  <Icon className="mb-2 text-[#6f59f5]" size={16} />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-sm font-bold leading-snug text-[#211c58]">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* About */}
          <div className="mt-7">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
              About Project
            </p>
            <p className="text-[15px] font-medium leading-7 text-[#211c58]/85">
              {project.detail}
            </p>
          </div>

          {/* Features */}
          <div className="mt-7">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
              Key Features
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {(project.features || []).map((feature) => (
                <div key={feature} className="flex items-center gap-2.5 text-[13px] font-semibold text-[#211c58]">
                  <CheckCircle2 className="shrink-0 text-emerald-500" size={17} />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
            <Link
              to="/contact"
              className="bg-brand-button-gradient inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white no-underline shadow-[0_12px_28px_rgba(75,53,164,0.28)] transition hover:-translate-y-0.5"
            >
              Inquire Similar Project
              <ArrowUpRight size={15} />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#211c58] transition hover:border-[#4b35a4] hover:bg-[#f6f4ff]"
            >
              Back To Gallery
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const featuredProject = projects[1] || projects[0];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(API_BASE_URL + "/showcase-projects");
        const data = await res.json();

        if (data.success && data.projects?.length) {
          setProjects(data.projects);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.log(error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-[#fbfaff] text-[#211c58]">

        {/* ── Hero ── */}
        <section className="relative min-h-[calc(100vh-68px)] px-6 py-16 md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(75,53,164,0.14),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(247,165,0,0.12),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f8f6ff_56%,#ffffff_100%)]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <motion.div variants={fadeLeft} initial="hidden" animate="visible" custom={0}>

              {/* Eyebrow */}
              <span className="inline-flex items-center gap-2 rounded-full border border-[#4b35a4]/15 bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#4b35a4] shadow-sm">
                <Sparkles size={12} />
                Premium Project Showcase
              </span>

              {/* Headline */}
              <h1 className="mt-6 max-w-3xl text-[42px] font-black leading-[1.04] tracking-tight md:text-6xl">
                Smart spaces with a{" "}
                <span className="bg-brand-button-gradient bg-clip-text text-transparent">
                  cinematic build story.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-[15px] font-medium leading-7 text-slate-500">
                Explore ThumbbyX residential, commercial, and interior projects through
                polished visuals, crisp details, and inquiry-ready project journeys.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#project-gallery"
                  className="bg-brand-button-gradient inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white no-underline shadow-[0_14px_32px_rgba(75,53,164,0.28)] transition hover:-translate-y-0.5"
                >
                  View Projects
                  <ChevronRight size={15} />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-[#211c58]/12 bg-white px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#211c58] no-underline shadow-sm transition hover:border-[#4b35a4]/40 hover:bg-[#f6f4ff]"
                >
                  Plan A Project
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-10 grid max-w-lg grid-cols-3 gap-2.5">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-[#4b35a4]/10 bg-white/80 px-4 py-3.5 shadow-[0_12px_36px_rgba(33,28,88,0.05)] backdrop-blur"
                  >
                    <p className="text-2xl font-black text-[#4b35a4]">{stat.value}</p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero Card */}
            {featuredProject ? (
              <motion.div
                variants={fadeRight}
                initial="hidden"
                animate="visible"
                custom={0.14}
                className="relative min-h-[480px]"
              >
                <motion.div
                  animate={{ y: [0, -14, 0], rotate: [0, 0.8, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-x-4 top-4 h-[400px] rounded-3xl bg-brand-button-gradient shadow-[0_36px_80px_rgba(33,28,88,0.3)]"
                />
                <div className="absolute inset-x-0 top-10 overflow-hidden rounded-3xl border border-white/60 bg-white shadow-[0_24px_64px_rgba(33,28,88,0.13)]">
                  <div className="relative h-[280px]">
                    <ProjectVisual project={featuredProject} />
                  </div>
                  <div className="grid gap-4 p-6 sm:grid-cols-[1fr_auto]">
                    <div>
                      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6f59f5]">
                        <MapPin size={12} />
                        {featuredProject.location}
                      </p>
                      <h2 className="mt-2 text-xl font-black leading-tight text-[#211c58]">
                        {featuredProject.title}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(featuredProject)}
                      className="bg-brand-button-gradient inline-flex h-11 items-center justify-center gap-1.5 self-end rounded-xl px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(75,53,164,0.3)] transition hover:-translate-y-0.5"
                    >
                      Details
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                variants={fadeRight}
                initial="hidden"
                animate="visible"
                custom={0.14}
                className="relative flex min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-[#4b35a4]/20 bg-white/70 p-8 text-center shadow-[0_24px_64px_rgba(33,28,88,0.08)]"
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6f59f5]">
                    {isLoading ? "Loading Projects" : "No Projects Added"}
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-[#211c58]">
                    {isLoading ? "Fetching latest work..." : "Projects will appear here soon."}
                  </h2>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* ── Gallery ── */}
        <section id="project-gallery" className="relative px-6 pb-24 pt-8">
          <div className="mx-auto max-w-7xl">

            {/* Section Header */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#4b35a4]">
                  Our Projects
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                  Built work, visualized beautifully.
                </h2>
              </div>
              <p className="max-w-md text-[14px] font-medium leading-7 text-slate-500">
                Each card opens into a focused project story with technical highlights,
                premium visuals, and a direct inquiry action.
              </p>
            </motion.div>

            {/* Cards Grid */}
            {projects.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project, index) => (
                <motion.article
                  key={project._id || project.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  custom={index * 0.05}
                  className="group relative overflow-hidden rounded-2xl border border-[#211c58]/8 bg-white shadow-[0_16px_50px_rgba(33,28,88,0.06)] transition duration-400 hover:-translate-y-1.5 hover:shadow-[0_24px_64px_rgba(75,53,164,0.14)]"
                >
                  {/* Image */}
                  <div className="relative h-[240px] overflow-hidden">
                    <ProjectVisual project={project} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#211c58]/40 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${statusStyles[project.status] || statusStyles.Completed}`}>
                        {project.status}
                      </span>
                      <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">
                        {project.type}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6f59f5]">
                      <MapPin size={13} />
                      {project.location}
                    </p>
                    <h3 className="mt-3 text-xl font-black leading-snug text-[#211c58]">
                      {project.title}
                    </h3>
                    <p className="mt-3 min-h-[72px] text-[13px] font-medium leading-6 text-[#211c58]/70">
                      {project.intro}
                    </p>

                    {/* Mini stats */}
                    <div className="mt-5 grid grid-cols-2 gap-2.5">
                      <div className="rounded-xl border border-[#ece9ff] bg-[#f7f5ff] px-3.5 py-3">
                        <Clock3 size={15} className="mb-1.5 text-[#4b35a4]" />
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">Year</p>
                        <p className="mt-0.5 text-[13px] font-bold text-[#211c58]">{project.year}</p>
                      </div>
                      <div className="rounded-xl border border-[#ece9ff] bg-[#f7f5ff] px-3.5 py-3">
                        <Building2 size={15} className="mb-1.5 text-[#4b35a4]" />
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">Area</p>
                        <p className="mt-0.5 text-[13px] font-bold text-[#211c58]">{project.area}</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="bg-brand-button-gradient mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_12px_28px_rgba(75,53,164,0.22)] transition hover:-translate-y-0.5"
                    >
                      View Project Details
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </motion.article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#4b35a4]/20 bg-white px-6 py-16 text-center shadow-[0_16px_50px_rgba(33,28,88,0.05)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6f59f5]">
                  {isLoading ? "Loading Projects" : "No Projects Added"}
                </p>
                <h3 className="mt-3 text-2xl font-black text-[#211c58]">
                  {isLoading ? "Fetching projects from backend..." : "Add projects from the admin panel to show them here."}
                </h3>
              </div>
            )}
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
