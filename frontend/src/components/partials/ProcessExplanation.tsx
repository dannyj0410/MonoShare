import type { IProcessStep } from "../../interfaces/process.interface";

const ProcessExplanation = ({
  currentStepConfig,
}: {
  currentStepConfig: IProcessStep;
}) => {
  return (
    <div className="w-150 h-150 flex flex-col">
      <div className="sticky top-80 bg-[#1a2c4130] border border-[#1a2c4180] rounded-xl p-8 transition-all duration-100 ease-in-out">
        <h2
          className={`text-2xl mb-4 font-semibold ${currentStepConfig.textClr}`}
        >
          Step {currentStepConfig.id}: {currentStepConfig.step}
        </h2>
        <p className="text-(--gray) leading-relaxed text-lg">
          {currentStepConfig.guide}
        </p>

        {/* Visual indicator of active step in the panel */}
        <div className="mt-8 flex gap-2">
          {[1, 2, 3].map((key) => (
            <div
              key={key}
              className={`h-1.5 rounded-full transition-all duration-500 ${key === currentStepConfig.id ? `${currentStepConfig.bgClr} w-7` : "bg-gray-600 w-3"}`}
            />
          ))}
          {/* w-3 bg-gray-600 */}
        </div>
      </div>
    </div>
  );
};

export default ProcessExplanation;
