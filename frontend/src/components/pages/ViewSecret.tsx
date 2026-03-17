import { useLocation, useParams } from "react-router-dom";
import ConfirmationPopup from "../partials/MainPartials/ConfirmationPopup";
import { useEffect, useState } from "react";
import { useSecretMetadata } from "../../hooks/secretHooks/useSecretMetadata";
import SecretTextArea from "../partials/SecretTextArea";
import { useViewSecret } from "../../hooks/secretHooks/useViewSecret";
import BackButton from "../partials/MainPartials/BackButton";
import {
  decryptSecret,
  importKeyFromString,
} from "../../utils/encryption/crypto";
import SecretSkeleton from "../partials/SecretSkeleton";

const ViewSecret = () => {
  const { id } = useParams();
  const { hash } = useLocation();
  const [viewUnconfirmed, setViewUnconfirmed] = useState(true);
  const [password, setPassword] = useState("");
  const [secretText, setSecretText] = useState("...");
  const { data: metadata, isPending: metadataPending } = useSecretMetadata(
    id!,
    !!hash,
  );
  const { data: secret, isLoading: secretLoading } = useViewSecret(
    id!,
    password,
    {
      enabled: !viewUnconfirmed,
    },
  );

  useEffect(() => {
    if (!secret || !secret.encryptedText || !hash) return;

    const handleDecryption = async () => {
      try {
        const keyString = hash.slice(1);
        const secretKey = await importKeyFromString(keyString);

        const decrypted = await decryptSecret(
          secret.encryptedText,
          secret.encryptionIV,
          secretKey,
        );

        if (decrypted) {
          setSecretText(decrypted);
        }
      } catch (error) {
        console.error("Failed to decrypt secret:", error);
        setSecretText("Error: Could not decrypt message. Key may be invalid.");
      }
    };
    handleDecryption();
  }, [secret, hash]);
  if ((metadataPending || secretLoading) && !secret) {
    return <SecretSkeleton view />;
  }

  return (
    <div className="flex flex-col mx-auto pt-40 p-5 w-188 min-w-120 max-w-210 max-md:w-full max-md:min-w-auto max-md:px-0 max-md:pt-30 max-sm:pb-20">
      <ConfirmationPopup
        option="View"
        secret={id!}
        isOpen={viewUnconfirmed}
        setOpen={setViewUnconfirmed}
        showPasswordField={!!metadata?.passwordProtected}
        isOwner={metadata?.isOwner}
        password={password}
        setPassword={setPassword}
      />

      {!viewUnconfirmed && secret && (
        <>
          <div className="flex items-center justify-between w-full relative mb-5 max-md:w-full">
            <BackButton />
            <h1 className={"electrolize font-bold text-green-500 max-md:mr-2"}>
              {secret.status}
            </h1>
          </div>
          <SecretTextArea
            status={secret.status}
            passwordProtected={true}
            text={secretText}
            viewing
          />
        </>
      )}
    </div>
  );
};

export default ViewSecret;
