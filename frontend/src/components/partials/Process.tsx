import { useEffect, useState } from "react";
import ProcessItem from "./ProcessItem";
import ProcessExplanation from "./ProcessExplanation";
import type { ProcessStepsType } from "../../interfaces/process.interface";

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

  useEffect(() => {
    const currentDuration = processStep === 3 ? 5000 : 10000;

    const timer = setTimeout(() => {
      if (processStep === 3) {
        setProcessStep(1);
        setCycle((prev) => prev + 1);
      } else {
        setProcessStep((prev) => prev + 1);
      }
    }, currentDuration);

    return () => clearTimeout(timer);
  }, [processStep, cycle]);

  const currentStepConfig =
    processStep === 1
      ? processSteps.create
      : processStep === 2
        ? processSteps.share
        : processStep === 3
          ? processSteps.erase
          : processSteps.create;

  return (
    <section className="items-center mt-10 mb-40 w-[60vw] max-xl:max-w-[90vw]">
      <h1 className="text-4xl max-sm:text-2xl mb-30 arvo text-center">
        How it's done.
      </h1>
      <div className="flex w-full justify-between items-center">
        {/* left: timeline */}
        <div className="bg-[#1a2c4152] h-105 hx-auto relative w-1 rounded-3xl ml-30">
          {/* progress bar */}
          <div className="h-full overflow-hidden z-10">
            <div
              key={cycle}
              className={`${currentStepConfig.progressBarClr} z-0 duration-600 absolute animate-timeline w-1 rounded-3xl`}
            />
          </div>
          <div className="flex flex-col justify-between items-start h-[115%] absolute -top-8 -left-30.25">
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
    </section>
  );
};

export default Process;

//1. Draft your message and set your terms. Start by pasting your sensitive credentials, API keys, or private notes into the secure input field. Before generating your link, you have the option to add an extra layer of protection by requiring a custom password or selecting a specific expiration window. Once you hit create, your information is instantly prepped for a one-time viewing experience.
// 3. Recipient opens the secret, then it's gone. When your recipient clicks the link, they are granted a one-time view of the information you’ve provided. The very second they close that browser tab or refresh the page, the link is permanently deactivated and the data is purged from existence. There are no "second looks" and no digital remains, ensuring the information is only seen by the eyes you intended.
/* 3. Automatic Erasure - Vanish without a trace. The exact millisecond your intended recipient triggers the link, the underlying data is cryptographically shredded from the infrastructure. No digital footprint is left behind—meaning no database backups, no lingering server cache, and absolutely zero possibility for future retrieval by anyone. */

// const TimelineSection = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const steps = [
//     {
//       id: 0,
//       title: "Create",
//       dotColor: "bg-[#6a8af1]",
//       pingColor: "bg-[#6a8af1]",
//       textColor: "text-[#6a8af1]",
//       bgColor: "bg-[#6a8af1]/30",
//       action: "encrypt secret",
//       date: "2026-01-04",
//       status: "active",
//       aiInfo:
//         "AI Insight: Our system generates a highly secure encryption key specifically for your session. The secret is completely locked and encrypted locally before it ever leaves your device, ensuring zero-knowledge privacy.",
//     },
//     {
//       id: 1,
//       title: "Share",
//       dotColor: "bg-emerald-500",
//       pingColor: "bg-emerald-400",
//       textColor: "text-emerald-500",
//       bgColor: "bg-emerald-500/30",
//       action: "grab generated url",
//       date: "and send it privately",
//       status: "viewed",
//       aiInfo:
//         "AI Insight: The link generation process is strictly monitored. We apply one-time-use constraints and cryptographic proofs to your URL, guaranteeing that it can only be accessed by the intended recipient.",
//     },
//     {
//       id: 2,
//       title: "Erase",
//       dotColor: "bg-red-400",
//       pingColor: "bg-red-400",
//       textColor: "text-red-400",
//       bgColor: "bg-red-400/30",
//       action: "erased",
//       date: "forever",
//       status: "erased",
//       aiInfo:
//         "AI Insight: Once the secret is viewed or the timer expires, a cryptographic wipe is triggered. The database overwrites the payload, permanently erasing all traces so it can never be recovered.",
//     },
//   ];

//   return (
//     <section className="flex flex-col items-center mx-auto mt-20 mb-32 w-[90vw] md:w-[80vw] max-w-6xl">
//       <h1 className="text-4xl max-sm:text-3xl mb-12 arvo text-center">
//         How it's done.
//       </h1>

//       {/* Main Container: Stack on mobile, side-by-side on desktop */}
//       <div className="flex flex-col md:flex-row w-full gap-10 md:gap-16">
//         {/* Left Half: Timeline */}
//         <div className="relative w-full md:w-1/2 flex flex-col px-4">
//           {/* Thin Timeline Bar */}
//           <div className="absolute left-[27px] top-4 bottom-8 w-0.5 bg-[#1a2c4152] rounded-3xl z-0" />

//           {steps.map((step, index) => {
//             const isActive = activeIndex === index;

//             return (
//               <div
//                 key={step.id}
//                 onClick={() => setActiveIndex(index)}
//                 className={`flex items-start gap-6 relative z-10 mb-10 cursor-pointer p-2 rounded-lg transition-all duration-300 ${
//                   isActive ? "bg-white/5" : "hover:bg-white/5"
//                 }`}
//               >
//                 {/* Timeline Dot & Ping */}
//                 <div className="relative flex items-center justify-center mt-2.5">
//                   {isActive && (
//                     <span
//                       className={`absolute animate-[ping_1.3s_linear_infinite] size-4 ${step.pingColor} opacity-75 rounded-full z-0`}
//                     />
//                   )}
//                   <span
//                     className={`size-3 ${step.dotColor} rounded-full z-10`}
//                   />
//                 </div>

//                 {/* Timeline Text Content */}
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 w-full">
//                   <p className="text-3xl font-semibold w-24">{step.title}</p>

//                   <div className="flex flex-col items-start">
//                     <p
//                       className={`text-md text-nowrap electrolize leading-4.5 font-bold ${step.textColor}`}
//                     >
//                       {step.action}
//                     </p>
//                     <p className="text-sm text-nowrap text-gray-400 font-semibold noto-sans">
//                       {step.date}
//                     </p>
//                     <p
//                       className={`px-1.5 mt-1 text-sm ${step.textColor} electrolize ${step.bgColor} rounded-sm`}
//                     >
//                       {step.status}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Right Half: Extra Info Panel */}
//         <div className="w-full md:w-1/2 flex flex-col">
//           <div className="sticky top-20 bg-[#1a2c4130] border border-[#1a2c4180] rounded-2xl p-8 min-h-[250px] shadow-lg transition-all duration-500 ease-in-out">
//             <h2 className="text-2xl mb-4 font-semibold text-white/90">
//               {steps[activeIndex].title} Phase
//             </h2>
//             <p className="text-gray-300 leading-relaxed text-lg">
//               {steps[activeIndex].aiInfo}
//             </p>

//             {/* Visual indicator of active step in the panel */}
//             <div className="mt-8 flex gap-2">
//               {steps.map((_, idx) => (
//                 <div
//                   key={idx}
//                   className={`h-1.5 rounded-full transition-all duration-300 ${
//                     activeIndex === idx ? "w-8 bg-blue-400" : "w-3 bg-gray-600"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
