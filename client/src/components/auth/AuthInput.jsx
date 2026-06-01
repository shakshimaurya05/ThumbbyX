export default function AuthInput({
  label,
  id,
  className = "",
  error,
  ...props
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>

      <input
        id={id}
        className={`h-13 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 ${className}`}
        {...props}
      />

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </label>
  );
}
