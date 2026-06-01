import { motion } from "framer-motion";
import { Activity, Camera, CheckCircle2, Clock, MapPin } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const updates = [
  {
    title: "Foundation Work",
    status: "Completed",
    icon: CheckCircle2,
  },
  {
    title: "Wall Construction",
    status: "In Progress",
    icon: Activity,
  },
  {
    title: "Site Photos",
    status: "Updated Today",
    icon: Camera,
  },
];

export default function LiveTracking() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="font-semibold uppercase tracking-[0.25em] text-orange-500">
              Live Tracking
            </span>

            <h1 className="mt-5 text-5xl font-bold text-slate-900 md:text-7xl">
              Track Your Project
              <span className="block text-orange-500">In Real Time</span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
              Stay updated with site progress, milestone status, photos, and
              contractor activity from one simple dashboard.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {updates.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -8 }}
                  className="rounded-[32px] bg-white p-8 shadow-xl"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 font-medium text-slate-500">
                    {item.status}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] bg-white p-8 shadow-xl">
              <div className="mb-5 flex items-center gap-3">
                <MapPin className="text-orange-500" />
                <h2 className="text-2xl font-bold">Current Site Status</h2>
              </div>

              <p className="leading-relaxed text-slate-600">
                Your construction site progress, assigned contractor updates,
                material movement, and milestone notes will appear here.
              </p>
            </div>

            <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-xl">
              <div className="mb-5 flex items-center gap-3">
                <Clock className="text-orange-500" />
                <h2 className="text-2xl font-bold">Next Update</h2>
              </div>

              <p className="leading-relaxed text-slate-300">
                The next project update will include progress photos, completed
                work details, pending tasks, and estimated timeline changes.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
