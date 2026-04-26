const CopiedSecretUrlIcon = ({ className }: { className: string }) => {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="24px"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
  );
};

export default CopiedSecretUrlIcon;
