import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "How does ThumbbyX verify contractors?",
    answer:
      "Every contractor goes through Aadhaar, PAN, GST, bank account, and project verification before being listed on the platform.",
  },
  {
    question: "Can I track my construction project online?",
    answer:
      "Yes. ThumbbyX provides project tracking, document management, milestone updates, and progress visibility.",
  },
  {
    question: "How are payments managed?",
    answer:
      "Payments are linked to project milestones, ensuring transparency and accountability throughout the construction process.",
  },
  {
    question: "Which cities does ThumbbyX currently serve?",
    answer:
      "We currently serve multiple cities including Delhi NCR, Lucknow, Kanpur, Bengaluru, Ahmedabad, Surat, Ranchi, Dhanbad and more.",
  },
  {
    question: "Can I compare multiple contractors?",
    answer:
      "Yes. You can review contractor profiles, completed projects, ratings, and experience before making a decision.",
  },
];

const Faq = () => {
  const [active, setActive] = useState(null);

  const toggleFaq = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold uppercase tracking-wider">
            Frequently Asked Questions
          </span>

          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            Got Questions? We've Got Answers.
          </h2>

          <p className="text-gray-600 mt-4">
            Everything you need to know before starting your construction journey.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="font-semibold text-gray-900">
                  {faq.question}
                </span>

                {active === index ? (
                  <FaMinus className="text-blue-600" />
                ) : (
                  <FaPlus className="text-blue-600" />
                )}
              </button>

              {active === index && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Faq;