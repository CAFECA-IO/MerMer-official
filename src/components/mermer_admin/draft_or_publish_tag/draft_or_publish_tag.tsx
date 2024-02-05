import React from 'react'

type Props = {
  tagName: string,
  amount: number,
  activeTag: string,
  setActiveTag: React.Dispatch<React.SetStateAction<string>>
}

export default function DraftOrPublishTag({ tagName, amount, activeTag, setActiveTag }: Props) {
  // const lineUrl = activeTag === tagName ? '/elements/Line_lightBlue1' : '/elements/Line_gray1'
  const displayAmount = amount > 99 ? '99+' : String(amount);

  const handleOnClick = () => {
    setActiveTag(tagName);
  }

  return (
    <div
      key={tagName}
      onClick={handleOnClick}
      className={`
        group flex flex-col gap-2 font-Dosis
        ${activeTag === tagName
          ? ""
          : "cursor-pointer"
        }
    `}>
      <div className='flex items-center justify-center gap-1'>
        <span className={`
          text-base 
          ${activeTag === tagName
            ? 'font-bold text-lightWhite1'
            : 'text-lightWhite1 group-hover:text-lightBlue1'
          }
        `}>
          {tagName}
        </span>
        <span className={` 
          flex h-[18px] w-[18px] items-center justify-center rounded-full bg-lightWhite1 px-[5.5px] py-[0.5px] text-xxs font-bold leading-[19.6px] text-darkBlue3
          ${activeTag === tagName
            ? 'font-bold'
            : 'bg-lightWhite1 group-hover:bg-lightBlue1'
          }
        `}>
          {displayAmount}
        </span>
      </div>
      <div className={`
        h-[3px] w-full rounded-full
        ${activeTag === tagName
          ? 'bg-lightBlue1'
          : 'bg-lightGray1'
        }
      `}></div>
    </div>
  );
}