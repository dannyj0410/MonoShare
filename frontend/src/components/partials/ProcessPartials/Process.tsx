import { useEffect, useState } from "react";
import ProcessItem from "./ProcessItem";
import ProcessExplanation from "./ProcessExplanation";
import type { ProcessStepsType } from "../../../interfaces/process.interface";
import { motion } from "framer-motion";

const processSteps: ProcessStepsType = {
  create: {
    progressBarClr: "bg-[#6a8af1]",
    pingClr: "bg-[#6a8af1]",
    step: "Create",
    textClr: "text-(--main-light-blue)",
    textBGClr: "bg-(--main-light-blue)/20",
    bgClr: "bg-(--main-light-blue)",
    text: "encrypt secret",
    extraText: "dd-mm-yyyy",
    status: "active",
    id: 1,
    guide:
      "Input your secret, choose its configuration. Your secret is encrypted client-side, never leaving your device, ensuring a zero-knowledge privacy interface and keeping your raw data isolated from external vulnerabilities or transit interception.",
  },
  share: {
    progressBarClr: "bg-emerald-300",
    pingClr: "bg-emerald-400",
    step: "Share",
    textClr: "text-emerald-500",
    textBGClr: "bg-emerald-500/20",
    bgClr: "bg-emerald-400",
    text: "grab generated url",
    extraText: "and send it privately",
    status: "viewed",
    id: 2,
    guide:
      "We generate a specialized, single-use URL that functions as a secure, temporary vault for you to copy and paste into any standard messenger, ticket, or workplace app. Only you hold the key, hidden in the URL and never sent to our servers.",
  },
  erase: {
    progressBarClr: "bg-red-400",
    pingClr: "bg-red-400",
    step: "Erase",
    textClr: "text-red-400",
    textBGClr: "bg-red-400/20",
    bgClr: "bg-red-400",
    text: "secret erased",
    extraText: "automatically",
    status: "erased",
    id: 3,
    guide:
      "Whether the secret is viewed, expires or you erase it, every course of action leads to a complete data wipe. When your URL is triggered, a one-time render of the information you’ve provided is guaranteed. That very second the link is permanently deactivated and the data is automatically deleted.",
  },
};

const Process = () => {
  const [processStep, setProcessStep] = useState(1);
  const [cycle, setCycle] = useState(0);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  useEffect(() => {
    if (!hasEnteredView) return;
    const timer = setTimeout(() => {
      if (processStep === 3) {
        setProcessStep(1);
        setCycle((prev) => prev + 1);
      } else {
        setProcessStep((prev) => prev + 1);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [processStep, cycle, hasEnteredView]);

  const currentStepConfig =
    processStep === 1
      ? processSteps.create
      : processStep === 2
        ? processSteps.share
        : processStep === 3
          ? processSteps.erase
          : processSteps.create;

  return (
    <motion.section
      viewport={{ once: true, amount: 0.1 }}
      onViewportEnter={() => setHasEnteredView(true)}
      className="flex flex-col items-center mt-10 mb-40 w-full"
    >
      <h1 className="text-4xl max-sm:text-2xl mb-3 arvo text-center">
        How it's done.
      </h1>
      <p className="electrolize text-lg max-sm:text-sm max-sm:mx-4 lg:w-135 text-center mb-15 text-(--gray)">
        No payment or sign-in required. Designed for a clear, fast, streamlined
        process.
      </p>
      {hasEnteredView && (
        <div className="flex max-sm:flex-wrap w-full items-center xs:justify-evenly">
          {/* left: timeline */}
          <div className="bg-[#1a2c4152] h-105 hx-auto relative min-w-1 w-1 rounded-3xl mx-40 max-md:ml-10 max-xs:mr-0">
            {/* progress bar */}
            <div className="h-full overflow-hidden z-10">
              <div
                key={cycle}
                className={`${currentStepConfig.progressBarClr} z-0 duration-600 absolute animate-timeline w-1 rounded-3xl`}
              />
            </div>
            <div className="flex flex-col justify-between items-start h-[115%] max-lg:h-[120%] absolute -top-8 -left-30.25 max-lg:-top-10 max-lg:-left-1.25">
              <ProcessItem
                processStepConfig={processSteps.create}
                currentStep={processStep}
              />
              <ProcessItem
                processStepConfig={processSteps.share}
                currentStep={processStep}
              />
              <ProcessItem
                processStepConfig={processSteps.erase}
                currentStep={processStep}
              />
            </div>
          </div>
          {/* right: visualization */}
          <ProcessExplanation currentStepConfig={currentStepConfig} />
        </div>
      )}
    </motion.section>
  );
};

export default Process;
