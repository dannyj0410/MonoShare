import { useLocation, useNavigate } from "react-router-dom";

const useReturnPage = (fallbackPath = "/", navback = true) => {
  const navigate = useNavigate();
  const location = useLocation();

  const returnPage = () => {
    if (navback === true) {
      if (window.history.length > 1 && location.key !== "default") {
        navigate(-1);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
      } else {
        navigate(fallbackPath);
      }
    }
  };

  return returnPage;
};

export default useReturnPage;
