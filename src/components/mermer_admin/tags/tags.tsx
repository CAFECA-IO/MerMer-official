import React, { Dispatch } from 'react'
import TagsInputField from './tags_input_field';
import { IKmTag } from '../../../interfaces/km';

type Props = {
  tags: IKmTag[],
  setTags: Dispatch<React.SetStateAction<IKmTag[]>>
};

export default function Tags({ tags, setTags }: Props) {
  // 後端好了改這裡

  return (
    // Info Murky (20240206) - suppressHydrationWarning is a temporary fix for the following error:
    // Warning: Extra attributes from the server: aria-activedescendant
    <div className='w-full font-Dosis'>
      <label
        className="px-0 text-base"
        htmlFor="long-value-select"
      >
        Tags
      </label>
      <TagsInputField
        tags={tags}
        setTags={setTags}
      />
    </div>
  )
}