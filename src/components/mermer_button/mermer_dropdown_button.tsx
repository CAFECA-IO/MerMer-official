import React from 'react'

type Props = {
  children: React.ReactNode,
  className?: string,
  onClick?: () => void,
  id?: string,
  type?: 'button' | 'submit' | 'reset',
  hidden?: boolean,
}


export default function MerMerDropdownButton ({children, className, hidden, ...otherProps}: Props) {
  return (
    <button
      className={`active: group relative
        bg-darkBlue3/0
        px-6 py-1
        text-lightWhite1
        hover:cursor-pointer hover:bg-dropDownHover
        hover:text-lightBlue1 active:bg-darkBlue3/100
        disabled:bg-lightGray1 disabled:bg-none ${className}`}
      hidden={hidden}
      {...otherProps}
    >
      <div className={`relative flex items-center justify-center`}>{children}</div>
    </button>
  );
}


