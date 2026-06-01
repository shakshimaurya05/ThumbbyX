import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const projects = [
  {
    name: "Luxury Villa",
    city: "Patna",
    status: "Completed",
  },
  {
    name: "Modern Duplex",
    city: "Lucknow",
    status: "In Progress",
  },
  {
    name: "Commercial Complex",
    city: "Delhi NCR",
    status: "Completed",
  },
];

export default function Projects() {
  return (
    <>
      <Navbar />
      <section className="py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-12">
          Projects
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border rounded-3xl p-8 hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-bold">
                {project.name}
              </h3>

              <p className="text-gray-500 mt-2">
                {project.city}
              </p>

              <span className="inline-block mt-4 bg-orange-100 text-orange-600 px-4 py-2 rounded-full">
                {project.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      </section>
      <Footer />
    </>
  );
}
