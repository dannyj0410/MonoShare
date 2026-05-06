import useReturnPage from "../../../hooks/useReturnPage";

const BackButton = ({
  navback = true,
  fallbackPath = "/",
}: {
  navback?: boolean;
  fallbackPath?: string;
}) => {
  const returnPage = useReturnPage(navback, fallbackPath);
  return (
    <button
      className="group flex items-center noto-sans font-bold p-2 cursor-pointer"
      onClick={returnPage}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 256 512"
        height="2em"
        width="2em"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 group-hover:-translate-x-2"
      >
        <path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path>
      </svg>
      <p className="transition-transform duration-300 group-hover:-translate-x-1">
        Return
      </p>
    </button>
  );
};

export default BackButton;
