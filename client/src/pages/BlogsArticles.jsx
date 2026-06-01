import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const blogs = [
  {
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200",
    title:
      "10 Things To Know Before Starting Home Construction In India",
    category: "Pre-Construction",
    date: "May 2026",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200",
    title:
      "How Much Does It Cost To Build A House In 2026?",
    category: "Cost Estimation",
    date: "May 2026",
  },
  {
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200",
    title:
      "How To Choose The Right Contractor For Your Dream Home",
    category: "Contractors",
    date: "May 2026",
  },
  {
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
    title:
      "Sustainable Home Construction: Building Smarter For The Future",
    category: "Sustainable Construction",
    date: "April 2026",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
    title:
      "Top Home Design Trends Every Homeowner Should Know",
    category: "Architecture & Design",
    date: "April 2026",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200",
    title:
      "Home Construction Timeline: From Foundation To Finishing",
    category: "Construction Guide",
    date: "April 2026",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200",
    title:
      "Choosing The Right Construction Materials For Long-Term Durability",
    category: "Materials & Quality",
    date: "March 2026",
  },
  {
    image:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200",
    title:
      "7 Costly Mistakes Homeowners Make During Construction",
    category: "Homeowner Guide",
    date: "March 2026",
  },
];

export default function Blogs() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-slate-950 overflow-hidden">

        {/* Glow Effects */}
        <div className="absolute top-0 left-0 h-96 w-96 bg-orange-500/20 rounded-full blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-96 w-96 bg-blue-500/20 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="text-center"
          >

            <span className="text-orange-500 uppercase tracking-[0.25em] font-semibold">
              Blogs & Articles
            </span>

            <h1 className="text-5xl md:text-7xl font-bold text-white mt-6">
              Insights For
              <span className="block text-orange-500">
                Smarter Construction
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-slate-300 text-lg mt-8">
              Construction guides, budgeting tips,
              contractor insights, architecture trends,
              and everything you need to build your dream home
              with confidence.
            </p>

          </motion.div>

        </div>

      </section>

      {/* Main Content */}
      <section className="bg-slate-50 py-24">

        <div className="max-w-7xl mx-auto px-6">

          {/* Section Heading */}

          <div className="flex items-center justify-between mb-10">

            <div>
              <h2 className="text-4xl font-bold text-slate-900">
                Latest Articles
              </h2>

              <p className="text-slate-500 mt-2">
                Explore expert insights and construction knowledge.
              </p>
            </div>

            <span className="hidden md:block text-slate-500">
              {blogs.length} Articles
            </span>

          </div>

          {/* Blog Grid */}

          <div className="grid lg:grid-cols-2 gap-6">

            {blogs.map((blog, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group bg-white rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 md:flex"
              >

                <div className="overflow-hidden md:w-52 lg:w-56 shrink-0">

                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-52 w-full object-cover group-hover:scale-110 transition duration-700 md:h-full"
                  />

                </div>

                <div className="flex flex-1 flex-col justify-between p-5">

                  <div className="flex items-center justify-between mb-4">

                    <span className="text-orange-500 text-sm font-semibold">
                      {blog.category}
                    </span>

                    <span className="text-slate-400 text-sm">
                      {blog.date}
                    </span>

                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug mb-4">
                    {blog.title}
                  </h3>

                  <button className="flex items-center gap-2 text-slate-900 font-semibold group-hover:text-orange-500 transition">
                    Read Article

                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition"
                    />

                  </button>

                </div>

              </motion.div>
            ))}

          </div>

          {/* CTA Banner */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 px-6 py-6 md:px-8"
          >

            <div className="absolute top-0 right-0 h-40 w-40 bg-white/10 rounded-full blur-3xl" />

            <div className="absolute bottom-0 left-0 h-40 w-40 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>
                <span className="uppercase tracking-[0.2em] text-orange-100 font-semibold text-xs">
                  Build Smarter
                </span>

                <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
                  Ready To Build Your Dream Home?
                </h2>

                <p className="max-w-2xl text-orange-100 mt-2 text-sm md:text-base">
                  Connect with verified contractors and estimate your project
                  cost through ThumbbyX.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">

                <Link
                  to="/contractors"
                  className="bg-white text-orange-500 hover:bg-slate-100 transition px-5 py-3 rounded-xl font-semibold"
                >
                  Find Contractors
                </Link>

                <Link
                  to="/cost-estimator"
                  className="bg-slate-900 text-white hover:bg-slate-800 transition px-5 py-3 rounded-xl font-semibold"
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
