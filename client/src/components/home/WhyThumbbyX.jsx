import {
  FaUserCheck,
  FaTasks,
  FaMoneyBillWave,
  FaBoxes,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";

import whyImage from "../../assets/why.png";

const features = [
  {
    icon: <FaUserCheck />,
    title: "Verified Contractors",
    description:
      "Work only with thoroughly screened and trusted professionals.",
  },
  {
    icon: <FaTasks />,
    title: "Project Tracking",
    description:
      "Monitor every stage of your construction journey in real time.",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Transparent Pricing",
    description:
      "Know exactly where your money is being spent.",
  },
  {
    icon: <FaBoxes />,
    title: "Material Monitoring",
    description:
      "Track materials and quality throughout construction.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Payments",
    description:
      "Milestone-based payments for complete peace of mind.",
  },
  {
    icon: <FaHeadset />,
    title: "Expert Support",
    description:
      "Get guidance from experienced construction professionals.",
  },
];

const WhyThumbbyX = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image Side */}
          <div className="relative">
            <img
              src={whyImage}
              alt="Why ThumbbyX"
              className="rounded-3xl shadow-2xl w-full object-cover"
            />

            <div className="absolute -bottom-6 -right-6 bg-white shadow-xl rounded-2xl p-5">
              <h3 className="text-3xl font-bold text-blue-600">
                100%
              </h3>
              <p className="text-gray-600">
                Verified Contractors
              </p>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span className="text-orange-500 font-semibold uppercase tracking-wider">
              Why ThumbbyX
            </span>

            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-5">
              Building Your Dream Home Shouldn't Be Stressful.
            </h2>

            <p className="text-gray-600 text-lg mb-8">
              ThumbbyX simplifies the entire construction journey by
              bringing trusted contractors, project transparency,
              secure payments, and expert guidance together on one platform.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-slate-50 p-5 rounded-2xl hover:shadow-lg transition"
                >
                  <div className="text-2xl text-blue-600 mb-3">
                    {feature.icon}
                  </div>

                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyThumbbyX;