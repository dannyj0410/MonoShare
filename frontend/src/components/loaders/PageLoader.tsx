import Spinner from "./Spinner";

const PageLoader = () => {
  return (
    <div className="flex gap-2 justify-center items-center pt-20">
      <p className="text-(--gray) electrolize font-bold">Loading</p>
      <Spinner size="size-4" thickness="border-2" />
    </div>
  );
};

export default PageLoader;
