import type { Dispatch, SetStateAction } from "react";
import ThinSimpleArrowIcon from "../../icons/ThinSimpleArrowIcon";
import BoxSkeleton from "../../loaders/BoxSkeleton";
import Spinner from "../../loaders/Spinner";
import MySecretsEmptyList from "./MySecretsEmptyList";
import MySecretsItem, { type MySecretsItemProps } from "./MySecretsItem";
import type { UseMutateFunction } from "@tanstack/react-query";
import type { DeleteSecretResponse } from "../../../interfaces/secret.interface";

type SectionVariant = "active" | "viewed" | "expired";

const VARIANT_STYLES: Record<
  SectionVariant,
  {
    color: string;
    hoverBg: string;
    borderColor: string;
    shadow: string;
    skeletonColor: string;
    skeletonHighlight: string;
    skeletonBorderColor: string;
  }
> = {
  active: {
    color: "text-(--main-light-blue)",
    hoverBg: "hover:bg-(--main-light-blue)/5",
    borderColor: "border-b-cyan-500/7",
    shadow: "shadow-[0_15px_25px_-10px_rgba(6,182,212,0.15)]",
    skeletonColor: "#76c4ff20",
    skeletonHighlight: "#76c4ff20",
    skeletonBorderColor: "border-[#76c4ff20]",
  },
  viewed: {
    color: "text-green-500",
    hoverBg: "hover:bg-green-500/5",
    borderColor: "border-b-green-500/7",
    shadow: "shadow-[0_15px_25px_-10px_rgba(34,197,94,0.15)]",
    skeletonColor: "#22c55e20",
    skeletonHighlight: "#22c55e20",
    skeletonBorderColor: "border-[#22c55e20]",
  },
  expired: {
    color: "text-red-500",
    hoverBg: "hover:bg-red-500/10",
    borderColor: "border-b-red-500/7",
    shadow: "shadow-[0_15px_25px_-10px_rgba(239,68,68,0.3)]",
    skeletonColor: "#fb2c3620",
    skeletonHighlight: "#fb2c3610",
    skeletonBorderColor: "border-[#fb2c3620]",
  },
};

type MySecretsSectionProps = {
  variant: SectionVariant;
  label: string;
  icon: React.ReactNode;
  secrets: MySecretsItemProps[];
  isPending: boolean;
  isHidden: boolean;
  selectedSecretId: string;
  deletePending: boolean;
  onToggle: () => void;
  setSelectedSecretId: Dispatch<SetStateAction<string>>;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
  deleteSecretMutate: UseMutateFunction<
    DeleteSecretResponse,
    Error,
    string,
    unknown
  >;
};

const MySecretsSection = ({
  variant,
  label,
  icon,
  secrets,
  isPending,
  isHidden,
  selectedSecretId,
  deletePending,
  onToggle,
  setSelectedSecretId,
  setIsDeleting,
  deleteSecretMutate,
}: MySecretsSectionProps) => {
  const styles = VARIANT_STYLES[variant];
  const listId = `${variant}-secrets-list`;
  const headingId = `${variant}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className={`flex flex-col w-200 items-center max-md:w-full duration-300 ${isHidden ? "mb-1" : `${variant === "expired" ? "mb-1" : "mb-10"}`}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={!isHidden}
        aria-controls={listId}
        className={`group ${styles.hoverBg} ${isHidden ? "grayscale-75" : ""} hover:rounded-md max-md:pl-1 overflow-hidden cursor-pointer flex items-center h-fit justify-between mb-2 w-3xl max-md:w-full ${styles.borderColor} border-b max-xs:pr-0 pr-2 ${styles.shadow}`}
      >
        <div className="flex items-center gap-2 ease-in-out duration-300 relative group-hover:ml-6 max-md:ml-5">
          <ThinSimpleArrowIcon
            className={`size-4 duration-200 group-hover:opacity-100 opacity-0 max-md:opacity-100 absolute -left-5 ease-in-out ${styles.color}`}
            isActive={isHidden}
            rotate="-rotate-180"
          />
          {icon}
          <h2
            id={headingId}
            className={`electrolize ${styles.color} font-bold tracking-wider`}
          >
            {label}
          </h2>
        </div>
        <output
          aria-live="polite"
          aria-label={`${label} secret count`}
          className={`${styles.color} max-md:pr-2`}
        >
          {!secrets ? (
            <Spinner size="size-4" thickness="border-3" clr={styles.color} />
          ) : (
            secrets.length
          )}
        </output>
      </button>

      <ul
        id={listId}
        className={`flex flex-col w-full items-center ${isHidden ? "hidden" : ""}`}
      >
        {isPending ? (
          <li
            aria-label={`Loading ${label.toLowerCase()} secrets`}
            className="w-full"
          >
            <BoxSkeleton
              className={`w-full pr-7 h-10 mt-1 border-t-2 ${styles.skeletonBorderColor}`}
              colour={styles.skeletonColor}
              highlightColour={styles.skeletonHighlight}
            />
          </li>
        ) : secrets.length > 0 ? (
          secrets.map((secret, index) => (
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
          ))
        ) : (
          <MySecretsEmptyList type={label} />
        )}
      </ul>
    </section>
  );
};

export default MySecretsSection;
