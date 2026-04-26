import { useEffect, useState } from "react";
import BackButton from "../partials/MainPartials/BackButton";
import { useSecretDetails } from "../../hooks/secretHooks/useSecretDetails";
import { useLocation, useParams } from "react-router-dom";
import Timeline from "../partials/Timeline";
import SecretTextArea from "../partials/SecretTextArea";
import SecretSkeleton from "../partials/SecretSkeleton";
import ShareSecretIcon from "../icons/ShareSecretIcon";
import KeyIcon from "../icons/KeyIcon";
import SecretCreatedCheckmark from "../icons/SecretCreatedCheckmark";
import ShieldIcon from "../icons/ShieldIcon";
import CopySecretUrlIcon from "../icons/CopySecretUrlIcon";
import CopiedSecretUrlIcon from "../icons/CopiedSecretUrlIcon";

const SecretDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const created = location.state?.secret.created || false;
  const [copyClicked, setCopyClicked] = useState(false);

  useEffect(() => {
    if (location.state) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (!copyClicked) return;
    const timer = setTimeout(() => {
      setCopyClicked(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [copyClicked]);

  const stateSecret = location.state?.secret;
  const hasState = !!stateSecret;

  const { data: fetchedSecret, isPending } = useSecretDetails(id!, {
    enabled: !hasState,
  });

  const secret = stateSecret || fetchedSecret;
  if (!secret && isPending) {
    return <SecretSkeleton />;
  }

  if (!secret) {
    return null;
  }

  return (
    <div className="flex flex-col mx-auto pt-20 p-5 w-fit min-w-180 max-w-200 max-md:w-full max-md:min-w-auto max-md:px-0">
      <title>Secret Details | MonoShare</title>
      <meta name="robots" content="noindex" />
      <h1 className="electrolize mx-auto mb-20 max-md:mb-5 font-bold">
        Secret Details
      </h1>
      <div className="flex items-center justify-between w-full relative mb-5 max-md:max-w-full">
        <BackButton />
        <span
          className={`max-md:mr-2 electrolize font-bold ${secret.status === "ACTIVE" ? "text-(--main-light-blue)" : secret.status === "VIEWED" ? "text-green-500" : "text-red-500"}`}
        >
          {secret.status}
        </span>
      </div>
      <div className="flex items-center gap-1 pl-5.5">
        <KeyIcon />
        <span className="mb-0.5 text-sm text-(--white) font-bold electrolize tracking-widest">
          {secret.slug.slice(0, 5).toLowerCase()}
        </span>
      </div>
      {secret.receiverEmail && (
        <div className="flex items-center gap-1 pl-5 mb-0.5">
          <ShareSecretIcon />
          <p className="electrolize mb-0.5 sm:mb-0 text-sm sm:text-base text-(--gray) tracking-tight">
            Receiver{secret.status !== "ACTIVE" && ":"}
            {secret.status === "ACTIVE" && " must be signed in as:"}{" "}
            <span className="font-bold text-(--main-light-blue)">
              {secret.receiverEmail}
            </span>
          </p>
        </div>
      )}
      {created && (
        <div className="flex items-center gap-1 pl-5">
          <SecretCreatedCheckmark />
          <p className="electrolize mb-0.5 sm:mb-0 text-sm sm:text-base text-[#02a30f] tracking-tight">
            Your secret has been created successfully!
          </p>
        </div>
      )}
      {/* Secret Link */}
      {created && (
        <div className="mb-5 flex flex-col w-full max-md:w-full">
          <div
            className={`flex w-max min-w-180 max-w-200 max-md:w-full max-md:min-w-full max-md:rounded-none max-md:border-2 items-center justify-between rounded-md border-3 mb-2 transition-all duration-600 ease-in-out ${
              copyClicked
                ? "border-green-500 bg-green-500/15"
                : "border-(--main-dark-blue-40) bg-blue-300/5"
            } h-fit`}
          >
            {/*//* SECRET URL */}
            <p className="arvo w-max text-nowrap overflow-x-auto no-scrollbar text-[9px] xs:text-xs sm:text-sm md:text-base h-fit px-5 max-md:px-1.5 bg-transparent">
              {secret.shareUrl}#{secret.key}
            </p>
            <div
              onClick={() => {
                navigator.clipboard.writeText(
                  `${secret.shareUrl}#${secret.key}`,
                );
                setCopyClicked(true);
              }}
              className={`group cursor-pointer h-12 w-15 max-xs:h-7 max-xs:w-7 max-sm:h-9 max-sm:w-11 max-md:rounded-none border-3 border-hidden flex items-center justify-center rounded-r-[3px] transition-all duration-600 ease-in-out ${
                copyClicked ? "bg-green-500 " : "bg-(--main-dark-blue-40)"
              }
            `}
            >
              <CopySecretUrlIcon
                className={`max-xs:size-4 max-sm:size-5 text-[#eee] ${
                  copyClicked ? "hidden" : "inline-block"
                } group-hover:opacity-70`}
              />

              <CopiedSecretUrlIcon
                className={`max-xs:size-4 max-sm:size-5 text-[#eee] ${
                  copyClicked ? "inline-block" : "hidden"
                }`}
              />
            </div>
          </div>
          <div className="flex gap-1 electrolize ml-auto mr-2 max-xs:pl-2">
            <ShieldIcon className="h-4 w-4 sm:h-6 sm:w-6" />
            <p className="text-sm sm:text-base text-(--gray) tracking-tighter">
              Share this link privately with the intended recipient.
            </p>
          </div>
        </div>
      )}
      <SecretTextArea
        status={secret.status}
        created={created}
        text={secret.text}
        passwordProtected={secret.passwordProtected}
        guestSecret={!secret.creatorId}
      />
      {secret.creatorId && <Timeline secret={secret} />}
    </div>
  );
};

export default SecretDetails;
