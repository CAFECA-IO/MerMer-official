interface IMerMerButton {
  children: React.ReactNode;
  className?: string;
}

const MerMerButton = ({children, className}: IMerMerButton) => {
  return (
    <div className={`group relative w-fit rounded-full bg-mermerTheme text-lightWhite1`}>
      <span className="absolute h-full w-full rounded-full bg-buttonHover opacity-0 shadow-buttonHover transition-all duration-300 ease-in-out group-hover:opacity-100"></span>
      <div className={`relative flex items-center ${className}`}>{children}</div>
    </div>
  );
};

export default MerMerButton;
