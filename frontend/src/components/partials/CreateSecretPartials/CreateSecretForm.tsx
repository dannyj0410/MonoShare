import { useNavigate } from "react-router-dom";
import { forwardRef, useState } from "react";
import { useCreateSecret } from "../../../hooks/secretHooks/useCreateSecret";
import Spinner from "../../loaders/Spinner";
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
import { validateEmail } from "../../../utils/validators/auth.validator";
import { createEncryptedSecret } from "../../../services/createSecret";

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
  const debouncedSecret = useDebounce(secretFormData.secret, 200);
  const debouncedPassword = useDebounce(secretFormData.password, 200);

  const emailError =
    debouncedEmail.length > 0
      ? validateReceiverEmail(debouncedEmail)
      : undefined;

  const secretError =
    hasSubmitted || debouncedSecret.length > 0
      ? validateSecretText(debouncedSecret)
      : undefined;

  const passwordError =
    debouncedPassword.length > 0
      ? validateSecretPassword(debouncedPassword)
      : undefined;

  const formHasErrors =
    (secretFormData.receiverEmail &&
      validateEmail(secretFormData.receiverEmail)) ||
    (secretFormData.password &&
      validateSecretPassword(secretFormData.password)) ||
    validateSecretText(secretFormData.secret);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setSecretFormData({ ...secretFormData, [name]: value });
  };

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
    const secretErr = validateSecretText(secretFormData.secret);

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
        <textarea
          name="secret"
          id="secret"
          className={`hide-scrollbar resize-none noto-sans w-full h-45 p-5 text-xs placeholder-(--white) focus:outline-0 ${secretError ? "input-box-red" : "input-box"}`}
          placeholder="Write your secret here..."
          value={secretFormData.secret}
          onChange={onChangeHandler}
        />

        {/* Password, Expiration Time, Create Button */}
        <div className="flex gap-4 max-sm:gap-2 w-140 max-md:w-[90vw] max-sm:flex-col">
          {/* Password */}
          <SecretPasswordField
            password={secretFormData.password}
            error={passwordError}
            onChange={onChangeHandler}
            onClear={() =>
              setSecretFormData({ ...secretFormData, password: "" })
            }
          />

          {/* Expiration Time */}
          <ExpirationSelector
            onChange={onExpirationChangeHandler}
            timeTillExpiration={secretFormData.timeTillExpiration}
          />

          {/* Create Button */}
          <button
            disabled={isCreating}
            className={`relative overflow-hidden action-btn max-sm:w-[90vw] max-sm:rounded-sm max-sm:py-8 max-sm:text-lg max-sm:border-4 max-sm:bg-[#0A314E80] max-sm:bg-none! max-sm:ml-auto max-sm:h-15 max-md:min-w-26 w-26 h-12.5 border-3 rounded-xl arvo ${formHasErrors && hasSubmitted ? "bg-red-400/10! bg-none! border-red-400/15! hover:bg-red-400/15! hover:border-red-400/20!" : "group"}`}
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
        </div>
      </form>

      {/* Sign in, Login features */}
      <AuthCTA isAuthenticated={isAuthenticated} />
    </div>
  );
});

export default CreateSecretForm;
