import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function AuthLayout({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  children,
}) {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <motion.section
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease }}
          className="relative flex flex-col px-5 py-6 sm:px-8 lg:px-12"
        >
          <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center py-12">
            {eyebrow && (
              <motion.span
                initial={{ opacity: 0, y: -28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease, delay: 0.12 }}
                className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-blue-950"
              >
                {eyebrow}
              </motion.span>
            )}

            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.18 }}
              className="text-4xl font-bold tracking-normal text-blue-950 sm:text-5xl"
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.24 }}
                className="mt-4 text-base leading-7 text-slate-600 sm:text-lg"
              >
                {subtitle}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 42 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease, delay: 0.3 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.08 }}
          className="relative hidden overflow-hidden bg-black p-6 lg:block xl:p-8"
        >
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-blue-950/20 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 55, rotateY: -8 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.22 }}
            whileHover={{ y: -8, rotateX: 2, rotateY: -3 }}
            className="relative flex h-full flex-col justify-end overflow-hidden rounded-[28px] border border-white/10 bg-white/10 p-7 shadow-[0_35px_100px_rgba(0,0,0,0.42)] backdrop-blur-xl xl:p-8"
          >
            {image && (
              <motion.img
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease }}
                src={image}
                alt={imageAlt}
                className="absolute inset-0 h-full w-full object-cover opacity-85"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/50 to-black/15" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent" />

            <div className="relative z-10">
              <motion.span
                initial={{ opacity: 0, y: -26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease, delay: 0.42 }}
                className="rounded-full bg-blue-950 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-black/40"
              >
                ThumbbyX
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.5 }}
                className="mt-5 max-w-lg text-3xl font-bold leading-tight text-white xl:text-4xl"
              >
                Build, manage, and track construction with confidence.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.58 }}
                className="mt-4 max-w-md text-white/80"
              >
                A premium construction management platform for homeowners and
                verified contractors.
              </motion.p>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
