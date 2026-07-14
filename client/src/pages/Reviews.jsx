import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Play, X } from "lucide-react";
import { toast } from "react-toastify";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import happyFamily from "../assets/happy-family.png";
import { API_BASE_URL } from "../services/api";
import { isAdminRole } from "../utils/roles";

const API_BASE = API_BASE_URL + "/reviews";

const getCityKey = (city) => (city?.includes("Delhi") ? "Delhi" : city || "Unknown");

export default function Reviews() {
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [videoReviews, setVideoReviews] = useState([]);
  const [adminReviews, setAdminReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = isAdminRole(storedUser?.role);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_BASE}`);
        const data = await res.json();
        if (data.success) {
          setVideoReviews(data.videoReviews || []);
          setAdminReviews(data.writtenReviews || []);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDeleteVideo = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Delete this video review?")) return;

    try {
      const res = await fetch(`${API_BASE}/admin/videos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data.success) {
        setVideoReviews((prev) => prev.filter((video) => video._id !== id));
        toast.success("Video review deleted");
      } else {
        toast.error(data.message || "Failed to delete review");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteWritten = async (e, review) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Delete this review?")) return;

    const endpoint =
      review.type === "app"
        ? `${API_BASE}/admin/app-reviews/${review._id}`
        : `${API_BASE}/admin/project-reviews/${review._id}`;

    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data.success) {
        setAdminReviews((prev) => prev.filter((item) => item._id !== review._id));
        toast.success("Review deleted");
      } else {
        toast.error(data.message || "Failed to delete review");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Only admin-added/written reviews remain — predefined reviews removed
  const reviews = adminReviews;

  const cityFilters = [
    "All Cities",
    ...Array.from(new Set([...videoReviews, ...reviews].map((item) => getCityKey(item.city))))
      .filter(Boolean),
  ];

  const cityReviewCounts = cityFilters.reduce((counts, city) => {
    counts[city] = city === "All Cities"
      ? reviews.length + videoReviews.length
      : [...reviews, ...videoReviews].filter((item) => getCityKey(item.city) === city).length;
    return counts;
  }, {});

  const isCityMatch = (city) => selectedCity === "All Cities" || getCityKey(city) === selectedCity;
  const filteredVideos = videoReviews.filter((video) => isCityMatch(video.city));
  const filteredReviews = reviews.filter((review) => isCityMatch(review.city));

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-black py-24 lg:py-32">
        <img
          src={happyFamily}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/45" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.8fr]">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl text-left"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-blue-700">
                Trusted By
                <span className="block text-white">
                  Homeowners Across India
                </span>
              </h1>

              <p className="max-w-2xl text-slate-100 text-lg mt-5">
                Real experiences from homeowners who trusted ThumbbyX and our
                verified contractor network to build their dream homes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.12 }}
              className="ml-auto w-full max-w-md rounded-[28px] border border-white/20 bg-white/12 p-6 text-white shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
            >
              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl bg-white/12 p-4">
                  <p className="text-4xl font-bold">100+</p>
                  <p className="mt-1 text-sm text-slate-200">
                    Cost estimates generated
                  </p>
                </div>
                <div className="rounded-2xl bg-white/12 p-4">
                  <p className="text-4xl font-bold">24/7</p>
                  <p className="mt-1 text-sm text-slate-200">
                    Project tracking access
                  </p>
                </div>
                <div className="rounded-2xl bg-white/12 p-4">
                  <p className="text-4xl font-bold">95%</p>
                  <p className="mt-1 text-sm text-slate-200">
                    On-time customer updates
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 overflow-hidden rounded-[30px] border border-white bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-6 bg-blue-950 p-6 text-white lg:flex-row lg:items-center lg:justify-between lg:p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
                  Filter Reviews
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                  Browse customer stories by city
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
                  Choose a city to instantly update video testimonials and
                  written reviews together.
                </p>
              </div>

              <div className="rounded-[22px] border border-white/15 bg-white/10 px-5 py-4 text-left backdrop-blur-xl lg:min-w-56">
                <p className="text-4xl font-bold">
                  {cityReviewCounts[selectedCity]}
                </p>
                <p className="mt-1 text-sm text-white/75">
                  matching customer stories
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 p-4 sm:p-5">
              {cityFilters.map((city) => {
                const isActive = selectedCity === city;

                return (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setSelectedCity(city)}
                    className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? "border-blue-950 bg-blue-950 text-white shadow-[0_14px_30px_rgba(23,37,84,0.25)]"
                        : "border-blue-950/10 bg-blue-950/5 text-blue-950 hover:border-blue-950/20 hover:bg-white"
                    }`}
                  >
                    {city}
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "bg-white text-blue-950"
                      }`}
                    >
                      {cityReviewCounts[city]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Video Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-14">
              <span className="text-blue-950 uppercase tracking-[0.25em] font-semibold">
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
              {filteredVideos.map((video) => (
                <motion.a
                  key={video._id}
                  href={video.youtube}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -6 }}
                  className="group relative bg-white rounded-[24px] overflow-hidden shadow-lg"
                >
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={(e) => handleDeleteVideo(e, video._id)}
                      className="absolute top-3 right-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-red-600/90 text-white shadow-lg transition hover:bg-red-700"
                      title="Delete video review"
                    >
                      <X size={14} />
                    </button>
                  )}

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
                          className="text-blue-950 fill-blue-950 ml-1"
                        />
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-blue-950">
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
                          className="fill-blue-950 text-blue-950"
                        />
                      ))}
                    </div>

                    <p className="text-blue-950 text-sm font-semibold mt-3">
                      {"Watch Success Story ->"}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {isLoading ? (
              <p className="mt-8 text-center text-slate-500">Loading video reviews...</p>
            ) : filteredVideos.length === 0 ? (
              <p className="mt-8 text-center text-slate-500">
                No video reviews available for {selectedCity}.
              </p>
            ) : null}
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

              <p className="text-white/75 text-lg max-w-3xl mx-auto mt-6">
                Every project is backed by verified contractors, transparent
                communication, and dedicated support from planning to handover.
              </p>
            </div>
          </motion.div>

          {/* Written Reviews */}
          <div className="text-center mb-14">
            <span className="text-blue-950 uppercase tracking-[0.25em] font-semibold">
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
            {filteredReviews.map((review, index) => (
              <motion.div
                key={review._id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[24px] p-5 shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 h-24 w-24 bg-blue-950/10 rounded-full blur-3xl opacity-50" />

                {isAdmin && (
                  <button
                    type="button"
                    onClick={(e) => handleDeleteWritten(e, review)}
                    className="absolute top-4 right-4 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-blue-950/90 text-white shadow-lg transition hover:bg-blue-800"
                    title="Delete review"
                  >
                    <X size={14} />
                  </button>
                )}

                <div className="relative z-10 flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-950/10 text-blue-950">
                    <Quote size={28} />
                  </div>

                  <div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={15}
                          className="fill-blue-950 text-blue-950"
                        />
                      ))}
                    </div>

                    <p className="text-slate-600 leading-relaxed text-sm">
                      "{review.review}"
                    </p>

            <div className="mt-4 pt-4 border-t border-slate-200">
  <div className="flex items-center gap-2 mb-1">
    <h4 className="font-bold text-base text-slate-900">
      {review.name}
    </h4>
    {review.type === "app" ? (
      <span className="rounded-full bg-blue-950/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-950">
        About ThumbbyX
      </span>
    ) : (
      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
        About {review.targetName || "Contractor"}
      </span>
    )}
  </div>

  <p className="text-slate-500 text-sm mt-1">
    {review.city}
  </p>
</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {isLoading ? (
            <p className="mt-8 text-center text-slate-500">Loading written reviews...</p>
          ) : filteredReviews.length === 0 ? (
            <p className="mt-8 text-center text-slate-500">
              No written reviews available for {selectedCity}.
            </p>
          ) : null}
        </div>
      </section>

      <Footer />
    </>
  );
}
