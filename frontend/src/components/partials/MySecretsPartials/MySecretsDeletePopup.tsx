const MySecretsDeletePopup = () => {
  return (
    // Hide a bit under, maybe give it blur or something. and attach a class that transforms its position upwards and removes that blur when showing this.
    <div className="fixed flex justify-center bottom-5 w-full z-999">
      <div className="flex flex-col bg-[#04121c] w-200  rounded-lg border border-gray-400/15">
        <div className="flex flex-col gap-1 py-2 px-4 border-b border-gray-400/15">
          <h1 className="text-red-400 noto-sans font-semibold">
            Erase Confirmation
          </h1>
          <p className="text-(--gray) text-sm noto-sans">
            Are you sure you want to erase{" "}
            <span className="font-bold arvo">nuxda</span>? This will permenantly
            remove all of its associated data.
          </p>
        </div>
        <div className="border-b border-gray-400/15">
          <p className="bg-red-400/15 text-red-400 noto-sans m-4 py-3 px-4 rounded-sm text-xs ">
            <span className="font-bold">Warning:</span> This action is cannot be
            undone.
          </p>
        </div>
        <div className="flex ml-auto m-2 mr-2 text-sm gap-2">
          <button className="border border-gray-400/15 hover:border-gray-400/25 noto-sans rounded-lg py-2 px-15 cursor-pointer  transition-colors duration-100">
            Cancel
          </button>
          <button className="bg-red-400 hover:bg-red-400/60 noto-sans rounded-lg py-2 px-15 cursor-pointer transition-colors duration-100">
            Erase
          </button>
        </div>
      </div>
    </div>
  );
};

export default MySecretsDeletePopup;
