import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import PasswordInput from "../../components/auth/PasswordInput";
import contractorsBg from "../../assets/contractors-bg.png";
import {
  registerContractor,
} from "../../services/authService";
import { toast } from "react-toastify";
const requirements = [
  "Aadhaar Verification",
  "PAN Verification",
  "GST Verification",
  "Current Account Verification",
  "Police Verification",
  "Minimum 5 Completed Houses",
  "At Least One 2000+ Sq Ft Project",
];

export default function ContractorSignupPage() {
   const navigate = useNavigate();  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

const handleSubmit = async (event) => {
  event.preventDefault();
if (formData.password.length < 6) {
  toast.error("Password must be at least 6 characters");
  return;
}

if (
  formData.password !==
  formData.confirmPassword
) {
  toast.error("Passwords do not match");
  return;
}
  try {
    await registerContractor(
      formData
    );

    toast.success("Account created successfully!");
    navigate("/login");
  } catch (error) {
  console.log(error);

  toast.error(
    error.response?.data?.message ||
      "Something went wrong"
  );
}
};

  return (
    <AuthLayout
      eyebrow="Contractor Signup"
      title="Join ThumbbyX As A Contractor"
      subtitle="Create your account in less than a minute and complete verification later from your dashboard."
      image={contractorsBg}
      imageAlt="Construction professional"
    >
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <AuthInput
              id="fullName"
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />

            <AuthInput
              id="email"
              name="email"
              label="Email Address"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />

            <AuthInput
              id="phone"
              name="phone"
              label="Phone Number"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />

            <AuthInput
              id="city"
              name="city"
              label="City"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
            />

            <AuthInput
              id="state"
              name="state"
              label="State"
              placeholder="Enter state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <PasswordInput
              id="password"
              name="password"
              label="Password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
            />

            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="rounded-2xl bg-blue-50 p-5">
            <h3 className="mb-3 font-bold text-blue-950">
              Verification Required After Signup
            </h3>

            <div className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              {requirements.map((item) => (
                <p key={item}>✔ {item}</p>
              ))}
            </div>

            <p className="mt-4 text-sm text-slate-600">
              You can complete all verification steps later from your
              contractor dashboard and start receiving customer leads after
              approval.
            </p>
          </div>

          <AuthButton type="submit">
            Create Contractor Account
          </AuthButton>
        </form>
      </div>
    </AuthLayout>
  );
}