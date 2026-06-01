import { motion } from "framer-motion";
import {
ShieldCheck,
CheckCircle,
Upload,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function JoinUs() {
return (
<>
<Navbar />
<section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-slate-100 py-24">
  <div className="max-w-7xl mx-auto px-6">

    {/* Hero */}
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <span className="text-orange-500 font-semibold uppercase tracking-[0.25em]">
        Join ThumbbyX
      </span>

      <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mt-6">
        Grow Your
        <span className="block text-orange-500">
          Construction Business
        </span>
      </h1>

      <p className="max-w-3xl mx-auto text-slate-600 mt-8 text-lg">
        Become part of ThumbbyX's verified contractor network
        and connect with homeowners actively looking for trusted
        construction professionals.
      </p>
    </motion.div>

    {/* Requirements */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[32px] shadow-xl p-10 mb-16"
    >

      <div className="flex items-center gap-4 mb-8">
        <ShieldCheck
          className="text-orange-500"
          size={34}
        />

        <h2 className="text-3xl font-bold">
          Contractor Eligibility Requirements
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5">

        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-500" />
          GST Registration Required
        </div>

        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-500" />
          Aadhaar Verification Required
        </div>

        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-500" />
          Police Verification Certificate
        </div>

        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-500" />
          Active Current Account
        </div>

        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-500" />
          Minimum 5 Completed Houses
        </div>

        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-500" />
          Experience In 2000+ Sq Ft Projects
        </div>

      </div>

    </motion.div>

    {/* Form */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[32px] shadow-xl p-10"
    >

      <h2 className="text-3xl font-bold mb-10">
        Contractor Verification Application
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="text"
          placeholder="Your Full Name"
          className="border border-slate-200 p-4 rounded-xl"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="border border-slate-200 p-4 rounded-xl"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="border border-slate-200 p-4 rounded-xl"
        />

        <input
          type="text"
          placeholder="City"
          className="border border-slate-200 p-4 rounded-xl"
        />

        <input
          type="number"
          placeholder="Years Of Experience"
          className="border border-slate-200 p-4 rounded-xl"
        />

        <input
          type="text"
          placeholder="GST Number"
          className="border border-slate-200 p-4 rounded-xl"
        />

        <select className="border border-slate-200 p-4 rounded-xl">
          <option>
            Houses Completed
          </option>
          <option>5-10</option>
          <option>10-25</option>
          <option>25-50</option>
          <option>50+</option>
        </select>

        <select className="border border-slate-200 p-4 rounded-xl">
          <option>
            Largest Project Completed
          </option>
          <option>
            Under 1000 Sq Ft
          </option>
          <option>
            1000 - 2000 Sq Ft
          </option>
          <option>
            2000 - 3000 Sq Ft
          </option>
          <option>
            3000+ Sq Ft
          </option>
        </select>

      </div>

      {/* Uploads */}
      <div className="mt-10">

        <h3 className="text-xl font-bold mb-6">
          Required Documents
        </h3>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center">
            <Upload
              className="mx-auto text-orange-500 mb-4"
              size={30}
            />
            <p className="font-medium">
              Upload GST Certificate
            </p>
            <input
              type="file"
              className="mt-4"
            />
          </div>

          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center">
            <Upload
              className="mx-auto text-orange-500 mb-4"
              size={30}
            />
            <p className="font-medium">
              Upload Police Verification
            </p>
            <input
              type="file"
              className="mt-4"
            />
          </div>

          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center">
            <Upload
              className="mx-auto text-orange-500 mb-4"
              size={30}
            />
            <p className="font-medium">
              Upload Aadhaar
            </p>
            <input
              type="file"
              className="mt-4"
            />
          </div>

          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center">
            <Upload
              className="mx-auto text-orange-500 mb-4"
              size={30}
            />
            <p className="font-medium">
              Upload PAN
            </p>
            <input
              type="file"
              className="mt-4"
            />
          </div>

          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center">
            <Upload
              className="mx-auto text-orange-500 mb-4"
              size={30}
            />
            <p className="font-medium">
              Upload Bank Verification Document
            </p>
            <input
              type="file"
              className="mt-4"
            />
          </div>

          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center">
            <Upload
              className="mx-auto text-orange-500 mb-4"
              size={30}
            />
            <p className="font-medium">
              Upload Photo
            </p>
            <input
              type="file"
              className="mt-4"
            />
          </div>

        </div>

      </div>

      {/* Disclaimer */}
      <div className="bg-slate-50 rounded-2xl p-6 mt-10">

        <p className="text-slate-600">
          By submitting this application,
          you confirm that all information
          provided is accurate. ThumbbyX
          reserves the right to verify all
          submitted documents before approval.
        </p>

      </div>

      <button className="w-full mt-8 bg-orange-500 hover:bg-orange-600 transition text-white py-5 rounded-xl font-semibold text-lg">
        Apply For Verification
      </button>

    </motion.div>

    {/* Process */}
    <div className="grid md:grid-cols-6 gap-6 mt-20">

      {[
        "Submit Application",
        "Document Verification",
        "Background Check",
        "Quality Assessment",
        "Approval",
        "Start Receiving Leads",
      ].map((step, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 text-center shadow"
        >
          <div className="h-12 w-12 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto mb-4">
            {index + 1}
          </div>

          <p className="font-medium text-sm">
            {step}
          </p>
        </div>
      ))}

    </div>

  </div>

</section>

<Footer />
</>
);
}
