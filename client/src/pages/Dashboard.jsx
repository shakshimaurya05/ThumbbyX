import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function CostEstimator() {
  const [area, setArea] = useState("");
  const [cost, setCost] = useState(null);

  const calculateCost = () => {
    setCost(area * 2200);
  };

  return (
    <>
      <Navbar />
      <section className="py-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-10">
          Cost Estimator
        </h1>

        <div className="bg-slate-50 p-8 rounded-3xl">
          <input
            type="number"
            placeholder="Enter area in sq ft"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />

          <button
            onClick={calculateCost}
            className="mt-5 bg-orange-500 text-white px-6 py-3 rounded-xl"
          >
            Estimate Cost
          </button>

          {cost && (
            <h2 className="mt-8 text-3xl font-bold">
              Estimated Cost: ₹{cost.toLocaleString()}
            </h2>
          )}
        </div>

      </div>
      </section>
      <Footer />
    </>
  );
}
