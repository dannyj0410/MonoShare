import { useContext } from "react";
import { ErrorContext } from "../contexts/error/ErrorContext";

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within ErrorProvider");
  }
  return context;
};
