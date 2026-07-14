// Blogs.jsx — Updated to open BlogDetail on article click
// If you use React Router: replace useState navigation with useNavigate('/blogs/:slug')

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BlogDetail from "../components/blog/BlogDetail"; 
import { blogs } from "../components/blog/blogData";     

import blogHero from "../assets/why1.png";

const textVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

export default function Blogs() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    if (selectedBlog) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [selectedBlog]);

  // ── If a blog is selected, render its detail page ──────────────
  if (selectedBlog) {
    return (
      <>
        <Navbar />
        <BlogDetail
          blog={selectedBlog}
          onBack={() => setSelectedBlog(null)}
          onSelect={(blog) => setSelectedBlog(blog)}
        />
        <Footer />
      </>
    );
  }

  // ── Otherwise render the blog list ─────────────────────────────
  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section
        className="relative min-h-[85vh] flex items-center bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: `url(${blogHero})` }}
      >
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#211c58]/60 via-transparent to-[#4b35a4]/25" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#4b35a4]/25 rounded-full blur-[130px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#211c58]/35 rounded-full blur-[130px] translate-x-1/2 translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#4b35a4]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-18 w-full">
          <div className="text-center">
            <motion.span
              custom={0} initial="hidden" animate="visible" variants={textVariants}
              className="inline-block text-[#9b8ee0] font-bold uppercase tracking-[3px] text-lg bg-[#7c6fd0]/15 px-5 py-1.5 rounded-full border border-[#7c6fd0]/40"
            >
              Blogs & Articles
            </motion.span>

            <motion.h1
              custom={1} initial="hidden" animate="visible" variants={textVariants}
              className="text-5xl md:text-7xl font-bold text-white mt-8 leading-tight"
            >
              Insights For
              <span className="block text-[#9b8ee0] mt-2">Smarter Construction</span>
            </motion.h1>

            <motion.p
              custom={2} initial="hidden" animate="visible" variants={textVariants}
              className="max-w-2xl mx-auto text-gray-300 text-lg mt-8 leading-relaxed"
            >
              Construction guides, budgeting tips, contractor insights, architecture
              trends, and everything you need to build your dream home with confidence.
            </motion.p>

            <motion.div
              custom={3} initial="hidden" animate="visible" variants={textVariants}
              className="flex justify-center gap-12 mt-14"
            >
              {[
                { number: "8", label: "Expert Articles" },
                { number: "8", label: "Categories" },
                { number: "10k+", label: "Monthly Readers" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-white">{stat.number}</div>
                  <div className="text-gray-400 text-sm mt-1 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* ── ARTICLES ── */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center justify-between mb-12">
            <div>
              <motion.h2
                custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={textVariants}
                className="text-4xl font-bold text-[#211c58]"
              >
                Latest Articles
              </motion.h2>
              <motion.p
                custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={textVariants}
                className="text-slate-500 mt-2"
              >
                Explore expert insights and construction knowledge.
              </motion.p>
            </div>
            <span className="hidden md:block text-slate-400 font-medium">
              {blogs.length} Articles
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedBlog(blog)}
                className="
                  group cursor-pointer
                  bg-white rounded-[28px] overflow-hidden
                  border border-gray-100
                  shadow-[0_10px_40px_-10px_rgba(33,28,88,0.12),0_4px_15px_-5px_rgba(75,53,164,0.08)]
                  hover:shadow-[0_25px_60px_-10px_rgba(75,53,164,0.25),0_8px_20px_-5px_rgba(33,28,88,0.15)]
                  hover:border-[#4b35a4]/20
                  transition-all duration-500
                  md:flex
                "
              >
                <div className="overflow-hidden md:w-52 lg:w-56 shrink-0 relative">
                  <img
                    src={blog.heroImage}
                    alt={blog.title}
                    className="h-52 w-full object-cover group-hover:scale-110 transition duration-700 md:h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#211c58]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#4b35a4] text-xs font-bold uppercase tracking-wider bg-[#4b35a4]/10 px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                    <span className="text-slate-400 text-sm">{blog.date}</span>
                  </div>

                  <div className="w-8 h-[3px] bg-[#7c6fd0] rounded-full mb-3 transition-all duration-500 group-hover:w-14" />

                  <h3 className="text-lg font-bold text-[#211c58] leading-snug mb-2 group-hover:text-[#4b35a4] transition duration-300">
                    {blog.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2 text-[#4b35a4] font-semibold text-sm group-hover:text-[#211c58] transition duration-300">
                      Read Article
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition duration-300" />
                    </button>
                    <span className="text-slate-400 text-xs">{blog.readTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 relative overflow-hidden rounded-[32px] bg-brand-button-gradient px-8 py-10 shadow-[0_25px_60px_-10px_rgba(75,53,164,0.45)]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4b35a4]/30 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="inline-block text-[#9b8ee0] font-bold uppercase tracking-[3px] text-sm bg-[#7c6fd0]/20 px-4 py-1 rounded-full border border-[#7c6fd0]/30 mb-4">
                  Build Smarter
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Ready To Build Your Dream Home?
                </h2>
                <p className="text-white/60 mt-2 text-sm md:text-base max-w-xl">
                  Connect with verified contractors and estimate your project cost through ThumbbyX.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 flex-shrink-0">
                <Link
                  to="/contractors"
                  className="bg-white text-[#4b35a4] hover:bg-slate-100 px-6 py-3 rounded-full font-semibold text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Find Contractors
                </Link>
                <Link
                  to="/cost-estimator"
                  className="bg-[#4b35a4]/40 text-white hover:bg-[#4b35a4]/60 border border-[#7c6fd0]/40 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  Estimate Cost
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </>
  );
}
