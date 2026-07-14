import { motion } from "framer-motion";

export default function AuthButton({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary:
      "bg-blue-950 text-white shadow-lg shadow-blue-950/25 hover:shadow-blue-950/40",
    secondary:
      "border border-slate-200 bg-white text-slate-800 hover:border-blue-950/30 hover:text-blue-950",
  };

  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex h-13 w-full items-center justify-center gap-3 rounded-2xl px-5 font-bold transition shadow-[0_18px_45px_rgba(15,23,42,0.12)] ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
