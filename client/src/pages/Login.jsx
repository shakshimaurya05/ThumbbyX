import { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import PasswordInput from "../components/auth/PasswordInput";
import contractorsBg from "../assets/contractors-bg.png";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
export default function Login() {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!formData.identifier.trim()) {
      nextErrors.identifier = "Email or phone number is required";
    }

    if (!formData.password.trim()) {
      nextErrors.password = "Password is required";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      alert("Login UI submitted successfully. Backend integration pending.");
    }
  };

  return (
    <> <Navbar /> 
    <AuthLayout
      eyebrow="Login"
      title="Welcome Back"
      subtitle="Continue managing your projects, contractors, and construction progress with ThumbbyX."
      image={contractorsBg}
      imageAlt="Modern construction dashboard"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          id="identifier"
          name="identifier"
          label="Email / Phone Number"
          placeholder="Enter email or phone number"
          value={formData.identifier}
          onChange={handleChange}
          error={errors.identifier}
        />

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-3 text-sm font-semibold text-slate-600">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="h-4 w-4 accent-orange-500"
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-bold text-orange-500 transition hover:text-orange-600"
          >
            Forgot Password?
          </Link>
        </div>

        <AuthButton type="submit">Login</AuthButton>

        <AuthButton type="button" variant="secondary">
          <FaGoogle />
          Continue with Google
        </AuthButton>

        <p className="text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-bold text-orange-500">
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
    <Footer /> </>
  );
}
