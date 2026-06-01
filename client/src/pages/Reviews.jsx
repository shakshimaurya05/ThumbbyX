import { motion } from "framer-motion";
import { Star, Quote, Play } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const videoReviews = [
  {
    name: "Amit Kumar",
    city: "Patna",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=1200",
    youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    name: "Priya Sharma",
    city: "Delhi",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200",
    youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    name: "Rahul Verma",
    city: "Lucknow",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200",
    youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

const reviews = [
  {
    name: "Amit Kumar",
    city: "Patna",
    review:
      "ThumbbyX made the entire home construction journey smooth and transparent. Every update was visible and the contractor was highly professional.",
  },
  {
    name: "Priya Sharma",
    city: "Delhi NCR",
    review:
      "The contractor matching process was excellent. We received multiple options and selected the perfect team for our home.",
  },
  {
    name: "Rahul Verma",
    city: "Lucknow",
    review:
      "I could track every stage of construction from my dashboard. It gave me complete peace of mind.",
  },
  {
    name: "Neha Singh",
    city: "Patna",
    review:
      "Transparent pricing, verified contractors and excellent support throughout the project.",
  },
  {
    name: "Vivek Mishra",
    city: "Bangalore",
    review:
      "The quality control and project updates were outstanding. Highly recommended.",
  },
  {
    name: "Ananya Gupta",
    city: "Pune",
    review:
      "A modern and stress-free way to build a dream home. The experience was fantastic.",
  },
];

export default function Reviews() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50 py-28">
        <div className="absolute top-10 left-10 h-80 w-80 bg-orange-200 rounded-full blur-[120px] opacity-40" />
        <div className="absolute top-20 right-10 h-80 w-80 bg-blue-200 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-0 left-1/2 h-60 w-60 bg-orange-100 rounded-full blur-[120px] opacity-40" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-blue-950">
              Trusted By
              <span className="block text-orange-500">
                Homeowners Across India
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-slate-600 text-lg mt-8">
              Real experiences from homeowners who trusted ThumbbyX and our
              verified contractor network to build their dream homes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Video Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-14">
              <span className="text-orange-500 uppercase tracking-[0.25em] font-semibold">
                Video Testimonials
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-5">
                Hear Directly From Our Customers
              </h2>

              <p className="text-slate-600 mt-5 max-w-2xl mx-auto">
                Watch homeowners share their experience of building with
                ThumbbyX and verified contractors.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {videoReviews.map((video, index) => (
                <motion.a
                  key={index}
                  href={video.youtube}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-[24px] overflow-hidden shadow-lg"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={video.image}
                      alt={video.name}
                      className="h-44 w-full object-cover group-hover:scale-105 transition duration-700"
                    />

                    <div className="absolute inset-0 bg-black/20" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition">
                        <Play
                          size={24}
                          className="text-orange-500 fill-orange-500 ml-1"
                        />
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold">
                      Video Review
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900">
                      {video.name}
                    </h3>

                    <p className="text-slate-500 text-sm mt-1">{video.city}</p>

                    <div className="flex items-center gap-1 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-orange-500 text-orange-500"
                        />
                      ))}
                    </div>

                    <p className="text-orange-500 text-sm font-semibold mt-3">
                      Watch Success Story →
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Trust Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-blue-950 rounded-[40px] p-12 text-center mb-24 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 h-60 w-60 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 h-60 w-60 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Building Trust, One Home At A Time
              </h2>

              <p className="text-blue-100 text-lg max-w-3xl mx-auto mt-6">
                Every project is backed by verified contractors, transparent
                communication, and dedicated support from planning to handover.
              </p>
            </div>
          </motion.div>

          {/* Written Reviews */}
          <div className="text-center mb-14">
            <span className="text-orange-500 uppercase tracking-[0.25em] font-semibold">
              Written Reviews
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-5">
              What Homeowners Are Saying
            </h2>

            <p className="text-slate-600 mt-5">
              Genuine feedback from customers across India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[24px] p-5 shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 h-24 w-24 bg-orange-100 rounded-full blur-3xl opacity-50" />

                <div className="relative z-10 flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                    <Quote size={28} />
                  </div>

                  <div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={15}
                          className="fill-orange-500 text-orange-500"
                        />
                      ))}
                    </div>

                    <p className="text-slate-600 leading-relaxed text-sm">
                      "{review.review}"
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <h4 className="font-bold text-base text-slate-900">
                        {review.name}
                      </h4>

                      <p className="text-slate-500 text-sm mt-1">
                        {review.city}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
