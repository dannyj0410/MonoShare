import { useCallback, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { ErrorOptions } from "../../interfaces/error.interface";
import { ErrorContext } from "./ErrorContext";
import ErrorPopup from "../../components/partials/MainPartials/ErrorPopup";

interface ErrorProviderProps {
  children: ReactNode;
}

const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const [error, setError] = useState<string | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const showError = useCallback(
    (message: string, options: ErrorOptions = {}) => {
      const { redirect = false, duration = 4000 } = options;

      setError(message);
      setIsVisible(true);

      if (redirect) {
        navigate("/");
      }

      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setError(null), 300); // Wait for animation to complete
      }, duration);
    },
    [navigate],
  );

  const clearError = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setError(null), 300);
  }, []);

  return (
    <ErrorContext.Provider value={{ showError, clearError }}>
      {children}
      {error && (
        <ErrorPopup
          message={error}
          isVisible={isVisible}
          onClose={clearError}
        />
      )}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
