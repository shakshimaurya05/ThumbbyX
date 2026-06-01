import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaTools,
  FaUserTie,
  FaCalculator,
  FaThLarge,
  FaChartLine,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/ThumbbyX Logo.png";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
      <div className="w-full px-18">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center cursor-pointer">
            <img
              src={logo}
              alt="ThumbbyX"
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 text-[14px] text-gray-700 font-medium ml-10">
            <Link
              to="/how-it-works"
              className="flex items-center gap-2 hover:text-orange-500 transition-all duration-300"
            >
              <FaTools />
              How It Works
            </Link>

            <Link
              to="/contractors"
              className="flex items-center gap-2 hover:text-orange-500 transition-all duration-300"
            >
              <FaUserTie />
              Find Contractors
            </Link>

            <Link
              to="/cost-estimator"
              className="flex items-center gap-2 hover:text-orange-500 transition-all duration-300"
            >
              <FaCalculator />
              Cost Estimator
            </Link>

            <Link
              to="/live-tracking"
              className="flex items-center gap-2 hover:text-orange-500 transition-all duration-300"
            >
              <FaChartLine />
              Live Tracking
            </Link>

            {/* More Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 hover:text-orange-500 transition-all duration-300">
                <FaThLarge />
                More
                <FaChevronDown size={12} />
              </button>

              <div className="absolute top-12 left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 bg-white shadow-2xl rounded-2xl w-64 p-4 border border-gray-100">
                <ul className="space-y-2">
                  {[
                    <Link to="/blogs" className="block">
                      Blogs & Articles
                    </Link>,
                    <Link to="/reviews" className="block">
                      Reviews
                    </Link>,
                    <Link to="/about-us" className="block">
                      About Us
                    </Link>,
                    <Link to="/join-us" className="block">
                      Join Us
                    </Link>,
                    <Link to="/contact" className="block">
                      Contact Us
                    </Link>,
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-500 cursor-pointer transition-all duration-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Buttons */}
          <div className="hidden lg:flex items-center gap-4 ml-auto">
            <Link
              to="/login"
              className="border border-orange-500 text-orange-500 px-5 py-1.5 rounded-xl font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              Login
            </Link>

            <Link
              to="/talk-to-expert"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-orange-300 hover:scale-105 transition-all duration-300"
            >
              Talk To Expert
            </Link>
          </div>

          {/* Mobile Icon */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden ml-auto text-2xl"
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden bg-white border-t px-6 py-5">
          <div className="flex flex-col gap-5">
            <Link to="/how-it-works" className="block">
              How It Works
            </Link>
            <Link to="/contractors" className="block">
              Find Contractors
            </Link>
            <Link to="/cost-estimator" className="block">
              Cost Estimator
            </Link>
            <Link to="/live-tracking" className="block">
              Live Tracking
            </Link>

            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="flex justify-between items-center font-medium"
            >
              More
              <FaChevronDown />
            </button>

            {moreOpen && (
              <div className="pl-4 text-sm text-gray-600 space-y-2">
                <Link to="/blogs" className="block">
                  Blogs & Articles
                </Link>
                <Link to="/reviews" className="block">
                  Reviews
                </Link>
                <Link to="/about-us" className="block">
                  About Us
                </Link>
                <Link to="/join-us" className="block">
                  Join Us
                </Link>
                <Link to="/contact" className="block">
                  Contact Us
                </Link>
              </div>
            )}

            <Link
              to="/login"
              className="border border-orange-500 text-orange-500 py-3 rounded-xl font-semibold text-center"
            >
              Login
            </Link>

            <Link
              to="/talk-to-expert"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold text-center"
              onClick={() => setMobileMenu(false)}
            >
              Talk To Expert
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
