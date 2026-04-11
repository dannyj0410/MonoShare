import { m, type Variants } from "framer-motion";
import type { IProcessStep } from "../../../interfaces/process.interface";

const additionalVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
    },
  },
};

const ProcessExplanation = ({
  currentStepConfig,
}: {
  currentStepConfig: IProcessStep;
}) => {
  return (
    <m.div
      initial="hidden"
      animate="show"
      drag
      dragSnapToOrigin={true}
      dragElastic={0.2}
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      variants={additionalVariants}
      className="max-lg:ml-20 max-lg:mr-10 max-sm:ml-10 max-xs:mx-0 max-w-150 h-150 max-xs:mt-20 flex flex-col"
    >
      <div className="md:sticky max-md:my-auto will-change-transform md:top-80 bg-[#1a2c4130] border border-[#1a2c4180] rounded-xl p-8 ease-in-out">
        <h2
          className={`text-2xl max-lg:text-xl mb-4 font-semibold duration-600 ${currentStepConfig.textClr}`}
        >
          Step {currentStepConfig.id}: {currentStepConfig.step}
        </h2>
        <p className="text-(--gray) tracking-tight leading-relaxed text-lg max-lg:text-sm">
          {currentStepConfig.guide}
        </p>

        {/* step indicator */}
        <div className="mt-8 flex gap-2">
          {[1, 2, 3].map((key) => (
            <div
              key={key}
              className={`h-1.5 rounded-full transition-all duration-500 ${key === currentStepConfig.id ? `${currentStepConfig.bgClr} w-7` : "bg-gray-600 w-3"}`}
            />
          ))}
        </div>
      </div>
    </m.div>
  );
};

export default ProcessExplanation;
