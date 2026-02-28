import Spinner from "../loaders/Spinner";
import BoxSkeleton from "../loaders/BoxSkeleton";
import BackButton from "./MainPartials/BackButton";

const SecretSkeleton = ({ view }: { view?: boolean }) => {
  return (
    <div className="flex flex-col mx-auto pt-40 p-5 w-188 min-w-120 max-w-210">
      <div className="flex items-center justify-center">
        <div className="text-(--gray) electrolize font-bold absolute top-25 flex items-center gap-2">
          Loading
          <Spinner size="size-3.5" thickness="border-2" />
        </div>
      </div>
      <div className="flex items-center justify-between w-full relative mb-5">
        <BackButton />
        {/* status */}
        <BoxSkeleton
          className="w-15 h-6"
          colour="#76c4ff70"
          highlightColour="#76c4ff70"
        />
      </div>

      <div className="flex flex-col gap-2 pl-5.5">
        {/* key */}
        {!view && <BoxSkeleton className="w-30 h-6" />}
        {/* info */}
        <BoxSkeleton className="w-50 h-5" />
      </div>

      <div className="flex flex-col mt-2">
        {/* textbox */}
        <BoxSkeleton
          className="w-full h-45 border-2 border-gray-500/30"
          colour="var(--main-dark-blue-70)"
          highlightColour="var(--main-dark-blue-70)"
        />
        {/* delete button */}
        {!view && (
          <BoxSkeleton
            className="w-25 h-12 ml-auto mr-2 mt-3"
            colour="#fb2c3630"
            highlightColour="#fb2c3630"
          />
        )}
      </div>

      {/* timeline items */}
      {!view && (
        <>
          <BoxSkeleton className="w-25 h-6 ml-4 mt-13 mb-5" />
          <div className="flex ml-4 gap-3 items-center opacity-60">
            <BoxSkeleton
              className="w-17 h-17 border-4 border-gray-500/20 rounded-3xl!"
              colour="#76c4ff50"
              highlightColour="#76c4ff50"
            />
            <div className="flex flex-col gap-2">
              <BoxSkeleton className="w-20 h-5" />
              <BoxSkeleton className="w-15 h-4" />
            </div>
          </div>

          <div className="flex mt-15 ml-4 gap-3 items-center">
            <BoxSkeleton
              className="w-17 h-17 border-4 border-gray-500/20 rounded-3xl!"
              colour="#76c4ff50"
              highlightColour="#76c4ff50"
            />
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <BoxSkeleton className="w-10  h-5" />
                <BoxSkeleton
                  className="w-5  h-5"
                  colour="#76c4ff70"
                  highlightColour="#76c4ff70"
                />
              </div>
              <BoxSkeleton className="w-15 h-4" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SecretSkeleton;
