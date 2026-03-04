import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthCheck } from "../../hooks/authHooks/useAuthCheck";

const AuthGuard = ({
  mode,
  children,
}: {
  mode: "guest" | "protected";
  children: ReactNode;
}) => {
  const { isAuthenticated, isFetching } = useAuthCheck();
  if (isFetching) return null;

  if (mode === "protected" && !isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (mode === "guest" && isAuthenticated) {
    return (
      <Navigate to="/" replace state={{ reason: "already-authenticated" }} />
    );
  }

  return children;
};

export default AuthGuard;
