import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInput({ label, id, error, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>

      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          className="h-13 w-full rounded-2xl border border-slate-200 bg-white px-4 pr-12 text-slate-900 shadow-[0_14px_35px_rgba(15,23,42,0.05)] outline-none transition placeholder:text-slate-400 focus:border-blue-950 focus:ring-4 focus:ring-blue-950/10"
          {...props}
        />

        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-950"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </label>
  );
}
