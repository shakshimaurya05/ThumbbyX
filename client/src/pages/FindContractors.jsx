import { motion } from "framer-motion";
import { useState } from "react";
import {
MapPin,
Star,
Briefcase,
Building,
X,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
const contractors = [
{
id: 1,
name: "Raj Construction",
city: "Patna",
rating: 4.9,
experience: "12 Years",
projects: "150+",
specialization: "Residential Construction",
image:
"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800",
},
{
id: 2,
name: "BuildPro Infra",
city: "Delhi",
rating: 4.8,
experience: "10 Years",
projects: "120+",
specialization: "Commercial Construction",
image:
"https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=800",
},
{
id: 3,
name: "DreamHome Builders",
city: "Mumbai",
rating: 4.9,
experience: "15 Years",
projects: "200+",
specialization: "Villa Construction",
image:
"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
},
{
id: 4,
name: "Elite Contractors",
city: "Patna",
rating: 4.7,
experience: "8 Years",
projects: "90+",
specialization: "Turnkey Projects",
image:
"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
},
{
id: 5,
name: "UrbanBuild",
city: "Bangalore",
rating: 4.8,
experience: "11 Years",
projects: "140+",
specialization: "Residential Construction",
image:
"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
},
{
id: 6,
name: "Prime Infra",
city: "Hyderabad",
rating: 4.9,
experience: "13 Years",
projects: "180+",
specialization: "Commercial Construction",
image:
"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800",
},
{
id: 7,
name: "Smart Builders",
city: "Chennai",
rating: 4.7,
experience: "7 Years",
projects: "85+",
specialization: "Interior & Renovation",
image:
"https://images.unsplash.com/photo-1504593811423-6dd665756598?w=800",
},
{
id: 8,
name: "Future Homes",
city: "Pune",
rating: 4.8,
experience: "9 Years",
projects: "110+",
specialization: "Villa Construction",
image:
"https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800",
},
{
id: 9,
name: "Skyline Projects",
city: "Kolkata",
rating: 4.9,
experience: "14 Years",
projects: "210+",
specialization: "Turnkey Projects",
image:
"https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800",
},
{
id: 10,
name: "TrustBuild",
city: "Delhi",
rating: 4.8,
experience: "10 Years",
projects: "130+",
specialization: "Residential Construction",
image:
"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800",
},
];

const cities = [
"All Cities",
"Patna",
"Gaya",
"Muzaffarpur",
"Bhagalpur",
"Darbhanga",
"Purnia",
"Ara",
"Begusarai",
"Katihar",
"Munger",
"Chhapra",
"Ranchi",
"Hazaribagh",
"Bokaro",
"Dhanbad",
"Kolkata",
"Delhi NCR",
"Delhi",
"Lucknow",
"Kanpur",
"Ghaziabad",
"Gurugram",
"Aligarh",
"Varanasi",
"Mumbai",
"Pune",
"Bangalore",
"Bengaluru",
"Hyderabad",
"Chennai",
"Ahmedabad",
"Surat",
"Vadodara",
];

export default function FindContractors() {
const [selectedCity, setSelectedCity] =
useState("All Cities");
const [selectedContractor, setSelectedContractor] =
useState(null);

const filteredContractors =
selectedCity === "All Cities"
? contractors
: contractors.filter(
(contractor) =>
contractor.city === selectedCity
);

return (
    <> <Navbar /> 
  <section className="min-h-screen bg-slate-50">


  {/* Hero */}
  <div className="bg-slate-950 text-white py-28">

    <div className="max-w-7xl mx-auto px-6 text-center">

      <span className="text-orange-500 uppercase tracking-[0.25em] font-semibold">
        Find Contractors
      </span>

      <h1 className="text-5xl md:text-7xl font-bold mt-6">
        Hire Trusted
        <span className="block text-orange-500">
          Construction Experts
        </span>
      </h1>

      <p className="max-w-3xl mx-auto mt-8 text-slate-300 text-lg">
        Browse verified contractors, compare
        experience, review completed projects,
        and connect with the right professional
        for your dream home.
      </p>

    </div>

  </div>

  {/* Filters */}
  <div className="max-w-7xl mx-auto px-6 py-14">

    <div className="flex flex-wrap justify-center gap-4">

      {cities.map((city) => (
        <button
          key={city}
          onClick={() =>
            setSelectedCity(city)
          }
          className={`px-6 py-3 rounded-full transition-all duration-300 ${
            selectedCity === city
              ? "bg-orange-500 text-white"
              : "bg-white border border-slate-200 hover:bg-orange-500 hover:text-white hover:border-orange-500"
          }`}
        >
          {city}
        </button>
      ))}

    </div>

  </div>

  {/* All Contractors */}
  <div className="max-w-7xl mx-auto px-6 pb-24">

    <div className="mb-10">
      <h2 className="text-4xl font-bold text-slate-900">
        All Contractors
      </h2>

      <p className="text-slate-500 mt-3">
        Showing {filteredContractors.length}
        {" "}verified contractors.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {filteredContractors.map(
        (contractor) => (
          <motion.div
            key={contractor.id}
            whileHover={{
              y: -8,
            }}
            className="bg-white rounded-3xl overflow-hidden shadow-lg"
          >

            <div className="relative">

              <img
                src={contractor.image}
                alt={contractor.name}
                className="h-48 w-full object-cover"
              />

              <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs">
                Verified
              </div>

            </div>

            <div className="p-5">

              <div className="flex justify-between items-center">

                <h3 className="text-lg font-bold">
                  {contractor.name}
                </h3>

                <div className="flex items-center gap-1 text-orange-500 text-sm">
                  <Star
                    size={16}
                    fill="currentColor"
                  />
                  {contractor.rating}
                </div>

              </div>

              <div className="flex items-center gap-2 text-slate-500 mt-3 text-sm">
                <MapPin size={16} />
                {contractor.city}
              </div>

              <div className="mt-4 bg-slate-100 inline-block px-3 py-1.5 rounded-full text-xs">
                {contractor.specialization}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">

                <div className="bg-slate-50 p-3 rounded-xl">
                  <Briefcase
                    size={16}
                    className="text-orange-500 mb-2"
                  />

                  <p className="text-xs text-slate-500">
                    Experience
                  </p>

                  <p className="font-semibold text-sm">
                    {contractor.experience}
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl">
                  <Building
                    size={16}
                    className="text-orange-500 mb-2"
                  />

                  <p className="text-xs text-slate-500">
                    Projects
                  </p>

                  <p className="font-semibold text-sm">
                    {contractor.projects}
                  </p>
                </div>

              </div>

              <button
                onClick={() =>
                  setSelectedContractor(contractor)
                }
                className="w-full mt-5 bg-slate-900 hover:bg-orange-500 text-white py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Connect
              </button>

            </div>

          </motion.div>
        )
      )}

    </div>

  </div>

  {selectedContractor && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur-sm">
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-orange-500 uppercase tracking-[0.2em] font-semibold text-sm">
              Connect Request
            </span>

            <h2 className="text-3xl font-bold text-slate-900 mt-3">
              Connect With {selectedContractor.name}
            </h2>

            <p className="text-slate-500 mt-3">
              Fill your project requirements below. ThumbbyX will review your
              request and help you connect with this contractor.
            </p>
          </div>

          <button
            onClick={() => setSelectedContractor(null)}
            className="shrink-0 rounded-full bg-slate-100 p-3 text-slate-600 hover:bg-orange-100 hover:text-orange-500 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Selected Contractor
          </p>
          <p className="font-semibold text-slate-900">
            {selectedContractor.name} · {selectedContractor.city} ·{" "}
            {selectedContractor.specialization}
          </p>
        </div>

        <form
          className="mt-8 grid gap-5 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            alert(
              "Your request has been submitted. ThumbbyX will help you connect with this contractor."
            );
            setSelectedContractor(null);
          }}
        >
          <input
            type="text"
            placeholder="Your Full Name"
            className="rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-500"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-500"
          />

          <input
            type="text"
            placeholder="Project City / Location"
            className="rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-500"
          />

          <select className="rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-500">
            <option>Project Type</option>
            <option>New Home Construction</option>
            <option>Villa Construction</option>
            <option>Commercial Construction</option>
            <option>Interior & Renovation</option>
            <option>Turnkey Project</option>
          </select>

          <select className="rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-500">
            <option>Expected Start Time</option>
            <option>Immediately</option>
            <option>0-3 Months</option>
            <option>3-6 Months</option>
            <option>6-12 Months</option>
          </select>

          <input
            type="number"
            placeholder="Approx Plot Area (Sq Ft)"
            className="rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-500"
          />

          <input
            type="text"
            placeholder="Estimated Budget"
            className="rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-500"
          />

          <textarea
            rows="5"
            placeholder="Tell us your project requirements"
            className="md:col-span-2 rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-500"
          />

          <div className="md:col-span-2 rounded-2xl bg-orange-50 p-4 text-sm text-orange-700">
            You are requesting to connect with {selectedContractor.name}.
            ThumbbyX will contact you and help coordinate the next steps with
            this contractor.
          </div>

          <button
            type="submit"
            className="md:col-span-2 rounded-xl bg-orange-500 py-4 font-semibold text-white transition hover:bg-orange-600"
          >
            Submit Connect Request
          </button>
        </form>
      </motion.div>
    </div>
  )}

</section>
<Footer /> 
</>
);
}
