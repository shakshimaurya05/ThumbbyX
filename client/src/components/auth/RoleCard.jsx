import { Link } from "react-router-dom";

export default function RoleCard({ to, icon: Icon, title, description }) {
  return (
    <Link
      to={to}
      className="group rounded-[28px] border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/60 transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-100"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-950 text-white transition group-hover:bg-orange-500">
        <Icon size={30} />
      </div>

      <h3 className="text-2xl font-bold text-blue-950">{title}</h3>

      <p className="mt-3 leading-7 text-slate-600">{description}</p>

      <span className="mt-6 inline-flex font-bold text-orange-500">
        Continue
      </span>
    </Link>
  );
}
