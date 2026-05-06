import { memo, useState } from "react";
import CheckmarkIcon from "../../../icons/CheckmarkIcon";
import ShowPasswordIcon from "../../../icons/ShowPasswordIcon";
import HidePasswordIcon from "../../../icons/HidePasswordIcon";

interface SecretKeyFieldProps {
  secretKey: string;
  error?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: (fieldName: string) => void;
}

const SecretKeyField = memo(function SecretKeyField({
  secretKey,
  error,
  onChange,
  onClear,
}: SecretKeyFieldProps) {
  const [showSecretKey, setShowSecretKey] = useState(false);

  return (
    <div
      className={`pl-3 pr-3 w-50 flex items-center group max-md:w-[90vw] ${
        error ? "input-box-red" : "input-box"
      } ${!secretKey && "opacity-60 focus-within:opacity-100 hover:opacity-100 transition-all duration-300 cursor-pointer"}`}
    >
      <label
        htmlFor="secretKey"
        className={`mr-3 ${error ? "checkbox-red" : "checkbox"}`}
        onClick={() => secretKey && onClear("secretKey")}
      >
        <CheckmarkIcon
          className={`size-3.75 stroke-(--white) ${(!secretKey || error || error === undefined) && "opacity-0"}`}
        />
      </label>

      <input
        type={showSecretKey ? "text" : "password"}
        name="secretKey"
        id="secretKey"
        autoComplete="one-time-code"
        placeholder="Require Password?"
        className={`py-3 text-xs placeholder-(--white) w-30 max-md:w-full pr-2 h-full focus:outline-0 ${!secretKey && "focus:cursor-auto hover:cursor-pointer"}`}
        value={secretKey}
        onChange={onChange}
      />

      <div className="flex items-center">
        <ShowPasswordIcon
          className={`fill-(--white) size-4 ${showSecretKey ? "visible" : "hidden"}`}
          setShowPassword={setShowSecretKey}
          showPassword={showSecretKey}
        />
        <HidePasswordIcon
          className={`fill-(--white) size-4 ${!showSecretKey ? "visible" : "hidden"}`}
          setShowPassword={setShowSecretKey}
          showPassword={showSecretKey}
        />
      </div>
    </div>
  );
});

export default SecretKeyField;
