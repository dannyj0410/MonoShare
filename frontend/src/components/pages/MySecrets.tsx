import { useMemo, useState } from "react";
import { useDeleteSecret } from "../../hooks/secretHooks/useDeleteSecret";
import { useMySecrets } from "../../hooks/secretHooks/useMySecrets";
import ActiveSectionIcon from "../icons/ActiveSectionIcon";
import ExpiredSectionIcon from "../icons/ExpiredSectionIcon";
import ViewedSectionIcon from "../icons/ViewedSectionIcon";
import BackButton from "../partials/CommonPartials/BackButton";
import ConfirmationPopup from "../partials/CommonPartials/ConfirmationPopup";
import MySecretsSection from "../partials/MySecretsPartials/MySecretsSection";

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

  const sharedProps = {
    isPending: pendingSecrets,
    selectedSecretId,
    deletePending,
    setSelectedSecretId,
    setIsDeleting,
    deleteSecretMutate,
  };

  return (
    <main className="min-h-screen w-full pb-20 bg-(--bg) overflow-x-hidden">
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

      <div className="flex flex-col justify-center items-center w-full max-md:gap-8 max-md:mx-0">
        <h1 className="my-20 max-md:mb-5 electrolize font-bold">My Secrets</h1>

        <div className="lg:relative w-200 max-md:w-full">
          <div className="absolute -left-40 -top-3 max-lg:right-0 max-lg:left-auto max-lg:top-4 max-md:scale-90 opacity-70 hover:opacity-100">
            <BackButton />
          </div>

          <MySecretsSection
            variant="active"
            label="Active"
            icon={<ActiveSectionIcon aria-hidden="true" />}
            secrets={activeSecrets}
            isHidden={hiddenSections.active}
            onToggle={() => hideSection("active")}
            {...sharedProps}
          />

          <MySecretsSection
            variant="viewed"
            label="Viewed"
            icon={<ViewedSectionIcon aria-hidden="true" />}
            secrets={viewedSecrets}
            isHidden={hiddenSections.viewed}
            onToggle={() => hideSection("viewed")}
            {...sharedProps}
          />

          <MySecretsSection
            variant="expired"
            label="Expired"
            icon={<ExpiredSectionIcon aria-hidden="true" />}
            secrets={expiredSecrets}
            isHidden={hiddenSections.expired}
            onToggle={() => hideSection("expired")}
            {...sharedProps}
          />
        </div>
      </div>
    </main>
  );
};

export default MySecrets;
