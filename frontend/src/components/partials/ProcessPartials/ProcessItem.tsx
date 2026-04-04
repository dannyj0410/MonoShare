import type { IProcessStep } from "../../../interfaces/process.interface";

const ProcessItem = ({
  processStepConfig,
  currentStep,
}: {
  processStepConfig: IProcessStep;
  currentStep: number;
}) => {
  const isCurrentStep = currentStep === processStepConfig.id;
  const distance = Math.abs(currentStep - processStepConfig.id);

  const getOpacity = () => {
    if (distance > 1) return "opacity-20";
    if (distance === 1) return "opacity-40";
    return "opacity-100";
  };

  return (
    <div className="flex items-center">
      <div className="flex gap-4 items-center">
        {/* left: step*/}
        <p
          className={`text-3xl w-25 duration-500 max-lg:hidden ${getOpacity()}`}
        >
          {processStepConfig.step}
        </p>
        {/* center: timeline ping */}
        <div className="relative flex mb-full h-fit">
          <span
            className={`${isCurrentStep ? "visible" : "hidden"} ${processStepConfig.pingClr} animate-[ping_1.3s_linear_infinite] duration-500 absolute size-3.5 rounded-full z-0`}
          />
          <span
            className={`size-3.5 ${isCurrentStep ? processStepConfig.pingClr : currentStep > processStepConfig.id ? "bg-[#302f2f]" : "bg-(--gray)"} duration-500 rounded-full z-10`}
          />
        </div>
        {/* right: info */}
        <div
          className={`flex flex-col items-start rounded-md duration-500 ${getOpacity()}`}
        >
          <p
            className={`text-xl w-25 duration-500 hidden max-lg:block ${getOpacity()}`}
          >
            {processStepConfig.step}
          </p>
          <p
            className={`text-md text-nowrap electrolize leading-4.5 font-bold ${processStepConfig.textClr}`}
          >
            {processStepConfig.text}
          </p>
          <p className="text-sm text-nowrap text-(--gray) font-semibold noto-sans">
            {processStepConfig.extraText}
            {/* time now */}
          </p>
          <div className="flex gap-1 items-center">
            <p className="text-xs text-(--gray)/80 noto-sans font-semibold">
              status:
            </p>
            <p
              className={`px-1.5 mt-px text-sm electrolize ${isCurrentStep ? "border-b" : "border-none"} ${processStepConfig.textBGClr} ${processStepConfig.textClr} rounded-sm`}
            >
              {processStepConfig.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessItem;
