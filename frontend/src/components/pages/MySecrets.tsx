import { useMemo, useState } from "react";
import { useDeleteSecret } from "../../hooks/secretHooks/useDeleteSecret";
import { useMySecrets } from "../../hooks/secretHooks/useMySecrets";
import ActiveSectionIcon from "../icons/ActiveSectionIcon";
import ExpiredSectionIcon from "../icons/ExpiredSectionIcon";
import ViewedSectionIcon from "../icons/ViewedSectionIcon";
import BoxSkeleton from "../loaders/BoxSkeleton";
import Spinner from "../loaders/Spinner";
import BackButton from "../partials/CommonPartials/BackButton";
import ConfirmationPopup from "../partials/CommonPartials/ConfirmationPopup";
import MySecretsEmptyList from "../partials/MySecretsPartials/MySecretsEmptyList";
import MySecretsItem from "../partials/MySecretsPartials/MySecretsItem";
import ThinSimpleArrowIcon from "../icons/ThinSimpleArrowIcon";

type SectionState = Record<"active" | "viewed" | "expired", boolean>;

const MySecrets = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedSecretId, setSelectedSecretId] = useState<string>("");
  const [hiddenSections, setHiddenSections] = useState<SectionState>({
    active: false,
    viewed: false,
    expired: false,
  });
  const { data: mySecrets, isPending: pendingSecrets } = useMySecrets();
  const { mutateAsync: deleteSecretMutate, isPending: deletePending } =
    useDeleteSecret();

  const activeSecrets = useMemo(
    () => mySecrets?.ownedSecrets.filter((s) => s.status === "ACTIVE") || [],
    [mySecrets],
  );
  const viewedSecrets = useMemo(
    () => mySecrets?.ownedSecrets.filter((s) => s.status === "VIEWED") || [],
    [mySecrets],
  );
  const expiredSecrets = useMemo(
    () => mySecrets?.ownedSecrets.filter((s) => s.status === "EXPIRED") || [],
    [mySecrets],
  );

  const hideSection = (sectionName: keyof SectionState) => {
    setHiddenSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  return (
    <main className="min-h-screen w-full pb-20 bg-(--bg)">
      <title>Secrets Dashboard | MonoShare</title>
      <meta name="robots" content="noindex" />
      <ConfirmationPopup
        option="Erase"
        secret={selectedSecretId}
        isOpen={isDeleting}
        setOpen={setIsDeleting}
        actionFunction={deleteSecretMutate}
        actionPending={deletePending}
      />

      <div className="flex flex-col justify-center items-center max-md:gap-8 max-md:mx-2">
        <h1 className="my-20 electrolize font-bold">My Secrets</h1>

        {/*//* Active Section */}
        <section
          aria-labelledby="active-heading"
          className={`lg:relative flex flex-col w-200 items-center max-md:w-full duration-300 ${hiddenSections.active ? "mb-1" : "mb-10"}`}
        >
          <div className="absolute -left-40 -top-3 max-lg:right-0 max-lg:left-auto max-lg:top-4 max-md:scale-90 opacity-70 hover:opacity-100">
            <BackButton />
          </div>
          <button
            type="button"
            onClick={() => hideSection("active")}
            aria-expanded={!hiddenSections.active}
            aria-controls="active-secrets-list"
            className={`group hover:bg-(--main-light-blue)/5 ${hiddenSections.active && "grayscale-75"} hover:rounded-md overflow-hidden cursor-pointer flex items-center h-fit justify-between mb-2 w-3xl max-md:w-full border-b-cyan-500/7 border-b max-xs:pr-0 pr-2 shadow-[0_15px_25px_-10px_rgba(6,182,212,0.15)]`}
          >
            <div className="flex items-center gap-2 ease-in-out duration-300 relative group-hover:ml-6 max-md:ml-5">
              <ThinSimpleArrowIcon
                className="size-4 duration-200 group-hover:opacity-100 opacity-0 max-md:opacity-100 absolute -left-5 ease-in-out text-(--main-light-blue)"
                isActive={hiddenSections.active}
                rotate="-rotate-180"
              />
              <ActiveSectionIcon aria-hidden="true" />
              <h2
                id="active-heading"
                className="electrolize text-(--main-light-blue) font-bold tracking-wider"
              >
                Active
              </h2>
            </div>
            <output
              aria-live="polite"
              aria-label="Active secret count"
              className="text-(--main-light-blue)"
            >
              {!activeSecrets ? (
                <Spinner
                  size="size-4"
                  thickness="border-3"
                  clr="text-(--main-light-blue)"
                />
              ) : (
                activeSecrets.length
              )}
            </output>
          </button>
          {/* //*Active Secrets */}
          <ul
            id="active-secrets-list"
            className={`flex flex-col w-full items-center ${hiddenSections.active && "hidden"}`}
          >
            {pendingSecrets ? (
              <li aria-label="Loading active secrets" className="w-full">
                <BoxSkeleton
                  className="w-full pr-7 h-10 mt-1 border-t-2 border-[#76c4ff20]"
                  colour="#76c4ff20"
                  highlightColour="#76c4ff20"
                />
              </li>
            ) : activeSecrets.length > 0 ? (
              activeSecrets.map((secret, index) => {
                return (
                  <MySecretsItem
                    key={secret.slug}
                    index={index}
                    secret={secret}
                    isSelected={selectedSecretId === secret.slug}
                    setSelectedSecretId={setSelectedSecretId}
                    setIsDeleting={setIsDeleting}
                    deleteSecretMutate={deleteSecretMutate}
                    pendingDelete={deletePending}
                  />
                );
              })
            ) : (
              <MySecretsEmptyList type="Active" />
            )}
          </ul>
        </section>

        {/*//// Viewed Section */}
        <section
          className={`lg:relative flex flex-col w-200 items-center max-md:w-full duration-300 ${hiddenSections.viewed ? "mb-1" : "mb-10"}`}
          aria-labelledby="viewed-heading"
        >
          <button
            type="button"
            onClick={() => hideSection("viewed")}
            aria-expanded={!hiddenSections.viewed}
            aria-controls="viewed-secrets-list"
            className={`group hover:bg-green-500/5 ${hiddenSections.viewed && "grayscale-75"} hover:rounded-md overflow-hidden cursor-pointer flex items-center h-fit justify-between mb-2 w-3xl max-md:w-full border-b-green-500/7 border-b max-xs:pr-0 pr-2 shadow-[0_15px_25px_-10px_rgba(34,197,94,0.15)]`}
          >
            <div className="flex items-center gap-2 ease-in-out duration-300 relative group-hover:ml-6 max-md:ml-5">
              <ThinSimpleArrowIcon
                className="size-4 duration-200 group-hover:opacity-100 opacity-0 max-md:opacity-100 absolute -left-5 ease-in-out text-green-500"
                isActive={hiddenSections.viewed}
                rotate="-rotate-180"
              />
              <ViewedSectionIcon aria-hidden="true" />
              <h2
                id="viewed-heading"
                className="electrolize text-green-500 font-bold tracking-wider"
              >
                Viewed
              </h2>
            </div>
            <output
              aria-live="polite"
              aria-label="Viewed secret count"
              className="text-green-500"
            >
              {!viewedSecrets ? (
                <Spinner
                  size="size-4"
                  thickness="border-3"
                  clr="text-green-500"
                />
              ) : (
                viewedSecrets.length
              )}
            </output>
          </button>
          {/* //// Viewed Secrets */}
          <ul
            id="viewed-secrets-list"
            className={`flex flex-col w-full items-center ${hiddenSections.viewed && "hidden"}`}
          >
            {pendingSecrets ? (
              <li aria-label="Loading viewed secrets" className="w-full">
                <BoxSkeleton
                  className="w-full pr-7 h-10 mt-1 border-t-2 border-[#22c55e20]"
                  colour="#22c55e20"
                  highlightColour="#22c55e20"
                />
              </li>
            ) : viewedSecrets.length > 0 ? (
              viewedSecrets.map((secret, index) => {
                return (
                  <MySecretsItem
                    key={secret.slug}
                    index={index}
                    secret={secret}
                    isSelected={selectedSecretId === secret.slug}
                    setSelectedSecretId={setSelectedSecretId}
                    setIsDeleting={setIsDeleting}
                    deleteSecretMutate={deleteSecretMutate}
                    pendingDelete={deletePending}
                  />
                );
              })
            ) : (
              <MySecretsEmptyList type="Viewed" />
            )}
          </ul>
        </section>

        {/*//! Expired Section*/}
        <section
          className="flex flex-col w-200 items-center max-md:w-full"
          aria-labelledby="expired-heading"
        >
          <button
            type="button"
            onClick={() => hideSection("expired")}
            aria-expanded={!hiddenSections.expired}
            aria-controls="expired-secrets-list"
            className={`group hover:bg-red-500/10 ${hiddenSections.expired && "grayscale-75"} hover:rounded-md overflow-hidden cursor-pointer flex items-center h-fit justify-between mb-2 w-3xl max-md:w-full border-b-red-500/7 border-b max-xs:pr-0 pr-2 shadow-[0_15px_25px_-10px_rgba(239,68,68,0.3)]`}
          >
            <div className="flex items-center gap-2 ease-in-out duration-300 relative group-hover:ml-6 max-md:ml-5">
              <ThinSimpleArrowIcon
                className="size-4 duration-200 group-hover:opacity-100 opacity-0 max-md:opacity-100 absolute -left-5 ease-in-out text-red-500"
                isActive={hiddenSections.expired}
                rotate="-rotate-180"
              />
              <ExpiredSectionIcon aria-hidden="true" />
              <h2
                id="expired-heading"
                className="electrolize text-red-500 font-bold tracking-wider"
              >
                Expired
              </h2>
            </div>
            <output
              aria-live="polite"
              aria-label="Expired secret count"
              className="text-red-500"
            >
              {!expiredSecrets ? (
                <Spinner
                  size="size-4"
                  thickness="border-3"
                  clr="text-red-500"
                />
              ) : (
                expiredSecrets.length
              )}
            </output>
          </button>
          {/* //! Expired Secrets */}
          <ul
            id="expired-secrets-list"
            className={`flex flex-col w-full items-center ${hiddenSections.expired && "hidden"}`}
          >
            {pendingSecrets ? (
              <li aria-label="Loading expired secrets" className="w-full">
                <BoxSkeleton
                  className="w-full pr-7 h-10 mt-1 border-t-2 border-[#fb2c3620]"
                  colour="#fb2c3620"
                  highlightColour="#fb2c3610"
                />
              </li>
            ) : expiredSecrets.length > 0 ? (
              expiredSecrets.map((secret, index) => {
                return (
                  <MySecretsItem
                    key={secret.slug}
                    index={index}
                    secret={secret}
                    isSelected={selectedSecretId === secret.slug}
                    setSelectedSecretId={setSelectedSecretId}
                    setIsDeleting={setIsDeleting}
                    deleteSecretMutate={deleteSecretMutate}
                    pendingDelete={deletePending}
                  />
                );
              })
            ) : (
              <MySecretsEmptyList type="Expired" />
            )}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default MySecrets;
