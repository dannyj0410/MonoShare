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
  const showError = formHasErrors && hasSubmitted;
  return (
    <div className="flex items-center justify-center max-lg:mt-1">
      <button
        disabled={isCreating}
        className={`create-btn noto-sans font-semibold ${showError ? "is-invalid" : ""}`}
      >
        {!isCreating ? (
          "Create"
        ) : (
          <Spinner
            size="size-4"
            thickness="border-3 mx-auto"
            clr="text-(--main-light-blue)/60"
          />
        )}
      </button>
    </div>
  );
};

export default CreateSecretButton;
