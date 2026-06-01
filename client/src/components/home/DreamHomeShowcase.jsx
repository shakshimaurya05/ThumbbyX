import dreamHome from "../../assets/dream.png";
import familyImage from "../../assets/happy-family.png";

const DreamHomeShowcase = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>
            <span className="text-orange-500 font-semibold uppercase tracking-wider">
              Your Dream Home
            </span>

            <h2 className="text-5xl font-bold text-gray-900 mt-4 leading-tight">
              More Than Just A House.
              <br />
              A Place Where Life Happens.
            </h2>

            <p className="text-gray-600 text-lg mt-6 leading-relaxed">
              Every family deserves a home built with care, quality,
              and trust. ThumbbyX connects you with verified professionals
              and gives you complete visibility throughout the construction journey.
            </p>

            <button className="mt-10 bg-blue-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-800 transition">
              Start Your Journey
            </button>
          </div>

          {/* Right Images */}
          <div className="relative">

            <img
              src={dreamHome}
              alt="Dream Home"
              className="rounded-3xl shadow-2xl w-full"
            />

            <div className="absolute -bottom-12 -left-12 bg-white rounded-2xl shadow-xl p-3 w-48">
              <img
                src={familyImage}
                alt="Happy Family"
                className="rounded-xl"
              />

              <p className="text-sm font-medium text-center mt-2">
                Building Memories That Last A Lifetime
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default DreamHomeShowcase;