import { generateSecretKey } from "../../../../utils/encryption/generate-secretkey";
import CopiedIcon from "../../../icons/CopiedIcon";
import CopyIcon from "../../../icons/CopyIcon";
import MagicWandIcon from "../../../icons/MagicWandIcon";

interface SecretKeyButtonsProps {
  showButtons: boolean;
  hasCopiedKey: boolean;
  setHasCopiedKey: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSecretKey: React.Dispatch<React.SetStateAction<boolean>>;
  setGeneratedKey: (generatedKey: string) => void;
  secretKey: string;
}

const SecretKeyButtons = ({
  showButtons,
  hasCopiedKey,
  setHasCopiedKey,
  setShowSecretKey,
  setGeneratedKey,
  secretKey,
}: SecretKeyButtonsProps) => {
  return (
    <div
      className={`flex max-md:order-last gap-2 max-md:gap-3 max-md:opacity-100 md:absolute md:group-hover:opacity-100 ${showButtons ? "opacity-100" : "md:pointer-events-none md:opacity-0"} -left-34 md:h-full duration-800`}
    >
      <button
        type="button"
        onClick={() => {
          setHasCopiedKey(true);
          navigator.clipboard.writeText(secretKey);
        }}
        className={`cursor-pointer border-3 bg-[#04121C] hover:bg-[#051520] active:bg-[#061a29] ${hasCopiedKey ? "border-(--white)/50" : "border-(--main-dark-blue)/60 hover:border-(--main-dark-blue)"} w-15 rounded-lg text-black flex items-center justify-center transition-all duration-500 ease-in-out`}
      >
        <div className="flex flex-col items-center">
          <CopyIcon
            className={`max-xs:size-3 max-sm:size-4 size-4.5 text-[#eee] ${
              hasCopiedKey ? "hidden" : "inline-block"
            }`}
          />
          <CopiedIcon
            className={`max-xs:size-3 max-sm:size-4 size-4.5 text-[#eee] ${
              hasCopiedKey ? "inline-block" : "hidden"
            }`}
          />
          <span className="text-(--white) text-[8px]">
            {hasCopiedKey ? "Copied" : "Copy"}
          </span>
        </div>
      </button>
      <button
        type="button"
        onClick={() => {
          setShowSecretKey(true);
          setGeneratedKey(generateSecretKey());
        }}
        className="group/gen-button cursor-pointer border-3 border-(--main-dark-blue)/60 hover:border-(--main-dark-blue) bg-[#04121C] hover:bg-[#051520] active:bg-[#061a29] w-15 rounded-lg text-black flex items-center justify-center duration-200 ease-in-out"
      >
        <div className="flex flex-col items-center">
          <MagicWandIcon />
          <span className="text-(--white) text-[8px]">Gen Key</span>
        </div>
      </button>
    </div>
  );
};

export default SecretKeyButtons;
