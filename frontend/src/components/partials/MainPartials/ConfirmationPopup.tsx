import type { Dispatch, SetStateAction } from "react";

type optionsType = "View" | "Erase";
const options: Record<
  optionsType,
  {
    action: string;
    details: string;
    txtClr: string;
    bgClr: string;
    hvrBgClr: string;
    position: string;
  }
> = {
  Erase: {
    action: "erase",
    details: "This will permanently remove all of its associated data.",
    txtClr: "text-red-400",
    bgClr: "bg-red-400",
    hvrBgClr: "hover:bg-red-400/60",
    position: "bottom-5",
  },
  View: {
    action: "view",
    details: "This can only be done once.",
    txtClr: "text-(--main-light-blue)",
    bgClr: "bg-(--main-light-blue)",
    hvrBgClr: "hover:bg-(--main-dark-blue)",
    position: "top-30",
  },
};

const ConfirmationPopup = ({
  option,
  secret,
  isOpen,
  setOpen,
}: {
  option: optionsType;
  secret: string;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`${options[option].position} fixed translate-x-[-50%] left-1/2 z-50 duration-200 ${isOpen && option === "Erase" ? "translate-y-0 opacity-100 blur-none" : option === "Erase" ? "translate-y-10 opacity-0 blur-md pointer-events-none" : ""}`}
    >
      <div className="flex flex-col bg-[#04121c] w-185  rounded-lg border border-gray-400/15">
        <div className="flex flex-col gap-1 py-2 px-4 border-b border-gray-400/15">
          <h1 className={`${options[option].txtClr} noto-sans font-semibold`}>
            {option} Confirmation
          </h1>
          <p className="text-(--gray) text-sm noto-sans">
            Are you sure you want to {options[option].action}{" "}
            <span className="font-bold arvo">
              {secret.slice(0, 5).toLowerCase()}
            </span>
            ? {options[option].details}
          </p>
        </div>

        {option === "Erase" && (
          <div className="border-b border-gray-400/15">
            <p className="bg-red-400/15 text-red-400 noto-sans m-4 py-3 px-4 rounded-sm text-[12.5px] ">
              <span className="font-bold">Warning:</span> This action cannot be
              undone.
            </p>
          </div>
        )}
        <div className="flex ml-auto m-2 mr-2 text-sm gap-2">
          <button
            type="button"
            className="border border-gray-400/15 hover:border-gray-400/25 noto-sans rounded-lg py-2 px-15 cursor-pointer  transition-colors duration-100"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className={`${options[option].bgClr} ${options[option].hvrBgClr} noto-sans rounded-lg py-2 px-15 cursor-pointer transition-colors duration-100`}
          >
            {option}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
