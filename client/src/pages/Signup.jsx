import { FaHardHat, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import RoleCard from "../components/auth/RoleCard";
import familyImage from "../assets/family.png";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
export default function Signup() {
  return (
    <> <Navbar />  
    <AuthLayout
      eyebrow="Choose Role"
      title="Create Your ThumbbyX Account"
      subtitle="Select how you want to use ThumbbyX. Customers can build with verified contractors, while contractors can grow their construction business."
      image={familyImage}
      imageAlt="Modern home for a happy family"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <RoleCard
          to="/signup/customer"
          icon={FaHome}
          title="Customer"
          description="Build your dream home with verified contractors."
        />

        <RoleCard
          to="/signup/contractor"
          icon={FaHardHat}
          title="Contractor"
          description="Join ThumbbyX and grow your construction business."
        />
      </div>

      <p className="mt-8 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-orange-500">
          Login
        </Link>
      </p>
    </AuthLayout> 
    <Footer /> </>
  );
}
