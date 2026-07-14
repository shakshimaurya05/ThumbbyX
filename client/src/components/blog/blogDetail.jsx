

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, User, ArrowRight, CheckCircle } from "lucide-react";
import { blogs, getBlogBySlug } from "./blogData";


const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" },
  }),
};



function Lead({ text }) {
  return (
    <motion.p
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-xl md:text-2xl leading-relaxed text-slate-600 font-light border-l-4 border-[#4b35a4] pl-6 mb-12"
    >
      {text}
    </motion.p>
  );
}

function GridStat({ stats }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
    >
      {stats.map((s, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#211c58]/5 to-[#4b35a4]/10 rounded-2xl p-5 border border-[#4b35a4]/10 text-center"
        >
          <div className="text-3xl md:text-4xl font-black text-[#211c58] leading-none mb-2">
            {s.number}
          </div>
          <div className="text-xs text-slate-500 font-medium uppercase tracking-wider leading-snug">
            {s.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function SectionHeading({ number, title }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex items-start gap-4 mt-14 mb-5"
    >
      <span className="shrink-0 text-xs font-black text-[#7c6fd0] uppercase tracking-[2px] bg-[#4b35a4]/10 px-3 py-1.5 rounded-lg mt-1">
        {number}
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-[#211c58] leading-snug">
        {title}
      </h2>
    </motion.div>
  );
}

function TextBlock({ text }) {
  return (
    <motion.p
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-slate-600 text-lg leading-relaxed mb-8"
    >
      {text}
    </motion.p>
  );
}

function BlogImage({ url, caption, alt }) {
  return (
    <motion.figure
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="my-10 rounded-3xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(33,28,88,0.18)]"
    >
      <div className="overflow-hidden">
        <img
          src={url}
          alt={alt}
          className="w-full h-64 md:h-[420px] object-cover hover:scale-105 transition duration-700"
        />
      </div>
      {caption && (
        <figcaption className="bg-slate-50 text-slate-500 text-sm px-6 py-3 border-t border-slate-100 italic">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

function QuoteBlock({ text, attribution }) {
  return (
    <motion.blockquote
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="my-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#211c58] to-[#4b35a4] p-8 md:p-10 text-white shadow-[0_20px_50px_-10px_rgba(75,53,164,0.35)]"
    >
      {/* decorative quote mark */}
      <div className="absolute -top-4 -left-2 text-[120px] font-serif text-white/10 leading-none select-none">
        "
      </div>
      <p className="relative text-xl md:text-2xl font-light leading-relaxed text-white/90 mb-4">
        {text}
      </p>
      {attribution && (
        <footer className="text-[#9b8ee0] text-sm font-medium">
          — {attribution}
        </footer>
      )}
    </motion.blockquote>
  );
}

function Callout({ icon, title, text, cta, ctaLink }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="my-10 rounded-2xl border border-[#4b35a4]/20 bg-[#4b35a4]/5 p-6 md:p-8 flex gap-4"
    >
      <span className="text-3xl shrink-0 mt-0.5">{icon}</span>
      <div>
        <h4 className="font-bold text-[#211c58] text-lg mb-1">{title}</h4>
        <p className="text-slate-600 leading-relaxed">{text}</p>
        {cta && (
          <a
            href={ctaLink || "#"}
            className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-[#4b35a4] hover:text-[#211c58] transition-colors"
          >
            {cta} <ArrowRight size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

function Steps({ title, items }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="my-10"
    >
      {title && (
        <h3 className="font-bold text-[#211c58] text-lg mb-5">{title}</h3>
      )}
      <ol className="space-y-3">
        {items.map((item, i) => (
          <motion.li
            key={i}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100 shadow-sm"
          >
            <CheckCircle size={18} className="text-[#4b35a4] shrink-0 mt-0.5" />
            <span className="text-slate-700 leading-snug">{item}</span>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
}

function CostTable({ cities }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="my-10 overflow-x-auto rounded-2xl shadow-sm border border-slate-200"
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-[#211c58] to-[#4b35a4] text-white">
            <th className="text-left px-5 py-4 font-semibold">City</th>
            <th className="text-center px-5 py-4 font-semibold">Economy</th>
            <th className="text-center px-5 py-4 font-semibold">Standard</th>
            <th className="text-center px-5 py-4 font-semibold">Premium</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
            >
              <td className="px-5 py-3.5 font-semibold text-[#211c58]">
                {row.city}
              </td>
              <td className="px-5 py-3.5 text-center text-slate-600">
                {row.economy}
              </td>
              <td className="px-5 py-3.5 text-center text-slate-600">
                {row.standard}
              </td>
              <td className="px-5 py-3.5 text-center text-[#4b35a4] font-medium">
                {row.premium}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

// ─── Section router ────────────────────────────────────────────────
function RenderSection({ section }) {
  switch (section.type) {
    case "lead":
      return <Lead text={section.text} />;
    case "grid-stat":
      return <GridStat stats={section.stats} />;
    case "section-heading":
      return <SectionHeading number={section.number} title={section.title} />;
    case "text":
      return <TextBlock text={section.text} />;
    case "image":
      return (
        <BlogImage url={section.url} caption={section.caption} alt={section.alt} />
      );
    case "quote":
      return <QuoteBlock text={section.text} attribution={section.attribution} />;
    case "callout":
      return (
        <Callout
          icon={section.icon}
          title={section.title}
          text={section.text}
          cta={section.cta}
          ctaLink={section.ctaLink}
        />
      );
    case "steps":
      return <Steps title={section.title} items={section.items} />;
    case "cost-table":
      return <CostTable cities={section.cities} />;
    default:
      return null;
  }
}

// ─── Related blogs sidebar / strip ────────────────────────────────
function RelatedBlogs({ currentId, onSelect }) {
  const related = blogs.filter((b) => b.id !== currentId).slice(0, 3);
  return (
    <div className="mt-16 pt-12 border-t border-slate-100">
      <h3 className="text-2xl font-bold text-[#211c58] mb-8">More Articles</h3>
      <div className="grid md:grid-cols-3 gap-5">
        {related.map((blog) => (
          <motion.div
            key={blog.id}
            whileHover={{ y: -4 }}
            onClick={() => onSelect && onSelect(blog)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:border-[#4b35a4]/20 transition-all duration-300"
          >
            <div className="overflow-hidden h-40">
              <img
                src={blog.heroImage}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#4b35a4] bg-[#4b35a4]/10 px-2 py-0.5 rounded-full">
                {blog.category}
              </span>
              <h4 className="mt-2 text-sm font-bold text-[#211c58] leading-snug group-hover:text-[#4b35a4] transition line-clamp-2">
                {blog.title}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────
function ReadingProgress() {
  // Works in full-page environment; safe to add
  return (
    <div
      id="reading-progress-bar"
      className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#211c58] to-[#7c6fd0] z-50 transition-all duration-100"
      style={{ width: "0%" }}
    />
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────
export default function BlogDetail({ blog, onBack, onSelect }) {
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 text-xl">
        Blog not found.
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] md:min-h-[80vh] flex items-end bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${blog.heroImage})` }}
      >
        {/* Layered overlays */}
        <div className="absolute inset-0 bg-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#211c58]/50 to-transparent" />

        {/* Glow blobs */}
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#4b35a4]/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16 pt-32 w-full">
          {/* Back button */}
          {onBack && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onBack}
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-8 transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Blogs
            </motion.button>
          )}

          {/* Category + date pill row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-5"
          >
            <span className="inline-block text-[#9b8ee0] font-bold uppercase tracking-[2px] text-xs bg-[#7c6fd0]/20 px-4 py-1.5 rounded-full border border-[#7c6fd0]/30">
              {blog.category}
            </span>
            <span className="text-white/40 text-sm flex items-center gap-1.5">
              <Calendar size={13} /> {blog.date}
            </span>
            <span className="text-white/40 text-sm flex items-center gap-1.5">
              <Clock size={13} /> {blog.readTime}
            </span>
            <span className="text-white/40 text-sm flex items-center gap-1.5">
              <User size={13} /> {blog.author}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6"
          >
            {blog.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/70 max-w-2xl leading-relaxed"
          >
            {blog.excerpt}
          </motion.p>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── ARTICLE BODY ────────────────────────────────────────── */}
      <article className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {blog.sections.map((section, i) => (
            <RenderSection key={i} section={section} />
          ))}

          {/* ── CTA Banner ────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#211c58] via-[#2d2580] to-[#4b35a4] px-8 py-10 shadow-[0_25px_60px_-10px_rgba(75,53,164,0.45)]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/8 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#7c6fd0]/25 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="inline-block text-[#9b8ee0] font-bold uppercase tracking-[3px] text-sm bg-[#7c6fd0]/20 px-4 py-1 rounded-full border border-[#7c6fd0]/30 mb-4">
                  Build Smarter
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Ready To Build Your Dream Home?
                </h2>
                <p className="text-white/60 mt-2 text-sm md:text-base max-w-xl">
                  Connect with verified contractors and estimate your project cost — all in one place.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 flex-shrink-0">
                <a
                  href="/contractors"
                  className="bg-white text-[#4b35a4] hover:bg-slate-100 px-6 py-3 rounded-full font-semibold text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Find Contractors
                </a>
                <a
                  href="/cost-estimator"
                  className="bg-[#4b35a4]/40 text-white hover:bg-[#4b35a4]/60 border border-[#7c6fd0]/40 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  Estimate Cost
                </a>
              </div>
            </div>
          </motion.div>

          {/* Related blogs */}
          <RelatedBlogs currentId={blog.id} onSelect={onSelect} />
        </div>
      </article>
    </>
  );
}