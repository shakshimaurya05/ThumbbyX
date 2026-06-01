import contractor1 from "../../assets/contractors/contractor1.jpg";
import contractor2 from "../../assets/contractors/contractor2.jpg";
import contractor3 from "../../assets/contractors/contractor3.jpg";
import contractor4 from "../../assets/contractors/contractor1.jpg";

import contractorBg from "../../assets/contractors-bg.png";

const contractors = [
  {
    image: contractor1,
    name: "Rajesh Construction",
    city: "Delhi NCR",
    projects: "28 Projects",
    rating: "4.9",
  },
  {
    image: contractor2,
    name: "BuildCraft Solutions",
    city: "Lucknow",
    projects: "35 Projects",
    rating: "4.8",
  },
  {
    image: contractor3,
    name: "Skyline Builders",
    city: "Bengaluru",
    projects: "42 Projects",
    rating: "4.9",
  },
  {
    image: contractor4,
    name: "Urban Edge Infra",
    city: "Hyderabad",
    projects: "31 Projects",
    rating: "4.8",
  },
];

const FeaturedContractors = () => {
  return (
    <section
      className="relative py-24 bg-cover bg-center bg-fixed overflow-hidden"
      style={{
        backgroundImage: `url(${contractorBg})`,
      }}
    >
      {/* Light overlay for readability */}
      <div className="absolute inset-0 bg-black/75"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-orange-400 font-semibold uppercase tracking-wider">
            Featured Contractors
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Trusted Professionals For Your Dream Home
          </h2>

          <p className="text-gray-200 mt-4 max-w-2xl mx-auto">
            Connect with experienced and verified contractors who have
            successfully delivered high-quality residential and commercial
            projects.
          </p>
        </div>

        {/* Contractor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contractors.map((contractor, index) => (
            <div
              key={index}
              className="
                group
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-3
                transition-all
                duration-300
              "
            >
              <div className="overflow-hidden">
                <img
                  src={contractor.image}
                  alt={contractor.name}
                  className="
                    h-52
                    w-full
                    object-cover
                    group-hover:scale-110
                    transition-transform
                    duration-500
                  "
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">
                  {contractor.name}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  📍 {contractor.city}
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-gray-400">Projects</p>
                    <p className="font-semibold text-gray-800">
                      {contractor.projects}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400">Rating</p>
                    <p className="font-semibold text-orange-500">
                      ⭐ {contractor.rating}
                    </p>
                  </div>
                </div>

                <button className="mt-5 w-full bg-blue-900 text-white py-2.5 rounded-xl font-medium hover:bg-blue-800 transition">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="bg-white text-blue-900 px-8 py-3 rounded-xl font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300">
            View All Contractors
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedContractors;