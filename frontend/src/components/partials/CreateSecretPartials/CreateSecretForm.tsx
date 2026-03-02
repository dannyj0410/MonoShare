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
import {
  encryptSecret,
  exportKeyToString,
  generateKey,
} from "../../../utils/encryption/crypto";

import type {
  ExpirationTimeOptions,
  ICreateSecretRequest,
} from "../../../interfaces/secret.interface";

const CreateSecretForm = forwardRef<
  HTMLDivElement,
  { isAuthenticated: boolean }
>(({ isAuthenticated }, ref) => {
  const navigate = useNavigate();

  const [secretFormData, setSecretFormData] = useState<ICreateSecretRequest>({
    receiverEmail: "",
    secret: "",
    password: "",
    timeTillExpiration: "7d",
  });

  const [secretFormErrors, setSecretFormErrors] = useState<{
    receiverEmail?: boolean;
    password?: boolean;
    secret?: boolean;
  }>({ receiverEmail: false, password: false, secret: false });

  const { mutateAsync: createSecretMutateAsync, isPending: isCreating } =
    useCreateSecret();

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setSecretFormData({ ...secretFormData, [name]: value });
    // todo: implement debounce to actually validate
    setSecretFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onExpirationChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSecretFormData({
      ...secretFormData,
      timeTillExpiration: e.target.value as ExpirationTimeOptions,
    });
  };

  const onBlurHandler = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name as keyof ICreateSecretRequest;
    const value = e.target.value;
    let error: boolean;

    if (name === "receiverEmail") {
      error = validateReceiverEmail(value);
    }
    if (name === "password") {
      error = validateSecretPassword(value);
    }
    if (name === "secret") {
      error = validateSecretText(value);
    }

    setSecretFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError = validateReceiverEmail(secretFormData.receiverEmail);
    const passwordError = validateSecretPassword(secretFormData.password);
    const secretError = validateSecretText(secretFormData.secret);

    if (emailError || secretError || passwordError) {
      setSecretFormErrors({
        receiverEmail: emailError,
        password: passwordError,
        secret: secretError,
      });
      return;
    }

    const urlFragmentKey = await generateKey();
    const { encryptedText, encryptionIV } = await encryptSecret(
      secretFormData.secret,
      urlFragmentKey,
    );
    const urlKeyAsString = await exportKeyToString(urlFragmentKey);

    const res = await createSecretMutateAsync({
      encryptedText,
      encryptionIV,
      timeTillExpiration: secretFormData.timeTillExpiration,
      receiverEmail: secretFormData.receiverEmail,
      password: secretFormData.password,
    });
    //todo: make this data inaccessible after changing page
    navigate(`/details/${res.secret.slug}`, {
      state: {
        secret: {
          ...res.secret,
          created: true,
          key: urlKeyAsString,
          text: secretFormData.secret,
          shareUrl: res.shareUrl,
        },
      },
    });
  };

  return (
    <div className="flex flex-col items-center mb-70 w-140 noto-sans" ref={ref}>
      <h1 className="text-3xl mb-6 arvo">Create Your Secret</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        {/* Email */}
        {isAuthenticated && (
          <ReceiverEmailInputField
            receiverEmail={secretFormData.receiverEmail}
            error={secretFormErrors.receiverEmail}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onClear={() =>
              setSecretFormData({ ...secretFormData, receiverEmail: "" })
            }
          />
        )}

        {/* Secret Text Field */}
        <textarea
          name="secret"
          id="secret"
          className={`hide-scrollbar resize-none noto-sans w-full h-45 p-5 text-xs placeholder-(--white) focus:outline-0 ${secretFormErrors.secret ? "input-box-red" : "input-box"}`}
          placeholder="Write your secret here"
          value={secretFormData.secret}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />

        {/* Password, Expiration Time, Create Button */}
        <div className="flex gap-4 w-140">
          {/* Password */}
          <SecretPasswordField
            password={secretFormData.password}
            error={secretFormErrors.password}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
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
            className={`relative overflow-hidden action-btn w-26 h-12.5 border-3 rounded-xl arvo ${secretFormErrors.receiverEmail || secretFormErrors.password || secretFormErrors.secret ? "bg-red-400/10! bg-none! border-red-400/15! hover:bg-red-400/15! hover:border-red-400/20!" : "group"}`}
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
