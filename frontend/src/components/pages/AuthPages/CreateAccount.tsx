import { useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../partials/MainPartials/BackButton";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "../../../utils/validators/auth.validator";
import { useRegister } from "../../../hooks/authHooks/useRegister";
import type { ISignUpCredentials } from "../../../interfaces/auth.interface";
import Spinner from "../../loaders/Spinner";
import EmailInput from "../../partials/AuthPartials/EmailInput";
import PasswordInput from "../../partials/AuthPartials/PasswordInput";

const CreateAccount = () => {
  const [createFormData, setCreateFormData] = useState<ISignUpCredentials>({
    email: "",
    password: "",
    confirm: "",
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof ISignUpCredentials, string>>
  >({});

  const { mutate: registerMutate, isPending: isRegistering } = useRegister();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCreateFormData({ ...createFormData, [name]: value });
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof ISignUpCredentials;
    const value = e.target.value;
    let error: string | undefined;
    let confirmError: string | undefined;

    switch (name) {
      case "email":
        error = validateEmail(value);
        break;
      case "password":
        error = validatePassword(value);
        confirmError = validateConfirmPassword(value, createFormData.confirm);
        setFormErrors((prev) => ({
          ...prev,
          confirm: confirmError,
        }));
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

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailError = validateEmail(createFormData.email);
    const passwordError = validatePassword(createFormData.password);
    const confirmError = validateConfirmPassword(
      createFormData.password,
      createFormData.confirm,
    );

    if (emailError || passwordError || confirmError) {
      setFormErrors({
        email: emailError,
        password: passwordError,
        confirm: confirmError,
      });
      return;
    }

    registerMutate(createFormData);
  };

  return (
    <div className="w-full h-screen pt-45 max-xs:pt-35">
      <div className="max-xs:w-full max-xs:rounded-none max-xs:border-l-0 max-xs:border-r-0 max-xs:px-4 relative flex flex-col w-md h-fit rounded-xl m-auto py-8 px-8 z-10 bg-white/3 border-gray-400/20 border">
        <div className="absolute -top-15 left-0 opacity-70 hover:opacity-100">
          <BackButton />
        </div>
        <h1 className="mx-auto text-3xl max-xs:text-2xl">Welcome</h1>
        <h2 className="text-2xl max-xs:text-xl noto-sans mt-7 mb-1">
          Create Account
        </h2>
        <p className="text-sm text-(--gray) noto-sans ml-0.5">
          Join MonoShare to unlock even more features.
        </p>
        <form onSubmit={submitForm}>
          {/* Email */}
          <EmailInput
            email={createFormData.email}
            error={formErrors.email}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onFocus={() =>
              setFormErrors((prev) => ({
                ...prev,
                email: undefined,
              }))
            }
          />

          {/* Password */}
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
          />

          {/* Confirm Password */}
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
          />

          <button
            className={`${formErrors.email || formErrors.password || formErrors.confirm ? "bg-red-400/70 text-white/80" : "bg-(--white) text-black"} flex items-center justify-center mt-2 noto-sans w-full h-10.5 text-sm font-medium cursor-pointer rounded-lg transition-colors duration-300 ease-in-out`}
          >
            {isRegistering ? (
              <Spinner size="size-4.5" thickness="border-2" clr="text-black" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        <div className="m-auto mt-5">
          <p className="noto-sans text-sm font-normal text-(--gray)">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-(--main-light-blue) font-normal hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
