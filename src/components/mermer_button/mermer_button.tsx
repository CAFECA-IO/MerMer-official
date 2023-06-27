interface IMerMerButton {
  children: React.ReactNode;
  className?: string;
}

const MerMerButton = ({children, className}: IMerMerButton) => {
  return (
    <div className={`relative w-fit rounded-full bg-mermerTheme text-lightWhite1 group`}>
      <span className="absolute opacity-0 rounded-full h-full w-full bg-buttonHover shadow-buttonHover transition-all duration-300 ease-in-out group-hover:opacity-100"></span>
      <div className={`relative flex items-center ${className}`}>{children}</div>
    </div>
  );
};

export default MerMerButton;
