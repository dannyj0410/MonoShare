import { m, type Variants } from "framer-motion";
import { useState } from "react";

const secretTextVariants: Variants = {
  initial: {
    clipPath: "inset(0% 0% 0% 0%)",
  },
  show: {
    clipPath: "inset(0% 0% 0% 100%)",
    transition: {
      duration: 4,
      ease: "easeInOut",
    },
  },
};

type UseCaseValues = {
  title: string;
  example: string;
};

type UseCaseKey = "it" | "finance" | "legal" | "medical" | "support" | "hr";

type UseCases = Record<UseCaseKey, UseCaseValues>;

const useCases: UseCases = {
  it: {
    title: "IT & DevOps",
    example: "db_connection: postgres://admin:p@ssw0rd123@prod-cluster-012",
  },
  finance: {
    title: "Finance & Accounting",
    example: "Wire_Transfer_Auth_Code: 992811-X-04 (Expires in 2 hours)",
  },
  legal: {
    title: "Legal Consultant",
    example:
      "Defense_Strategy: Do not concede Section 4-B during the deposition.",
  },
  medical: {
    title: "Medical Receptionist",
    example: "Patient_DOB: 05/12/1982",
  },
  support: {
    title: "Customer Support",
    example: "Temp_Password_Reset: Winter_Sun_2026_!",
  },
  hr: {
    title: "HR Manager",
    example: "employee_ssn=078-05-1120",
  },
} as const;

const UseCaseDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCase, setSelectedCase] = useState<UseCaseKey>("it");
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Position:</label>
      <div className="relative">
        <button
          type="button"
          className={`flex cursor-pointer items-center justify-between w-full bg-(--white) rounded-md px-4 py-3 text-black hover:bg-(--gray) transition-colors ${showDropdown && "outline-1 outline-offset-2 outline-(--white)"}`}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="text-sm">{useCases[selectedCase].title}</span>
          <svg
            className={`w-4 h-4 text-black duration-200 ${showDropdown ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <ul
          className={`absolute z-30 w-full bg-white rounded-md px-2 h-max text-black transition-all duration-300 ${showDropdown ? "max-h-65 top-13 opacity-100 py-2 " : "max-h-0 py-0 text-black/0 top-11 opacity-0 pointer-events-none"}`}
        >
          {Object.entries(useCases).map(([key, value]) => (
            <li
              key={key}
              className={`${key === selectedCase ? "bg-(--gray)/80" : "bg-(--white) cursor-pointer hover:bg-(--gray)/50"} py-2 px-2 rounded-md `}
              onClick={() => {
                setSelectedCase(key as UseCaseKey);
                setShowDropdown(false);
              }}
            >
              {value.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Example Secret Field */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">
          Example Secret:
        </label>
        <div className="w-full bg-(--white) rounded-md px-4 py-3 shadow-md break-all relative group">
          <span className="text-sm noto-sans font-bold bg-[linear-gradient(to_right,#22c55e,#1f5cac,#b94f25,#22c55e)] bg-clip-text text-transparent bg-size-[200%_auto] animate-rainbow duration-600 group-hover:text-black hover:animate-none">
            {useCases[selectedCase].example}
          </span>
          <m.div
            variants={secretTextVariants}
            initial="initial"
            animate="show"
            className="absolute w-full h-full bg-(--white) top-0 left-0 px-4 py-3 shadow-md rounded-md overflow-hidden z-10"
          >
            <span className="text-sm noto-sans font-bold text-black blur-[0.75px]">
              {useCases[selectedCase].example}
            </span>
          </m.div>
        </div>
      </div>
    </div>
  );
};

export default UseCaseDropdown;
