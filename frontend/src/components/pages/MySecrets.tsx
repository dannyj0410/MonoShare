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
    <main className="min-h-screen w-screen pb-10 bg-[#01090f]">
      <ConfirmationPopup
        option="Erase"
        secret={selectedSecretId}
        isOpen={isDeleting}
        setOpen={setIsDeleting}
        actionFunction={deleteSecretMutate}
        actionPending={deletePending}
      />

      <div className="flex flex-col justify-center items-center gap-20">
        <h1 className="mt-20 electrolize font-bold">My Secrets</h1>

        {/*//* Active */}
        <section className="relative flex flex-col w-200">
          <div className="absolute -left-40 -top-3 opacity-70 hover:opacity-100">
            <BackButton />
          </div>
          <div className="flex items-center h-fit justify-between mb-2 w-3xl border-b-cyan-500/7 border-b pr-2 shadow-[0_15px_25px_-10px_rgba(6,182,212,0.15)]">
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
          <ul>
            {pendingSecrets ? (
              <BoxSkeleton
                className="w-auto h-10 mr-7 mt-1 border-t-2 border-[#76c4ff20]"
                colour="#76c4ff20"
                highlightColour="#76c4ff20"
              />
            ) : activeSecrets.length > 0 ? (
              activeSecrets.map((secret) => {
                return (
                  <MySecretsItem
                    key={secret.slug}
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
        <section className="flex flex-col w-200">
          <div className="flex items-center h-fit justify-between mb-2 w-3xl border-b-green-500/7 border-b pr-2 shadow-[0_15px_25px_-10px_rgba(34,197,94,0.15)]">
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
          <ul>
            {pendingSecrets ? (
              <BoxSkeleton
                className="w-auto h-10 mr-7 mt-1 border-t-2 border-[#22c55e20]"
                colour="#22c55e20"
                highlightColour="#22c55e20"
              />
            ) : viewedSecrets.length > 0 ? (
              viewedSecrets.map((secret) => {
                return (
                  <MySecretsItem
                    key={secret.slug}
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
        <section className="flex flex-col w-200">
          <div className="flex items-center h-fit justify-between mb-2 w-3xl border-b-red-500/7 border-b pr-2 shadow-[0_15px_25px_-10px_rgba(239,68,68,0.3)]">
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
          <ul>
            {pendingSecrets ? (
              <BoxSkeleton
                className="w-auto h-10 mr-7 mt-1 border-t-2 border-[#fb2c3620]"
                colour="#fb2c3620"
                highlightColour="#fb2c3610"
              />
            ) : expiredSecrets.length > 0 ? (
              expiredSecrets.map((secret) => {
                return (
                  <MySecretsItem
                    key={secret.slug}
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
