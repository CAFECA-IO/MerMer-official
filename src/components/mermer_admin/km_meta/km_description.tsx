import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  kmDescription: string,
  setKmDescription: Dispatch<SetStateAction<string>>,
};

export default function KmDescription({
  kmDescription,
  setKmDescription
}: Props) {

  const handleTitleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKmDescription(event.target.value);
  };


  return (
    <div className='flex w-full shrink flex-col gap-6 font-Dosis'>
      <div className='flex flex-col gap-1'>
        <label
          className="px-0 text-base"
          htmlFor="title"
        >
          Description
        </label>
        <input
          className="h-12 w-full  border-b-[1px] border-lightWhite1 bg-lightGray1/0 px-4 py-3 text-lightWhite1 outline-none placeholder:text-lightGray1"
          type="text"
          id="title"
          placeholder="Article Description"
          value={kmDescription}
          onChange={handleTitleOnChange}
        />
      </div>
    </div>)
}