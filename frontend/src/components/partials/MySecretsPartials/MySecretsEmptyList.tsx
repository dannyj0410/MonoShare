const MySecretsEmptyList = ({ type }: { type: string }) => {
  let values = { bg: "", fill: "", textClr: "" };

  const activeValues = {
    bg: "bg-blue-200/10",
    fill: "fill-[#76c4ff]",
    textClr: "text-(--main-light-blue)",
  };

  const viewedValues = {
    bg: "bg-green-200/10",
    fill: "fill-[#02a30f]",
    textClr: "text-green-500",
  };

  const expiredValues = {
    bg: "bg-red-300/10",
    fill: "fill-[#fb2c36]",
    textClr: "text-red-500",
  };

  values =
    type === "Active"
      ? activeValues
      : type === "Viewed"
      ? viewedValues
      : type === "Expired"
      ? expiredValues
      : { bg: "", fill: "", textClr: "" };

  return (
    <li
      className={`mx-6 py-2 px-4 h-fit flex items-center gap-4 rounded-sm ${values.bg}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="List-Cross-Minimalistic--Streamline-Solar"
        height="20"
        width="20"
      >
        <desc>
          List Cross Minimalistic Streamline Icon: https://streamlinehq.com
        </desc>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.25 6c0 -0.41421 0.33579 -0.75 0.75 -0.75h17c0.4142 0 0.75 0.33579 0.75 0.75s-0.3358 0.75 -0.75 0.75H3c-0.41421 0 -0.75 -0.33579 -0.75 -0.75Zm0 5c0 -0.4142 0.33579 -0.75 0.75 -0.75h8c0.4142 0 0.75 0.3358 0.75 0.75s-0.3358 0.75 -0.75 0.75H3c-0.41421 0 -0.75 -0.3358 -0.75 -0.75Zm12.2197 -0.5303c0.2929 -0.2929 0.7677 -0.2929 1.0606 0L17.5 12.4393l1.9697 -1.9696c0.2929 -0.2929 0.7677 -0.2929 1.0606 0 0.2929 0.2929 0.2929 0.7677 0 1.0606L18.5607 13.5l1.9696 1.9697c0.2929 0.2929 0.2929 0.7677 0 1.0606 -0.2929 0.2929 -0.7677 0.2929 -1.0606 0L17.5 14.5607l-1.9697 1.9696c-0.2929 0.2929 -0.7677 0.2929 -1.0606 0 -0.2929 -0.2929 -0.2929 -0.7677 0 -1.0606L16.4393 13.5l-1.9696 -1.9697c-0.2929 -0.2929 -0.2929 -0.7677 0 -1.0606ZM2.25 16c0 -0.4142 0.33579 -0.75 0.75 -0.75h8c0.4142 0 0.75 0.3358 0.75 0.75s-0.3358 0.75 -0.75 0.75H3c-0.41421 0 -0.75 -0.3358 -0.75 -0.75Z"
          fill="#000"
          stroke-width="1"
          className={`${values.fill}`}
        ></path>
      </svg>
      <p className="electrolize">
        You have no{" "}
        <span className={`font-bold tracking-wider ${values.textClr}`}>
          {type}
        </span>{" "}
        secrets.
      </p>
    </li>
  );
};

export default MySecretsEmptyList;
