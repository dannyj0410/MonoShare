import { useCallback, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { ToastOptions, ToastType } from "../../interfaces/toast.interface";
import { ToastContext } from "./ToastContext";
import ToastPopup from "../../components/partials/MainPartials/Toast";

interface ToastProviderProps {
  children: ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<ToastType>("success");

  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const showToast = useCallback(
    (message: string, type: ToastType, options: ToastOptions = {}) => {
      const { redirect = false, duration = 4000 } = options;

      setMessage(message);
      setIsVisible(true);
      setType(type);

      if (redirect) {
        navigate("/");
      }

      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setMessage(null), 300); // Wait for animation to complete
      }, duration);
    },
    [navigate],
  );

  const clearToast = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setMessage(null), 300);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, clearToast }}>
      {children}
      {message && (
        <ToastPopup
          message={message}
          isVisible={isVisible}
          onClose={clearToast}
          type={type}
        />
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
