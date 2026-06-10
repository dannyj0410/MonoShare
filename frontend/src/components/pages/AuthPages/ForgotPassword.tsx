import { useState } from "react";
import { Link } from "react-router-dom";
import { useForgotPassword } from "../../../hooks/authHooks/useForgotPassword";
import { validateEmail } from "../../../utils/validators/auth.validator";
import EmailInput from "../../partials/AuthPartials/EmailInput";
import Spinner from "../../loaders/Spinner";
import type { UseMutateFunction } from "@tanstack/react-query";

const ForgotPassword = () => {
  const {
    mutate: forgotPasswordMutate,
    isPending,
    isSuccess,
  } = useForgotPassword();

  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <title>Forgot Password | MonoShare</title>
      <meta name="robots" content="noindex, follow" />
      <div className="w-full max-w-sm flex flex-col gap-4">
        {/* Heading */}
        <div className="flex flex-col gap-1">
          <h1 className="electrolize text-2xl font-bold text-(--white)">
            Forgot password?
          </h1>
          {!isSuccess && (
            <p className="noto-sans text-(--gray)/90 text-sm leading-relaxed">
              Enter your email and we'll send you a reset link. <br />
              The link expires in 1 hour.
            </p>
          )}
        </div>

        {isSuccess ? (
          <EmailSuccess />
        ) : (
          <SendEmailForm
            forgotPasswordMutate={forgotPasswordMutate}
            isPending={isPending}
          />
        )}
      </div>
    </main>
  );
};

export default ForgotPassword;

// Email Form
const SendEmailForm = ({
  forgotPasswordMutate,
  isPending,
}: {
  forgotPasswordMutate: UseMutateFunction<string, Error, string, unknown>;
  isPending: boolean;
}) => {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const emailError =
    touched && validateEmail(email) ? "Enter a valid email address" : undefined;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const name = e.target.name;
    setTouched(true);
    const value = e.target.value;

    setEmail(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!email || emailError) return;
    forgotPasswordMutate(email.trim().toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
      {/* Email Input */}
      <EmailInput email={email} error={emailError} onChange={onChangeHandler} />

      <div className="flex flex-col ml-auto gap-3">
        {/* Submit button */}
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 noto-sans text-sm px-2.25 py-1 rounded-lg bg-(--white) text-black font-medium cursor-pointer hover:scale-97 duration-200"
        >
          {isPending && (
            <Spinner
              size="size-3.5 max-sm:size-2"
              thickness="border-1"
              clr="text-black"
            />
          )}{" "}
          {isPending ? "Sending..." : "Send reset link"}
        </button>

        {/* Sign in link */}
        <Link
          to="/sign-in"
          className="noto-sans text-sm px-2.25 py-1 font-medium rounded-lg border text-(--white)/90 border-(--gray)/30 bg-(--white)/10 hover:text-(--white) hover:bg-(--white)/12"
        >
          Back to Sign In
        </Link>
      </div>
    </form>
  );
};

// Email Success Info
const EmailSuccess = () => {
  return (
    <div className="flex flex-col gap-5 items-center mt-3">
      <div className="flex flex-col max-xs:max-w-screen h-fit py-3 rounded-xl bg-[#cdd7df21] border-2 border-(--white)/5">
        <p className="noto-sans text-(--gray)/80 text-sm px-2 text-center">
          <span className="text-(--gray) underline">Check your inbox.</span>{" "}
          <br /> If an account exists for that address, a reset link is on its
          way. Don't forget to check your spam folder.
        </p>
      </div>

      <Link
        to="/sign-in"
        className="noto-sans text-(--gray)/90 text-sm hover:text-(--white) hover: underline underline-offset-4 cursor-pointer"
      >
        Back to Sign In
      </Link>
    </div>
  );
};
