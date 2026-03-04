import type { UseMutateFunction } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import type { DeleteSecretResponse } from "../../../interfaces/secret.interface";
import Spinner from "../../loaders/Spinner";
import useReturnPage from "../../../hooks/useReturnPage";

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
    details: "By doing this you will erase the secret.",
    txtClr: "text-(--main-light-blue)",
    bgClr: "bg-(--main-light-blue)",
    hvrBgClr: "hover:bg-(--main-dark-blue)",
    position: "bottom-1/2",
  },
};

const ConfirmationPopup = ({
  option,
  secret,
  isOpen,
  setOpen,
  actionFunction,
  actionPending,
  showPasswordField,
  isOwner,
  password,
  setPassword,
}: {
  option: optionsType;
  secret: string;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  actionFunction?: UseMutateFunction<
    DeleteSecretResponse,
    Error,
    string,
    unknown
  >;
  actionPending?: boolean;
  showPasswordField?: boolean;
  isOwner?: boolean;
  password?: string;
  setPassword?: Dispatch<SetStateAction<string>>;
}) => {
  const returnPage = useReturnPage();
  return (
    <div
      className={`${options[option].position} fixed translate-x-[-50%] left-1/2 z-50 duration-200 ${isOpen ? "translate-y-0 opacity-100 blur-none" : "translate-y-10 opacity-0 blur-md pointer-events-none"}`}
    >
      <div className="flex flex-col bg-[#02131f] w-min rounded-lg border border-gray-400/15">
        <div className="flex flex-col gap-1 bg-[#02131f] rounded-t-lg py-3 px-5 border-b border-gray-400/15">
          <h1 className={`${options[option].txtClr} noto-sans font-semibold`}>
            {option} Confirmation
          </h1>

          <p
            className={`text-(--gray) text-sm noto-sans ${option === "Erase" ? "w-185" : "w-fit"}`}
          >
            Are you sure you want to {options[option].action}{" "}
            <span className="font-bold arvo">
              {secret.slice(0, 5).toLowerCase()}
            </span>
            ? {option === "View" && <br />} {options[option].details}
          </p>
          {isOwner && (
            <p className="text-(--gray) noto-sans font-normal opacity-60 text-sm">
              Viewing your own secret will still erase it!
            </p>
          )}
        </div>

        {option === "Erase" && (
          <div className="border-b border-gray-400/15">
            <p className="bg-red-400/15 text-red-400 noto-sans m-4 py-3 px-4 rounded-sm text-[12.5px]">
              <span className="font-bold">Warning:</span> This action cannot be
              undone.
            </p>
          </div>
        )}

        <div className="flex flex-col w-fit ml-auto">
          {showPasswordField && setPassword && (
            <div className="px-2 mt-3 ml-auto w-full">
              <p className="text-base text-center mb-0.5 electrolize text-(--main-light-blue) w-full">
                Viewing this secret requires a password:
              </p>
              <input
                type="text"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="text-sm w-full font-light text-(--gray) focus:text-(--white) outline-0 px-3 py-2 rounded-lg border-gray-400/15 border noto-sans hover: hover:border-gray-400/25 focus:border-gray-400/35"
              />
            </div>
          )}

          <div className="flex ml-auto px-2 py-2 text-sm gap-2">
            <button
              type="button"
              className="border border-gray-400/15 hover:border-gray-400/25 noto-sans rounded-lg py-2 px-15 cursor-pointer  transition-colors duration-100"
              onClick={returnPage}
            >
              Cancel
            </button>
            <button
              className={`${options[option].bgClr} ${options[option].hvrBgClr} flex items-center  justify-center noto-sans rounded-lg h-9.5 w-39 cursor-pointer transition-colors duration-100`}
              onClick={
                actionFunction
                  ? async () => {
                      await actionFunction(secret);
                      setOpen(false);
                    }
                  : showPasswordField
                    ? () => {
                        if (showPasswordField && password) setOpen(false);
                      }
                    : () => setOpen(false)
              }
            >
              {actionPending && option === "Erase" ? (
                <Spinner size="size-4" thickness="border-2" />
              ) : (
                option
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
