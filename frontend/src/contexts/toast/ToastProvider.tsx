import { useCallback, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { ToastOptions, ToastType } from "../../interfaces/toast.interface";
import { ToastContext } from "./ToastContext";
import ToastPopup from "../../components/partials/MainPartials/Toast";

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<ToastType>("error");
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (message: string, type: ToastType, options: ToastOptions = {}) => {
      const { redirect = false, duration = 4000 } = options;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      setMessage(message);
      setType(type);
      setIsVisible(true);

      if (redirect) {
        navigate("/");
      }

      timerRef.current = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setMessage(null), 400);
        timerRef.current = null;
      }, duration);
    },
    [navigate],
  );

  const clearToast = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsVisible(false);
    setTimeout(() => setMessage(null), 400);
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
