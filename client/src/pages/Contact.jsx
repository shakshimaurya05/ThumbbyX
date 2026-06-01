import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

const contactCards = [
  {
    icon: Phone,
    title: "Phone Number",
    value: "+91 9296244229",
    dark: false,
  },
  {
    icon: Mail,
    title: "Email Address",
    value: "info@thumbbyx.com",
    dark: true,
  },
  {
    icon: MapPin,
    title: "Our Location",
    value: (
      <>
        Pushpanjali Apartment,
        <br />
        Boring Road, Patna
      </>
    ),
    dark: false,
  },
];

const benefits = [
  "Get expert construction consultation",
  "Find verified contractors near you",
  "Receive transparent cost estimates",
  "Track projects with complete visibility",
  "Get support throughout your journey",
];

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Contact() {
  return (
    <>
      <Navbar />

      <section className="relative h-[650px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
          alt="Construction site"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className="font-semibold uppercase tracking-[0.3em] text-orange-500">
              Contact ThumbbyX
            </span>

            <h1 className="mt-6 text-6xl font-bold text-white md:text-7xl">
              Let&apos;s Discuss Your
              <span className="block text-orange-500">Dream Project</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-300">
              Whether you&apos;re building your dream home, hiring a contractor,
              or joining our network, we&apos;re here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-20 -mt-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid overflow-hidden rounded-[32px] shadow-2xl md:grid-cols-3">
            {contactCards.map((card) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -5 }}
                  className={`flex items-center gap-6 p-10 ${
                    card.dark ? "bg-slate-900 text-white" : "bg-white"
                  }`}
                >
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-full ${
                      card.dark ? "bg-slate-800" : "bg-slate-100"
                    }`}
                  >
                    <Icon className="text-orange-500" size={34} />
                  </div>

                  <div>
                    <h3
                      className={`text-2xl font-bold ${
                        card.dark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {card.title}
                    </h3>

                    <p
                      className={`mt-2 ${
                        card.dark ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {card.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="rounded-[32px] bg-white p-10 shadow-xl"
            >
              <span className="font-semibold uppercase tracking-wider text-orange-500">
                Get In Touch
              </span>

              <h2 className="mb-8 mt-4 text-4xl font-bold text-slate-900">
                Tell Us About Your Project
              </h2>

              <form className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-500"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-500"
                  />

                  <select
                    defaultValue=""
                    className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-500"
                  >
                    <option value="" disabled>
                      Select Inquiry Type
                    </option>
                    <option>Build My Home</option>
                    <option>Hire Contractor</option>
                    <option>Join As Contractor</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Project Location"
                  className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-500"
                />

                <textarea
                  rows="6"
                  placeholder="Tell us about your project requirements..."
                  className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-500"
                />

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
                >
                  Send Message
                  <ArrowRight size={18} />
                </button>
              </form>
            </motion.div>

            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="space-y-6"
            >
              <div className="rounded-[32px] bg-slate-900 p-10 text-white">
                <span className="font-semibold uppercase text-orange-400">
                  Why Contact Us
                </span>

                <h3 className="mb-8 mt-4 text-3xl font-bold">
                  Build With Confidence
                </h3>

                <div className="space-y-5">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex gap-4">
                      <CheckCircle2
                        className="mt-0.5 shrink-0 text-orange-500"
                        size={20}
                      />
                      <p>{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] bg-white p-8 shadow-lg">
                <div className="mb-4 flex items-center gap-4">
                  <Clock className="text-orange-500" size={28} />

                  <h3 className="text-2xl font-bold">Working Hours</h3>
                </div>

                <p className="text-slate-600">Monday - Saturday</p>

                <p className="mt-2 font-semibold text-slate-900">
                  9:00 AM - 7:00 PM
                </p>
              </div>

              <div className="rounded-[32px] bg-orange-500 p-8 text-white">
                <h3 className="mb-3 text-2xl font-bold">
                  Need Immediate Assistance?
                </h3>

                <p className="mb-5 text-orange-100">
                  Speak directly with our team and get answers to your
                  construction questions.
                </p>

                <a
                  href="tel:+919296244229"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-orange-500"
                >
                  <Phone size={18} />
                  Call Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <span className="font-semibold uppercase tracking-wider text-orange-500">
              Visit Us
            </span>

            <h2 className="mt-4 text-5xl font-bold text-slate-900">
              Find Us On The Map
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Visit our office or schedule a meeting with our team to discuss
              your project requirements.
            </p>
          </div>

          <div className="overflow-hidden rounded-[40px] border border-slate-200 shadow-2xl">
            <iframe
              title="ThumbbyX Location"
              src="https://www.google.com/maps?q=Boring%20Road%20Patna&output=embed"
              width="100%"
              height="550"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="bg-white pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-14 text-center md:p-20"
          >
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative z-10">
              <span className="font-semibold uppercase tracking-[0.3em] text-orange-500">
                Start Today
              </span>

              <h2 className="mt-6 text-5xl font-bold text-white md:text-6xl">
                Ready To Build
                <span className="block text-orange-500">With Confidence?</span>
              </h2>

              <p className="mx-auto mt-8 max-w-3xl text-lg text-slate-300">
                Whether you&apos;re planning your dream home, looking for a
                trusted contractor, or wanting to join the ThumbbyX network,
                we&apos;re ready to help you take the next step.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <button className="rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600">
                  Start Your Project
                </button>

                <button className="rounded-xl border border-slate-600 px-8 py-4 font-semibold text-white transition hover:border-orange-500 hover:text-orange-500">
                  Talk To An Expert
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
