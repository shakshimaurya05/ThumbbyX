import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { dashboardPathForRole } from "../../utils/roles";

const Footer = () => {
  const { user } = useAuth();
  const projectTrackingPath = user ? dashboardPathForRole(user.role) : "/login";
  const footerLinkClass = "transition hover:text-white";

  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Company */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-4">
              ThumbbyX
            </h2>

            <p className="text-gray-400 leading-relaxed mb-6">
              Building trust in home construction through verified contractors,
              transparent project tracking, secure payments, and expert guidance.
            </p>

            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1HRVzyJ39w/" target="_blank" rel="noreferrer" aria-label="Facebook" className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition">
                <FaFacebookF />
              </a>

              <a href="https://www.instagram.com/thumbbyxglobal?igsh=MXFlYjBoajdwbWVmMQ==" target="_blank" rel="noreferrer" aria-label="Instagram" className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 transition">
                <FaInstagram />
              </a>

              <a href="https://www.linkedin.com/company/thumbbyx" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="bg-gray-800 p-3 rounded-full hover:bg-blue-700 transition">
                <FaLinkedinIn />
              </a>

            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Company
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li><Link to="/about-us" className={footerLinkClass}>About Us</Link></li>
              <li><Link to="/contact" className={footerLinkClass}>Contact Us</Link></li>
              <li><Link to="/blogs" className={footerLinkClass}>Blogs & Articles</Link></li>
              <li><Link to="/reviews" className={footerLinkClass}>Reviews</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Services
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li><Link to="/contractors" className={footerLinkClass}>Find Contractors</Link></li>
              <li><Link to="/cost-estimator" className={footerLinkClass}>Cost Estimator</Link></li>
              <li><Link to={projectTrackingPath} className={footerLinkClass}>Project Tracking</Link></li>
              <li><Link to="/talk-to-expert" className={footerLinkClass}>Home Construction</Link></li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Cities We Serve
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li><Link to="/talk-to-expert" className={footerLinkClass}>Delhi NCR</Link></li>
              <li><Link to="/talk-to-expert" className={footerLinkClass}>Lucknow</Link></li>
              <li><Link to="/talk-to-expert" className={footerLinkClass}>Bengaluru</Link></li>
              <li><Link to="/talk-to-expert" className={footerLinkClass}>Ahmedabad</Link></li>
              <li><Link to="/talk-to-expert" className={footerLinkClass}>Ranchi</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500 text-sm">
            © 2026 ThumbbyX. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
