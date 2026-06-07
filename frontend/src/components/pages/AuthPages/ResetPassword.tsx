import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useResetPassword } from "../../../hooks/authHooks/useResetPassword";
import {
  validateConfirmPassword,
  validatePassword,
} from "../../../utils/validators/auth.validator";
import PasswordInput from "../../partials/AuthPartials/PasswordInput";
import type { ISignUpCredentials } from "../../../interfaces/auth.interface";
import Spinner from "../../loaders/Spinner";
import InvalidToken from "./InvalidToken";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [createFormData, setCreateFormData] = useState({
    password: "",
    confirm: "",
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof ISignUpCredentials, string>>
  >({});

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCreateFormData({ ...createFormData, [name]: value });
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const { mutate: resetMutate, isPending } = useResetPassword();

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    let error: string | undefined;
    let confirmError: string | undefined;

    switch (name) {
      case "password":
        error = validatePassword(value);
        if (createFormData.confirm) {
          confirmError = validateConfirmPassword(value, createFormData.confirm);
          setFormErrors((prev) => ({
            ...prev,
            confirm: confirmError,
          }));
        }
        break;
      case "confirm":
        error = validateConfirmPassword(createFormData.password, value);
        break;
    }

    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const passwordError = validatePassword(createFormData.password);
    const confirmError = validateConfirmPassword(
      createFormData.password,
      createFormData.confirm,
    );

    if (passwordError || confirmError) {
      setFormErrors({
        password: passwordError,
        confirm: confirmError,
      });
      return;
    }

    resetMutate({ token, ...createFormData });
  };

  if (!token) return <InvalidToken type="resetPassword" />;

  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-sm flex flex-col gap-4">
        {/* Heading */}
        <div className="flex flex-col gap-1">
          <h1 className="electrolize text-2xl font-bold text-(--white)">
            Reset Password
          </h1>
          <p className="noto-sans text-(--gray) text-sm leading-relaxed">
            Set a new password for your account.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
          noValidate
        >
          {/* New Password */}
          <PasswordInput
            type="Password"
            value={createFormData.password}
            error={formErrors.password}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onFocus={() =>
              setFormErrors((prev) => ({
                ...prev,
                password: undefined,
              }))
            }
            reset
          />

          {/* Confirm New Password */}
          <PasswordInput
            type="Confirm"
            value={createFormData.confirm}
            error={formErrors.confirm}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onFocus={() =>
              setFormErrors((prev) => ({
                ...prev,
                confirm: undefined,
              }))
            }
            reset
          />

          <div className="flex flex-col gap-4 items-center">
            <button
              disabled={isPending}
              className={`${formErrors.password || formErrors.confirm ? "bg-red-400/70 text-(--white)/80" : "bg-(--white) text-black"} flex items-center justify-center mt-2 noto-sans w-full h-10.5 text-sm font-medium cursor-pointer rounded-lg transition-colors duration-300 ease-in-out`}
            >
              {isPending ? (
                <Spinner
                  size="size-4.5"
                  thickness="border-2"
                  clr="text-black"
                />
              ) : (
                "Reset Password"
              )}
            </button>
            {/* Back link */}
            <p className="noto-sans text-(--gray)/90 text-sm">
              Remembered your password?{" "}
              <Link
                to="/sign-in"
                className="hover:text-(--white) hover: underline underline-offset-4 cursor-pointer"
              >
                Back to Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
