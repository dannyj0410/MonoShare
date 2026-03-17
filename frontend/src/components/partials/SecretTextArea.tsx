import { useState } from "react";
import CopySecretButton from "./CopySecretButton";
import EraseButton from "./EraseButton";

const SecretTextArea = ({
  status,
  created,
  viewing,
  text,
  passwordProtected,
  guestSecret,
}: {
  status: string;
  created?: boolean;
  viewing?: boolean;
  text?: string;
  passwordProtected: boolean;
  guestSecret?: boolean;
}) => {
  const [eraseConfirmation, setEraseConfirmation] = useState(false);
  const secretText =
    created || text
      ? text
      : status !== "ACTIVE"
        ? "empty."
        : "*!kuSL%GYM*Ad1WAl#o$*RtV#!&*ml|EXAMPLE|UaPl^HSV@!&*$DJpoQm.%QzX;P&^";

  return (
    <div className="flex flex-col w-full">
      <div className="flex electrolize px-5 mt-2 pb-1 text-xs sm:text-sm text-(--gray)">
        <p className="max-xs:text-balance text-wrap">
          {created
            ? "You will only see this once."
            : viewing
              ? "This secret has now been erased. You will not be able to view it again."
              : status === "VIEWED"
                ? "Your secret has been viewed and erased."
                : status === "EXPIRED"
                  ? "Your secret has been erased and is no longer accessible."
                  : `Your secret is fully encrypted${passwordProtected ? " and" : "."}`}
          <span className="font-bold">
            {passwordProtected &&
              status === "ACTIVE" &&
              !created &&
              " password protected"}
          </span>
          {passwordProtected && !created && status !== "VIEWED" && "."}
        </p>
      </div>

      <textarea
        readOnly
        name="secret-content"
        className={`max-md:mx-2 text-wrap box-border bg-(--main-dark-blue-40) max-md:px-3 max-md:text-sm px-5 py-3 min-h-40
            field-sizing-content rounded-md noto-sans resize-none border-2 
            border-white/5 outline-0
            ${
              !created && status === "ACTIVE"
                ? "text-transparent shadow-none select-none pointer-events-none"
                : "text-(--white)"
            }
          `}
        style={
          !created && status === "ACTIVE"
            ? { textShadow: "0 0 10px rgba(255,255,255,0.8)" }
            : {}
        }
        value={secretText}
      ></textarea>

      {guestSecret && !viewing && (
        <p className="text-red-400 text-basemax-sm:text-sm electrolize mr-2 mt-2 max-xs:pl-2 ml-auto">
          This secret will erase itself{" "}
          <span className="underline underline-offset-2">after expiration</span>
          .
        </p>
      )}

      <div className="flex justify-end gap-5">
        {!viewing && !guestSecret && (
          <EraseButton
            status={status}
            eraseConfirmation={eraseConfirmation}
            setEraseConfirmation={setEraseConfirmation}
          />
        )}
        {text && (created || viewing) && (
          <CopySecretButton show={!eraseConfirmation} secret={text} />
        )}
      </div>
    </div>
  );
};

export default SecretTextArea;
