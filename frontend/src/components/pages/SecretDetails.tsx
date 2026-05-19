import { useEffect, useState } from "react";
import BackButton from "../partials/CommonPartials/BackButton";
import { useSecretDetails } from "../../hooks/secretHooks/useSecretDetails";
import { Navigate, useLocation, useParams } from "react-router-dom";
import SecretTextArea from "../partials/SecretDetailsPartials/SecretTextArea";
import SecretSkeleton from "../loaders/SecretSkeleton";
import ShareSecretIcon from "../icons/ShareSecretIcon";
import KeyIcon from "../icons/KeyIcon";
import SecretCreatedCheckmark from "../icons/SecretCreatedCheckmark";
import ShieldIcon from "../icons/ShieldIcon";
import CopyIcon from "../icons/CopyIcon";
import CopiedIcon from "../icons/CopiedIcon";
import Timeline from "../partials/SecretDetailsPartials/Timeline";
import { useAuthCheck } from "../../hooks/authHooks/useAuthCheck";

const SecretDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { isAuthenticated, isFetching: isFetchingAuth } = useAuthCheck();
  const created = location.state?.secret?.created ?? false;

  useEffect(() => {
    if (location.state) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const stateSecret = location.state?.secret;
  const hasState = !!stateSecret;

  const { data: fetchedSecret, isPending } = useSecretDetails(id!, {
    enabled: !hasState,
  });
  const secret = stateSecret || fetchedSecret;
  if ((!secret && isPending) || (!hasState && isFetchingAuth)) {
    return <SecretSkeleton />;
  }

  if (!hasState && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="flex flex-col mx-auto pt-20 p-5 w-fit min-w-180 max-w-200 max-md:w-full max-md:min-w-auto max-md:px-0">
      <DetailsHeaderTags />

      <BackAndStatus status={secret.status} />
      <SecretIdentifier slug={secret.slug} />
      {secret.receiverEmail && (
        <RequiredSignInAs
          status={secret.status}
          receiverEmail={secret.receiverEmail}
        />
      )}
      {created && <CreationSuccessMessage />}
      {/* //// Secret URL */}
      {created && (
        <div className="mb-5 flex flex-col w-full max-md:w-full">
          <SecretURL shareUrl={secret.shareUrl} secretKey={secret.key} />
          <SecurityReminder />

          {secret.secretKey && (
            <CopyPasswordButton secretKey={secret.secretKey} />
          )}
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

// sub-components

const DetailsHeaderTags = () => {
  return (
    <>
      <title>Secret Details | MonoShare</title>
      <meta name="robots" content="noindex" />
      <h1 className="electrolize mx-auto mb-20 max-md:mb-5 font-bold">
        Secret Details
      </h1>
    </>
  );
};

const SecretURL = ({
  shareUrl,
  secretKey,
}: {
  shareUrl: string;
  secretKey: string;
}) => {
  const [copyClicked, setCopyClicked] = useState(false);
  useEffect(() => {
    if (!copyClicked) return;
    const timer = setTimeout(() => {
      setCopyClicked(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [copyClicked]);
  return (
    <div
      className={`flex w-full min-w-180 max-w-200 max-md:w-full max-md:min-w-full max-md:rounded-none max-md:border-2 items-center justify-between rounded-md border-3 mb-2 transition-all duration-600 ease-in-out ${
        copyClicked
          ? "border-green-500 bg-green-500/15"
          : "border-(--main-dark-blue-40) bg-blue-300/5"
      } h-fit`}
    >
      <p className="arvo w-max text-nowrap overflow-x-auto no-scrollbar text-[9px] xs:text-xs sm:text-sm md:text-base h-fit px-5 max-md:px-1.5 bg-transparent">
        {shareUrl}#{secretKey}
      </p>
      <div
        onClick={() => {
          navigator.clipboard.writeText(`${shareUrl}#${secretKey}`);
          setCopyClicked(true);
        }}
        className={`group cursor-pointer h-12 w-15 max-xs:h-7 max-xs:w-7 max-sm:h-9 max-sm:w-11 max-md:rounded-none border-3 border-hidden flex items-center justify-center rounded-r-[3px] transition-all duration-600 ease-in-out ${
          copyClicked ? "bg-green-500 " : "bg-(--main-dark-blue-40)"
        }
            `}
      >
        <CopyIcon
          className={`max-xs:size-4 max-sm:size-5 text-(--white) ${
            copyClicked ? "hidden" : "inline-block"
          } group-hover:opacity-70`}
        />

        <CopiedIcon
          className={`max-xs:size-4 max-sm:size-5 text-(--white) ${
            copyClicked ? "inline-block" : "hidden"
          }`}
        />
      </div>
    </div>
  );
};

const BackAndStatus = ({ status }: { status: string }) => {
  return (
    <div className="flex items-center justify-between w-full relative mb-5 max-md:max-w-full">
      <BackButton />
      <span
        className={`max-md:mr-2 electrolize font-bold ${status === "ACTIVE" ? "text-(--main-light-blue)" : status === "VIEWED" ? "text-green-500" : "text-red-500"}`}
      >
        {status}
      </span>
    </div>
  );
};

const SecretIdentifier = ({ slug }: { slug: string }) => {
  return (
    <div className="flex items-center gap-1 pl-5.5">
      <KeyIcon />
      <span className="mb-0.5 text-sm text-(--white) font-bold electrolize tracking-widest">
        {slug.slice(0, 5).toLowerCase()}
      </span>
    </div>
  );
};

const RequiredSignInAs = ({
  status,
  receiverEmail,
}: {
  status: string;
  receiverEmail: string;
}) => {
  return (
    <div className="flex items-center gap-1 pl-5 mb-0.5">
      <ShareSecretIcon />
      <p className="electrolize mb-0.5 sm:mb-0 text-sm sm:text-base text-(--gray) tracking-tight">
        Receiver{status !== "ACTIVE" && ":"}
        {status === "ACTIVE" && " must be signed in as:"}{" "}
        <span className="font-bold text-(--main-light-blue)">
          {receiverEmail}
        </span>
      </p>
    </div>
  );
};

const CreationSuccessMessage = () => {
  return (
    <div className="flex items-center gap-1 pl-5">
      <SecretCreatedCheckmark />
      <p className="electrolize mb-0.5 sm:mb-0 text-sm sm:text-base text-[#02a30f] tracking-tight">
        Your secret has been created successfully!
      </p>
    </div>
  );
};
const SecurityReminder = () => {
  return (
    <div className="flex gap-1 electrolize ml-auto mr-2 max-xs:pl-2">
      <ShieldIcon className="h-4 w-4 sm:h-6 sm:w-6" />
      <p className="text-sm sm:text-base text-(--gray) tracking-tighter">
        Share this link privately with the intended recipient.
      </p>
    </div>
  );
};
const CopyPasswordButton = ({ secretKey }: { secretKey: string }) => {
  return (
    <div className="flex justify-end mr-2 relative group">
      <button
        type="button"
        onClick={() => navigator.clipboard.writeText(secretKey)}
        className="flex gap-0.5 items-center"
      >
        <CopyIcon
          className={`size-4 text-(--gray) group-active:text-green-500 group-hover:text-(--white) cursor-pointer`}
        />
        <span className="electrolize underline underline-offset-3 group-hover:underline-offset-2 group-active:text-green-500 duration-200 group-hover:text-(--white) text-(--gray) text-xs sm:text-sm cursor-pointer">
          Copy password
        </span>
      </button>

      <p className="pointer-events-none absolute top-5.5 text-xs max-xs:text-[10px] font-light noto-sans text-right bg-(--white)/10 backdrop-blur-xs py-1 px-2 rounded-sm opacity-0 group-hover:opacity-90 duration-300">
        For maximum safety, send the link and the password using two different
        apps <br />
        (e.g., Email for the link, WhatsApp for the password).
      </p>
    </div>
  );
};
