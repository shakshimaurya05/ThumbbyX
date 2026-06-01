export default function AuthButton({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary:
      "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40",
    secondary:
      "border border-slate-200 bg-white text-slate-800 hover:border-orange-300 hover:text-orange-500",
  };

  return (
    <button
      className={`inline-flex h-13 w-full items-center justify-center gap-3 rounded-2xl px-5 font-bold transition hover:-translate-y-0.5 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
