import { useNavigate } from "react-router-dom";
import { forwardRef, useCallback, useState } from "react";
import { useCreateSecret } from "../../../hooks/secretHooks/useCreateSecret";
import ReceiverEmailInputField from "./ReceiverEmailInput";
import SecretPasswordField from "./SecretPasswordField";
import ExpirationSelector from "./ExpirationSelector";
import AuthCTA from "./AuthCTA";

import {
  validateReceiverEmail,
  validateSecretPassword,
  validateSecretText,
} from "../../../utils/validators/secret.validator";

import type {
  ExpirationTimeOptions,
  ICreateSecretFormData,
} from "../../../interfaces/secret.interface";
import { useDebounce } from "../../../hooks/useDebounce";
import { createEncryptedSecret } from "../../../services/createSecret";
import CharCounter from "./CharCounter";
import CreateSecretButton from "./CreateSecretButton";

const CreateSecretForm = forwardRef<
  HTMLDivElement,
  { isAuthenticated: boolean }
>(({ isAuthenticated }, ref) => {
  const navigate = useNavigate();

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [secretFormData, setSecretFormData] = useState<ICreateSecretFormData>({
    receiverEmail: "",
    secret: "",
    password: "",
    timeTillExpiration: "7d",
  });

  const { mutateAsync: createSecretMutateAsync, isPending: isCreating } =
    useCreateSecret();

  const debouncedEmail = useDebounce(secretFormData.receiverEmail, 200);
  const debouncedSecret = useDebounce(secretFormData.secret, 300);
  const debouncedPassword = useDebounce(secretFormData.password, 200);
  const charLimit = isAuthenticated ? 10000 : 1000;

  const emailError =
    debouncedEmail.length > 0
      ? validateReceiverEmail(debouncedEmail)
      : undefined;

  const secretError =
    hasSubmitted || debouncedSecret.length > 0
      ? validateSecretText(debouncedSecret, charLimit)
      : undefined;

  const passwordError =
    debouncedPassword.length > 0
      ? validateSecretPassword(debouncedPassword)
      : undefined;

  const formHasErrors = emailError || passwordError || secretError;

  const handleClear = useCallback((fieldName: string) => {
    setSecretFormData((prev) => ({ ...prev, [fieldName]: "" }));
  }, []);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setSecretFormData({ ...secretFormData, [name]: value });
    },
    [secretFormData],
  );

  const onExpirationChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSecretFormData({
      ...secretFormData,
      timeTillExpiration: e.target.value as ExpirationTimeOptions,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);

    const emailErr = validateReceiverEmail(secretFormData.receiverEmail);
    const passwordErr = validateSecretPassword(secretFormData.password);
    const secretErr = validateSecretText(secretFormData.secret, charLimit);

    if (emailErr || secretErr || passwordErr) {
      return;
    }

    const secretResponse = await createEncryptedSecret(
      secretFormData,
      createSecretMutateAsync,
    );

    navigate(`/details/${secretResponse.slug}`, {
      state: {
        secret: {
          ...secretResponse,
        },
      },
    });
  };

  return (
    <div
      className="flex flex-col items-center mb-70 w-140 max-md:max-w-[90vw] noto-sans"
      ref={ref}
    >
      <h1 className="text-3xl mb-6 arvo max-sm:text-2xl">Create Your Secret</h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 max-sm:gap-2 max-md:max-w-[90vw]"
      >
        {/* Email */}
        {isAuthenticated && (
          <ReceiverEmailInputField
            receiverEmail={secretFormData.receiverEmail}
            error={emailError}
            onChange={onChangeHandler}
            onClear={() =>
              setSecretFormData({ ...secretFormData, receiverEmail: "" })
            }
          />
        )}

        {/* Secret Text Field */}
        <div className="relative">
          <textarea
            name="secret"
            id="secret"
            className={`relative hide-scrollbar resize-none noto-sans w-full h-45 px-4 pt-3 pb-6 text-xs placeholder-(--white) ${secretFormData.secret ? "cursor-auto" : "cursor-pointer"} focus:cursor-auto outline-0 ${secretError ? "input-box-red" : "input-box"}`}
            placeholder="Write your secret here..."
            value={secretFormData.secret}
            onChange={onChangeHandler}
          />
          <CharCounter secret={secretFormData.secret} charLimit={charLimit} />
        </div>

        {/* Password, Expiration Time, Create Button */}
        <div className="flex gap-4 max-sm:gap-2 w-140 max-md:w-[90vw] max-sm:flex-col">
          {/* Password */}
          <SecretPasswordField
            password={secretFormData.password}
            error={passwordError}
            onChange={onChangeHandler}
            onClear={handleClear}
          />

          {/* Expiration Time */}
          <ExpirationSelector
            onChange={onExpirationChangeHandler}
            timeTillExpiration={secretFormData.timeTillExpiration}
          />

          {/* Create Button */}
          <CreateSecretButton
            isCreating={isCreating}
            formHasErrors={formHasErrors}
            hasSubmitted={hasSubmitted}
          />
        </div>
        {secretFormData.secret.length > charLimit && (
          <div className="flex w-full bg-red-400/10 p-2 rounded-sm border border-red-400/10">
            <p className="text-red-400 noto-sans text-sm italic font-light ml-2 mr-2">
              You have exceeded the secret character limit of{" "}
              <span className="font-bold">{charLimit}</span>
              {!isAuthenticated && ". Sign in to increase it."}
            </p>
          </div>
        )}
      </form>

      {/* Sign in, Login features */}
      <AuthCTA isAuthenticated={isAuthenticated} />
    </div>
  );
});

export default CreateSecretForm;
