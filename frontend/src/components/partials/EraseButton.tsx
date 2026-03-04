import { useState } from "react";
import { useDeleteSecret } from "../../hooks/secretHooks/useDeleteSecret";
import { useParams } from "react-router-dom";
import Spinner from "../loaders/Spinner";

const EraseButton = ({ status }: { status: string }) => {
  const [eraseConfirmation, setEraseConfirmation] = useState(false);
  const { id } = useParams();
  const { mutate: deleteSecretMutate, isPending } = useDeleteSecret(true);

  return (
    <div className="flex ml-auto gap-5">
      {eraseConfirmation && (
        <>
          <button
            onClick={() => setEraseConfirmation(false)}
            className="flex items-center justify-center noto-sans w-25 h-11 rounded-md mt-5 bg-(--main-dark-blue-40) cursor-pointer hover:bg-(--main-dark-blue-70)"
          >
            Cancel
          </button>
          <button
            className={`flex items-center justify-center noto-sans w-25 h-11 rounded-md mt-5 ${isPending ? "bg-red-950 text-(--gray)" : "bg-red-500 text-(--white)"} cursor-pointer`}
            onClick={() => deleteSecretMutate(id!)}
          >
            {!isPending ? (
              "Confirm"
            ) : (
              <Spinner size="size-5" thickness="border-3" />
            )}
          </button>
        </>
      )}
      {!eraseConfirmation && (
        <button
          onClick={() => setEraseConfirmation(true)}
          className="noto-sans w-25 py-2.5 rounded-md mt-5 bg-red-500 cursor-pointer"
        >
          {status === "ACTIVE" ? "Erase" : "Remove"}
        </button>
      )}
    </div>
  );
};

export default EraseButton;
