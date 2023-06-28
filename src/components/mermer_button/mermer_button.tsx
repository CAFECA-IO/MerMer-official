interface IMerMerButton {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
}

const MerMerButton = ({children, className, ...otherProps}: IMerMerButton) => {
  return (
    <button
      className={`group relative w-fit rounded-full bg-mermerTheme text-lightWhite1 hover:cursor-pointer`}
      {...otherProps}
    >
      <span className="absolute left-0 h-full w-full rounded-full bg-buttonHover opacity-0 shadow-buttonHover transition-all duration-300 ease-in-out group-hover:opacity-100"></span>
      <div className={`relative flex items-center ${className}`}>{children}</div>
    </button>
  );
};

export default MerMerButton;
