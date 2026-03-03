import {
  memo,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Link } from "react-router-dom";
import { calcTimePastCreation } from "../../../utils/time/calcTimePastCreation";
import type { UseMutateFunction } from "@tanstack/react-query";
import type { DeleteSecretResponse } from "../../../interfaces/secret.interface";
import Spinner from "../../loaders/Spinner";
import { emailShortener } from "../../../utils/email.shortener";
import ActiveItemIcon from "../../icons/ActiveItemIcon";
import ViewedItemIcon from "../../icons/ViewedItemIcon";
import ExpiredItemIcon from "../../icons/ExpiredItemIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import MailIcon from "../../icons/MailIcon";

type MySecretsItemProps = {
  status: string;
  slug: string;
  receiverEmail?: string | null;
  passwordProtected?: boolean;
  createdAt: string;
};

const MySecretsItem = memo(function MySecretsItem({
  secret,
  isSelected,
  setSelectedSecretId,
  setIsDeleting,
  deleteSecretMutate,
  pendingDelete,
}: {
  secret: MySecretsItemProps;
  isSelected: boolean;
  setSelectedSecretId: Dispatch<SetStateAction<string>>;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
  deleteSecretMutate: UseMutateFunction<
    DeleteSecretResponse,
    Error,
    string,
    unknown
  >;
  pendingDelete: boolean;
}) {
  const [isCleaningUp, setIsCleaningUp] = useState(false);

  const timePassed = calcTimePastCreation(secret.createdAt);

  useEffect(() => {
    if (!isCleaningUp) return;
    const resetTimer = setTimeout(() => {
      setIsCleaningUp(false);
    }, 3000);

    return () => clearTimeout(resetTimer);
  }, [isCleaningUp]);

  return (
    <Link to={`/details/${secret.slug}`}>
      <li
        className={`mx-6 py-2 px-4 h-fit grid grid-cols-[230px_220px_210px_20px] items-center gap-4 rounded-sm cursor-pointer  ${
          secret.status === "ACTIVE"
            ? "hover:bg-blue-200/10 border-t-2 border-white/0 hover:border-white/5"
            : secret.status === "VIEWED"
              ? "hover:bg-green-200/10 border-t-2 border-white/0 hover:border-white/5"
              : secret.status === "EXPIRED"
                ? "hover:bg-red-400/10 border-t-2 border-white/0 hover:border-white/5"
                : ""
        }`}
      >
        {/* id + time */}
        <div className="flex items-center gap-2">
          {secret.status === "ACTIVE" ? (
            <ActiveItemIcon />
          ) : secret.status === "VIEWED" ? (
            <ViewedItemIcon />
          ) : (
            <ExpiredItemIcon />
          )}
          <p className="text-sm text-(--white)">
            {secret.slug.slice(0, 5).toLowerCase()}
          </p>
          <p className="text-sm text-(--gray) electrolize">{timePassed}</p>
        </div>
        {/* password protected */}
        <div className="flex items-center gap-1 justify-start">
          {secret.passwordProtected && (
            <>
              <ShieldIcon />
              <p className="text-sm electrolize text-(--gray) mt-0.5">
                Password Protected
              </p>
            </>
          )}
        </div>
        {/* email recipient */}
        <div className="flex items-center gap-1">
          {secret.receiverEmail && (
            <>
              <MailIcon />
              <p className="text-sm noto-sans">
                {emailShortener(secret.receiverEmail)}
              </p>
            </>
          )}
        </div>
        {/* delete icons */}
        <div
          className="flex group"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {pendingDelete && isSelected ? (
            // spinner
            <Spinner size="size-4" thickness="border-3" />
          ) : secret.status === "ACTIVE" ? (
            // eraser
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              id="Eraser--Streamline-Font-Awesome"
              height="16"
              width="16"
              className="group justify-end cursor-pointer hover:fill-(--main-light-blue)"
              onClick={() => {
                setSelectedSecretId(secret.slug);
                setIsDeleting(true);
              }}
            >
              <desc>Eraser Streamline Icon: https://streamlinehq.com</desc>
              <path
                d="M7.98 1.736L0.74 8.975c-.776.776-.776 2.032 0 2.808l2.482 2.482c.373.373.878.58 1.406.58h10.217c.55 0 .993-.444.993-.993s-.444-.993-.993-.993h-3.85l4.055-4.056c.776-.776.776-2.032 0-2.808L10.792 1.736c-.776-.776-2.032-.776-2.808 0Zm.208 11.127H4.626l-2.482-2.482 3.87-3.87 4.263 4.263-2.088 2.088Z"
                fill="#eee"
                strokeWidth="0.0278"
                className="group-hover:fill-(--main-light-blue)"
              ></path>
            </svg>
          ) : isCleaningUp ? (
            // checkmark confirmation
            <svg
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              height="20px"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setSelectedSecretId(secret.slug);
                deleteSecretMutate(secret.slug);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
                className={`${
                  secret.status === "VIEWED"
                    ? "group-hover:stroke-[#02a30f]"
                    : secret.status === "EXPIRED"
                      ? "group-hover:stroke-[#fb2c36]"
                      : ""
                }`}
              />
            </svg>
          ) : (
            // broom
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              id="Broom-Fill--Streamline-Mingcute-Fill"
              height="20"
              width="20"
              onClick={() => {
                setIsCleaningUp(true);
                setIsDeleting(false);
              }}
            >
              <desc>Broom Fill Streamline Icon: https://streamlinehq.com</desc>
              <g fill="none" fillRule="evenodd">
                <path
                  d="M16 0v16H0V0h16ZM8.395999999999999 15.505333333333333l-0.008 0.0013333333333333333 -0.047333333333333324 0.023333333333333334 -0.013333333333333332 0.0026666666666666666 -0.009333333333333332 -0.0026666666666666666 -0.047333333333333324 -0.023999999999999997c-0.006666666666666666 -0.002 -0.012666666666666666 0 -0.016 0.004l-0.0026666666666666666 0.006666666666666666 -0.011333333333333334 0.2853333333333333 0.003333333333333333 0.013333333333333332 0.006666666666666666 0.008666666666666666 0.06933333333333333 0.049333333333333326 0.009999999999999998 0.0026666666666666666 0.008 -0.0026666666666666666 0.06933333333333333 -0.049333333333333326 0.008 -0.010666666666666666 0.0026666666666666666 -0.011333333333333334 -0.011333333333333334 -0.2846666666666666c-0.0013333333333333333 -0.006666666666666666 -0.005999999999999999 -0.011333333333333334 -0.010666666666666666 -0.011999999999999999Zm0.176 -0.07533333333333334 -0.009333333333333332 0.0013333333333333333 -0.12266666666666666 0.062 -0.006666666666666666 0.006666666666666666 -0.002 0.007333333333333332 0.011999999999999999 0.2866666666666666 0.003333333333333333 0.008 0.005333333333333333 0.005333333333333333 0.134 0.06133333333333333c0.008 0.0026666666666666666 0.015333333333333332 0 0.019333333333333334 -0.005333333333333333l0.0026666666666666666 -0.009333333333333332 -0.02266666666666667 -0.4093333333333333c-0.002 -0.008 -0.006666666666666666 -0.013333333333333332 -0.013333333333333332 -0.014666666666666665Zm-0.4766666666666666 0.0013333333333333333a0.015333333333333332 0.015333333333333332 0 0 0 -0.018 0.004l-0.004 0.009333333333333332 -0.02266666666666667 0.4093333333333333c0 0.008 0.004666666666666666 0.013333333333333332 0.011333333333333334 0.016l0.009999999999999998 -0.0013333333333333333 0.134 -0.062 0.006666666666666666 -0.005333333333333333 0.002 -0.007333333333333332 0.011999999999999999 -0.2866666666666666 -0.002 -0.008 -0.006666666666666666 -0.006666666666666666 -0.12266666666666666 -0.06133333333333333Z"
                  strokeWidth="0.6667"
                ></path>
                <path
                  fill="#eee"
                  d="M11.518666666666665 1.742a0.6666666666666666 0.6666666666666666 0 0 1 1.2599999999999998 0.42866666666666664l-0.025333333333333333 0.07333333333333333 -1.7399999999999998 4.279999999999999 0.438 0.11666666666666665c0.7 0.18733333333333335 1.2826666666666666 0.7559999999999999 1.393333333333333 1.532 0.09466666666666665 0.6666666666666666 0.18333333333333335 1.68 0.06133333333333333 2.724 -0.12133333333333332 1.0346666666666666 -0.45999999999999996 2.1853333333333333 -1.298 3.030666666666667 -0.308 0.31066666666666665 -0.75 0.36 -1.0486666666666666 0.36533333333333334 -0.3406666666666667 0.005333333333333333 -0.7333333333333334 -0.04666666666666667 -1.1366666666666667 -0.12666666666666665 -0.8106666666666666 -0.16133333333333333 -1.7833333333333332 -0.45999999999999996 -2.7026666666666666 -0.7773333333333332l-0.27599999999999997 -0.09666666666666665 -0.5419999999999999 -0.19599999999999998 -0.52 -0.19399999999999998 -0.4893333333333333 -0.18866666666666665 -0.6519999999999999 -0.25866666666666666a46.324 46.324 0 0 1 -1.0986666666666665 -0.456 0.6666666666666666 0.6666666666666666 0 0 1 -0.14666666666666667 -1.136c0.9186666666666665 -0.72 1.7799999999999998 -1.548 2.508 -2.3126666666666664l0.352 -0.37599999999999995c0.057333333333333326 -0.06133333333333333 0.11333333333333334 -0.12266666666666666 0.16733333333333333 -0.18266666666666667l0.31466666666666665 -0.35133333333333333 0.14666666666666667 -0.16799999999999998 0.39599999999999996 -0.46333333333333326 0.22466666666666668 -0.27066666666666667a2.064 2.064 0 0 1 1.9873333333333332 -0.7246666666666666l0.13266666666666665 0.030666666666666665 0.4913333333333333 0.13133333333333333 1.8026666666666666 -4.433333333333334Zm-2.639333333333333 5.59a0.7266666666666667 0.7266666666666667 0 0 0 -0.744 0.252l-0.16199999999999998 0.1953333333333333 3.5986666666666665 0.964 -0.03133333333333333 -0.2613333333333333a10.977999999999998 10.977999999999998 0 0 0 -0.016666666666666666 -0.12133333333333332c-0.023999999999999997 -0.16866666666666666 -0.1433333333333333 -0.3273333333333333 -0.33999999999999997 -0.4066666666666666l-0.07733333333333334 -0.025333333333333333 -2.227333333333333 -0.5966666666666667ZM3.71 5.144l0.042666666666666665 0.09333333333333334A2.173333333333333 2.173333333333333 0 0 0 4.577333333333333 6.1466666666666665l0.06666666666666667 0.03866666666666667a0.04533333333333334 0.04533333333333334 0 0 1 0 0.07866666666666666l-0.06666666666666667 0.03866666666666667A2.173333333333333 2.173333333333333 0 0 0 3.753333333333333 7.213333333333333l-0.042666666666666665 0.09266666666666667a0.047333333333333324 0.047333333333333324 0 0 1 -0.08666666666666667 0l-0.042666666666666665 -0.09333333333333334a2.173333333333333 2.173333333333333 0 0 0 -0.8246666666666667 -0.9093333333333333l-0.06666666666666667 -0.03866666666666667a0.04533333333333334 0.04533333333333334 0 0 1 0 -0.07866666666666666l0.06666666666666667 -0.03866666666666667A2.173333333333333 2.173333333333333 0 0 0 3.58 5.236666666666666l0.042666666666666665 -0.09266666666666667a0.047333333333333324 0.047333333333333324 0 0 1 0.08666666666666667 0Zm1.888 -3.239333333333333c0.026666666666666665 -0.06 0.11066666666666666 -0.06 0.1373333333333333 0l0.06799999999999999 0.148a3.4593333333333334 3.4593333333333334 0 0 0 1.3133333333333332 1.4473333333333331l0.10466666666666666 0.062a0.072 0.072 0 0 1 0 0.126l-0.10533333333333333 0.06133333333333333a3.4593333333333334 3.4593333333333334 0 0 0 -1.3133333333333332 1.448l-0.06666666666666667 0.148a0.07533333333333334 0.07533333333333334 0 0 1 -0.13799999999999998 0l-0.06799999999999999 -0.148a3.4593333333333334 3.4593333333333334 0 0 0 -1.3133333333333332 -1.448l-0.10533333333333333 -0.06133333333333333a0.072 0.072 0 0 1 0 -0.126l0.106 -0.062a3.4593333333333334 3.4593333333333334 0 0 0 1.3133333333333332 -1.4473333333333331l0.06666666666666667 -0.148Z"
                  strokeWidth="0.6667"
                  className={`${
                    secret.status === "VIEWED"
                      ? "group-hover:fill-[#02a30f]"
                      : secret.status === "EXPIRED"
                        ? "group-hover:fill-[#fb2c36]"
                        : ""
                  }`}
                ></path>
              </g>
            </svg>
          )}
        </div>
      </li>
    </Link>
  );
});

export default MySecretsItem;
