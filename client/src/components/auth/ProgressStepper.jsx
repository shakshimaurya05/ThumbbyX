export default function ProgressStepper({ steps, currentStep }) {
  return (
    <div className="mb-8 grid gap-3 sm:grid-cols-5">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isDone = index < currentStep;

        return (
          <div key={step} className="flex items-center gap-3 sm:block">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold sm:mx-auto ${
                isDone || isActive
                  ? "bg-blue-950 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {index + 1}
            </div>

            <p
              className={`text-sm font-semibold sm:mt-2 sm:text-center ${
                isActive ? "text-blue-950" : "text-slate-500"
              }`}
            >
              {step}
            </p>
          </div>
        );
      })}
    </div>
  );
}
