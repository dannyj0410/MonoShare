import { memo, useState } from "react";
import CheckmarkIcon from "../../icons/CheckmarkIcon";
import ShowPasswordIcon from "../../icons/ShowPasswordIcon";
import HidePasswordIcon from "../../icons/HidePasswordIcon";

interface SecretPasswordFieldProps {
  password: string;
  error?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: (fieldName: string) => void;
}

const SecretPasswordField = memo(function SecretPasswordField({
  password,
  error,
  onChange,
  onClear,
}: SecretPasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`pl-3 pr-3 w-50 flex items-center group max-md:w-[90vw] ${
        error ? "input-box-red" : "input-box"
      } ${!password && "opacity-60 focus-within:opacity-100 hover:opacity-100 transition-all duration-300 cursor-pointer"}`}
    >
      <label
        htmlFor="password"
        className={`mr-3 ${error ? "checkbox-red" : "checkbox"}`}
        onClick={() => password && onClear("password")}
      >
        <CheckmarkIcon
          className={`size-3.75 stroke-(--white) ${(!password || error || error === undefined) && "opacity-0"}`}
        />
      </label>

      <input
        type={showPassword ? "text" : "password"}
        name="password"
        id="password"
        placeholder="Require Password?"
        className={`py-3 text-xs placeholder-(--white) w-30 max-md:w-full pr-2 h-full focus:outline-0 ${!password && "focus:cursor-auto hover:cursor-pointer"}`}
        value={password}
        onChange={onChange}
      />

      <div className="flex items-center">
        <ShowPasswordIcon
          className={`fill-(--white) size-4 ${showPassword ? "visible" : "hidden"}`}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
        />
        <HidePasswordIcon
          className={`fill-(--white) size-4 ${!showPassword ? "visible" : "hidden"}`}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
        />
      </div>
    </div>
  );
});

export default SecretPasswordField;
