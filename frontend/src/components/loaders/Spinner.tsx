const Spinner = ({
  size,
  thickness,
  clr = "text-(--gray)",
}: {
  size: string;
  thickness: string;
  clr?: string;
}) => {
  return (
    <div
      className={`${size} ${thickness} ${clr} animate-spin rounded-full border-e-transparent text-(--gray)`}
      role="status"
    />
  );
};

export default Spinner;
