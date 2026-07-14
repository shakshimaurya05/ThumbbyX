import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

export default function RoleCard({ to, icon: Icon, title, description }) {
  return (
    <MotionLink
      to={to}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="group relative min-h-[220px] overflow-hidden bg-white shadow-[0_10px_25px_rgba(15,23,42,0.08)] transition hover:border-blue-950/20 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)]"
    >
      

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 ">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-950 text-white shadow-[0_18px_45px_rgba(23,37,84,0.28)] transition group-hover:-translate-y-1">
            <Icon size={26} />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-blue-950">{title}</h3>

        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
          {description}
        </p>

        <span className="mt-6 inline-flex w-fit items-center gap-3 rounded-full bg-blue-950 px-5 py-3 text-sm font-bold text-white shadow-[0_16px_38px_rgba(23,37,84,0.25)] transition group-hover:bg-blue-900">
          Continue
          <span className="transition group-hover:translate-x-1">-&gt;</span>
        </span>
      </div>
    </MotionLink>
  );
}
