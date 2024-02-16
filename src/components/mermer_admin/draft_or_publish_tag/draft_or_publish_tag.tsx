import React from 'react'

type Props = {
  tagName: 'Drafts' | 'Published',
  amount: number,
  activePublishStatus: string,
  setActivePublishStatus: React.Dispatch<React.SetStateAction<'drafts' | 'published'>>
}

export default function DraftOrPublishTag({ tagName, amount, activePublishStatus, setActivePublishStatus }: Props) {
  // const lineUrl = activeTag === tagName ? '/elements/Line_lightBlue1' : '/elements/Line_gray1'
  const displayAmount = amount > 99 ? '99+' : String(amount);

  const handleOnClick = () => {
    setActivePublishStatus(tagName.toLowerCase() as 'drafts' | 'published');
  }

  const isActived = activePublishStatus === tagName.toLowerCase();
  return (
    <div
      key={tagName}
      onClick={handleOnClick}
      className={`
        group flex flex-col gap-2 font-Dosis
        ${isActived
          ? ""
          : "cursor-pointer"
        }
    `}>
      <div className='flex items-center justify-center gap-1'>
        <span className={`
          text-base 
          ${isActived
            ? 'font-bold text-lightWhite1'
            : 'text-lightWhite1 group-hover:text-lightBlue1'
          }
        `}>
          {tagName}
        </span>
        <span className={` 
          flex size-[18px] items-center justify-center rounded-full bg-lightWhite1 px-[5.5px] py-[0.5px] text-xxs font-bold leading-[19.6px] text-darkBlue3
          ${isActived
            ? 'font-bold'
            : 'bg-lightWhite1 group-hover:bg-lightBlue1'
          }
        `}>
          {displayAmount}
        </span>
      </div>
      <div className={`
        h-[3px] w-full rounded-full
        ${isActived
          ? 'bg-lightBlue1'
          : 'bg-lightGray1'
        }
      `}></div>
    </div>
  );
}