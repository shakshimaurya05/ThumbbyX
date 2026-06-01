import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
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
              <div className="bg-gray-800 p-3 rounded-full cursor-pointer hover:bg-blue-600 transition">
                <FaFacebookF />
              </div>

              <div className="bg-gray-800 p-3 rounded-full cursor-pointer hover:bg-pink-600 transition">
                <FaInstagram />
              </div>

              <div className="bg-gray-800 p-3 rounded-full cursor-pointer hover:bg-blue-700 transition">
                <FaLinkedinIn />
              </div>

              <div className="bg-gray-800 p-3 rounded-full cursor-pointer hover:bg-sky-500 transition">
                <FaTwitter />
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Company
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Blogs & Articles</li>
              <li>Reviews</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Services
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Find Contractors</li>
              <li>Cost Estimator</li>
              <li>Project Tracking</li>
              <li>Home Construction</li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Cities We Serve
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Delhi NCR</li>
              <li>Lucknow</li>
              <li>Bengaluru</li>
              <li>Ahmedabad</li>
              <li>Ranchi</li>
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