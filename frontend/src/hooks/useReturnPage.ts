import { useLocation, useNavigate } from "react-router-dom";

const useReturnPage = (navback = true, fallbackPath = "/") => {
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
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
      }
    } else {
      navigate(fallbackPath);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    }
  };

  return returnPage;
};

export default useReturnPage;
