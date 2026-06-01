import heroHouse from "../../assets/hero-house.png";

const Hero = () => {
  return (
    <section className="bg-slate-50 min-h-[85vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <div>
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold text-gray-900 leading-tight">
              The Smarter Way To Build Your Home
            </h1>

            {/* Orange Tagline */}
            <p className="text-orange-500 font-semibold text-xl mt-4">
              Build Once. Build With Confidence.
            </p>

            {/* Description */}
            <p className="text-lg text-gray-600 mt-6 leading-relaxed max-w-xl">
              From contractor selection to project completion, ThumbbyX keeps
              everything transparent, organized, and under your control.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300">
                Find Contractors
              </button>

              <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                Talk To Expert
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative">
            <img
              src={heroHouse}
              alt="Dream Home"
              className="rounded-3xl shadow-2xl w-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;