import { createContext } from "react";
import type { ToastContextType } from "../../interfaces/toast.interface";

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

// !!!TEMP

// import { createContext, useContext, useState, useCallback, ReactNode } from "react";
// import { useNavigate } from "react-router-dom";

// // 1. Types
// type ToastType = "success" | "error";

// interface ToastOptions {
//   duration?: number;
//   redirect?: string;
// }

// interface ToastContextType {
//   showToast: (message: string, type: ToastType, options?: ToastOptions) => void;
// }

// const ToastContext = createContext<ToastContextType | undefined>(undefined);

// // 2. The Provider Component
// export const ToastProvider = ({ children }: { children: ReactNode }) => {
//   const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const navigate = useNavigate();

//   const showToast = useCallback((message: string, type: ToastType, options: ToastOptions = {}) => {
//     const { duration = 4000, redirect } = options;

//     setToast({ message, type });
//     setIsVisible(true);

//     if (redirect) navigate(redirect);

//     setTimeout(() => {
//       setIsVisible(false);
//       setTimeout(() => setToast(null), 300);
//     }, duration);
//   }, [navigate]);

//   return (
//     <ToastContext.Provider value={{ showToast }}>
//       {children}
//       {toast && (
//         <ToastPopup
//           message={toast.message}
//           type={toast.type}
//           isVisible={isVisible}
//           onClose={() => setIsVisible(false)}
//         />
//       )}
//     </ToastContext.Provider>
//   );
// };

// // 3. The Hook
// export const useToast = () => {
//   const context = useContext(ToastContext);
//   if (!context) throw new Error("useToast must be used within ToastProvider");
//   return context;
// };

// // 4. The UI Component (Merged Styles)
// const ToastPopup = ({ message, type, isVisible, onClose }: any) => {
//   const isError = type === "error";

//   // Dynamic colors based on your existing design
//   const theme = isError
//     ? { border: "border-red-400/30", bg: "bg-red-400/15", text: "text-red-100", stroke: "#ff6467", dot: "bg-red-950" }
//     : { border: "border-emerald-400/30", bg: "bg-emerald-400/15", text: "text-emerald-100", stroke: "#34d399", dot: "bg-emerald-950" };

//   return (
//     <div
//       className={`${
//         isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
//       } z-50 fixed electrolize text-base font-bold flex items-center bottom-0 right-0 mb-10 mr-20 px-3 py-3 rounded-lg border backdrop-blur-xs transition-all duration-300 cursor-pointer hover:opacity-70 ${theme.border} ${theme.bg}`}
//       onClick={onClose}
//     >
//       {/* Icon Switcher */}
//       {isError ? (
//         <svg viewBox="0 0 48 48" height="18" width="18" className="mr-2">
//           <path fill={theme.stroke} d="M24 0.48c-2.008 0-4.0538 1.6754-3.9178 4.0168l0.9782 26.4091c0.0118 0.7632 0.3202 1.4925 0.8608 2.0331 0.5512 0.5511 1.2991 0.861 2.0788 0.861s1.5275-0.3099 2.0789-0.861c0.5405-0.5406 0.8488-1.2698 0.8607-2.0331l0.9782-26.4091C28.0538 2.1554 26.008 0.48 24 0.48Zm24 39.2c0 2.165-1.755 3.92-3.92 3.92s-3.92-1.755-3.92-3.92 1.755-3.92 3.92-3.92 3.92 1.755 3.92 3.92Z" />
//         </svg>
//       ) : (
//         <svg viewBox="0 0 24 24" fill="none" stroke={theme.stroke} strokeWidth="2.5" height="18" width="18" className="mr-2">
//           <polyline points="20 6 9 17 4 12" />
//         </svg>
//       )}

//       <p className={`mr-2 ${theme.text}`}>{message}</p>

//       {/* Close Dot */}
//       <div className={`absolute -top-2.25 right-2 p-0.2 rounded-4xl border ${theme.border} ${theme.dot}`}>
//         <svg viewBox="0 0 10 10" height="16" width="16">
//           <path stroke={`${theme.stroke}4d`} strokeLinecap="round" strokeWidth="0.8333" d="M5 5 2.9 2.9m2.1 2.1 2.1 2.1m-2.1-2.1 2.1-2.1m-2.1 2.1L2.9 7.1" />
//         </svg>
//       </div>
//     </div>
//   );
// };
