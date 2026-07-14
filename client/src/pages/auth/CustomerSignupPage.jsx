import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import PasswordInput from "../../components/auth/PasswordInput";
import happyFamilyImage from "../../assets/happy-family.png";
import {
  registerCustomer,
} from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate }
from "react-router-dom";
export default function CustomerSignupPage() {
  const navigate =
  useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    city: "",
    state: "",
    terms: false,
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

  if (!formData.fullName.trim())
    nextErrors.fullName =
      "Full name is required";

  if (!formData.email.trim())
    nextErrors.email =
      "Email is required";

  if (!formData.phone.trim())
    nextErrors.phone =
      "Phone number is required";

  if (!formData.city.trim())
    nextErrors.city =
      "City is required";

  if (!formData.state.trim())
    nextErrors.state =
      "State is required";

  if (!formData.password.trim())
    nextErrors.password =
      "Password is required";
if (formData.password.length < 6) {
  nextErrors.password =
    "Password must be at least 6 characters";
}
  if (
    formData.password !==
    formData.confirmPassword
  ) {
    nextErrors.confirmPassword =
      "Passwords do not match";
  }

  if (!formData.terms) {
    nextErrors.terms =
      "Please accept the terms";
  }

  setErrors(nextErrors);

  if (
    Object.keys(nextErrors)
      .length > 0
  )
    return;

  try {
    const response =
      await registerCustomer(
        formData
      );
 console.log(
      response.data
    );
    toast.success("Account created successfully!");
navigate("/login");
   
  } catch (error) {
  console.log("FULL ERROR:", error);

  console.log(
    "SERVER RESPONSE:",
    error.response?.data
  );

  toast.error(
    JSON.stringify(
      error.response?.data
    )
  );
}
};

  return (
    <AuthLayout
      eyebrow="Customer Signup"
      title="Build Your Dream Home"
      subtitle="Create your ThumbbyX customer account and connect with verified construction professionals."
      image={happyFamilyImage}
      imageAlt="Happy family with new home"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <AuthInput
            id="customer-name"
            name="fullName"
            label="Full Name"
            placeholder="Enter full name"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />

          <AuthInput
            id="customer-email"
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <AuthInput
            id="customer-phone"
            name="phone"
            label="Phone Number"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          <AuthInput
            id="customer-city"
            name="city"
            label="City"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
          />

          <AuthInput
            id="customer-state"
            name="state"
            label="State"
            placeholder="Enter state"
            value={formData.state}
            onChange={handleChange}
            error={errors.state}
          />

          <PasswordInput
            id="customer-password"
            name="password"
            label="Password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className="sm:col-span-2">
            <PasswordInput
              id="customer-confirm-password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          </div>
        </div>

        <label className="flex items-start gap-3 text-sm font-semibold text-slate-600">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            className="mt-1 h-4 w-4 accent-orange-500"
          />
          I agree to Terms & Conditions
        </label>
        {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}

        <AuthButton type="submit">Create Account</AuthButton>

        <p className="text-center text-sm text-slate-600">
          Already registered?{" "}
          <Link to="/login" className="font-bold text-orange-500">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
