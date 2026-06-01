import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import logo from "../../assets/ThumbbyX Logo.png";

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
        <section className="relative flex flex-col px-5 py-6 sm:px-8 lg:px-12">

          <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center py-12">
            {eyebrow && (
              <span className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                {eyebrow}
              </span>
            )}

            <h1 className="text-4xl font-bold tracking-normal text-blue-950 sm:text-5xl">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                {subtitle}
              </p>
            )}

            <div className="mt-8">{children}</div>
          </div>
        </section>

        <section className="relative hidden overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-950 p-8 lg:block">
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="relative flex h-full flex-col justify-end overflow-hidden rounded-[36px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
            {image && (
              <img
                src={image}
                alt={imageAlt}
                className="absolute inset-0 h-full w-full object-cover opacity-70"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/50 to-transparent" />

            <div className="relative z-10">
              <span className="rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-orange-500/30">
                ThumbbyX
              </span>

              <h2 className="mt-5 max-w-lg text-4xl font-bold leading-tight text-white">
                Build, manage, and track construction with confidence.
              </h2>

              <p className="mt-4 max-w-md text-blue-100">
                A premium construction management platform for homeowners and
                verified contractors.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
