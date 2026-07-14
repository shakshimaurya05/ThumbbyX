
import { useState } from "react";
import {Link, useLocation, useNavigate
} from "react-router-dom";

import { loginUser } from "../services/authService";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import PasswordInput from "../components/auth/PasswordInput";
import contractorsBg from "../assets/contractors-bg.png";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const itemMotion = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (
  event
) => {
  event.preventDefault();

  const nextErrors = {};

  if (
    !formData.identifier.trim()
  ) {
    nextErrors.identifier =
      "Email is required";
  }

  if (
    !formData.password.trim()
  ) {
    nextErrors.password =
      "Password is required";
  }

  setErrors(nextErrors);

  if (
    Object.keys(nextErrors)
      .length > 0
  ) {
    return;
  }

  try {
    const response =
      await loginUser({
        email:
          formData.identifier,
        password:
          formData.password,
      });

    localStorage.setItem(
      "accessToken",
      response.data.accessToken
    );

    const user =
      response.data.user;
localStorage.setItem(
  "user",
  JSON.stringify(user)
);
    console.log(
      "Logged In User:",
      user
    );
    toast.success("Logged in successfully");

if (user.role === "contractor") {
  if (user.onboardingCompleted) {
    navigate("/");
  } else {
    navigate("/join-us");
  }

  return;
}

if (user.role === "customer") {
  navigate(location.state?.from || "/");
  return;
}

if (user.role === "admin" || user.role === "super_admin") {
  navigate("/admin/dashboard");
  return;
}
  } catch (error) {
    console.log(error);
    toast.error(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }
};

  return (
    <>
      <Navbar />
      <AuthLayout
        eyebrow="Login"
        title="Welcome Back"
        subtitle="Continue managing your projects, contractors, and construction progress with ThumbbyX."
        image={contractorsBg}
        imageAlt="Modern construction dashboard"
      >
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.div variants={itemMotion}>
            <AuthInput
              id="identifier"
              name="identifier"
              label="Email"
              placeholder="Enter your email"
              value={formData.identifier}
              onChange={handleChange}
              error={errors.identifier}
            />
          </motion.div>

          <motion.div variants={itemMotion}>
            <PasswordInput
              id="password"
              name="password"
              label="Password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
          </motion.div>

          <motion.div
            variants={itemMotion}
            className="flex flex-wrap items-center justify-between gap-3"
          >
            <label className="flex items-center gap-3 text-sm font-semibold text-slate-600">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="h-4 w-4 accent-blue-950"
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-bold text-blue-950 transition hover:text-blue-900"
            >
              Forgot Password?
            </Link>
          </motion.div>

          <motion.div variants={itemMotion}>
            <AuthButton type="submit">Login</AuthButton>
          </motion.div>

          <motion.p
            variants={itemMotion}
            className="text-center text-sm text-slate-600"
          >
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-bold text-blue-950">
              Create one
            </Link>
          </motion.p>
        </motion.form>
      </AuthLayout>
      <Footer />
    </>
  );
}
