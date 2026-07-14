import { useState } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import heroHouseImage from "../../assets/hero-house.png";
import { forgotPassword }
from "../../services/authService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
  event
) => {
  event.preventDefault();

  if (!email.trim()) {
    setError("Email is required");
    return;
  }

  try {
    await forgotPassword(email);

    setError("");
    setSuccess(true);
  } catch (error) {
    setError(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }
};

  return (
    <AuthLayout
      eyebrow="Password Help"
      title="Reset Your Password"
      subtitle="Enter your email address and we will send password reset instructions."
      image={heroHouseImage}
      imageAlt="Modern workspace"
    >
      {success ? (
        <div className="rounded-3xl border border-green-200 bg-green-50 p-6 text-green-700">
          <h2 className="text-xl font-bold">Check your email</h2>
          <p className="mt-2">
            We sent password reset instructions to your email address.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput
            id="reset-email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={error}
          />

          <AuthButton type="submit">Send Reset Link</AuthButton>
        </form>
      )}
    </AuthLayout>
  );
}
