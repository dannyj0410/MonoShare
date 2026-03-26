import Spinner from "../../loaders/Spinner";

const CreateSecretButton = ({
  isCreating,
  formHasErrors,
  hasSubmitted,
}: {
  isCreating: boolean;
  formHasErrors: boolean | undefined;
  hasSubmitted: boolean;
}) => {
  return (
    <button
      disabled={isCreating}
      className={`relative overflow-hidden action-btn max-sm:w-[90vw] max-sm:rounded-sm max-sm:py-8 max-sm:text-lg max-sm:bg-[#0A314E80] max-sm:bg-none! max-sm:ml-auto max-sm:h-15 max-md:min-w-26 w-26 h-12.5 border-3 rounded-xl arvo ${formHasErrors && hasSubmitted ? "bg-red-400/10! bg-none! border-red-400/15! hover:bg-red-400/15! hover:border-red-400/20!" : "group"}`}
    >
      {!isCreating ? (
        <span>Create</span>
      ) : (
        <Spinner size="size-5" thickness="border-3" />
      )}
      <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-500 group-hover:transform-[skew(-30deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20"></div>
      </div>
    </button>
  );
};

export default CreateSecretButton;
