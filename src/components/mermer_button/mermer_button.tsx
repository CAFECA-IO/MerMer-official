interface IMerMerButton {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const MerMerButton = ({children, className, disabled, ...otherProps}: IMerMerButton) => {
  return (
    <button
      className={`group relative w-fit rounded-full bg-mermerTheme text-lightWhite1 hover:cursor-pointer disabled:bg-lightGray1 disabled:bg-none`}
      disabled={disabled}
      {...otherProps}
    >
      <span
        className={`absolute left-0 h-full w-full rounded-full bg-buttonHover opacity-0 ${
          disabled ? 'hidden' : 'block'
        } shadow-buttonHover transition-all duration-300 ease-in-out group-hover:opacity-100`}
      ></span>
      <div className={`relative flex items-center ${className}`}>{children}</div>
    </button>
  );
};

export default MerMerButton;
