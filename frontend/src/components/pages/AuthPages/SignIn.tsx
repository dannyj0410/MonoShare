import { useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../partials/MainPartials/BackButton";
import {
  validateEmail,
  validatePassword,
} from "../../../utils/validators/auth.validator";
import { useSignin } from "../../../hooks/authHooks/useSignin";
import type { ISignInCredentials } from "../../../interfaces/auth.interface";
import Spinner from "../../loaders/Spinner";
import EmailInput from "../../partials/AuthPartials/EmailInput";
import PasswordInput from "../../partials/AuthPartials/PasswordInput";

const SignIn = () => {
  const [createFormData, setCreateFormData] = useState<ISignInCredentials>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof ISignInCredentials, string>>
  >({});

  const { mutate: signinMutate, isPending: isSigningIn } = useSignin();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof ISignInCredentials;
    const value = e.target.value;

    setCreateFormData({ ...createFormData, [name]: value });
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof ISignInCredentials;
    const value = e.target.value;
    let error: string | undefined;

    if (name === "email") {
      error = validateEmail(value);
    }
    if (name === "password") {
      error = validatePassword(value);
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

    if (emailError || passwordError) {
      setFormErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    signinMutate(createFormData);
  };

  return (
    <div className="w-screen h-screen pt-45">
      <div className="relative flex flex-col w-md h-fit rounded-xl m-auto py-8 px-8 z-10 bg-white/3 border-gray-400/20 border">
        <div className="absolute -top-15 left-0 opacity-70 hover:opacity-100">
          <BackButton />
        </div>
        <h1 className="mx-auto text-3xl ">Welcome</h1>
        <h2 className="text-2xl noto-sans mt-7 mb-1">Sign In</h2>
        <p className="text-sm text-(--gray) noto-sans">
          Enter your account to access all features.
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
          <button
            className={`${formErrors.email || formErrors.password ? "bg-red-400/70 text-white/80" : "bg-(--white) text-black"} flex items-center justify-center mt-2 noto-sans w-full h-10.5 text-sm font-medium cursor-pointer rounded-lg transition-colors duration-300 ease-in-out`}
          >
            {isSigningIn ? (
              <Spinner size="size-4.5" thickness="border-2" clr="text-black" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <div className="m-auto mt-5">
          <p className="noto-sans text-sm font-normal text-(--gray)">
            New to MonoShare?{" "}
            <Link
              to="/create-account"
              className="text-(--main-light-blue) font-normal hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
