import { useUser } from "./useUser";

export const useAuthCheck = () => {
  const { data: user, isLoading, isError } = useUser();

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !isError,
  };
};
