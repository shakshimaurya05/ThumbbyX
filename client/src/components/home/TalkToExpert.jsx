import expertImage from "../../assets/family.png";

const TalkToExpert = () => {
  return (
    <section className="py-24 bg-blue-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <div className="text-white">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              Free Consultation
            </span>

            <h2 className="text-5xl font-bold mt-6 leading-tight">
              Ready To Build
              <br />
              Your Dream Home?
            </h2>

            <p className="text-blue-100 text-lg mt-6 leading-relaxed">
              Speak with our construction experts and get guidance on
              contractor selection, budgeting, project planning, and execution.
            </p>

            <div className="mt-8 space-y-4">
              <div>✓ Free Initial Consultation</div>
              <div>✓ Expert Construction Guidance</div>
              <div>✓ Transparent Planning</div>
              <div>✓ Trusted Contractor Recommendations</div>
            </div>

            <img
              src={expertImage}
              alt="Construction Expert"
              className="mt-10 rounded-3xl shadow-2xl max-w-md"
            />
          </div>

          {/* Right Side */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">

            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              Book Free Consultation
            </h3>

            <p className="text-gray-600 mb-8">
              Fill in your details and our team will contact you shortly.
            </p>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-xl px-4 py-4 outline-none focus:border-blue-600"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border rounded-xl px-4 py-4 outline-none focus:border-blue-600"
              />

              <select className="w-full border rounded-xl px-4 py-4 outline-none focus:border-blue-600">
                <option>Project Type</option>
                <option>New Home Construction</option>
                <option>Renovation</option>
                <option>Interior Design</option>
                <option>Commercial Project</option>
              </select>

              <textarea
                rows="4"
                placeholder="Tell us about your project..."
                className="w-full border rounded-xl px-4 py-4 outline-none focus:border-blue-600"
              />

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition"
              >
                Book Free Consultation
              </button>

            </form>

          </div>

        </div>
      </div>
    </section>
  );
};

export default TalkToExpert;