import { useCallback, useReducer, useRef, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type {
  ToastOptions,
  ToastType,
  ToastState,
  ToastAction,
} from "../../interfaces/toast.interface";
import { ToastContext } from "./ToastContext";
import ToastPopup from "../../components/partials/CommonPartials/Toast";

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case "SHOW":
      return {
        message: action.payload.message,
        type: action.payload.toastType,
        isVisible: true,
      };
    case "HIDE":
      return { ...state, isVisible: false };
    case "CLEAR":
      return { ...state, message: null };
    default:
      return state;
  }
};

const initialState: ToastState = {
  message: null,
  type: "error",
  isVisible: false,
};

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(toastReducer, initialState);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cleanupRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearToast = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    dispatch({ type: "HIDE" });
    cleanupRef.current = setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, 400);
  }, []);

  const showToast = useCallback(
    (message: string, toastType: ToastType, options: ToastOptions = {}) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (cleanupRef.current) clearTimeout(cleanupRef.current);

      dispatch({ type: "SHOW", payload: { message, toastType } });

      timerRef.current = setTimeout(() => {
        clearToast();
      }, options.duration ?? 4000);

      if (options.redirect) navigate("/");
    },
    [navigate, clearToast],
  );

  return (
    <ToastContext.Provider value={{ showToast, clearToast }}>
      {children}
      {state.message && (
        <ToastPopup
          message={state.message}
          isVisible={state.isVisible}
          onClose={clearToast}
          type={state.type}
        />
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
