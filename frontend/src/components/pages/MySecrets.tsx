import { useDeleteSecret } from "../../hooks/secretHooks/useDeleteSecret";
import { useMySecrets } from "../../hooks/secretHooks/useMySecrets";
import ActiveSectionIcon from "../icons/ActiveSectionIcon";
import ExpiredSectionIcon from "../icons/ExpiredSectionIcon";
import ViewedSectionIcon from "../icons/ViewedSectionIcon";
import BoxSkeleton from "../loaders/BoxSkeleton";
import Spinner from "../loaders/Spinner";
import BackButton from "../partials/MainPartials/BackButton";
import ConfirmationPopup from "../partials/MainPartials/ConfirmationPopup";
import MySecretsEmptyList from "../partials/MySecretsPartials/MySecretsEmptyList";
import MySecretsItem from "../partials/MySecretsPartials/MySecretsItem";
import { useMemo, useState } from "react";

const MySecrets = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedSecretId, setSelectedSecretId] = useState<string>("");
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

  return (
    <main className="min-h-screen w-full pb-20 bg-[#01090f]">
      <title>My Secrets Dashboard | MonoShare</title>
      <meta name="robots" content="noindex" />
      <ConfirmationPopup
        option="Erase"
        secret={selectedSecretId}
        isOpen={isDeleting}
        setOpen={setIsDeleting}
        actionFunction={deleteSecretMutate}
        actionPending={deletePending}
      />

      <div className="flex flex-col justify-center items-center gap-20 max-md:gap-8 max-md:mx-2">
        <h1 className="mt-20 electrolize font-bold">My Secrets</h1>

        {/*//* Active */}
        <section className="lg:relative flex flex-col w-200 items-center max-md:w-full">
          <div className="absolute -left-40 -top-3 max-lg:right-0 max-lg:left-auto max-lg:top-4 max-md:scale-90 opacity-70 hover:opacity-100">
            <BackButton />
          </div>
          <div className="flex items-center h-fit justify-between mb-2 w-3xl max-md:w-full border-b-cyan-500/7 border-b max-xs:pr-0 pr-2 shadow-[0_15px_25px_-10px_rgba(6,182,212,0.15)]">
            <div className="flex items-center gap-2">
              <ActiveSectionIcon />
              <h1 className="electrolize text-(--main-light-blue) font-bold tracking-wider">
                Active
              </h1>
            </div>
            <p className="text-(--main-light-blue)">
              {!activeSecrets ? (
                <Spinner
                  size="size-4"
                  thickness="border-3"
                  clr="text-(--main-light-blue)"
                />
              ) : (
                activeSecrets.length
              )}
            </p>
          </div>
          {/* //*Active Secrets */}
          <ul className="flex flex-col w-full items-center">
            {pendingSecrets ? (
              <BoxSkeleton
                className="w-full pr-7 h-10 mt-1 border-t-2 border-[#76c4ff20]"
                colour="#76c4ff20"
                highlightColour="#76c4ff20"
              />
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

        {/*//// Viewed */}
        <section className="flex flex-col w-200 items-center max-md:w-full">
          <div className="flex items-center h-fit justify-between mb-2 w-3xl max-md:w-full border-b-green-500/7 border-b max-xs:pr-0 pr-2 shadow-[0_15px_25px_-10px_rgba(34,197,94,0.15)]">
            <div className="flex items-center gap-2">
              <ViewedSectionIcon />
              <h1 className="electrolize text-green-500 font-bold tracking-wider">
                Viewed
              </h1>
            </div>
            <p className="text-green-500">
              {!viewedSecrets ? (
                <Spinner
                  size="size-4"
                  thickness="border-3"
                  clr="text-green-500"
                />
              ) : (
                viewedSecrets.length
              )}
            </p>
          </div>
          <ul className="flex flex-col w-full items-center">
            {pendingSecrets ? (
              <BoxSkeleton
                className="w-full pr-7 h-10 mt-1 border-t-2 border-[#22c55e20]"
                colour="#22c55e20"
                highlightColour="#22c55e20"
              />
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

        {/*//! Expired */}
        <section className="flex flex-col w-200 items-center max-md:w-full">
          <div className="flex items-center h-fit justify-between mb-2 w-3xl max-md:w-full border-b-red-500/7 border-b max-xs:pr-0 pr-2 shadow-[0_15px_25px_-10px_rgba(239,68,68,0.3)]">
            <div className="flex items-center gap-2">
              <ExpiredSectionIcon />
              <h1 className="electrolize text-red-500 font-bold tracking-wider">
                Expired
              </h1>
            </div>
            <p className="text-red-500">
              {!expiredSecrets ? (
                <Spinner
                  size="size-4"
                  thickness="border-3"
                  clr="text-red-500"
                />
              ) : (
                expiredSecrets.length
              )}
            </p>
          </div>
          <ul className="flex flex-col w-full items-center">
            {pendingSecrets ? (
              <BoxSkeleton
                className="w-full pr-7 h-10 mt-1 border-t-2 border-[#fb2c3620]"
                colour="#fb2c3620"
                highlightColour="#fb2c3610"
              />
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
