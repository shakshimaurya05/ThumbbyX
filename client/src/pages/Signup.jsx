import { FaHardHat, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "../components/auth/AuthLayout";
import RoleCard from "../components/auth/RoleCard";
import familyImage from "../assets/family.png";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const cardMotion = {
  initial: { opacity: 0, y: 38, rotateX: 8 },
  animate: { opacity: 1, y: 0, rotateX: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

export default function Signup() {
  return (
    <>
      <Navbar />
      <AuthLayout
        eyebrow="Choose Role"
        title="Create Your ThumbbyX Account"
        subtitle="Select how you want to use ThumbbyX. Customers can build with verified contractors, while contractors can grow their construction business."
        image={familyImage}
        imageAlt="Modern home for a happy family"
      >
        <motion.div
          className="grid gap-6 sm:grid-cols-2 [perspective:1200px]"
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div variants={cardMotion}>
            <RoleCard
              to="/signup/customer"
              icon={FaHome}
              title="Customer"
              description="Build your dream home with verified contractors."
            />
          </motion.div>

          <motion.div variants={cardMotion}>
            <RoleCard
              to="/signup/contractor"
              icon={FaHardHat}
              title="Contractor"
              description="Join ThumbbyX and grow your construction business."
            />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          className="mt-8 text-center text-sm text-slate-600"
        >
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-blue-950">
            Login
          </Link>
        </motion.p>
      </AuthLayout>
      <Footer />
    </>
  );
}
